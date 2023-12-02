import { post, get } from "./api";


export function GetCommentByWorkId(workId){
    return get('/comment/getByWorkId/?workId='+workId);
}

export function DisplayWorkHomePage(workId){
    return get('/works/displayWorkHomePage/?workId='+workId)
}

export function GetAuthorIdByWorkId(workId){
    return get('/author/getAuthorIdByWorkId/?workId='+workId)
}

export function GetReferenceById(workId){
    return get('/works/getReferenceById/?workId='+workId)
}