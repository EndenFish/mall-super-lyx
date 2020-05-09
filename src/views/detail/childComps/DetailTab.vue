<template>
        <nav-bar>
            <div slot="left"
                @click="backClick"
                class="detail-left">
                <img src="~/assets/img/common/back.svg" alt="">
            </div>
            <div slot="center" class="detail-center">
                <div class="detail-title" v-for="(item,index) in title" 
                    :key="index"
                    :class="{active: curryIndex === index}"
                    @click="detailTabClick(index)">{{item}}</div>
            </div>
        </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
    name: "DetailTab",
    components:{
        NavBar
    },
    data(){
        return {
            title:["商品","参数","评论","推荐"],
            curryIndex: 0
        }
    },
    methods:{
        backClick(){
            this.$router.back();
        },
        detailTabClick(index){
            this.curryIndex = index;
        }
    }
}
</script>
<style scoped>
.detail-left img{
    margin-top: 10px;
}
.detail-center{
    display: flex;
}

.detail-title{
    flex: 1
}

.active{
    color: var(--color-high-text);
}

</style>