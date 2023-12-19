import { post, get } from "./api";


export function GetCommentByWorkId(workId){
    let param={};
    param.workId=workId;
    return get('/comment/getByWorkId', param);
}

export function DisplayWorkHomePage(workId){
    let param={};
    param.workId=workId;
    return get('/works/displayWorkHomePage', param)
}

export function GetAuthorIdByWorkId(workId){
    let param={};
    param.workId=workId;
    return get('/author/getAuthorIdByWorkId', param)
}

export function GetReferenceById(workId){
    let param={};
    param.workId=workId;
    return get('/works/getReferenceById', param)
}