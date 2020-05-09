<template>
    <div class="goods">
        <goods-list-item v-for="(item,index) in goods" :key="index" :goods-item="item"></goods-list-item>
    </div>
</template>

<script>
import GoodsListItem from "./goodsListItem"

export default {
    name: "GoodsList",
    components:{
        GoodsListItem
    },
    props:{
        goods: {
            type: Array,
            default(){
                return []
            }
        }
    }
}
</script>
<style>
.goods {
    display: flex;
    /* 包裹 */
    flex-wrap: wrap;
    /* 均等分 */
    justify-content: space-around;
    padding:2px;
}
</style>