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
        activityList: new Array(),
        year: new Array(),
        month: new Array(),
        day: new Array(),
        tagList: new Array(),
        tougaoList: new Array(),
        year_t: new Array(),
        month_t: new Array(),
        day_t: new Array(),
    },

    tiaozhuan(e) {
        const app = getApp();
        app.globalData.link = e.currentTarget.dataset.dizhi;
        wx.navigateTo({
            url: '/pages/webview/webview',
        })
    },

    cancellTag(e) {
        //获取index
        var index = e.target.dataset.index;

        //获取user实例
        var user = Factory.getUser();
        console.log(index);
        //更改数据库中标记列表
        user.cancellTag(this.data.activityList[index]);

        //更改本地渲染数据
        var activityList = this.data.activityList;
        var tagList = this.data.tagList;
        activityList.splice(index, 1);
        tagList.splice(index, 1);
        this.setData({
            activityList: activityList,
            tagList: tagList
        })
    },

    //管理员按钮对应跳转函数
    toadmin() {
        if (getApp().globalData.ifadmin) {
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

        //抓取收藏活动列表
        Factory.getActivityList(function (res) {
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
        });

        //抓取未审核投稿列表
        Factory.getUser().queryContributeActivity(
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
                    tougaoList: res,
                    year_t: yy,
                    month_t: mm,
                    day_t: dd
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
        var that = this;
        //从别的页面切换回来的时候刷新数据
        //抓取收藏活动列表
        Factory.getActivityList(function (res) {
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
        });

        //抓取未审核投稿列表
        Factory.getUser().queryContributeActivity(
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
                    tougaoList: res,
                    year_t: yy,
                    month_t: mm,
                    day_t: dd
                });
            }
        )
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