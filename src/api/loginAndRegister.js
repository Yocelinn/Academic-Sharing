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
    return post("/user/logoff",data);
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

export function AdminLogin(userName, password){
    let param={};
    param.userName=userName;
    param.password=password;
    return get("/report/adminLogin", param);
}

export function GetScholarId(){
    let param={};
    return get("/user/getScholarIdSelf",param)
}
export function ForgotPassword(email, newPw, code){
    let param={};
    param.email=email;
    param.newPw=newPw;
    param.code=code;
    return get("/user/forgotPassword", param);
}

export function SendForgotEmail(email){
    let param={};
    param.email=email;
    return get("/user/sendForgotEmail", param);
}