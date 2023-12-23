import { post, get } from "./api";


export function GetCommentByWorkIdAndType(workId){
    let param={};
    param.workId=workId;
    param.type="patent";
    return get('/comment/getByWorkIdAndType', param);
}

export function PostComment(content, workId){
    let data={};
    data.content=content;
    data.workId=workId;
    data.type = 'patent';
    return post("/comment/create", data)
}