import {debounce} from "common/utils"

export const imge = {
    mounted(){
        const refresh = debounce(this.$refs.scroll.scroll.refresh,50)
        // 监听item中图片加载完成
        // 没有bus  在main中添加原型
        this.$bus.$on('ItemImageLoad',()=>{
        
        // 重新计算  可滚动的高度，就不会出现滚动问题
        // this.$refs.scroll.scroll.refresh();
        refresh();
        console.log('---');
        })
        console.log("混入")
    }
}