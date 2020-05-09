<template>
    <swiper class="detail">
        <swiper-item v-for="(item,index) in detailTopImages" :key="index">
            <img :src="item" alt />
        </swiper-item>
    </swiper>
</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper"

export default {
    name: "DetialSwiper",
    props:{
        detailTopImages:{
            type: Array,
            default(){
                return []
            }
        }
    },
    components:{
        Swiper,
        SwiperItem
    }
}
</script>
<style scoped>
.detail{
    height:300px;
    overflow: hidden;
}

</style>