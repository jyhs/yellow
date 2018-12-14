<template>
  <div class="container">
      <map longitude="23.099994" latitude="113.324520" v-bind:markers="markers" v-bind:covers="covers" scale="16" style="width: 375px; height: 200px;"></map>
  </div>
</template>

<script>
import card from '@/components/card'

export default {
  data () {
    return {
      markers: [{
        latitude: 23.099994,
        longitude: 113.324520,
        name: 'T.I.T 创意园',
        desc: '我现在的位置'
      }],
      covers: [{
        latitude: 23.099794,
        longitude: 113.324520,
        iconPath: '../../images/wechart.png',
        rotate: 10
      }, {
        latitude: 23.099298,
        longitude: 113.324129,
        iconPath: '../../images/wechart.png',
        rotate: 90
      }]
    }
  },

  components: {
    card
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  },
  onLoad: function () {
    console.log('地图定位！')
    wx.getLocation({
      type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
      success: function (res) {
        console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 1
        })
      }
    })
  }
}
</script>

<style scoped>

</style>
