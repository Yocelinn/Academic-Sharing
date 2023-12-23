import axios from 'axios';
import store from '@/store';
import { ElNotification } from 'element-plus';


export function post(url, data){
    return new Promise((resolve, reject)=>{
        axios.post('http://114.115.179.52:8089/api'+url,data,{headers:{'Authorization': store.state.userInfo.token}}).then(response=>{
            resolve(response.data)
        }).catch((error)=>{
                ElNotification({
                    message: "网络连接失败",
                    type: 'error',
                    showClose: true,
                    position: 'top-right',
                    duration: 2000,
                });
            });
    });
}
export function get(url, param){
    return new Promise((resolve, reject)=>{
        axios.get('http://114.115.179.52:8089/api'+url,{params:param,headers:{"Authorization": store.state.userInfo.token}}).then(response=>{
            resolve(response.data)
        }).catch((error)=>{
                ElNotification({
                    message: "网络连接失败",
                    type: 'error',
                    showClose: true,
                    position: 'top-right',
                    duration: 2000,
                });
            });
    });
}