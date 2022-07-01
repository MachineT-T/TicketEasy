class Admin {
    //构造函数
    constructor(adminID) {
        //赋予该对象adminID属性前需要先检查是否具有管理员权限
        this.adminID = adminID;
    }

    //检查该ID是否具有管理员权限
    static checkAdmin(callback, ID) {
        //获取数据库的引用
        const db = wx.cloud.database();
        //获取user表格的引用
        const adminTable = db.collection("admin");

        //查询admin表格中是否存在该ID项
        adminTable.where({
                admin_id: ID
            })
            .get({
                success: function (res) {
                    //如果admin表格中不存在该id，则判断不具有管理员权限，执行回调函数返回参数false
                    if (res.data.length == 0) {
                        console.log("用户 " + ID + " 不具有管理员权限");
                        callback(false);
                    } else //否则判断具有管理员权限，执行回调函数返回参数true
                    {
                        console.log("用户 " + ID + " 为管理员");
                        callback(true);
                    }
                }
            })
    }

    auditActivity(activity, flag,callback) {
        //获取数据库的引用
        const db = wx.cloud.database();
        //获取audit表格的引用
        const auditTable = db.collection("audit");
        //获取activity表格的引用
        const activityTable = db.collection("activity");

        //查询audit表格中对应的活动记录
        auditTable.where({
                activity_id: activity.activityID
            })
            .get({
                success: function (res) {
                    //如果审核通过，则将活动从audit表格中移动到activity表格中
                    if (flag) {
                        //获取到活动记录后添加到activity表格中
                        activityTable.add({
                            data: res.data[0],
                            success: function (res) {
                                console.log("审核通过，" + activity.activityID + " 活动信息添加成功");
                            }
                        })
                    }

                    //无论审核通过与否，都删除该活动在audit表格中的信息
                    auditTable.doc(res.data[0]._id).remove({
                        success: function (res) {
                            console.log("审核结束，audit表格对应活动 " + activity.activityID + " 删除成功");
                            callback(res);
                        }
                    })
                }
            })

        //向用户发送审核结果消息
        var result;
        if (flag) {
            result = "已通过";
        } else {
            result = "未通过";
        }
        wx.request({
            url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx7ca64d1e620b29a5&secret=8c37b827aa166f61b346c5bea38acd03',
            method: "GET",
            success: function (resToken) {
                console.log(resToken);
                console.log(activity.userID);
                wx.request({
                    url: 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=' + resToken.data.access_token,
                    method: "POST",
                    data: {
                        "touser": activity.info.userID,
                        "template_id": "pB2C4ykffbcgN9yvGCW0A193EnsXwM8kFlBZGzHSNho",
                        "data": {
                            "thing10": {
                                "value": activity.activityID
                            },
                            "phrase1": {
                                "value": result
                            }
                        }
                    },
                    success: function (res) {
                        console.log(res);
                    }
                })
            }
        })
    }


    //修改活动信息
    modifyActivityInfo(activity, info) {
        activity.modifyInfo(info);
    }

    //添加来源公众号
    addSource(wechatID, callback) {
        //获取数据库的引用
        const db = wx.cloud.database();
        //获取source表格的引用
        const sourceTable = db.collection("source");

        sourceTable.add({
            data: {
                wechat_id: wechatID
            },
            success: function (res) {
                console.log("添加来源公众号 " + wechatID + " 成功");
                callback(res);
            }
        })
    }

    //删除来源公众号
    removeSource(wechatID, callback) {
        //获取数据库的引用
        const db = wx.cloud.database();
        //获取source表格的引用
        const sourceTable = db.collection("source");

        sourceTable.where({
                wechat_id: wechatID
            })
            .get({
                success: function (res) {
                    sourceTable.doc(res.data[0]._id).remove({
                        success: function (res) {
                            console.log("来源公众号 " + wechatID + " 删除成功");
                            callback(res);
                        }
                    })
                }
            })
    }

    //获取所有来源公众号的微信号
    querySource(callback) {
        //获取数据库的引用
        const db = wx.cloud.database();
        //获取source表格的引用
        const sourceTable = db.collection("source");

        sourceTable.get({
            success: function (res) {
                callback(res);
            }
        })
    }
}

export {
    Admin
};