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
    <div class="learning-button-container" @click="openLearnModel">
      <div class="learning-bg"></div>
      <img :src="require('../assets/img/book.png')" />
    </div>
    <div class="config-container">config-container</div>
    <transition name="fade">
      <learning-model
        v-if="isLearning"
        :isLearning="isLearning"
        @closeLearnModel="closeLearnModel"
      />
    </transition>
  </div>
</template>
<script>
import Timer from '../components/home/Timer.vue'
import Search from '../components/home/Search.vue'
import MoreUse from '../components/home/MoreUse.vue'
import LearningModel from '../components/home/LearningModel.vue'

export default {
  data() {
    return {
      imgUrl: [],
      isLearning: false
    }
  },
  components: {
    Timer,
    Search,
    MoreUse,
    LearningModel
  },
  created() {
    this.getImgUrl()
  },
  methods: {
    // 跨域请求bing每日推荐壁纸,并保存到sessionStorage中
    getImgUrl() {
      const sessionImgURL = sessionStorage.getItem('imgUrl')
      if (sessionImgURL === null) {
        this.$jsonp('https://bing.ioliu.cn/v1')
          .then(res => {
            this.imgUrl = res.data.url
            sessionStorage.setItem('imgUrl', this.imgUrl)
          })
          .catch(() => {
            this.imgUrl =
              'https://cn.bing.com/th?id=OHR.BluebirdsYNP_ZH-CN1355093185_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp'
          })
      } else {
        this.imgUrl = sessionImgURL
      }
    },
    openLearnModel() {
      this.isLearning = true
    },
    closeLearnModel() {
      this.isLearning = false
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
.learning-button-container {
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0.5;
  .learning-bg {
    width: 0px;
    height: 0px;
    border-top: 50px solid #fff;
    border-left: 50px solid transparent;
  }
  img {
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    height: 30px;
    display: block;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>