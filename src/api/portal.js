import { post, get } from "./api";
export function claimPortal(url){
    return get('/user/relateOpenalex/?openalexId='+url, {
        headers: {
            'Authorization': 'Bearer your_token_here'
        }
    });
}
export function getAuthorInfo(uid){
    return get('/user/getScholarInfo/?user_id='+uid);
}