// app.js
import {
    User
} from "./class/User.js"
import {
    Admin
} from "./class/Admin.js"
App({
    onLaunch() {
        //云开发初始化
        wx.cloud.init({
            env: "ticketeasy-2g3bsuqraafa1609"
        });

    }
})