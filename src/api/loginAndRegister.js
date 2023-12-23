import { post, get} from "./api";

export function SendVerifyCode(email){
    let param={};
    param.email=email;
    return get("/user/sendVerifyCode",param);
}

export function Register(nick_name, email, password, captcha){
    let param={};
    param.nick_name=nick_name;
    param.email=email;
    param.password=password;
    param.captcha=captcha;
    return get("/user/register", param);
}

export function Login(email, password){
    let data={};
    data.email=email;
    data.password=password;
    return post("/user/login",data);
}

export function Logoff(){
    let data={};
    return post("/user/collectThesis",data);
}

export function GetUserInformation(){
    let param={};
    return get("/user/getinform",param);
}

export function UpdateUserInformation(nick_name, person_description, sex){
    let data={};
    data.nick_name=nick_name;
    data.person_description=person_description;
    data.sex=sex;
    return post("/user/update",data);
}

export function ChangePasswd(oldPw, newPw){
    let data={};
    data.oldPw=oldPw;
    data.newPw=newPw;
    return post("/user/changepw",data);
}

export function GetScholarInfoById(user_id){
    let param={};
    param.user_id=user_id;
    return get("/user/getScholarInfo",param);
}

export function GetScholarInfoBySelf(){
    let param={};
    return get("/user/getScholarInfoSelf",param);
}