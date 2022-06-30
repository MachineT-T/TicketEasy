import {
    Activity
} from "./Activity";
import {
    ActivityInfo
} from "./ActivityInfo";

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
        wx.requestSubscribeMessage({
            tmplIds: ["pB2C4ykffbcgN9yvGCW0A193EnsXwM8kFlBZGzHSNho"],
            success: function (res) {
                console.log(res);
            },
            fail: function (res) {
                console.log(res);
            }
        })
        activity.addAudit(this.userID);
    }

    //查询未审核的投稿活动信息
    queryContributeActivity(callback) {
        //获取数据库的引用
        const db = wx.cloud.database();
        //获取audit表格的引用
        const auditTable = db.collection("audit");

        auditTable.where({
                user_id: this.userID
            })
            .get({
                success: function (res) {
                    callback(res);
                }
            })
    }

    //按条件筛选活动
    queryActivity(data, callback) {
        //获取数据库的引用
        const db = wx.cloud.database();
        //获取audit表格的引用
        const activityTable = db.collection("activity");
        //获取查询指令对象
        const _ = db.command;

        //将结束时间改为第二天零点
        data.end_date.setDate(data.end_date.getDate() + 1);

        //按条件查询活动
        //当所有分标签被选择
        if (data.scoreType_all) {
            activityTable.where({
                    date: _.gte(data.start_date).and(_.lt(data.end_date)),
                    online: data.online,
                    offline: data.offline
                })
                .get({
                    success: function (res) {
                        var activityList = new Array(res.data.length);
                        for (var i = 0; i < res.data.length; i++) {
                            var temp = res.data[i];
                            activityList[i] = new Activity(temp.activity_id, new ActivityInfo({
                                date: temp.date,
                                link: temp.link,
                                scoreType_cx: temp.scoreType_cx,
                                scoreType_dy: temp.scoreType_dy,
                                scoreType_wt: temp.scoreType_wt,
                                scoreType_all: temp.scoreType_all,
                                online: temp.online,
                                offline: temp.offline,
                                userID: temp.user_id
                            }))
                        }
                        callback(activityList);
                    }
                })
        } else { //当所有标签没有被选择
            activityTable.where({
                    date: _.gte(data.start_date).and(_.lt(data.end_date)),
                    scoreType_cx: data.scoreType_cx,
                    scoreType_dy: data.scoreType_dy,
                    scoreType_wt: data.scoreType_wt,
                    online: data.online,
                    offline: data.offline
                })
                .get({
                    success: function (res) {
                        var activityList = new Array(res.data.length);
                        for (var i = 0; i < res.data.length; i++) {
                            var temp = res.data[i];
                            activityList[i] = new Activity(temp.activity_id, new ActivityInfo({
                                date: temp.date,
                                link: temp.link,
                                scoreType_cx: temp.scoreType_cx,
                                scoreType_dy: temp.scoreType_dy,
                                scoreType_wt: temp.scoreType_wt,
                                scoreType_all: temp.scoreType_all,
                                online: temp.online,
                                offline: temp.offline,
                                userID: temp.user_id
                            }))
                        }
                        callback(activityList);
                    }
                })
        }
    }
}


export {
    User
};