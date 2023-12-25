import { post, get } from "./api";
export function claimPortal(url){
    return get('/user/relateOpenalex/?openalexId='+url);
}
export function getAuthorInfo(uid){
    console.log(uid)
    var param = {};
    param.openalexId = uid;
    param.text = uid
    return get('/user/getInfoByOpenID',param);
}
export function searchPortal(userName,paperName){
    var param = {};
    param.userName = userName
    param.paperName = paperName
    return get('/user/getauthorbypaper',param);
}
