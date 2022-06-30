// pages/user_info/user_info.js
import {
    Factory
} from "../../class/Factory.js";
import {
    Admin
} from "../../class/Admin.js";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        ifadmin: false,
        activityList: new Array(),
        year: new Array(),
        month: new Array(),
        day: new Array(),
        tagList: new Array(),
    },

    //管理员按钮对应跳转函数
    toadmin() {
        if (this.data.ifadmin) {
            wx.navigateTo({
                url: '/pages/admin_gzhSource/admin_gzhSource',
            })
        } else {
            wx.showToast({
                title: '没有权限',
                icon: 'error',
                duration: 1000
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        //获取用户ID实例化User对象
        var that = this;
        wx.login({
            success: function (res) {
                if (res.code) {
                    wx.request({
                        url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx7ca64d1e620b29a5&secret=8c37b827aa166f61b346c5bea38acd03&js_code=' + res.code + '&grant_type=authorization_code',
                        success: function (res1) {
                            Factory.createUser(res1.data.openid);
                            Admin.checkAdmin(
                                function (res) {
                                    if (res) {
                                        Factory.createAdmin(Factory.getUser().userID);
                                        console.log(Factory.getAdmin().adminID)
                                        that.setData({
                                            ifadmin: true
                                        })
                                    }
                                },
                                res1.data.openid
                            )
                        }
                    })
                }
            }
        })

        //抓取收藏活动列表
        Factory.getUser().queryTaggedActivity(
            function (res) {
                console.log(res);
                var yy = new Array();
                var mm = new Array();
                var dd = new Array();
                for (var i = 0; i < res.data.length; i++) {
                    yy[i] = res.data[i].info.date.getFullYear();
                    mm[i] = res.data[i].info.date.getMonth() + 1;
                    dd[i] = res.data[i].info.date.getDate();
                }
                that.setData({
                    activityList: res.data,
                    year: yy,
                    month: mm,
                    day: dd
                });
            }
        )
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

    },

    getPhoneNumber(e) {
        console.log(e.detail.code)
    }

})