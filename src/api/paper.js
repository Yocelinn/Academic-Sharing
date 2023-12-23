import { post, get } from "./api";


export function GetCommentByWorkIdAndType(workId){
    let param={};
    param.workId=workId;
    param.type='article';
    return get('/comment/getByWorkIdAndType', param);
}

export function PostComment(content, workId){
    let data={};
    data.content=content;
    data.workId=workId;
    data.type = 'article';
    data.userId = 2;
    return post("/comment/create", data)
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