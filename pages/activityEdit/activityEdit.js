import {
    Factory
} from "../../class/Factory"
import {
    Activity
} from "../../class/Activity.js";
import {
    ActivityInfo
} from "../../class/ActivityInfo.js";
import {
    Admin
} from "../../class/Admin.js";
// pages/activityEdit/activityEdit.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        activity: undefined,
        year: 0,
        month: 0,
        day: 0,

        link: '',
        date: '', //日期
        type_wt: 'default',
        type_dy: 'default',
        type_cx: 'default',
        type_sy: 'primary',
        type_online: 'default',
        type_offline: 'default'
    },

    wt_change() {
        if (this.data.type_wt === 'default') {
            this.setData({
                type_wt: 'primary'
            })
        } else {
            this.setData({
                type_wt: 'default',
            })
        }
    },

    cx_change() {
        if (this.data.type_cx === 'default') {
            this.setData({
                type_cx: 'primary'
            })
        } else {
            this.setData({
                type_cx: 'default',
            })
        }
    },

    dy_change() {
        if (this.data.type_dy === 'default') {
            this.setData({
                type_dy: 'primary'
            })
        } else {
            this.setData({
                type_dy: 'default',
            })
        }
    },

    online_change() {
        if (this.data.type_online === 'default') {
            this.setData({
                type_online: 'primary'
            })
        } else {
            this.setData({
                type_online: 'default',
            })
        }
    },

    offline_change() {
        if (this.data.type_offline === 'default') {
            this.setData({
                type_offline: 'primary'
            })
        } else {
            this.setData({
                type_offline: 'default',
            })
        }
    },

    onChangelink(event) {
        // event.detail 为当前输入的值
        this.data.link = event.detail;
        console.log(this.data.link);
    },

    bindDateChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            date: e.detail.value
        })
        console.log(this.data.date)
    },

    submit() {
        if (this.data.type_offline === 'default' && this.data.type_online === 'default') {
            wx.showToast({
                title: '线上线下至少选一个',
                icon: 'none',
                duration: 2000
            })
        } else {
            //生成对应分数类型逻辑值
            if (this.data.type_cx === 'default') {
                var stype_cx = false;
            } else {
                var stype_cx = true;
            }
            if (this.data.type_dy === 'default') {
                var stype_dy = false;
            } else {
                var stype_dy = true;
            }
            if (this.data.type_wt === 'default') {
                var stype_wt = false;
            } else {
                var stype_wt = true;
            }
            if (this.data.type_online === 'default') {
                var type_online = false;
            } else {
                var type_online = true;
            }
            if (this.data.type_offline === 'default') {
                var type_offline = false;
            } else {
                var type_offline = true;
            }
            console.log(this.data.activity);
            //生成要提交的事件对象
            Factory.getAdmin().modifyActivityInfo(this.data.activity, new ActivityInfo({
                date: new Date(this.data.date),
                link: this.data.link,
                scoreType_cx: stype_cx,
                scoreType_dy: stype_dy,
                scoreType_wt: stype_wt,
                scoreType_all: true,
                online: type_online,
                offline: type_offline
            }));
            wx.showToast({
                title: '已提交',
                icon: 'success',
                duration: 1000
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(getApp().globalData.activitytoEdit);
        const app = getApp();
        this.setData({
            activity: app.globalData.activitytoEdit,
            year: app.globalData.year,
            month: app.globalData.month,
            day: app.globalData.day,
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})