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
        userTable.where({
                user_id: userID
            })
            .get({
                success: function (res) {
                    //如果表格中不存在该用户，则将用户添加到用户列表中
                    if (res.data.length == 0) {
                        userTable.add({
                            data: {
                                user_id: userID
                            },
                            success: function (res) {
                                console.log("用户" + userID + "插入成功");
                            }
                        })
                    }
                }
            })
    }
}
export {
    User
};