// pages/user_main/user_main.js
Page({
    //点击改变按钮状态
    wt_change() {
        if (!this.data.lock) {
            if (this.data.type_wt === 'default') {
                this.setData({
                    type_wt: 'primary'
                })
            } else {
                this.setData({
                    type_wt: 'default',
                })
            }
        }
    },

    cx_change() {
        if (!this.data.lock) {
            if (this.data.type_cx === 'default') {
                this.setData({
                    type_cx: 'primary'
                })
            } else {
                this.setData({
                    type_cx: 'default',
                })
            }
        }
    },

    dy_change() {
        if (!this.data.lock) {
            if (this.data.type_dy === 'default') {
                this.setData({
                    type_dy: 'primary'
                })
            } else {
                this.setData({
                    type_dy: 'default',
                })
            }
        }
    },

    sy_change() {
        if (this.data.type_sy === 'default') {
            this.setData({
                type_sy: 'primary',
                type_wt: 'default',
                type_cx: 'default',
                type_dy: 'default',
                lock: true,
            })
        } else {
            this.setData({
                type_sy: 'default',
                lock: false,
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
        if (this.data.type_overdue === '未过期') {
            this.setData({
                type_overdue: '过期'
            })
        } else {
            this.setData({
                type_overdue: '未过期',
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
        type_sy: 'default',
        type_online: 'default',
        type_offline: 'default',
        type_overdue: '未过期',
        lock: false,
        start_date: '',
        end_date: '',
        activityList: new Array()
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