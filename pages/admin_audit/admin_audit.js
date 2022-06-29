import { Factory } from "../../class/Factory";


// pages/admin_audit/admin_audit.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tougaoList: new Array(),
        year: new Array(),
        month: new Array(),
        day: new Array(),
    },

    pass(e){
        var that =this;
        console.log(e.target.dataset);
        Factory.getAdmin().auditActivity(
            e.target.dataset.item,true,
            function(res){
            Factory.getAuditList(
                function(res){
                    that.setData({
                        tougaoList: res,
                    });
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
                        year: yy,
                        month: mm,
                        day: dd
                    });
                }
            )}
            );
    },

    turndown(e){
        var that=this;
        Factory.getAdmin().auditActivity(
            e.target.dataset.item,false,
            function(res){
                Factory.getAuditList(
                    function(res){
                        that.setData({
                            tougaoList: res,
                        });
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
                            year: yy,
                            month: mm,
                            day: dd
                        });
                    }
                )
            });
    },

    toXiugai(){
        wx.redirectTo({
          url: '/pages/admin_activityMod/admin_activityMod',
        })
    },

    toGzh(){
        wx.redirectTo({
          url: '/pages/admin_gzhSource/admin_gzhSource',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        var that= this;

        Factory.getAuditList(
            function(res){
                that.setData({
                    tougaoList: res,
                });
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

    }
})