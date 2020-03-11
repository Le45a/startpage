<template>
  <div class="search-container">
    <el-input
      class="search-input"
      v-model="input"
      :placeholder="placeholder"
      @keyup.enter.native="OnInputSearch"
    ></el-input>
    <div class="search-selecter-container">
      <div class="selected-item">
        <el-select v-model="value" placeholder="请选择" class="search-list" popper-class="option-item">
          <el-option
            class="search-item"
            v-for="item in searchItem"
            :key="item.title"
            :label="item.title"
            :value="item.title"
          >
            <img :src="item.imgUrl" alt="图标" />
            <span>{{item.title}}</span>
          </el-option>
        </el-select>
      </div>
    </div>
    <el-button class="search-button" @click="OnButtonSearch">搜索</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchItem: [
        {
          title: '百度',
          imgUrl: require('../../assets/img/baidu.png')
        },
        {
          title: '搜狗',
          imgUrl: require('../../assets/img/sogou.png')
        },
        {
          title: 'Bing',
          imgUrl: require('../../assets/img/bing.png')
        },
        {
          title: 'Google',
          imgUrl: require('../../assets/img/google.png')
        }
      ],
      value: '百度',
      input: '',
      placeholder: '要了解什么呢？'
    }
  },
  methods: {
    // 敲击回车搜索
    OnInputSearch(e) {
      var keyCode = window.event ? e.keyCode : e.which //解决兼容
      if (keyCode === 13) {
        this.JumpToSearchPage(this.value)
      }
    },
    // 通过按钮搜索
    OnButtonSearch() {
      this.JumpToSearchPage(this.value)
    },
    // 对搜索跳转的封装
    JumpToSearchPage(name) {
      if (this.input !== '') {
        if (name === '百度') {
          window.location.href = `https://www.baidu.com/s?wd=${this.input}`
        }
        if (name === '搜狗') {
          window.location.href = `http://www.sogou.com/sogou?query=${this.input}`
        }
        if (name === 'Bing') {
          window.location.href = `http://www.bing.com/search?q=${this.input}`
        }
        if (name === 'Google') {
          window.location.href = `https://www.google.com/search?q=${this.input}`
        }
      }
      else{
        this.placeholder="请输入要查找的内容哦！"
      }
    }
  }
}
</script>

<style lang="less" >
.search-container {
  display: flex;
  flex-direction: row;
  width: 568px;
  margin:0 auto;
  margin-top:35px;
  box-shadow: 0 2px 4px rgba(0,0,0,.3);;
  .search-input {
    width: 400px;
    .el-input__inner {
      border: none;
      border-radius: 0;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      border-right: none;
    }
  }
  .search-list {
    width: 100px;
    .el-input__inner {
      border: none;
      border-radius: 0;
      text-align: right;
      padding-right: 30px;
      font-size: 14px;
      line-height: 40px;
    }
  }
  .search-button {
    background-color: #08f;
    border: none;
    color: #fff;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .el-button:active,
  .el-button:hover,
  .el-button:focus {
    background-color: #08f;
    color: #fff;
    border: none;
  }
}
.option-item {
  margin-top: 2px !important;
  .search-item {
    img {
      margin-left: 10px;
      margin-right: 10px;
      width: 15px;
      height: 15px;
    }
  }
  .el-select-dropdown__item {
    padding: 0;
  }
  .popper__arrow {
    display: none !important;
  }
}
</style>