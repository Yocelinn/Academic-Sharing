import { post, get } from './api.js';
export function GetHistory(){
    let param={}
    return get("/record/display",param)
}

export function DeleteHistory(id){
    let param={}
    param.id=id
    return get("/record/delete",param)
}

export function SearchHistory(keyword){
    let param={}
    param.keyword=keyword
    return get("/record/filter",param)
}

export function GetData(){
    let param={}
    return get("/record/getConcept",param)
}