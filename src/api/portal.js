import { post, get } from "./api";
export function claimPortal(url){
    return get('/user/relateOpenalex/?openalexId='+url);
}
export function getAuthorInfo(uid){
    return get('/user/getScholarInfo/?user_id='+uid);
}
export function searchPortal(userName,paperName){
    var param = {};
    param.userName = userName
    param.paperName = paperName
    return get('/user/getauthorbypaper',param);
}
