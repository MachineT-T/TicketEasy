class Admin {
    //构造函数
    constructor(adminID) {
        //赋予该对象adminID属性前需要先检查是否具有管理员权限
        Admin.checkAdmin(
            function (res) {
                //如果有管理员权限则令adminID属性等于该用户ID
                if (res) {
                    this.adminID = adminID;
                } else { //否则令adminID属性为null
                    this.adminID = null;
                }
            },
            adminID
        )
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

    auditActivity(activityID, flag) {
        //获取数据库的引用
        const db = wx.cloud.database();
        //获取audit表格的引用
        const auditTable = db.collection("audit");
        //获取activity表格的引用
        const activityTable = db.collection("activity");

        //查询audit表格中对应的活动记录
        auditTable.where({
                activity_id: activityID
            })
            .get({
                success: function (res) {
                    //如果审核通过，则将活动从audit表格中移动到activity表格中
                    if (flag) {
                        //获取到活动记录后添加到activity表格中
                        activityTable.add({
                            data: res.data[0],
                            success: function (res) {
                                console.log("审核通过，" + activityID + " 活动信息添加成功");
                            }
                        })
                    }

                    //无论审核通过与否，都删除该活动在audit表格中的信息
                    auditTable.doc(res.data[0]._id).remove({
                        success: function (res) {
                            console.log("审核结束，audit表格对应活动 " + activityID + " 删除成功");
                        }
                    })
                }
            })
    }

    modifyActivityInfo(activityID, data) {
        //获取数据库的引用
        const db = wx.cloud.database();
        //获取activity表格的引用
        const activityTable = db.collection("activity");

        //先查找到对应的活动项
        activityTable.where({
                activity_id: activityID
            })
            .get({
                success: function (res) {
                    //查找到对应活动项后更改记录
                    activityTable.doc(res.data[0]._id).update({
                        data: data,
                        success: function (res) {
                            console.log("更新活动 " + activityID + " 的信息成功");
                        }
                    })
                }
            })
    }

    //添加来源公众号
    addSource(wechatID) {
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
            }
        })
    }

    //删除来源公众号
    removeSource(wechatID) {
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
                        }
                    })
                }
            })
    }
}

export {
    Admin
};