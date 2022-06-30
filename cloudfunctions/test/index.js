// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db=cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
   db.collection('activity').doc('b69f67c062bd916e09556505129c4b3d').set({
      data:{
        activity_id:'比赛培训丨2022华南理工大学大学生职业规划大赛初赛培训会来啦',
        date:'0',
        link:'1',
        offline:true,
        online:false,
        scoreType_all:true,
        scoreType_cx:true,
        scoreType_dy:true,
        scoreType_wt:false
      }
   })
}