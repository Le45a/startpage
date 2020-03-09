<template>
  <div class="learn-container">
    <div class="learn-content-container">
      <timer class="learn-timer" />
      <span class="study-time">你已经学习了{{studyTime}}分钟</span>
      <vue-seamless-scroll :data="studyMessage" :class-option="optionLeft" class="seamless-warp2">
        <ul class="item">
          <li v-for="item in studyMessage" v-text="item.title" :key="item.index"></li>
        </ul>
      </vue-seamless-scroll>
    </div>
    <div class="exit-button" title="退出学习模式" @click="changeDisplay">
      <img :src="require('../../assets/img/open-book.png')" alt />
    </div>
    <vue-particles
      color="#4f6575"
      :particleOpacity="0.5"
      :particlesNumber="70"
      shapeType="star"
      :particleSize="2.5"
      linesColor="#FFFFFF"
      :lineLinked="false"
      :moveSpeed="1.5"
      :hoverEffect="false"
      :clickEffect="false"
      class="cash"
    ></vue-particles>
  </div>
</template>

<script>
import Timer from './Timer.vue'
import vueSeamlessScroll from 'vue-seamless-scroll'

export default {
  data() {
    return {
      studyMessage: [
        { title: '书山有路勤为径，学海无涯苦做舟', index: 1 },
        { title: '找首喜欢的轻音乐减轻下学习的压力吧~', index: 2 },
        { title: '每天进步多一点√', index: 3 }
      ],
      studyTime: 0
    }
  },
  props: ['isLearning'],
  components: {
    Timer,
    vueSeamlessScroll
  },
  mounted() {
    this.setStudyTimer()
  },
  beforeDestroy() {
    this.destoryStudyTimer()
  },
  computed: {
    optionLeft() {
      return {
        step: 1,
        limitMoveNum: 3,
        openTouch: false,
        waitTime: 3000,
        direction: 2,
        singleWidth: 400,
        hoverStop: false
      }
    }
  },
  methods: {
    setStudyTimer() {
      const _this = this
      this.studyTimer = setInterval(() => {
        _this.studyTime = _this.studyTime + 1
      }, 1000 * 60)
    },
    destoryStudyTimer() {
      clearInterval(this.studyTimer)
      this.studyTimer = null
    },
    changeDisplay() {
      this.$emit('closeLearnModel')
    }
  }
}
</script>

<style lang="less" scoped>
.learn-container {
  color: #ccc;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #062236;
  .learn-content-container {
    width: 100%;
    margin-top: 15%;
    .learn-timer {
      width: 100%;
      font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',
        sans-serif;
      font-size: 30px;
      font-weight: lighter;
      margin-bottom: 30px;
    }
    .study-time {
      font-size: 30px;
    }
  }
  .exit-button {
    width: 60px;
    height: 50px;
    margin: 0 auto;
    opacity: 0.7;
    margin-top: 60px;
    img {
      width: 40px;
      height: 40px;
    }
  }
}
.seamless-warp2 {
  overflow: hidden;
  height: 40px;
  width: 400px;
  margin: 0 auto;
  margin-top: 50px;
  ul.item {
    display: flex;
    list-style: none;
    padding: 0;
    li {
      float: left;
      width: 400px;
    }
  }
}
.cash {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
}
</style>