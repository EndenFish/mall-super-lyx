// import Vue from 'vue'
import axios from 'axios'

export function request(config){
         // 创建axios实例
        const instance = axios.create({
            baseURL:"http://152.136.185.210:8000/api/n3",
            timeout:5000
        })
        // 请求拦截器
        instance.interceptors.request.use(config =>{
            //必须返回出去
            //1.比如config中的某些信息不符合服务器的要求，需要拦截器
            //2.比如每次发送网络请求的时候，希望在界面显示一个请求的图标
            //某些网络请求（登录token），必须携带一些特殊的信息， 比如跳转到注册
            return config
        },err =>{
            console.log(err)
        });
        //响应拦截
        instance.interceptors.response.use(res =>{
            return res.data
        },err=>{
            console.log(err)
        });
        //发送真正的网络请求
        return instance(config)
}