// pages/user_info/user_info.js
import{
    Factory
}from "../../class/Factory.js";

Page({

    
    /**
     * 页面的初始数据
     */
    data: {
       
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.login({
            success: function(res){
                if(res.code){
                    wx.request({
                      url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx7ca64d1e620b29a5&secret=8c37b827aa166f61b346c5bea38acd03&js_code='+res.code+'&grant_type=authorization_code',
                      success: function(res1){
                          
                      }
                    })
                }
            }
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

    },

    getPhoneNumber (e) {
        console.log(e.detail.code)
      }

})