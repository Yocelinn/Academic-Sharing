import { post, get } from './api.js';


export function WorksTypeCounts(){
    let param={};
    return get("/works/type-counts", param);
}

export function WorksFilterOptions(type){
    let param={};
    param.type=type;
    return get("/works/filter-options", param);
}

export function WorksSearch(){
    let param={};
    return get("/works/search", param);
}

export function IdToPatent(patentid){
    let param={};
    return get("/patents/"+patentid, param);
}

export function PatentRecommendations(title){
    let data={};
    data.title=title;
    return post("/patents/patent-recommendations", data);
}