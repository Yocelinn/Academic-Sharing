import { post, get } from './api.js';

export function GetAuthorsByAuthor(authorId){
  let param={};
  param.authorName=authorId;
  return get('/author/getAuthorsByAuthor', param);
}