<template>
  <div class="todo-container">
    <div class="add-todoItem-container">
      <input type="text" v-model="newItem.content" :placeholder="placeholder" />
      <img :src="require('../../assets/img/add.png')" @click="addItem" />
    </div>
    <div class="todo-item" v-for="n in 6" :key="n">
      <input
        :class="getInputClass(n)"
        type="text"
        :value="getTodoItem(n)"
        :disabled="getTodoItem(n)?false:true"
        @blur="resetItem(n,$event)"
      />
      <img
        v-if="getTodoItem(n)"
        :src="require('../../assets/img/complete.png')"
        @click=" changeStatus(n)"
      />
      <img
        v-if="getTodoItem(n)"
        :src="require('../../assets/img/delete.png')"
        @click="removeItem(n)"
      />
    </div>
    <div class="function-btn">
      <div class="change-page-btn" v-if="todoList.length>=6">
        <span v-if="page>1" @click="gotoLastPage">上一页</span>
        <span v-if="page*6<todoList.length" @click="gotoNextPage">下一页</span>
      </div>
      <div class="delete-items-btn">
        <span @click="clearAllItem">删除所有</span>
        <span @click=" clearCompleteItem">删除已完成</span>
      </div>
      <div class="close-todo" @click="closeTodo">
        <span>关闭</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todoList: [],
      newItem: {
        content: '',
        isComplete: false
      },
      page: 1,
      placeholder: '今天要做些什么呢？'
    }
  },
  created() {
    this.getTodoList()
  },
  methods: {
    getTodoItem(n) {
      let a = n - 1 + (this.page - 1) * 6
      if (a < this.todoList.length) {
        return this.todoList[a].content
      }
    },
    getInputClass(n) {
      let a = n - 1 + (this.page - 1) * 6
      if (a < this.todoList.length) {
        let i = this.todoList[a]
        let c = ''
        if (i.content === '') {
          c += 'empty-input'
        }
        if (i.isComplete === true) {
          c += ' complete-item'
        }
        return c
      } else {
        return 'empty-input'
      }
    },
    gotoNextPage() {
      this.page = this.page + 1
    },
    gotoLastPage() {
      this.page = this.page - 1
    },
    clearAllItem() {
      this.todoList = []
      this.setTodoList()
    },
    clearCompleteItem() {
      let mid = this.todoList
      for (let i = 0; i < mid.length; i++) {
        if (mid[i].isComplete === true) {
          mid.splice(i, 1)
        }
      }
      this.todoList = mid
      this.setTodoList()
    },
    addItem() {
      if (this.newItem.content != '') {
        this.todoList.push(JSON.parse(JSON.stringify(this.newItem)))
        this.newItem.content = ''
        this.setTodoList()
      } else {
        this.placeholder = '要输入内容哦！'
      }
    },
    resetItem(n, e) {
      if (e.target.value != '') {
        this.todoList[n - 1 + (this.page - 1) * 6].content = e.target.value
        this.setTodoList()
      } else {
        this.removeItem(n)
      }
    },
    removeItem(n) {
      let a = n - 1 + (this.page - 1) * 6
      this.todoList.splice(a, 1)
      this.setTodoList()
    },
    changeStatus(n) {
      let a = n - 1 + (this.page - 1) * 6
      this.todoList[a].isComplete = !this.todoList[a].isComplete
      this.setTodoList()
    },
    getTodoList() {
      let storage = JSON.parse(localStorage.getItem('todoList'))
      if (storage !== null && storage.length !== 0) {
        this.todoList = storage
      }
    },
    setTodoList() {
      localStorage.setItem('todoList', JSON.stringify(this.todoList))
    },
    closeTodo(){
      this.$emit("closeTodo")
    }
  }
}
</script>

<style lang="less" scoped>
.todo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 2px #8683834d;
  width: 300px;
  height: 400px;
  margin: 0 auto;
  background: url('../../assets/img/note-bg.png') no-repeat;
  background-size: cover;
  .add-todoItem-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 20px;
    margin-top: 30px;
    height: 20px;
    img {
      width: 28px;
      height: 28px;
      margin-left: 15px;
      cursor:pointer;
    }
    input {
      height: 20px;
      border: 1px solid #707070;
      border-radius: 3px;
      margin-left: -15px;
      font-size: 16px;
      padding: 3px 0 3px 15px;
      color: #999;
      opacity: 0.7;
    }
  }
  .todo-item {
    display: flex;
    margin-top: 10px;
    img {
      width: 25px;
      height: 25px;
      margin-left: 5px;
      cursor: pointer;
    }
    input {
      color: #fff;
      text-align: center;
      border: none;
      border-bottom: 1px solid #707070;
      font-size: 20px;
      width: 200px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      outline: none;
      opacity: 0.7;
      background: none;
    }
    .empty-input {
      margin-right: 60px;
    }
    .complete-item {
      text-decoration: line-through #bbb;
      color: #bbb;
    }
  }
  .function-btn {
    color: #fff;
    opacity: 0.7;
    font-size: 13px;
    margin-top: 25px;
    width: 100%;
    .change-page-btn {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      span {
        cursor:pointer;
        display: block;
        margin-left: 10px;
      }
    }
    .delete-items-btn {
      margin-top: 20px;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      span {
        display: block;
        margin-right: 15px;
        cursor: pointer;
      }
    }
    .close-todo {
      position: absolute;
      bottom: 15px;
      left: 15px;
      cursor: pointer;
    }
  }
}
</style>