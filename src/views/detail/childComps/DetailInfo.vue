<template>
    <div v-if="Object.keys(GoodsInfo).length !== 0">
        <div class="title">{{GoodsInfo.title}}</div>
        <div>
            <span v-if="GoodsInfo.newPrice">{{GoodsInfo.newPrice}}</span>
            <span v-if="GoodsInfo.oldPrice">{{GoodsInfo.oldPrice}}</span>
            <span v-if="GoodsInfo.discount">{{GoodsInfo.discount}}</span>
        </div>
        <div>
            <span>{{}}</span>
            <span>{{}}</span>
            <span>{{}}</span>
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
<style>

</style>