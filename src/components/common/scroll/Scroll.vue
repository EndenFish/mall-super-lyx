<template>
    <div class="wrapper" ref="wrapper">
        <div class=content>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import BScroll from "better-scroll"

export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        // default 在确定这个是对象或者是数组的时候写成函数
        // default(){
        //     return []
        // }
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data(){
        return {
            scroll: null
        }
    },
    // 组件已经加载完毕 之后才能获取到标签
    mounted(){
        this.scroll = new BScroll(this.$refs.wrapper, {
            click: true,
            // 监听滚动所到位置
            probeType: this.probeType,
            //  为3的时候 实时监听滚动的位置，包括之后惯性滚动也会监听
            //  0，1，不监听，  2监听，但是滚动之后惯性滚动就不监听
            // probeType: 3, 根据传值  来确定是否要实时监听 滚动高度
            // 上拉加载
            pullUpLoad: this.pullUpLoad
            // pullUpLoad: true
        })

        //  实时 监听滚动的位置
        this.scroll.on('scroll',(position)=>{
            this.$emit('scroll',position)
        })
        // 上拉加载更多   pullingUp 固定写这个
        this.scroll.on('pullingUp',()=>{
            this.$emit('pullingUp')
        })

        console.log(this.scroll);
        // scrollerHeight中的高表示  可以滚动的高度
        // refresh 可以重新计算  可滚动的高度，就不会出现滚动问题
        // this.scroll.refresh();
    },
    methods: {
        // 封装思想，将方法封装
        scrollTo(x,y,time){
            // 判断是否已经挂载
            this.scroll && this.scroll.scrollTo(x,y,time)
        },
        finish(){
            this.scroll.finishPullUp()
        }
    }
}
</script>
<style scoped>

</style>