import axios from 'axios';
import store from '@/store';
import { ElMessage } from 'element-plus';


export function post(url, data){
    return new Promise((resolve, reject)=>{
        axios.post('http://114.115.179.52:8089/api'+url,data,{headers:{'Authorization': store.state.token}}).then(response=>{
            resolve(response.data)
        }).catch((error)=>{
                ElMessage({
                    message: "网络连接失败",
                    grouping: true,
                    type: 'error',
                });
            });
    });
}
export function get(url, param){
    return new Promise((resolve, reject)=>{
        axios.get('http://114.115.179.52:8089/api'+url,{params:param,headers:{"Authorization": store.state.token}}).then(response=>{
            resolve(response.data)
        }).catch((error)=>{
                ElMessage({
                    message: "网络连接失败",
                    grouping: true,
                    type: 'error',
                });
            });
    });
}