// pages/admin_gzhSource/admin_gzhSource.js
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
        gzhList: new Array(),
        addwechatid:'',
        openid: Factory.getAdmin().adminID
    },

    //添加公众号
    addgzh(){
        var that=this;
        Factory.getAdmin().addSource(
            this.data.addwechatid,
            function(res){
                Factory.getAdmin().querySource(
                    function(res){
                        console.log(res.data);
                        that.setData({
                            gzhList: res.data,
                        })
                    }
                )
            }
         );
        //刷新列表
       
        
    },

    //同步输入信息到data
    onChange(event) {
        this.setData({
            addwechatid: event.detail,
        });
        console.log(this.data.addwechatid)
      },

    //删除对应公众号
    deletegzh(e){
        var that=this;
        Factory.getAdmin().removeSource(
            e.target.dataset.wechatid,
            function(res){
                Factory.getAdmin().querySource(
                    function(res){
                        console.log(res.data);
                        that.setData({
                            gzhList: res.data,
                        })
                    }
                )
            }
            );
        //刷新列表
        
        
    },

    //点击跳转按钮跳转到指定界面
    toXiugai(){
        wx.redirectTo({
          url: '/pages/admin_activityMod/admin_activityMod',
        })
    },
    toAudit(){
        wx.redirectTo({
          url: '/pages/admin_audit/admin_audit',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

        var that=this;

        Factory.getAdmin().querySource(
            function(res){
                console.log(res.data);
                that.setData({
                    gzhList: res.data,
                })
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

    }
})