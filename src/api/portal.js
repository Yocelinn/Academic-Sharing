<<<<<<< HEAD
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
=======
import { post, get} from "./api";

// 门户都在开发中，晚点写，需要的同学发现发布了拍拍我
>>>>>>> dev
