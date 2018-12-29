<template>
  <div class="container">
    <wux-floating-button :position="position" :theme="theme" :buttons="buttons" @change="onChange" @click="onClick" :contact="onContact" :getuserinfo="onGotUserInfo" />
    <wux-button block type="light"  @click="openPopup">light</wux-button>
    <wux-popup position="bottom" :visible="popupVisible" zIndex="9999" @close="closePopup">
      <wux-image wux-class="image" width="40px" height="40px" shape="circle" src="/static/trader1.jpg" />
      <wux-card title="秋天的故事" extra="上海市浦东新区">
          <wux-cell slot="body">
            fghdjghjfghjfghjfg
          </wux-cell>
        <view slot="footer">
          <wux-image wux-class="image" width="40px" height="40px" shape="circle" src="/static/wechatHL.png" />
        </view>
      </wux-card>
    </wux-popup>
      <map id="myMap"  :longitude="centerX" :latitude="centerY" :scale="scale" @controls="controls" bindcontroltap="controltap" :include-points="includePoints" :markers="markers" bindmarkertap="markertap" bindregionchange="regionchange" show-location :style="winStyle"></map>
  </div>
</template>

<script>
import card from '@/components/card'
let schoolData = require('../../../static/gis-school')
const iconImg = 'data:image/png;base64,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'

export default {
  data () {
    return {
      types: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
      typeIndex: 3,
      scale: 10,
      colors: ['light', 'stable', 'positive', 'calm', 'balanced', 'energized', 'assertive', 'royal', 'dark'],
      colorIndex: 4,
      buttons: [{
        openType: 'getUserInfo',
        label: 'GetUserInfo',
        icon: iconImg
      },
      {
        openType: 'share',
        label: 'Share',
        icon: iconImg
      },
      {
        openType: 'contact',
        label: 'Contact',
        icon: iconImg
      },
      {
        label: 'View on Demo',
        icon: iconImg
      }
      ],
      position: 'bottomRight',
      centerX: 113.3245211,
      centerY: 23.10229,
      winStyle: 'width: 100%; height: 400px;',
      markers: [],
      includePoints: [{
        latitude: 30.279383,
        longitude: 120.131441
      }],
      controls: [{
        id: 1,
        iconPath: '/static/location-control.png',
        position: {
          left: 0,
          top: 10,
          width: 40,
          height: 40
        },
        clickable: true
      }],
      popupVisible: false
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
    },
    regionchange (e) {
      console.log(e.type)
      if (e.type === 'end') {
        this.scale = e.scale
      }
    },
    markertap (e) {
      console.log(e)
    },
    controltap (e) {
      console.log(e.controlId)
      this.moveToLocation()
    },
    getSchoolMarkers () {
      let markers = []
      for (let item of schoolData) {
        let marker = this.createMarker(item)
        markers.push(marker)
      }
      return markers
    },
    moveToLocation: function () {
      this.mapCtx.moveToLocation()
    },
    createMarker (point) {
      let latitude = point.latitude
      let longitude = point.longitude
      this.includePoints = {
        latitude: latitude,
        longitude: longitude
      }
      let marker = {
        iconPath: '/static/location.png',
        id: point.id || 0,
        name: point.name || '',
        latitude: latitude,
        longitude: longitude,
        width: 25,
        height: 48
      }
      return marker
    },
    onClick (e) {
      console.log('onClick', e.detail)
      if (e.detail.index === 3) {
        wx.switchTab({
          url: '/pages/index/index'
        })
      }
    },
    openPopup (e) {
      this.popupVisible = true
    },
    closePopup (e) {
      this.popupVisible = false
    },
    onContact (e) {
      console.log('onContact', e)
    },
    onGotUserInfo (e) {
      console.log('onGotUserInfo', e)
    },
    onGotPhoneNumber (e) {
      console.log('onGotPhoneNumber', e)
    },
    onChange (e) {
      console.log('onChange', e)
    },
    pickerChange1 (e) {
      const typeIndex = e.detail.value
      const position = this.data.types[typeIndex]

      this.setData({
        typeIndex,
        position
      })
    },
    pickerChange2 (e) {
      const colorIndex = e.detail.value
      const theme = this.data.colors[colorIndex]

      this.setData({
        colorIndex,
        theme
      })
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  },
  onReady: function (e) {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('myMap')
  },
  onLoad: function () {
    console.log('地图定位！')
    wx.getLocation({
      type: 'gcj02', // 返回可以用于wx.openLocation的经纬度
      success: (res) => {
        console.log(res)
        let latitude = res.latitude
        let longitude = res.longitude
        // let marker = this.createMarker(res)
        this.centerX = longitude
        this.centerY = latitude
        this.markers = this.getSchoolMarkers()
        this.scale = 12
      }
    })
    wx.getSystemInfo({
      success: (res) => {
        console.log('getSystemInfo')
        console.log(res.windowWidth)
        // let mapWidth = res.windowWidth
        // let mapHeight = res.windowHeight
        // this.winStyle = 'width:' + mapWidth + 'px;height:' + mapHeight + 'px;'
        // this.winStyle = {
        //   width: mapWidth,
        //   height: mapHeight
        // }
      }
    })
  }
  // getLngLat: function () {
  //   this.mapCtx = wx.createMapContext('myMap')
  //   this.mapCtx.getCenterLocation({
  //     success: (res) => {
  //       let longitude = res.longitude
  //       let latitude = res.latitude
  //       this.markers = {
  //         iconPath: '/image/location.png',
  //         id: res.id || 0,
  //         name: res.name || '',
  //         latitude: latitude,
  //         longitude: longitude,
  //         width: 25,
  //         height: 48
  //       }
  //     }
  //   })
  // }
}
</script>

<style scoped>
#map {
  padding: 40rpx;
}
.text{
  background-color: #eee;
}

</style>
