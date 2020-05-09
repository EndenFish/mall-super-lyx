<template>
  <div id="app">
    <!-- <router-view/> -->
    <keep-alive exclude="Detail">
        <router-view/>
    </keep-alive>
    <!-- 用插槽slot来实现动态插入，可以动态更改 -->
    <main-bar/>
  </div>
</template>

<script>
import MainBar from 'components/content/MainBar/MainBar'


export default {
  name: 'App',
  components: {
    MainBar
  }
}
</script>

<style>
@import "assets/css/base.css";
</style>
