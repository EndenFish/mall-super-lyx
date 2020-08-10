<template>
    <div v-if="Object.keys(GoodsInfo).length !== 0">
        <div class="title">{{GoodsInfo.title}}</div>
        <div class="price">
            <span v-if="GoodsInfo.newPrice">{{GoodsInfo.newPrice}}</span>
            <span class="oldPrice" v-if="GoodsInfo.oldPrice">{{GoodsInfo.oldPrice}}</span>
            <span v-if="GoodsInfo.discount">{{GoodsInfo.discount}}</span>
        </div>
        <div class="columns">
            <span>{{GoodsInfo.columns[0]}}</span>
            <span>{{GoodsInfo.columns[1]}}</span>
            <span>{{GoodsInfo.columns[2]}}</span>
        </div>
    </div>
</template>

<script>

export default {
    name: "DetailInfo",
    props:{
        GoodsInfo:{
            type: Object,
            default(){
                return {}
            }
        }
    }
}
</script>
<style scoped>
    .title{
        padding:5px;
        font-size: 14px;
        width: 80%;
        overflow:hidden;
        text-overflow:ellipsis;
        -o-text-overflow:ellipsis;
        -webkit-text-overflow:ellipsis;
        -moz-text-overflow:ellipsis;
        white-space:nowrap;
    }

    .price{
        display:flex;
    }

    .price span{
        flex: 1;
        text-align: center;
    }

    .columns{
        display:flex;
    }

    .columns span{
        flex:1;
        text-align: center;
    }
</style>