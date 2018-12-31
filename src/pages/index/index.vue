<template>
  <div class="container">
      <map id="myMap"  :longitude="centerX" :latitude="centerY" :scale="scale" @controltap="controltap"  :markers="markers" @markertap="markertap" @regionchange="regionchange" @tap="hidentap" show-location :style="winStyle"></map>
      <div v-show="showDetail" class="all-bg">
              <cover-view class='dw-bg'></cover-view>

      <cover-image class='bg' src='/static/dw_bg.png'></cover-image>
      <cover-image src='/static/dw_call.png' @click='callSomeone' class='dw_call'></cover-image>
      <cover-image :src='service.iconPath' class='dw_head'></cover-image>
      <cover-view class='dw-text-body'>{{service.description}}</cover-view>
      <cover-view class='dw-text-name'>{{service.name}}</cover-view>
      <cover-view class='dw-text-cityName'>{{service.cityName}}</cover-view>
      <cover-view class='dw-text-location'>{{service.location}}</cover-view>
      <cover-view class='dw-text-title'>{{service.title}}</cover-view>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      service: {
        iconPath: 'https://api2.huanjiaohu.com/user/getAvatar?userId=5157',
        name: '',
        cityName: '',
        location: '',
        title: '',
        description: '',
        phone: ''
      },
      scale: 10,
      centerX: 121.475186,
      centerY: 31.228725,
      winStyle: 'width: 100%; height: 400px;',
      markers: [],
      showDetail: false
    }
  },
  async mounted () {
    const markers = []
    const serviceList = await this.$post('/yellow/service/list', {'provinces': 'china'})
    for (let item of serviceList) {
      let marker = this.createMarker(item)
      markers.push(marker)
    }
    this.markers = markers
  },
  methods: {
    callSomeone () {
      wx.makePhoneCall({
        phoneNumber: this.service.phone
      })
    },
    getUserInfo () {
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
    regionchange (e) {
      if (e.type === 'end') {
        this.scale = e.scale
      }
    },
    markertap (e) {
      this.showDetail = true
      let maker = null
      for (let item of this.markers) {
        if (item.id === e.mp.markerId) {
          maker = item
        }
      }
      this.service = maker
    },
    hidentap (e) {
      this.showDetail = false
    },
    controltap (e) {
      this.moveToLocation()
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
        iconPath: 'https://api2.huanjiaohu.com/user/getAvatar?userId=' + point.user_id,
        id: point.id || 0,
        name: point.name || '',
        latitude: latitude,
        longitude: longitude,
        width: 50,
        height: 48,
        userId: point.user_id,
        cityName: point.city_name,
        location: point.location,
        phone: point.phone,
        title: point.title,
        description: point.description
      }
      return marker
    }

  },

  created () {
    this.getUserInfo()
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
  },
  onLoad: function () {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        let latitude = res.latitude
        let longitude = res.longitude
        this.centerX = longitude
        this.centerY = latitude
        this.scale = 12
      }
    })
    wx.getSystemInfo({
      success: (res) => {
        let mapWidth = res.windowWidth
        let mapHeight = res.windowHeight
        this.winStyle = 'width:' + mapWidth + 'px;height:' + mapHeight + 'px;'
      }
    })
  }

}
</script>

<style scoped>
#map {
  padding: 40rpx;
}
.dw_msg{
  width: 30px;
  height: 30px;
  bottom:5%;
  position:absolute;
  left: 8%;
}
.dw_call{
  width: 70px;
  height: 30px;
  bottom:5%;
  position:absolute;
  right: 8%;
}
.bg{
  width: 94%;
  height: 45%;
  position: absolute;
  left: auto;
  right: auto;
  bottom: 1%;
}
.dw-text-body{
  width:90% ;
  top: 74%;
  position:absolute;
  font-size:12px;
  white-space:normal;
  left: 8%;
  color: #777;
  line-height:2;
}
.dw-text-name{
  width: 50%;
  bottom: 35%;
  position:absolute;
  font-size:18px;
  white-space:normal;
  left: 8%;
  white-space:normal;
}
.dw_head{
  width:49px;
  height:49px;
  border-radius:50%;
  bottom:39%;
  position:absolute;
  left:13%;
}
.dw-text-cityName{
  width: 25%;
  bottom: 35%;
  position:absolute;
  font-size:15px;
  white-space:normal;
  right: 8%;
  color:#777;
  white-space:normal;
  text-align:right;
}
.dw-text-location{
  width: 70%;
  bottom: 32%;
  position:absolute;
  font-size:12px;
  white-space:normal;
  left:8%;
  color:#777;
}
.dw-text-title{
  width: 70%;
  bottom: 26%;
  position:absolute;
  font-size:15px;
  white-space:normal;
  left:8%;
  color:rgb(17, 130, 196);
}
.all-bg{
  width: 94%;
  left: 5%;
}
</style>
