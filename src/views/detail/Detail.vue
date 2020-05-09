<template>
    <div>
        <detail-tab></detail-tab>
        <detail-swiper
        :detailTopImages = "detailTopImages"/>
        <detail-info :GoodsInfo = "GoodsInfo"></detail-info>
    </div>
</template>

<script>
import DetailTab from "./childComps/DetailTab"
import DetailSwiper from "./childComps/DetailSwiper"
import DetailInfo from "./childComps/DetailInfo"

import {getDetialdata,GoodsInfo} from "network/detail"

export default {
    name: "Detail",
    components:{
        DetailTab,
        DetailSwiper,
        DetailInfo
    },
    data(){
        return {
            id: null,
            detailTopImages: [],
            GoodsInfo: {}
        }
    },
    // 利用周期函数来获取到数据
    created(){
        console.log(this.$route.params.id);
        this.id = this.$route.params.id;

        getDetialdata(this.id).then(res=>{
            const data = res.result;
            this.detailTopImages = data.itemInfo.topImages;
            console.log(data)
            // 获取商品信息
            this.GoodsInfo =new GoodsInfo(data.itemInfo,data.columns,data.shopInfo.services)
            console.log(this.GoodsInfo)
        });
    },
   
}
</script>
<style scoped>
    
</style>