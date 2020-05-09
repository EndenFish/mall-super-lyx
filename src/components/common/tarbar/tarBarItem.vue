<template>
    <div class="tab-bar-item" @click="itemClick">
        <!-- <slot v-if="!isActive" name="item-icon"></slot>
        <slot v-else name="item-icon-active"></slot>
        <div :class="{active: isActive}">
            <slot name="item-text"></slot>
        </div> -->
        <div v-if="!isActive">
            <slot  name="item-icon"></slot>
        </div>
        <div v-else>
            <slot name="item-icon-active"></slot>
        </div>
        <div :style="activeStyle">
            <slot name="item-text"></slot>
        </div>
    </div>
</template>

<script>

export default {
    name:'TarBarItem',
    props:{
        path: String,
        //颜色改变
        activeColor:{
            type: String,
            default: 'red'
        }
    },
    data(){
        return {
            // isActive: true
        }
    },
    computed:{
        isActive(){
            // /home -> item1(/home) = ture
            // /home -> item1(/category) = false
            // /home -> item1(/cart) = false
            // /home -> item1(/profile) = false
            return this.$route.path.indexOf(this.path) !== -1
        },
        activeStyle(){
            return this.isActive ? {color:this.activeColor} : {}
        }
    },
    methods:{
        itemClick(){
            this.$router.replace(this.path)
            console.log(this.path)
        }
    }
}
</script>
<style>
    .tab-bar-item{
      flex: 1;
      text-align: center;
      height:49px;
    }
    .tab-bar-item img{
      width: 24px;
      height:24px;
      margin-top: 3px;
      vertical-align: middle;
    }
    /* 分装的源码  所有东西都是动态的 ->  activeColor */
    /* .active{
        color: red;
    } */
</style>