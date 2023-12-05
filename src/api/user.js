import { post, get } from "./api";

export function Login(email, password){
    let data={};
    data.email=email;
    data.password=password;
    return post("/user/login",data);
}

export function Register(nick_name, email, password){
    return get("/user/register/?nick_name="+nick_name+"&email"+"&email="+email+"&password="+password);
}

export function UpdateUserInformation(nick_name, sex, person_description){
    let data={};
    data.nick_name=nick_name;
    data.sex=sex;
    data.person_description=person_description;
    return post("/user/update",data);
}

export function ChangePasswd(oldPw, newPw){
    let data={};
    data.oldPw=oldPw;
    data.newPw=newPw;
    return post("/user/changepw",data);
}

export function GetUserInformation(){
    return get("/user/getinform");
}