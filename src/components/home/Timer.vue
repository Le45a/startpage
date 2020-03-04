<template>
  <div>{{dateFormat(date)}}</div>
</template>

<script>
export default {
  data() {
    return {
      date: Date
    }
  },
  mounted() {
    // 组件挂载时启动计时器获取时间
    this.setTimer()
  },
  beforeDestroy() {
    // 销毁清楚计时器
    this.destoryTimer()
  },
  methods: {
    // 创建计时器
    setTimer() {
      const _this = this
      this.timer = setInterval(() => {
        _this.date = new Date()
      }, 1000)
    },
    // 清除计时器
    destoryTimer() {
      clearInterval(this.timer)
      this.timer = null
    },
    // 格式化时间
    dateFormat(time) {
      let date = new Date(time)
      let year = date.getFullYear()
      let month =date.getMonth() + 1 < 10? '0' + (date.getMonth() + 1): date.getMonth() + 1
      let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      let minutes =date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      let seconds =date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return `${year}年${month}月${day}日 ${hours}:${minutes}:${seconds}`
    }
  }
}
</script>

<style>
</style>