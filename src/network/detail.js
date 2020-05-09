import {request} from "./request";

export function getDetialdata(id){
    return request({
        url: '/detail',
        params:{
            iid: id
        }
    })
}

// 面向对象的封装方法
// 将返回的数据进行整合
export class GoodsInfo {
    // 添加构造函数
    constructor(itemInfo, columns, services){
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.newPrice = itemInfo.newPrice
        this.oldPrice = itemInfo.oldPrice
        this.discount = itemInfo.discountDesc
        this.columns = columns
        this,services = services
        this.relPrice = itemInfo.lowNowPrice
    }
}