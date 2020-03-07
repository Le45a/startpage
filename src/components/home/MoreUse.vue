<template>
  <div>
    <div class="web-collect-container">
      <div class="bg-color"></div>
      <span>常用网站</span>
      <div class="web-collect-item-container">
        <div class="web-collect-item" v-for="(item,index) in moreUseData" :key="index">
          <div class="web-content">
            <div class="el-icon-close" @click="DeleteItem(item)"></div>
            <div class="img-container">
              <img :src="iconUrlOrigin+item.url" :onerror="defaultImg" />
            </div>
            <span :title="item.webname" class="web-title">{{item.webname}}</span>
          </div>
        </div>
        <div class="web-collect-item" v-if="moreUseData.length<10" @click="dialogFormVisible=true">
          <div class="web-content">
            <div class="img-container">
              <div class="el-icon-plus"></div>
            </div>
            <span class="web-title">添加</span>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="添加收藏网站"
      @close="ClearDialogInput"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
    >
      <div class="input-item">
        <span>网站地址：</span>
        <el-input v-model="newWebCollect.url" autocomplete="off"></el-input>
      </div>
      <div class="input-item">
        <span>名称：</span>
        <el-input v-model="newWebCollect.webname" autocomplete="off"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ClearDialogInput">取 消</el-button>
        <el-button type="primary" @click="AppendItemToCollect">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultImg: "this.src='" + require('../../assets/img/default.png') + "'",
      iconUrlOrigin: 'http://statics.dnspod.cn/proxy_favicon/_/favicon?domain=',
      moreUseData: [],
      dialogFormVisible: false,
      newWebCollect: {
        url: '',
        webname: ''
      }
    }
  },
  created() {
    this.GetMoreUseData()
  },
  methods: {
    GetMoreUseData() {
      let storage = JSON.parse(localStorage.getItem('moreUseData'))
      if (storage !== null && storage.length !== 0) {
        this.moreUseData = storage
      }
    },
    UpdataMoreUseData() {
      localStorage.setItem('moreUseData', JSON.stringify(this.moreUseData))
    },
    AppendItemToCollect() {
      this.moreUseData.push(JSON.parse(JSON.stringify(this.newWebCollect))) // 深拷贝
      this.ClearDialogInput()
      this.UpdataMoreUseData()
    },
    ClearDialogInput() {
      this.dialogFormVisible = false
      this.newWebCollect.url = ''
      this.newWebCollect.webname = ''
    },
    DeleteItem(item) {
      for (let i = 0; i < this.moreUseData.length; i++) {
        if (this.moreUseData[i] === item) {
          this.moreUseData.splice(i, 1)
          break
        }
      }
      this.UpdataMoreUseData()
    }
  }
}
</script>

<style lang="less" scoped>
a {
  text-decoration: none;
  color: #fff;
}
.input-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 80%;
  margin: 0 auto;
  margin-bottom: 10px;
  span {
    width: 90px;
    text-align: right;
    margin-right: 20px;
  }
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
      transition: all 0.3s;
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
        .web-title {
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          width: 60px;
          transition: all 0.3s;
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