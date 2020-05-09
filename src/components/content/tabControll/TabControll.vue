<template>
    <div class="tab-controll">
        <!-- 只是文字不一样的时候，可以不用插槽 -->
        <!-- <slot></slot> -->
        <div class="tab-control-item" v-for="(item,index) in titles" :key="index"
        :class="{active: currentIndex === index}"
        @click="itemClick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>

export default {
    name: "TabControll",
    props:{
        titles:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
        this.$emit('tabClick', index)
      }
    }
}
</script>
<style scoped>
.tab-controll {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 3px solid var(--color-tint);
  }  
</style>