// pages/showActivity/showActivity.js

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

    /**
     * 页面的初始数据
     */
    data: {
        activityList: new Array(),
        year: new Array(),
        month: new Array(),
        day: new Array(),
        tagList: new Array(),
        openid: 0
    },

    tagActivity(e) {
        //获取index
        var index = e.target.dataset.index;
        //更改本地渲染数据
        var tagList = this.data.tagList;
        tagList[index] = true;
        this.setData({
            tagList: tagList
        })
        //获取user实例
        var user = Factory.getUser();
        console.log(index);
        //更改数据库中标记列表
        user.tagActivity(this.data.activityList[index]);
    },

    cancellTag(e) {
        //获取index
        var index = e.target.dataset.index;
        //更改本地渲染数据
        var tagList = this.data.tagList;
        tagList[index] = false;
        this.setData({
            tagList: tagList
        })
        //获取user实例
        var user = Factory.getUser();
        console.log(index);
        //更改数据库中标记列表
        user.cancellTag(this.data.activityList[index]);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //保存this引用
        var that = this;

        //登录并保存openid
        wx.login({
            success: function (res) {
                if (res.code) {
                    wx.request({
                        url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx7ca64d1e620b29a5&secret=8c37b827aa166f61b346c5bea38acd03&js_code=' + res.code + '&grant_type=authorization_code',
                        success: function (res1) {
                            that.setData({
                                openid: res1.data.openid
                            })
                        }
                    })
                }
            }
        })

        //这里为了调试加了创建了user实例，正式使用需要在一开始用户登录的时候就创建用户实例
        var user = Factory.getUser();

        //获取活动列表，这里是获取了过期活动的列表，直接改下面这行的函数就可以改获取的列表
        Factory.getOutActivityList(function (res) {
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

            //查询该用户标记的活动并与需要渲染的活动进行比较看是否被用户标记
            user.queryTaggedActivity(function (res) {
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
        });
    },

    click() {

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