import { post, get } from "./api";

export function Login(email, password){
    var data={"page":"1"};
    return post("/search/articles",data);
}
