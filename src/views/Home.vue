<template>
  <div class="home-container" :style="{'background-image':'url('+imgUrl+')'}">
    <div class="search-container">
      <search />
    </div>
    <div class="more-use-container">
      <more-use />
    </div>
    <div class="time-container">
      <timer />
    </div>
    <div class="todo-container">todo-container</div>
    <div class="learning-model-container">learning-model-container</div>
    <div class="config-container">config-container</div>
  </div>
</template>
<script>
import Timer from '../components/home/Timer.vue'
import Search from '../components/home/Search.vue'
import MoreUse from '../components/home/MoreUse.vue'

export default {
  data() {
    return {
      imgUrl: []
    }
  },
  components: {
    Timer,
    Search,
    MoreUse
  },
  created() {
    this.getImgUrl()
  },
  methods: {
    // 跨域请求bing每日推荐壁纸,并保存到sessionStorage中
    getImgUrl() {
      const sessionImgURL = sessionStorage.getItem('imgUrl')
      if (sessionImgURL === null) {
        this.$jsonp('https://bing.ioliu.cn/v1').then(res => {
          this.imgUrl = res.data.url
          sessionStorage.setItem('imgUrl', this.imgUrl)
        })
      } else {
        this.imgUrl = sessionImgURL
      }
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  color: #fff;
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
  margin-top: 20px;
}
</style>