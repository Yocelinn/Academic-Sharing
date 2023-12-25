import store from "@/store";
import { post, get } from "./api";


export function GetCommentByWorkIdAndType(workId){
    let param={};
    param.workId=workId;
    param.type='article';
    return get('/comment/getByWorkIdAndType', param);
}

export function ReportCommentError(commentID, reason, description){
    let param={};
    param.commentID = commentID;
    param.reason = reason;
    param.description = description;
    return get('/report/ReportComment', param);
}

export function PostComment(content, workId){
    let data={};
    data.content=content.content;
    data.userId = store.state.userInfo.token;
    data.workId=workId;
    data.type = 'article';
    data.userName = store.state.userInfo.nickName;
    return post("/comment/create", data)
}

export function DisplayWorkHomePage(workId){
    let param={};
    param.workId=workId;
    return get('/works/displayWorkHomePage', param)
}

// export function GetAuthorIdByWorkId(workId){
//     let param={};
//     param.workId=workId;
//     return get('/author/getAuthorIdByWorkId', param)
// }

export function GetReferenceById(workId){
    let param={};
    param.workId=workId;
    return get('/works/getReferenceById', param)
}

export function GetFundersById(workID){
    let param={};
    param.workID=workID;
    return get('/funder/displayFunder', param)
}

export function GetInstituByName(instName){
    let param={};
    param.institutionName=instName;
    return get('/institution/getInstitionIdFromName', param)
}

export function GetAuthorByName(workName, authorName){
    let param={};
    param.workName = workName;
    param.authorName = authorName;
    return get('/author/getAuthorId', param)
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