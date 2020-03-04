<template>
  <div class="home-container" :style="{'background-image':'url('+imgUrl+')'}">
    <div class="search-container">search</div>
    <div class="more-use-container">more-use-container</div>
    <div class="time-container">
      <timer />
    </div>
    <div class="todo-container">todo-container</div>
    <div class="learning-model-container">learning-model-container</div>
    <div class="config-container">config-container</div>
  </div>
</template>
<script>
import Timer from "./home/Timer.vue"

export default {
  data() {
    return {
      imgUrl: []
    }
  },
  components:{
     Timer
  },
  created() {
    this.getImgUrl()
  },
  methods: {
    // 跨域请求bing每日推荐壁纸
    getImgUrl() {
      this.$jsonp('https://bing.ioliu.cn/v1').then(res => {
        this.imgUrl = res.data.url
      })
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  color:#fff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-width: 1000px;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
}
.search-container {
  width: 30%;
}
.more-use-container {
  width: 30%;
}
.time-container {
  width: 30%;
}
.todo-container {
  width: 30%;
}
.learning-model-container {
  width: 30%;
}
.config-container {
  width: 30%;
}
</style>