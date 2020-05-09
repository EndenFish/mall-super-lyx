<template>
    <div class="backup">
        <img src="~assets/img/common/top.png" alt="">
    </div>
</template>

<script>
export default {
    name: "BackUp"
}
// 如何监听该组件的点击。  home.vue中  
// 在该组件中  @click.native 就可以监听组件的点击
</script>
<style scoped>
    .backup{
        position:fixed;
        right: 8px;
        bottom: 52px;
    }
    .backup img{
        width:43px;
        height:43px;
    }
</style>