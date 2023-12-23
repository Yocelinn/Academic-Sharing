import { post, get} from "./api";

export function CollectThesis(thesisId, thesisName){
    let data={};
    data.thesisId=thesisId;
    data.thesisName=thesisName;
    return post("/user/collectThesis", data)
}

export function DeleteThesis(thesisId, thesisName){
    let data={};
    data.thesisId=thesisId;
    data.thesisName=thesisName;
    return post("/user/deleteThesis", data)
}

export function CollectPatent(patentId, patentName){
    let data={};
    data.patentId=patentId;
    data.patentName=patentName;
    return post("/user/collectPatent", data)
}

export function DeletePatent(patentId, patentName){
    let data={};
    data.patentId=patentId;
    data.patentName=patentName;
    return post("/user/deletePatent", data)
}

export function CheckcollectT(thesisId){
    let param={};
    param.thesisId=thesisId;
    return get("/user/checkcollectT", param)
}

export function CheckcollectP(rePatentId){
    let param={};
    param.rePatentId=rePatentId;
    return get("/user/checkcollectP", param)
}

export function SelectCT(selectTName, mod){
    let param={};
    param.selectTName=selectTName;
    param.mod=mod;
    return get("/user/selectCT", param)
}

export function SelectCP(selectPName, mod){
    let param={};
    param.selectPName=selectPName;
    param.mod=mod;
    return get("/user/selectCP", param)
}

export function GetPapers(){
    let param={};
    return get("/user/getCThesis",param)
}
