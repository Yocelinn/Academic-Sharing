import { post, get } from "./api";

export function GetInstitutionInfo(institutionId){
  let param={};
  param.institutionId=institutionId;
  return get('/institution/getInstitutionHomePage', param);
}

export function GetInstitustionWorks(institutionId){
  let param={};
  param.institutionId=institutionId;
  return get('/institution/getInstitutionWorks', param);
}