class ActivityInfo {
    //构造函数
    constructor(attribute) {
        this.date = attribute.date;
        this.link = attribute.link;
        this.scoreType_cx = attribute.scoreType_cx;
        this.scoreType_dy = attribute.scoreType_dy;
        this.scoreType_wt = attribute.scoreType_wt;
        this.scoreType_all = attribute.scoreType_all;
        this.online = attribute.online;
        this.offline = attribute.offline;
        this.userID=attribute.userID;
    }

    //修改该活动信息类的属性
    modifyInfo(attribute) {
        this.date = attribute.date;
        this.link = attribute.link;
        this.scoreType_cx = attribute.scoreType_cx;
        this.scoreType_dy = attribute.scoreType_dy;
        this.scoreType_wt = attribute.scoreType_wt;
        this.scoreType_all = attribute.scoreType_all;
        this.online = attribute.online;
        this.offline = attribute.offline;
    }
}

export {
    ActivityInfo
};