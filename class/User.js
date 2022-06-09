class User {
    //构造函数
    constructor(userID) {
        //给类属性赋值
        this.userID = userID;
    }

    //标记活动
    tagActivity(activity) {
        //获取数据库的引用
        const db = wx.cloud.database();
        //获取tag表格的引用
        const tagTable = db.collection("tag");

        //将用户id和活动id的关联关系加入tag表格中
        var that = this; //将该对象的引用给that用于在回调函数中使用
        tagTable.add({
            data: {
                user_id: this.userID,
                activity_id: activity.activityID
            },
            success: function (res) {
                console.log(that.userID + " 用户标记活动 " + activity.activityID + " 成功");
            }
        })
    }

    //取消对活动的标记
    cancellTag(activity) {
        //获取数据库的引用
        const db = wx.cloud.database();
        //获取tag表格的引用
        const tagTable = db.collection("tag");

        //查找要删除的记录项
        var that = this; //将该对象的引用给that用于在回调函数中使用
        tagTable.where({
                user_id: this.userID,
                activity_id: activity.activityID
            })
            .get({
                success: function (res) {
                    tagTable.doc(res.data[0]._id).remove({
                        success: function (res) {
                            console.log("用户 " + that.userID + " 取消标记活动 " + activity.activityID + " 成功");
                        }
                    })
                }
            })
    }

    //查询被标记的活动
    queryTaggedActivity(callback) {
        //获取数据库的引用
        const db = wx.cloud.database();
        //获取tag表格的引用
        const tagTable = db.collection("tag");

        //根据该用户的userID查询标记的活动并通过回调函数返回结果
        tagTable.where({
                user_id: this.userID
            })
            .get({
                success: function (res) {
                    callback(res);
                }
            })
    }

    //录入活动信息
    enterActivityInfo(activity) {
        activity.addAudit();
    }
}


export {
    User
};