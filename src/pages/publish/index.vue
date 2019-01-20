<template>
  <div class="container">
    <div class="list_cell">
      <div class="list_head">
        <img class="user_head" src="https://api2.huanjiaohu.com/user/getAvatar?userId=5157">
        <span class="user_info">
          <li class="user_name">机场上空的鸟</li>
          <span class="user_addres">哈尔滨</span>
        </span>
      </div>
    </div>
    <div class="list_cell">
      <li class="common_info">
        <wux-select id="wux-select1"/>
        <span>鱼缸类型</span>
        <span class="select1" @click="onClick1"> {{title1}} </span>
        <!-- <wux-cell title="职业" :extra="title1" @click="onClick1"></wux-cell> -->
      </li>
      <li class="common_info">
        <span>过滤方式</span>
      </li>
      <li class="common_info">
        <span>过滤系统</span>
      </li>
      <li class="common_info">
        <span>鱼缸尺寸</span>
      </li>
    </div>
    <div class="list_cell">
      <li class="common_info">
        <span>鱼缸类型</span>
      </li>
      <li class="common_info">
        <span>鱼缸类型</span>
      </li>
      <li class="common_info">
        <span>鱼缸类型</span>
      </li>
    </div>
  </div>
</template>

<script>
import { $wuxSelect } from '../../../static/wux/index'
export default {
  data () {
    return {
      // userList: [
      //   {
      //     id: 11,
      //     urls: [
      //       {id: 1, url: 'https://unsplash.it/200/200'},
      //       {id: 2, url: 'https://unsplash.it/200/200'},
      //       {id: 3, url: 'https://unsplash.it/200/200'}
      //     ]
      //   },
      //   {
      //     id: 12,
      //     urls: [
      //       {id: 1, url: 'https://unsplash.it/200/200'},
      //       {id: 2, url: 'https://unsplash.it/200/200'},
      //       {id: 3, url: 'https://unsplash.it/200/200'}
      //     ]
      //   }
      // ],
      value1: '',
      title1: '请选择',
      userList: [
        {
          id: 0,
          urls: [
            'https://unsplash.it/200/200',
            'https://unsplash.it/300/300',
            'https://unsplash.it/400/400'
          ]
        },
        {
          id: 1,
          urls: [
            'https://unsplash.it/300/300',
            'https://unsplash.it/300/300',
            'https://unsplash.it/400/400'
          ]
        }
      ]
    }
  },
  // onShareAppMessage (options) {
  //   return {
  //     title: '礁岩海水帮助',
  //     imageUrl: '/static/daowei.jpg',
  //     path: '/pages/help/main'
  //   }
  // },
  methods: {
    gotoMap () {
      wx.navigateBack()
    },
    gotoJyhs () {
      wx.navigateToMiniProgram({
        appId: 'wx9f635f06da7360d7'
      })
    },
    onClick1 () {
      $wuxSelect('#wux-select1').open({
        value: this.value1,
        options: ['法官', '医生', '猎人', '学生', '记者', '其他'],
        onConfirm: (value, index, options) => {
          console.log('onConfirm', value, index, options)
          if (index !== -1) {
            this.value1 = value
            this.title1 = options[index]
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.container {
  background-color: #f7f7f7;
  /* height: 100vh; */
}
.list_cell {
  /* box-shadow: 0 0 15px #c2c2c2; */
  width: 100%;
  margin-top: 10px;
  background-color: white;
}
.list_head {
  width: 95%;
  display: inline-flex;
}
.user_head {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  left: 10%;
  background-color: white;
  border: solid 4px white;
  margin-left: 3%;
  margin-top: 3%;
}
.user_info {
  margin-left: 10px;
  margin-top: 15px;
  width: 80%;
}
.user_name {
  width: 100%;
  font-size: 14px;
  white-space: normal;
  line-height: 1.5;
}
.user_addres {
  width: 100px;
  font-size: 12px;
  white-space: normal;
  color: #888;
  line-height: 1.5;
}
.common_info {
  border-bottom: 2px solid #f7f7f7;
  /* position: relative; */
}
.common_info > span {
  font-size: 14px;
  white-space: normal;
  line-height: 1.5;
  color: #888;
  margin-left: 10%;
  margin-top: 4%;
  margin-bottom: 4%;
  display: inline-block;
}
.select1{
  right:14%;
  position:absolute;
}
/* .common_info > wux-cell {
  font-size: 14px;
  white-space: normal;
  line-height: 1.5;
  color: #888;
}
.common_info > wux-cell> view >.wux-cell__text{
  margin-left: 9%;
} */
</style>
