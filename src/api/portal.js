import { post, get } from "./api";
export function claimPortal(url){
    return get('/user/relateOpenalex/?openalexId='+url);
}
export function getAuthorInfo(uid){
    return get('/user/getScholarInfo/?user_id='+uid);
}
