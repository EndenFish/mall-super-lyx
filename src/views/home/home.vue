<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="left"></div>
      <div slot="center">购物街</div>
    </nav-bar>
    <!-- <home-swiper :banners="banners" />
    <home-views :recommends="recommends"></home-views>
    <feature-views></feature-views>
    <tab-controll
    @tabClick="tabClick"
     class="tab-controll"
    :titles="['流行','精选','新款']"></tab-controll>
    <goods-list :goods="goods['pop'].list"></goods-list>
    <goods-list :goods="goods[currentType].list"></goods-list> -->

    <!-- 组件里面用的驼峰，（:probe-type="3"）这里用-      确定类型需要添加:   这样就不会是传字符串过去了。 -->
    <!-- 上拉加载更多@pullingUp = "loadmore" -->
    <tab-controll
        ref="offsetTopFixed"
        @tabClick="tabClick"
        class="tab-controll"
        :titles="['流行','精选','新款']"
        v-show="isTabFixed"
        ></tab-controll>
    <Scroll class="content" 
        ref="scroll" :probe-type="3"
        :pull-up-load="true"
        @scroll = "contentScroll"
        @pullingUp = "loadmore"
        >
        <home-swiper :banners="banners" @swipeImageLoad="swipeImageLoad"/>
        <home-views :recommends="recommends"></home-views>
        <feature-views></feature-views>
        <!-- :class="{fixed: isTabFixed}" -->
        <tab-controll
        ref="offsetTop"
        @tabClick="tabClick"
        :titles="['流行','精选','新款']"
        ></tab-controll>
        <!-- <goods-list :goods="goods['pop'].list"></goods-list> -->
        <goods-list :goods="goods[currentType].list"></goods-list>
    </Scroll>
    <!-- 监听整个组件需要添加 .native 修饰符 -->
    <back-up v-show="isShow" @click.native = "backClick"></back-up>
    <!-- ul>i{列表$}*80 -->
    <!-- <ul>
      <li>列表1</li>
      <li>列表2</li>
      <li>列表3</li>
      <li>列表4</li>
      <li>列表5</li>
      <li>列表6</li>
      <li>列表7</li>
      <li>列表8</li>
      <li>列表9</li>
      <li>列表10</li>
      <li>列表11</li>
      <li>列表12</li>
      <li>列表13</li>
      <li>列表14</li>
      <li>列表15</li>
      <li>列表16</li>
      <li>列表17</li>
      <li>列表18</li>
      <li>列表19</li>
      <li>列表20</li>
      <li>列表21</li>
      <li>列表22</li>
      <li>列表23</li>
      <li>列表24</li>
      <li>列表25</li>
      <li>列表26</li>
      <li>列表27</li>
      <li>列表28</li>
      <li>列表29</li>
      <li>列表30</li>
      <li>列表31</li>
      <li>列表32</li>
      <li>列表33</li>
      <li>列表34</li>
      <li>列表35</li>
      <li>列表36</li>
      <li>列表37</li>
      <li>列表38</li>
      <li>列表39</li>
      <li>列表40</li>
      <li>列表41</li>
      <li>列表42</li>
      <li>列表43</li>
      <li>列表44</li>
      <li>列表45</li>
      <li>列表46</li>
      <li>列表47</li>
      <li>列表48</li>
      <li>列表49</li>
      <li>列表50</li>
      <li>列表51</li>
      <li>列表52</li>
      <li>列表53</li>
      <li>列表54</li>
      <li>列表55</li>
      <li>列表56</li>
      <li>列表57</li>
      <li>列表58</li>
      <li>列表59</li>
      <li>列表60</li>
      <li>列表61</li>
      <li>列表62</li>
      <li>列表63</li>
      <li>列表64</li>
      <li>列表65</li>
      <li>列表66</li>
      <li>列表67</li>
      <li>列表68</li>
      <li>列表69</li>
      <li>列表70</li>
      <li>列表71</li>
      <li>列表72</li>
      <li>列表73</li>
      <li>列表74</li>
      <li>列表75</li>
      <li>列表76</li>
      <li>列表77</li>
      <li>列表78</li>
      <li>列表79</li>
      <li>列表80</li>
      <li>列表81</li>
      <li>列表82</li>
      <li>列表83</li>
      <li>列表84</li>
      <li>列表85</li>
      <li>列表86</li>
      <li>列表87</li>
      <li>列表88</li>
      <li>列表89</li>
      <li>列表90</li>
    </ul> -->
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControll from "components/content/tabControll/TabControll";
import GoodsList from "components/content/goods/goodsList";
import Scroll from "components/common/scroll/Scroll"
import BackUp from "components/content/backUp/BackUp"

import HomeSwiper from "./childComps/HomeSwiper";
import HomeViews from "./childComps/HomeViews";
import FeatureViews from "./childComps/FeatureViews";

import { getHomeMultidata, getHomeGoodsdata } from "network/home";
import {debounce} from "common/utils"
import {imge} from "common/mixin"

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeViews,
    FeatureViews,
    TabControll,
    GoodsList,
    Scroll,
    BackUp
  },
  data() {
    return {
      //保存数据不被销毁
      result: null,
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: 'pop',
      isShow: false,
      // 获取到tab的offsetTop
      tabOffsetTop: 0,
      isTabFixed: false,
      // 保存用户 在home页面滚动的位置
      saveY: 0,
      //   titles: []
    };
  },
  //利用周期函数来获取到数据
  created() {
    //1.请求多个数据
    getHomeMultidata().then(res => {
      //   console.log(res);
      this.result = res;
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
      //   this.titles = res.data.titles.list;
    });
    //初始请求商品数据
    this.getHomeGoodsdata('pop')
    this.getHomeGoodsdata('new')
    this.getHomeGoodsdata('sell')
    
  },
  mixins: [imge],
  mounted(){
    // const refresh = debounce(this.$refs.scroll.scroll.refresh,50)
    // // 监听item中图片加载完成
    // // 没有bus  在main中添加原型
    // this.$bus.$on('ItemImageLoad',()=>{
      
    //   // 重新计算  可滚动的高度，就不会出现滚动问题
    //   // this.$refs.scroll.scroll.refresh();
    //   refresh();
    //   console.log('---');
    // })
    
    // 2.获取taboffsetTop
    // 这里直接是获取不到组件的offsetTop
    // console.log(this.$refs.offsetTop.offsetTop);
    // 所有组件都有一个属性 $el ： 用于获取组件中的元素
    // 此时可能图片还没有加载完，所以获取到的 导读是不正确的。
    // console.log(this.$refs.offsetTop.$el.offsetTop);
  },
  //商品部分 可以用计算属性 goods[currentType].list
  computed:{

  },
  // 回到 home页面时，回到用户访问的位置,保持原来的状态
  // 活跃
  actived(){
    this.$refs.scroll.scroll.scrollTo(0,this.saveY,0);
    // 重新进入的时候,最好刷新一下,beeter-scroll会有影响。 图片加载
    this.$refs.scroll.refresh();
  },
  // 记住用户 离开时的 位置
  // 离开
  deactived(){
      this.saveY = this.$refs.scroll.scroll.y;
  },
  methods: {
    getHomeGoodsdata(type) {
      const page = this.goods[type].page+1;
      getHomeGoodsdata(type,page).then(res => {
        //...res 语法,依次将res数组中的数据解析出来，然后push进去
        //   for(n in res.data.list){
        //       this.goods[type].list.push(n)
        //   }
        // console.log(res);
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

        // ****下拉加载更多，默认只会能下拉加载一次，所以每次请求完数据之后要做此次操作
          // this.$refs.scroll.scroll.finishPullUp();
          this.$refs.scroll.finish();
      });
    },

    // 事件监听相关的方法
    tabClick(index){
        switch(index){
          case 0:
             this.currentType = 'pop'
             break
          case 1:
             this.currentType = 'new'
             break
          case 2:
             this.currentType = 'sell'
             break
        }
        // 两个tab保持一致
        this.$refs.offsetTop.currentIndex = index;
        this.$refs.offsetTopFixed.currentIndex = index;
    
    },
    // 监听组件之后 传递参数，控制点击之后滚动到顶部
    backClick(){
      // this.$refs.scroll是拿到整个组件,后面scroll是组件中的对象(也就是data中定义的对象)
      // ,scrollTo是滚回顶部的固定方法
      // this.$refs.scroll.scroll.scrollTo(0,0,500)
      this.$refs.scroll.scrollTo(0,0,500)
      // 在Scroll.vue中对该方法进行封装
    },
    // 监听滚动的高度控制 右下角的图标显示
    contentScroll(position){
      //这样的等式  获取的是 boolean类型 
      this.isShow = -position.y > 800;
      //  决定tab是否吸顶，在顶部时候停留
      this.isTabFixed = (-position.y) >this.tabOffsetTop;
    },
    //上拉加载更多
    loadmore(){
      //this.currentType这个已经赋值，在哪一tab下就会传哪个参数
      this.getHomeGoodsdata(this.currentType)
    
      // 一开始图片加载没出来，异步。  better-scroll插件计算可滚动的高度不包含 图片。 
      // 所以需要在加载完图片之后  重新刷新一下。
      this.$refs.scroll.scroll.refresh()
    },

    swipeImageLoad(){
        // 2.获取taboffsetTop
    // 这里直接是获取不到组件的offsetTop
    // console.log(this.$refs.offsetTop.offsetTop);
    // 所有组件都有一个属性 $el ： 用于获取组件中的元素
    // 此时可能图片还没有加载完，所以获取到的 导读是不正确的。
      console.log(this.$refs.offsetTop.$el.offsetTop);
      // 
      this.tabOffsetTop = this.$refs.offsetTop.$el.offsetTop;
    }
  }
};
</script>
<style scoped>
#home {
  /* padding-top: 44px; */
  /* 视口高度 */
  height: 100vh;
}
.home-nav {
  background: var(--color-tint);
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100; */
}
.tab-controll {
  /* 当到达离顶部还有44px的时候就会自动变成fixed，不适合ie浏览器 */
  position: sticky;
  top: 44px;
  z-index: 9;
}
/* .content {
  height: calc(100% - 93px);
  margin-top: 44px; */
  /* height: 300px; */
  /* overflow: hidden; */
/* } */
  .content {
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /* .fixed{
    position: fixed;
    left:0;top:44px;
    right:0;
  } */
</style>