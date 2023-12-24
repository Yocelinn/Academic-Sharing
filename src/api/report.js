import { post, get } from "./api";

export function ReportWork(openalexID, comment){
  let param={};
  param.openalexID = openalexID;
  param.comment = comment;
  return get('/report/workReport', param);
}

export function AllPaperReport(){
  let param={};
  return get('/report/workDisplay', param);
}

export function HandelPaperReport(id, isAgree) {
  let param = {};
  param.id = id;
  param.isAgree = isAgree;
  return get('/report/workReportHandle', param);
}

export function GetPaperReportById(id) {
  let param = {};
  param.id = id;
  return get('/report/searchWorkById', param);
}

export function SearchPaperReport(key) {
  let param = {};
  param.substring = key;
  return get('/report/filterWork', param);
}

export function FilterPaperReport(status) {
  let param = {};
  param.status = status;
  return get('/report/getWorkBystatus', param);
}

export function AllCommentReport() {
  let param = {};
  return get('/report/displayComment', param);
}

export function HandleCommentReport(id, isAgree) {
  let param = {};
  param.id = id;
  param.isAgree = isAgree;
  return get('/report/commentReportHandle', param);
}

export function GetCommentReportByID(id) {
  let param = {};
  param.id = id;
  return get('/report/searchCommentById', param);
}

export function SearchCommentReport(key) {
  let param = {};
  param.substring = key;
  return get('/report/filterComment', param);
}

export function FilterCommentReport(status) {
  let param = {};
  param.status = status;
  return get('/report/getCommentBystatus', param);
}