// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env:"ticketeasy-2g3bsuqraafa1609"
}
)
const db =cloud.database();
const request = require('request')
const cheerio = require('cheerio')
var wechatidlist = []; //一个用于存放公众号id的列表
const seedURL_head = "https://gzh.sogou.com/weixin?query=";
const seedURL_mid = "&_sug_type_=&s_from=input&_sug_=n&type=2&page=";
const seedURL_tail="&ie=utf8"
const host = 'https://gzh.sogou.com';
const page=10;//网页共有十页

const requestPromise = (url) => {
    return new Promise((resolve, reject) => {
        request({
            url: url,
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
                'Cookie': 'SUID=B52204DD302EA00A5F637E2100048FFC; ssuid=1120797378; SUV=1606050306122954; IPLOC=CN4401; ppinf=5|1654697830|1655907430|dHJ1c3Q6MToxfGNsaWVudGlkOjQ6MjAxN3x1bmlxbmFtZTo0NTolRTYlOUMlQUMlRTUlODglOUQlRTUlQUQlOTAlRTUlOEQlODglRTclQkElQkZ8Y3J0OjEwOjE2NTQ2OTc4MzB8cmVmbmljazo0NTolRTYlOUMlQUMlRTUlODglOUQlRTUlQUQlOTAlRTUlOEQlODglRTclQkElQkZ8dXNlcmlkOjQ0Om85dDJsdU1VWUQ1eVJkSmQ3SHdBTWdmX2dXSzBAd2VpeGluLnNvaHUuY29tfA; pprdig=dgxHIGjRcH39TFdwn6XwvS-S4Co6kpXAO3LrbRwabe8KMESyyatOVD47zpj-fHGGlU8qr7ceEmwKzQj2iYc4HrbACe_zAq459DNMhFMR4B3NH3_qd5sTpbnQJgtdt7NXo4Hc5xGvfe9L6AO0ZPBNlGmoLFVfQYXRXy7h-wPKlmk; ppinfo=5b49fdb7ba; passport=5|1654697830|1655907430|dHJ1c3Q6MToxfGNsaWVudGlkOjQ6MjAxN3x1bmlxbmFtZTo0NTolRTYlOUMlQUMlRTUlODglOUQlRTUlQUQlOTAlRTUlOEQlODglRTclQkElQkZ8Y3J0OjEwOjE2NTQ2OTc4MzB8cmVmbmljazo0NTolRTYlOUMlQUMlRTUlODglOUQlRTUlQUQlOTAlRTUlOEQlODglRTclQkElQkZ8dXNlcmlkOjQ0Om85dDJsdU1VWUQ1eVJkSmQ3SHdBTWdmX2dXSzBAd2VpeGluLnNvaHUuY29tfA|c5aabdb8a8|dgxHIGjRcH39TFdwn6XwvS-S4Co6kpXAO3LrbRwabe8KMESyyatOVD47zpj-fHGGlU8qr7ceEmwKzQj2iYc4HrbACe_zAq459DNMhFMR4B3NH3_qd5sTpbnQJgtdt7NXo4Hc5xGvfe9L6AO0ZPBNlGmoLFVfQYXRXy7h-wPKlmk; sgid=22-37395953-AWKgr2bmUMANMTGxciaKDCvw; ABTEST=0|1654701138|v1; weixinIndexVisited=1; ariaDefaultTheme=null; SNUID=249BBC65B9BD5949929F0610B961CA8B; ppmdig=1654782822000000e858e41dfd89021962fdf8233ab408db; JSESSIONID=aaalPA3WYudy1eccfv6dy'
            }
        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var html = body;
                resolve(html);
            } else {
                reject(error);
            }
        })
    })

}

//推文链接的拼接请求
const getrequesturl=(url)=>{
    return new Promise((resolve, reject) =>{
        requestPromise(url).then(res=>{
            const $ = cheerio.load(res);
            $('ul[class="news-list"]').find('li').each((i,el) => {
                var datetext=$(el).find('span').text();
                var time_reg=/[0-9]{10}/;
                var passagetime_s=datetext.match(time_reg)[0];
                var passagetime_ms=passagetime_s*1000;
                var nowtime_ms=new Date().getTime();
                var timeval=nowtime_ms-passagetime_ms;
                if(timeval>0&&timeval<2626560000*3)
                {
                    var requesturl=getfullurl(host+$(el).find('a').attr('href'));
                    // activityname.push($('el').find('p').text());
                    // console.log(requesturl);
                    request({
                        url:requesturl,
                        method: 'GET',
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
                            'Cookie': 'SUID=B52204DD302EA00A5F637E2100048FFC; ssuid=1120797378; SUV=1606050306122954; IPLOC=CN4401; ppinf=5|1654697830|1655907430|dHJ1c3Q6MToxfGNsaWVudGlkOjQ6MjAxN3x1bmlxbmFtZTo0NTolRTYlOUMlQUMlRTUlODglOUQlRTUlQUQlOTAlRTUlOEQlODglRTclQkElQkZ8Y3J0OjEwOjE2NTQ2OTc4MzB8cmVmbmljazo0NTolRTYlOUMlQUMlRTUlODglOUQlRTUlQUQlOTAlRTUlOEQlODglRTclQkElQkZ8dXNlcmlkOjQ0Om85dDJsdU1VWUQ1eVJkSmQ3SHdBTWdmX2dXSzBAd2VpeGluLnNvaHUuY29tfA; pprdig=dgxHIGjRcH39TFdwn6XwvS-S4Co6kpXAO3LrbRwabe8KMESyyatOVD47zpj-fHGGlU8qr7ceEmwKzQj2iYc4HrbACe_zAq459DNMhFMR4B3NH3_qd5sTpbnQJgtdt7NXo4Hc5xGvfe9L6AO0ZPBNlGmoLFVfQYXRXy7h-wPKlmk; ppinfo=5b49fdb7ba; passport=5|1654697830|1655907430|dHJ1c3Q6MToxfGNsaWVudGlkOjQ6MjAxN3x1bmlxbmFtZTo0NTolRTYlOUMlQUMlRTUlODglOUQlRTUlQUQlOTAlRTUlOEQlODglRTclQkElQkZ8Y3J0OjEwOjE2NTQ2OTc4MzB8cmVmbmljazo0NTolRTYlOUMlQUMlRTUlODglOUQlRTUlQUQlOTAlRTUlOEQlODglRTclQkElQkZ8dXNlcmlkOjQ0Om85dDJsdU1VWUQ1eVJkSmQ3SHdBTWdmX2dXSzBAd2VpeGluLnNvaHUuY29tfA|c5aabdb8a8|dgxHIGjRcH39TFdwn6XwvS-S4Co6kpXAO3LrbRwabe8KMESyyatOVD47zpj-fHGGlU8qr7ceEmwKzQj2iYc4HrbACe_zAq459DNMhFMR4B3NH3_qd5sTpbnQJgtdt7NXo4Hc5xGvfe9L6AO0ZPBNlGmoLFVfQYXRXy7h-wPKlmk; sgid=22-37395953-AWKgr2bmUMANMTGxciaKDCvw; ABTEST=0|1654701138|v1; weixinIndexVisited=1; ariaDefaultTheme=null; SNUID=249BBC65B9BD5949929F0610B961CA8B; ppmdig=1654782822000000e858e41dfd89021962fdf8233ab408db; JSESSIONID=aaalPA3WYudy1eccfv6dy',
                            "Referer": "https://weixin.sogou.com/weixin"
                        }
                    }, function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            var html = body;
                            //console.log(html);
                            resolve(html);}else{
                                reject(error);
                            } 
                    })
                }
            })
        });
    })
}

//补全请求链接中的参数 &k= &h=
function getfullurl(url){
    var b= Math.floor(100*Math.random())+1,
    a=url.indexOf('url='),
    a=url.substring(a+b,a+b+1);
    url+='&k='+b+'&h='+a;
    return url;
}

//获取公众号推文链接,callback回调requestpromise函数，获取推文文本内容
async function getpassageurl(url,callback){
    return new Promise((resolve, reject) =>{
        getrequesturl(url).then(res=>{
            var reg = /= '(\S+?)';/g;
               var passageurl=" ";
               while(result=reg.exec(res)){
                   passageurl += result[1];
               }
               callback(passageurl).then(res=>{
                const $ = cheerio.load(res);
                const item=$('#js_article').text();
                const title =$('meta[property="og:title"]').attr('content');
                resolve([item,title,passageurl]);
               });
           })
    })  
}

//解析推文文本内容
function getpassagedetail(url){  
    return new Promise((resolve, reject) =>{
        getpassageurl(url,requestPromise).then(arr=>{
            //活动信息表
            var activity={
                'activity_id':'',
                'date':new Date(),
                'link':'',
                'scoreType_cx':'',
                'scoreType_dy':'',
                'scoreType_wt':'',
                'scoreType_all':'',
                'online':'',
                'offline':''
            };
            res=arr[0];//文本内容   
            title=arr[1];//标题
            link=arr[2];//文本链接
            var date,place,scoretype;
            var date1_reg=/[0-9]{1,2}月[0-9]{1,2}日/;//某月某日
            var date2_reg=/[0-9]{1,2}月[0-9]{1,2}号/;//某月某号
            var date3_reg=/[0-9]{1,2}月[0-9]{1,2}/;//某月某
            var time1_reg=/[0-9]{1,2}:[0-9]{2}/;//时间（英文冒号）
            var time2_reg=/[0-9]{1,2}：[0-9]{2}/;//时间（中文冒号）
            var place1_reg=/大学城/;//地点 大学城 线下
            var place2_reg=/五山/;//地点 五山 线下
            var place3_reg=/国际校区/;//地点 国际校区 线下
            var place4_reg=/会议/;//地点 腾讯会议 线上
            var scoretype1_reg=/创新分/;//票类型 创新分
            var scoretype2_reg=/德育分/;//票类型 德育分
            var scoretype3_reg=/文体分/;//票类型 文体分
            var scoretype4_reg=/讲座票/;//票类型 讲座票 无特别说明类型
            var scoretype5_reg=/活动票/;//票类型 活动票 无特别说明类型

            var month_reg=/([0-9]+)月/;//获取时期中的月份
            var day_reg=/([0-9]+)日/;//获取日期中的天数
            
            //判断获取的推文是符合要求
            if(isnull(res.match(scoretype1_reg))||isnull(res.match(scoretype2_reg))||isnull(res.match(scoretype3_reg))||isnull(res.match(scoretype4_reg))||isnull(res.match(scoretype5_reg))) {
                //日期信息
                if(isnull(res.match(date1_reg))){
                    date =res.match(date1_reg)[0];
                }
                else if (isnull(res.match(date2_reg))){
                    date =res.match(date2_reg)[0];
                }
                else if(isnull(res.match(date3_reg))){
                    date =res.match(date2_reg)[0]+'日';
                }
                else{
                    date = null;
                }
    
                //时间信息
                if(isnull(res.match(time1_reg))){
                    time = res.match(time1_reg)[0];
                }
                else if (isnull(res.match(time2_reg))){
                    time = res.match(time2_reg)[0];
                }
                else{
                    time =null;
                }
    
                //地点信息确定线上线下
                if(isnull(res.match(place4_reg))){
                    place='线上';
                }
                else{
                    place='线下';
                }
                
                //票类型信息
                if(isnull(res.match(scoretype1_reg))){
                    scoretype=res.match(scoretype1_reg)[0];
                }
                else if(isnull(res.match(scoretype2_reg))){
                    scoretype=res.match(scoretype2_reg)[0];
                }
                else if(isnull(res.match(scoretype3_reg))){
                    scoretype=res.match(scoretype3_reg)[0];
                }
                else if(isnull(res.match(scoretype4_reg))){
                    scoretype=res.match(scoretype4_reg)[0];
                }
                else{
                    scoretype=res.match(scoretype5_reg)[0];
                }
    
                //整理活动信息
                activity.activity_id=title;
    
                activity.date.setFullYear(2022);
                var month=month_reg.exec(date)[1];
                activity.date.setMonth(month-1);
                var day=day_reg.exec(date)[1];
                activity.date.setDate(day);
                activity.date.setHours(16);
                activity.date.setMinutes(0);
                activity.date.setSeconds(0);
                activity.date.setMilliseconds(0);
    
                activity.link=link;
                
                if(scoretype=='创新分'){
                    activity.scoreType_cx=true;
                }
                else{
                    activity.scoreType_cx=false;
                }
    
                if(scoretype=='德育分'){
                    activity.scoreType_dy=true;
                }
                else{
                    activity.scoreType_dy=false;
                }
    
                if(scoretype=='文体分'){
                    activity.scoreType_wt=true;
                }
                else{
                    activity.scoreType_wt=false;
                }
    
                activity.scoreType_all=true;
    
                if(place=='线上'){
                    activity.online=true;
                    activity.offline=false;
                }
                else{
                    activity.online=false;
                    activity.offline=true;
                }  
                resolve(activity);
            }    
        });    
    })
}

//判断活动列表添加数据库中
function addactivity(url){
        getpassagedetail(url).then(res=>{ 
            db.collection('activity').where({
                activity_id:res.activity_id
            }).get().then(response=>{
                if(response.data.length>0)
                {
                    db.collection('activity').doc(response.data[0]._id).update({
                        data:{
                            link:res.link
                        }
                    })
                }
                else{
                    db.collection('activity').add({
                        data:{
                            activity_id:res.activity_id,
                            date:res.date,
                            link:res.link,
                            offline:res.offline,
                            online:res.online,
                            scoreType_all:res.scoreType_all,
                            scoreType_cx:res.scoreType_cx,
                            scoreType_dy:res.scoreType_dy,
                            scoreType_wt:res.scoreType_wt
                        }
                    })
                }
            })
        })
    // getpassagedetail(url).then(res=>{
        // db.collection('activity').add({
        //     data:{
        //         activity_id:res.activity_id,
        //         date:res.date,
        //         link:res.link,
        //         offline:res.offline,
        //         online:res.online,
        //         scoreType_all:res.scoreType_all,
        //         scoreType_cx:res.scoreType_cx,
        //         scoreType_dy:res.scoreType_dy,
        //         scoreType_wt:res.scoreType_wt
        //     }
        // })
    // })
}

//判断正则提取结果是否为空
function isnull(text){
    if(text!=null){
        return true;
    }
    return false;
}

function sleep(ms) {
    return new Promise(resolve=>setTimeout(resolve, ms))
}

async function main() {
    await sleep(500);
    for(var i=0;i<wechatidlist.length;i++)
    {
        for(var j=1;j<=page;j++){
            addactivity(seedURL_head + wechatidlist[i] + seedURL_mid + j +seedURL_tail);//i为公众号列表号，j为相应网页的页号
             await sleep(100);
        }
    }
}

// 云函数入口函数
exports.main = async (event, context) => {

    //获取微信公众号id列表
    db.collection('source').get('wechat_id').then(res=>{
        const length=res.data.length;
        for(let i=0;i<length;i++){
        wechatidlist.push(res.data[i].wechat_id);
        }
    });

    main();
}