class User {
    //构造函数
    constructor(userID) {
        //给类属性赋值
        this.userID = userID;

        //获取数据库的引用
        const db = wx.cloud.database();
        //获取user表格的引用
        const userTable = db.collection("user");

        //查询user表格中是否已存在该用户
        var that = this; //将该对象的引用给that用于在回调函数中使用
        userTable.where({
                user_id: this.userID
            })
            .get({
                success: function (res) {
                    //如果表格中不存在该用户，则将用户添加到用户列表中
                    if (res.data.length == 0) {
                        userTable.add({
                            data: {
                                user_id: that.userID
                            },
                            success: function (res) {
                                console.log("用户 " + that.userID + " 插入成功");
                            }
                        })
                    }
                }
            })
    }

    tagActivity(activityID) {
        //获取数据库的引用
        const db = wx.cloud.database();
        //获取tag表格的引用
        const tagTable = db.collection("tag");

        //将用户id和活动id的关联关系加入tag表格中
        var that = this; //将该对象的引用给that用于在回调函数中使用
        tagTable.add({
            data: {
                user_id: this.userID,
                activity_id: activityID
            },
            success: function (res) {
                console.log(that.userID + " 用户标记活动 " + activityID + " 成功");
            }
        })
    }

    //取消对活动的标记
    cancellTag(activityID) {
        //获取数据库的引用
        const db = wx.cloud.database();
        //获取tag表格的引用
        const tagTable = db.collection("tag");

        //查找要删除的记录项
        var that = this; //将该对象的引用给that用于在回调函数中使用
        tagTable.where({
                user_id: this.userID,
                activity_id: activityID
            })
            .get({
                success: function (res) {
                    tagTable.doc(res.data[0]._id).remove({
                        success: function (res) {
                            console.log("用户 " + that.userID + " 取消标记活动 " + activityID + " 成功");
                        }
                    })
                }
            })
    }
}
export {
    User
};