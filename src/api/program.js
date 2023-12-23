import { post, get } from "./api";


export function GetFunderByFunderId(funderID){
    let param={};
    param.funderID=funderID;
    return get('/funder/funderMainPage', param);
}

export function GetFunderByWorkId(workId){
    let param={};
    param.workId=workId;
    return get('/funder/displayFunder', param)
}