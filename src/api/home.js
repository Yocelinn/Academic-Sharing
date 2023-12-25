import { post, get } from './api' ;

export function GetAllFields(){
    let param={};
    return get("/homepage/getAllFields", param);
}