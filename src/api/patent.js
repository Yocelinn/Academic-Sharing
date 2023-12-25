import { post, get } from "./api";
import store from "@/store";


export function GetCommentByWorkIdAndType(workId){
    let param={};
    param.workId=workId;
    param.type="patent";
    return get('/comment/getByWorkIdAndType', param);
}

export function PostComment(content, patentId){
    let data={};
    data.content=content.content;
    data.userId = store.state.userInfo.token;
    data.workId=patentId;
    data.type = 'patent';
    data.userName = store.state.userInfo.nickName;
    return post("/comment/create", data)
}

export function ReportCommentError(commentID, reason, description){
    let param={};
    param.commentID = commentID;
    param.reason = reason;
    param.description = description;
    return get('/report/ReportComment', param);
}

export function GetPatentById(patentId){
    let param={};
    param.patentid=patentId;
    let patentid = patentId;
    return get(`/patents/${patentid}`);
}

export function GetPatentRecommendById(patentTitle){
    let data={};
    data.title=patentTitle;
    console.log(data)
    return post('/patents/patent-recommendations', data);
}


export function PostCollect(thesisId, thesisName, author){
    let param={};
    param.thesisId = thesisId;
    param.thesisName = thesisName;
    param.author = author;
    return post('/user/collectThesis', param)
}

export function IsCollected(thesisId){
    let param={};
    param.thesisId = thesisId;
    return get('/user/checkcollectT', param)
}

export function ReportPaperError(openalexID, comment){
    let param={};
    param.openalexID = openalexID;
    param.comment = comment;
    return get('/report/workReport', param)
}