import {
    Activity
} from "./Activity.js";
import {
    ActivityInfo
} from "./ActivityInfo.js";
import {
    Admin
} from "./Admin.js";
import {
    User
} from "./User.js";

//实例化对象生产工厂类
class Factory {
    //声明静态变量
    static activityList = new Array();
    static auditList = new Array();
    static user = new User();
    static admin = new Admin();

    //获取今天日期
    static getDay() {
        var nowTime = new Date(); //获取当前时间
        var nowDay = new Date(nowTime.getFullYear(), nowTime.getMonth(), nowTime.getDate()); //根据当前时间生成今天日期
        return nowDay;
    }

    //创建所有活动列表
    static createActivityList(callback) {
        //获取数据库的引用
        const db = wx.cloud.database();
        //获取activity表格的引用
        const activityTable = db.collection("activity");

        //获取activity表格的活动的数据
        activityTable.get({
            success: function (res) {
                Factory.activityList.length = res.data.length; //令数组长度等于记录个数
                //创建Activity实例列表
                for (var i = 0; i < res.data.length; i++) {
                    var data = res.data[i];
                    Factory.activityList[i] = new Activity(data.activity_id, new ActivityInfo({
                        date: data.date,
                        link: data.link,
                        scoreType_cx: data.scoreType_cx,
                        scoreType_dy: data.scoreType_dy,
                        scoreType_wt: data.scoreType_wt,
                        scoreType_all: data.scoreType_all,
                        online: data.online,
                        offline: data.offline
                    }))
                }
                callback(Factory.activityList);
            }
        })
    }

    //获取所有活动的实例列表
    static getActivityList(callback) {
        Factory.createActivityList(callback);
    }

    //创建待审核的活动列表
    static createAuditList(callback) {
        //获取数据库的引用
        const db = wx.cloud.database();
        //获取audit表格的引用
        const auditTable = db.collection("audit");
        //获取audit表格的所有数据
        auditTable.get({
            success: function (res) {
                Factory.auditList.length = res.data.length; //令数组长度等于记录个数
                //创建待审核Activity实例列表
                for (var i = 0; i < Factory.auditList.length; i++) {
                    var data = res.data[i];
                    Factory.auditList[i] = new Activity(data.activity_id, new ActivityInfo({
                        date: data.date,
                        link: data.link,
                        scoreType_cx: data.scoreType_cx,
                        scoreType_dy: data.scoreType_dy,
                        scoreType_wt: data.scoreType_wt,
                        scoreType_all: data.scoreType_all,
                        online: data.online,
                        offline: data.offline
                    }))
                }
                callback(Factory.auditList);
            }
        })
    }

    //获取待审核活动的实例列表
    static getAuditList(callback) {
        Factory.createAuditList(callback);
    }

    //创建User实例化对象
    static createUser(userID) {
        Factory.user = new User(userID);
    }

    //获取User实例化对象
    static getUser() {
        return Factory.user;
    }

    //创建Admin实例化对象
    static createAdmin(adminID) {
        Factory.admin = new Admin(adminID);
    }

    //获取Admin实例化对象
    static getAdmin() {
        return Factory.admin;
    }
}

export {
    Factory
};