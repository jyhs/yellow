<template>
  <div class="container">
    <wux-tabs class="tabAll" defaultCurrent="tab1" theme="positive">
      <wux-tab key="tab1" title="最新"></wux-tab>
      <wux-tab key="tab2" title="最热"></wux-tab>
      <wux-tab key="tab3" title="按城市"></wux-tab>
      <wux-tab key="tab4" title="按类型"></wux-tab>
    </wux-tabs>

    <block v-for="(user, key, index) in userList" :key="user.id">
      <div class="list_cell">
        <div class="list_head">
          <img class="user_head" src="https://api2.huanjiaohu.com/user/getAvatar?userId=5157">
          <span class="user_info">
            <li class="user_name">机场上空的鸟</li>
            <span class="user_addres">哈尔滨</span>
            <span class="user_date">2019/01/01</span>
          </span>
        </div>
        <wux-gallery id="wux-gallery" />
        <div class="img_all">
          <block v-for="item of user.urls" :key="item.id">
            <view class="list_img" @tap="showGallery(user.id,$event)" :data-current="index">
              <img :src="item">
            </view>
          </block>
        </div>
        <div class="say_all">
          <wux-icon class="say_icon" type="logo-flickr" size="20"/>
          <span class="say_count">19</span>
        </div>
      </div>
    </block>
  </div>
</template>

<script>
import { $wuxGallery } from '../../../static/wux/index'
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
    // previewImage (e) {
    //   const { current } = e.currentTarget.dataset
    //   const { urls } = this.data

    //   wx.previewImage({
    //     current,
    //     urls
    //   })
    // },
    showGallery (index, e) {
      const { current } = e.currentTarget.dataset
      const urls = this.userList[index].urls

      this.$wuxGallery = $wuxGallery()

      this.$wuxGallery.show({
        current,
        urls,
        [`delete`]: (current, urls) => {
          urls.splice(current, 1)
          this.setData({
            urls
          })
          return true
        },
        cancel () {
          console.log('Close gallery')
        },
        onTap (current, urls) {
          console.log(current, urls)
          return true
        },
        onChange (e) {
          console.log(e)
        }
      })
    }
  }
}
</script>

<style scoped>
.tabAll {
  width: 100%;
}
.list_cell {
  box-shadow: 0 0 15px #c2c2c2;
  width: 96%;
  margin-top: 10px;
}
.list_head {
  width: 95%;
  display: inline-flex;
}
.user_head {
  width: 40px;
  height: 40px;
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
  color: #777;
  line-height: 1.5;
}
.user_date {
  width: 100%;
  font-size: 12px;
  white-space: normal;
  color: #777;
  line-height: 1.5;
  margin-left: 60%;
}
.list_img {
  width: 31%;
  height: 100px;
  display: inline-block;
}
.list_img:nth-child(2),
.list_img:nth-child(3) {
  margin-left: 1%;
}
.list_img > img {
  width: 100%;
  height: 100%;
}
.img_all {
  text-align: center;
}
.say_icon {
  margin-left: 85%;
  margin-right: 1%;
}
.say_count {
  width: 10%;
  font-size: 12px;
  white-space: normal;
  color: #777;
}
.say_all {
  display: flex;
  line-height: 26px;
}
</style>
