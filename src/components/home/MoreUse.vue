<template>
  <div class="web-collect-container">
    <div class="bg-color"></div>
    <span>常用网站</span>
    <div class="web-collect-item-container">
      <div
        class="web-collect-item"
        v-for="(item,index) in moreUseData"
        :key="index"
        @click="GotoUrl(item.url)"
      >
        <div class="web-content">
          <div class="el-icon-close" @click.stop="DeleteItem(item)"></div>
          <div class="img-container">
            <img :src="GetWebIcon(item.url)" :onerror="defaultImg" />
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
    <el-dialog
      title="添加收藏网站"
      @close="ClearDialogInput"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
    >
      <div class="input-item">
        <span>网站地址：</span>
        <el-input v-model="newWebCollect.url" autocomplete="off" :placeholder="placeholderforurl"></el-input>
      </div>
      <div class="input-item">
        <span>名称：</span>
        <el-input
          v-model="newWebCollect.webname"
          autocomplete="off"
          :placeholder="placeholderforname"
        ></el-input>
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
      moreUseData: [],
      dialogFormVisible: false,
      newWebCollect: {
        url: '',
        webname: ''
      },
      placeholderforname: '请输入网站名',
      placeholderforurl: '请输入网站地址'
    }
  },
  created() {
    this.GetMoreUseData()
  },
  methods: {
    // 获取本地缓存数据
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
      if (this.newWebCollect.webname != '' && this.newWebCollect.url != '') {
        this.moreUseData.push(JSON.parse(JSON.stringify(this.newWebCollect))) // 深拷贝
        this.ClearDialogInput()
        this.UpdataMoreUseData()
        this.placeholderforname = '请输入网站名'
        this.placeholderforurl = '请输入网站地址'
      } else {
        if (this.newWebCollect.webname === '') {
          this.placeholderforname = '网站名不能为空'
        }
        if (this.newWebCollect.url === '') {
          this.placeholderforurl = '网站地址不能为空'
        }
      }
    },
    // 提示框关闭处理
    ClearDialogInput() {
      this.dialogFormVisible = false
      this.newWebCollect.url = ''
      this.newWebCollect.webname = ''
    },
    // 删除操作
    DeleteItem(item) {
      for (let i = 0; i < this.moreUseData.length; i++) {
        if (this.moreUseData[i] === item) {
          this.moreUseData.splice(i, 1)
          break
        }
      }
      this.UpdataMoreUseData()
    },
    GotoUrl(url) {
      window.location.href = `http://${url}`
    },
    GetWebIcon(url) {
      return `http://${url}/favicon.ico`
    }
  }
}
</script>

<style lang="less" scoped>
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
  width: 650px;
  height: 350px;
  position: relative;
  padding-left: 5%;
  padding-right: 5%;
  padding-top:10px;
  margin: 0 auto;
  span {
    font-size: 13px;
    color: #eee;
    padding-top: 15px;
    display: block;
  }
  .bg-color {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    background-color: #777;
    z-index:-1;
    opacity: 0.5;
  }
  .web-collect-item-container {
    padding-top: 20px;
    width: 100%;
    color: #fff;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .web-collect-item {
      width: 100px;
      height: 120px;
      margin-left: 25px;
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