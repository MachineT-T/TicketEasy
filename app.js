// app.js
import {
    Admin
} from "./class/Admin"
App({
    onLaunch() {
        wx.cloud.init({
            env: "ticketeasy-2g3bsuqraafa1609"
        });
    }
})