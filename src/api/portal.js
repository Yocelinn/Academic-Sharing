import { post, get } from "./api";
export function claimPortal(url,text){
    var param = {}
    param.openalexId = url
    param.text = text
    return get('/user/relateOpenalex',param)
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
