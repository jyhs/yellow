<template>
  <div class="container">
      <map id="myMap"  :longitude="centerX" :latitude="centerY" :scale="scale" @controltap="controltap"  :markers="markers" @markertap="markertap" @regionchange="regionchange" @tap="hidentap" show-location :style="winStyle"></map>
      <div v-show="showDetail" class="all-bg">
      <cover-image class='bg' src='/static/dw_bg.png'></cover-image>
      <cover-image src='/static/dw_call.png' @click='callSomeone' class='dw_call'></cover-image>
      <cover-image :src='service.iconPath' class='dw_head'></cover-image>
      <cover-view class='dw-text-body'>{{service.description}}</cover-view>
      <cover-view class='dw-text-name'>{{service.name}}</cover-view>
      <cover-view class='dw-text-address1'>{{service.cityName}}</cover-view>
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
        cityName: ''
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
        phoneNumber: '158XXXXXXXX'
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
.text{
  background-color: #eee;
}
.dw_msg{
  width: 30px;
  height: 30px;
  bottom:5px;
  position:absolute;
  left: 5px;
}
.dw_call{
  width: 70px;
  height: 30px;
  bottom:5px;
  position:absolute;
  right: 5px;
}
.dw-footer,.dw-footer cover-view,.dw-footer cover-image{
  display: inline-flex;
}
.bg{
  width: 100%;
  height: 45%;
  position: absolute;
  left: auto;
  right: auto;
  bottom: 0;
}
.img-footer{
  bottom:10px;
  position:absolute;
  padding-left: 60px;
}
.img-call{
  padding-left: 150px;
}
.dw-text-body{
    width:90% ;
    bottom: 20%;
    position:absolute;
    font-size:13px;
    white-space:normal;
}
.dw-text-name{
    bottom: 32%;
    position:absolute;
    font-size:16px;
    white-space:normal;
    left: 5%;
}
.dw_head{
  width:49px;
  height:49px;
  border-radius:50%;
  bottom:36%;
  position:absolute;
  left:11%;
}
.dw-text-address1{
  bottom: 32%;
  position:absolute;
  font-size:14px;
  white-space:normal;
  left: 65%;
}
.all-bg{
  width: 100%
}
</style>
