import {
    ActivityInfo
} from "./ActivityInfo.js";

class Activity {
    //构造函数
    constructor(activityID, info) {
        this.activityID = activityID;
        this.info = info;
    }

    //将该活动的信息录入待审核列表中
    addAudit(userID) {
        //获取数据库的引用
        const db = wx.cloud.database();
        //获取audit表格的引用
        const auditTable = db.collection("audit");

        var that = this; //获取this的引用
        auditTable.add({
            data: {
                activity_id: this.activityID,
                date: this.info.date,
                link: this.info.link,
                scoreType_cx: this.info.scoreType_cx,
                scoreType_dy: this.info.scoreType_dy,
                scoreType_wt: this.info.scoreType_wt,
                scoreType_all: this.info.scoreType_all,
                online: this.info.online,
                offline: this.info.offline,
                user_id: userID
            },
            success: function (res) {
                console.log("活动 " + that.activityID + " 加入待审核列表成功");
            }
        })
    }

    //修改该活动的信息
    modifyInfo(info) {
        this.info.modifyInfo(info);

        //获取数据库的引用
        const db = wx.cloud.database();
        //获取activity表格的引用
        const activityTable = db.collection("activity");

        //获取this的引用
        var that = this;
        //先查找到对应的活动项
        activityTable.where({
                activity_id: this.activityID
            })
            .get({
                success: function (res) {
                    //查找到对应活动项后更改记录
                    activityTable.doc(res.data[0]._id).update({
                        data: {
                            date: that.info.date,
                            link: that.info.link,
                            scoreType_cx: that.info.scoreType_cx,
                            scoreType_dy: that.info.scoreType_dy,
                            scoreType_wt: that.info.scoreType_wt,
                            scoreType_all: that.info.scoreType_all,
                            online: that.info.online,
                            offline: that.info.offline
                        },
                        success: function (res) {
                            console.log("更新活动 " + that.activityID + " 的信息成功");
                        }
                    })
                }
            })
    }
}

export {
    Activity
};