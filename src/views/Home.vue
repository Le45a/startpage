<template>
  <div class="home-container" :style="{'background-image':'url('+imgUrl+')'}">
    <div class="my-logo">
      <img :src="require('../assets/img/default.png')" />
    </div>
    <search />
    <div class="more-use-container">
      <more-use />
    </div>
    <div class="time-container">
      <timer />
    </div>
    <div class="learning-button-container">
      <div class="learning-bg"></div>
      <img :src="require('../assets/img/book.png')" title="学习模式" @click="openLearnModel" />
    </div>
    <transition name="fade">
      <todo
        class="todo"
        :style="`top:${todoY}px;left:${todoX}px;`"
        v-if="isopenTodoList"
        @mousedown.native.self="todoMousedown($event)"
        @mouseup.native="todoMouseup"
        @closeTodo="closeTodo"
      />
    </transition>
    <transition name="fade">
      <learning-model
        v-if="isLearning"
        :isLearning="isLearning"
        @closeLearnModel="closeLearnModel"
      />
    </transition>
    <div class="todo-icon-container">
      <div class="todo-bg"></div>
      <img :src="require('../assets/img/todo.png')" @click="openTodo" />
    </div>
  </div>
</template>
<script>
import Timer from '../components/home/Timer.vue'
import Search from '../components/home/Search.vue'
import MoreUse from '../components/home/MoreUse.vue'
import LearningModel from '../components/home/LearningModel.vue'
import Todo from '../components/home/Todo'

export default {
  data() {
    return {
      imgUrl: [],
      isLearning: false,
      isopenTodoList: false,
      todoX: 0,
      todoY: 0,
      moveX: 0,
      moveY: 0,
      isTodoDrop: false
    }
  },
  components: {
    Timer,
    Search,
    MoreUse,
    LearningModel,
    Todo
  },
  created() {
    this.getImgUrl()
    this.getTodoPosition()
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
    },
    openTodo() {
      this.isopenTodoList = true
    },
    closeTodo() {
      this.isopenTodoList = false
    },
    getTodoPosition() {
      let x = localStorage.getItem('todoX')
      let y = localStorage.getItem('todoY')
      if (x != null && y != null) {
        this.todoX = x
        this.todoY = y
      }
    },
    todoMousedown(e) {
      this.moveX = e.clientX - this.todoX
      this.moveY = e.clientY - this.todoY
      this.isTodoDrop = true
      const _this = this
      // 解决拖动速度快的bug
      document.onmousemove = function(e) {
        if (_this.isTodoDrop) {
          _this.todoX = e.clientX - _this.moveX
          _this.todoY = e.clientY - _this.moveY
        }
      }
    },
    todoMouseup() {
      this.isTodoDrop = false
      this.moveY = 0
      this.moveX = 0
      localStorage.setItem('todoX',JSON.stringify(this.todoX))
      localStorage.setItem('todoY', JSON.stringify(this.todoY))
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
.my-logo {
  margin-top: 60px;
  img {
    width: 50px;
    height: 50px;
  }
}
.more-use-container {
  margin: 0 auto;
  margin-top: 80px;
}
.time-container {
  margin-top: 60px;
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
    cursor: pointer;
  }
}
.todo {
  position: fixed;
  z-index: 1000;
}
.todo-icon-container {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.5;
  img {
    width: 25px;
    height: 25px;
    display: block;
    position: absolute;
    top: 2px;
    left: 0;
    cursor: pointer;
  }
  .todo-bg {
    width: 0px;
    height: 0px;
    border-top: 50px solid #fff;
    border-right: 50px solid transparent;
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