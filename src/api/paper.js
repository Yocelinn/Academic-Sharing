import store from "@/store";
import { post, get } from "./api";


export function GetCommentByWorkIdAndType(workId){
    let param={};
    param.workId=workId;
    param.type='article';
    return get('/comment/getByWorkIdAndType', param);
}

export function PostComment(content, workId){
    let data={};
    data.content=content.content;
    data.userId = store.state.userInfo.token;
    data.workId=workId;
    data.type = 'article';
    data.userName = store.state.userInfo.nickName;
    console.log( data);
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