import axios from 'axios';
import store from '@/store';


export function post(url, data){
    return new Promise((resolve, reject)=>{
        axios.post('http://114.115.179.52'+url,data,{headers:{'Authorization': ''}}).then(response=>
            {resolve(response.data)}).catch((error)=>{
                
            });
    });
}

export function get(url){
    return new Promise((resolve, reject)=>{
        axios.get('http://114.115.179.52'+url,{headers:{"Authorization": ''}}).then(response=>
            {resolve(response.data)}).catch((error)=>{
                
            });
    });
}