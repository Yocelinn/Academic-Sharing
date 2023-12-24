import { post, get } from "./api";

export function RelateOpenalex(openalexId){
  let param={};
  param.openalexId=openalexId;
  return get('/user/relateOpenalex', param);
}

export function AllScholarApproval(){
  let param={};
  return get('/user/approvalRelate', param);
}

export function HandelScholarApproval(userId, status){
  let param = {};
  param.userid = userId;
  param.isAgree = status;
  return get('/user/agreeRelate', param);
}

export function FilterScholarApproval(status){
  let param = {};
  param.status = status;
  return get('/user/filterApproval', param);
}

export function GetScholarApproval(id){
  let param = {};
  param.id = id;
  return get('/user/searchById', param);
}

export function SearchScholarApproval(key){
  let param = {};
  param.substring = key;
  return get('/user/searchApproval', param);
}

export function GetScholarInfoSelf(){
  let param = {};
  return get('/user/getScholarInfoSelf', param);
}

export function GetScholarInfo(id){
  let param = {};
  param.user_id = id;
  return get('/user/getScholarInfo', param);
}