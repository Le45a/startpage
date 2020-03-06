<template>
  <div class="web-collect-container">
    <div class="bg-color"></div>
    <span>常用网站</span>
    <div class="web-collect-item-container">
      <div class="web-collect-item" v-for="(item,index) in moreUseData" :key="index">
        <div class="web-content">
          <div class="el-icon-close"></div>
          <div class="img-container">
            <img :src="iconUrlOrigin+item.url" alt />
          </div>
          <span class="web-title">{{item.webname}}</span>
        </div>
      </div>
      <div class="web-collect-item" v-if="moreUseData.length<10">
        <div class="web-content">
          <div class="img-container">
            <div class="el-icon-plus"></div>
          </div>
          <span class="web-title">添加</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iconUrlOrigin: 'http://statics.dnspod.cn/proxy_favicon/_/favicon?domain=',
      moreUseData: []
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
  color: #fff;
}
.web-collect-container {
  width: 568px;
  position: relative;
  span {
    font-size: 13px;
    color: #eee;
    padding-top: 15px;
    display: block;
  }
  .bg-color {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #777;
    opacity: 0.5;
    z-index: -1;
  }
  .web-collect-item-container {
    padding-top: 10px;
    width: 100%;
    height: 260px;
    color: #fff;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .web-collect-item {
      width: 100px;
      height: 100px;
      margin-left: 11.3px;
      margin-bottom: 20px;
      .web-content {
        position: relative;
        padding-top: 10px;
        padding-bottom: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .el-icon-close {
          opacity: 0;
          position: absolute;
          z-index: 100;
          top: 0;
          right: 0;
          color: #333;
        }
        .el-icon-close:hover {
          opacity: 1;
        }

        .img-container {
          position: relative;
          background-color: #e5e7e8;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-top: 5px;
          img {
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -15px;
            margin-top: -15px;
            width: 30px;
            height: 30px;
          }
          .el-icon-plus {
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -15px;
            margin-top: -15px;
            width: 30px;
            height: 30px;
            font-size: 30px;
            color: #535353;
          }
        }
      }
    }
    .web-collect-item:hover {
      background: #f2f2f2;
      border-radius: 5px;
      .web-title {
        color: #3a3e41;
      }
    }
  }
}
</style>