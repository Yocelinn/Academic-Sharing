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

export function GetPatentById(patentId){
    let param={};
    param.patentid=patentId;
    let patentid = patentId;
    return get(`/patents/${patentid}`, param);
}

export function GetPatentRecommendById(patentTitle){
    console.log("%%%%%%%%%5")
    console.log(patentTitle)
    let data={};
    data.title=patentTitle;
    return get('/patents/patent-recommendations', data);
}