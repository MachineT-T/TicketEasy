// app.js
import {
    User
} from "./class/User.js";
import {
    Admin
} from "./class/Admin.js";
import {
    ActivityInfo
} from "./class/ActivityInfo.js";
import {
    Activity
} from "./class/Activity.js";
import {
    Factory
} from "./class/Factory.js";

App({
    onLaunch() {
        //云开发初始化
        wx.cloud.init({
            env: "ticketeasy-2g3bsuqraafa1609"
        });
    },

    globalData: {
        link: '',
        activitytoEdit: undefined,
        year:0,
        month:0,
        day:0,
    }
})