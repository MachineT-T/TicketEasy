// pages/admin_activityMod/admin_activityMod.js
import {
    Factory
} from "../../class/Factory";

import {
    Activity
} from "../../class/Activity";

import {
    ActivityInfo
} from "../../class/ActivityInfo";

Page({
    //点击改变按钮状态
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

    overdue_change() {
        if (this.data.type_ongoing === '未过期') {
            this.setData({
                type_ongoing: '过期'
            })
        } else {
            this.setData({
                type_ongoing: '未过期',
            })
        }
    },

    /**
     * 页面的初始数据
     */
    data: {
        type_wt: 'default',
        type_dy: 'default',
        type_cx: 'default',
        type_online: 'default',
        type_offline: 'default',
        type_ongoing: '未过期',
        start_date: '2000-06-09',
        end_date: '2032-06-09',
        activityList: new Array(),
        year: new Array(),
        month: new Array(),
        day: new Array(),
        tagList: new Array()
    },

    query() {
        //数据转换
        if (this.data.type_cx === 'default') {
            var typecx = false;
        } else {
            var typecx = true;
        }
        if (this.data.type_wt === 'default') {
            var typewt = false;
        } else {
            var typewt = true;
        }
        if (this.data.type_dy === 'default') {
            var typedy = false;
        } else {
            var typedy = true;
        }
        if (typewt === false && typedy === false && typecx === false) {
            var typesy = true;
        } else {
            var typesy = false;
        }
        if (this.data.type_ongoing === '未过期') {
            var typeongoing = true;
        } else {
            var typeongoing = false;
        }
        if (this.data.type_online === 'default') {
            var typeonline = false;
        } else {
            var typeonline = true;
        }
        if (this.data.type_offline === 'default') {
            var typeoffline = false;
        } else {
            var typeoffline = true;
        }
        //如果线上线下都没选中就不传线上线下这两个参数
        if (this.data.type_offline === 'default' && this.data.type_online === 'default') {

            var that = this;
            Factory.getUser().queryActivity({
                    scoreType_cx: typecx,
                    scoreType_dy: typedy,
                    scoreType_wt: typewt,
                    scoreType_all: typesy,
                    start_date: new Date(this.data.start_date),
                    end_date: new Date(this.data.end_date),
                    type_ongoing: typeongoing
                },
                function (res) {
                    console.log(res);
                    var yy = new Array();
                    var mm = new Array();
                    var dd = new Array();
                    for (var i = 0; i < res.length; i++) {
                        yy[i] = res[i].info.date.getFullYear();
                        mm[i] = res[i].info.date.getMonth() + 1;
                        dd[i] = res[i].info.date.getDate();
                    }
                    that.setData({
                        activityList: res,
                        year: yy,
                        month: mm,
                        day: dd
                    });
                    Factory.getUser().queryTaggedActivity(function (res) {
                        console.log(res);
                        console.log(that.data.activityList);
                        var tagList = new Array(that.data.activityList.length);
                        for (var i = 0; i < that.data.activityList.length; i++) {
                            var flag = false;
                            for (var j = 0; j < res.data.length; j++) {
                                if (that.data.activityList[i].activityID == res.data[j].activity_id) {
                                    flag = true;
                                }
                            }
                            tagList[i] = flag;
                        }
                        that.setData({
                            tagList: tagList
                        })
                    })
                })
        } else {
            var that = this;
            Factory.getUser().queryActivity({
                    scoreType_cx: typecx,
                    scoreType_dy: typedy,
                    scoreType_wt: typewt,
                    scoreType_all: typesy,
                    online: typeonline,
                    offline: typeoffline,
                    start_date: new Date(this.data.start_date),
                    end_date: new Date(this.data.end_date),
                    type_ongoing: typeongoing
                },
                function (res) {
                    console.log(res);
                    var yy = new Array();
                    var mm = new Array();
                    var dd = new Array();
                    for (var i = 0; i < res.length; i++) {
                        yy[i] = res[i].info.date.getFullYear();
                        mm[i] = res[i].info.date.getMonth() + 1;
                        dd[i] = res[i].info.date.getDate();
                    }
                    that.setData({
                        activityList: res,
                        year: yy,
                        month: mm,
                        day: dd
                    });
                    Factory.getUser().queryTaggedActivity(function (res) {
                        console.log(res);
                        console.log(that.data.activityList);
                        var tagList = new Array(that.data.activityList.length);
                        for (var i = 0; i < that.data.activityList.length; i++) {
                            var flag = false;
                            for (var j = 0; j < res.data.length; j++) {
                                if (that.data.activityList[i].activityID == res.data[j].activity_id) {
                                    flag = true;
                                }
                            }
                            tagList[i] = flag;
                        }
                        that.setData({
                            tagList: tagList
                        })
                    })
                })
        }
    },

    toEditPage(e) {
        console.log(e);
        const app = getApp();
        app.globalData.activitytoEdit = this.data.activityList[e.target.dataset.activityindex];
        app.globalData.year = e.target.dataset.year;
        app.globalData.month = e.target.dataset.month;
        app.globalData.day = e.target.dataset.day;
        wx.navigateTo({
            url: '/pages/activityEdit/activityEdit',
        })
    },

    tiaozhuan(e) {
        const app = getApp();
        app.globalData.link = e.currentTarget.dataset.dizhi;
        wx.navigateTo({
            url: '/pages/webview/webview',
        })
    },

    bindstartDateChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            start_date: e.detail.value
        })
    },

    bindendDateChange: function (e) {
        console.log('picker发送选择改变，end携带值为', e.detail.value)
        this.setData({
            end_date: e.detail.value
        })
    },

    toAudit() {
        wx.redirectTo({
            url: '/pages/admin_audit/admin_audit',
        })
    },

    toGzh() {
        wx.redirectTo({
            url: '/pages/admin_gzhSource/admin_gzhSource',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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