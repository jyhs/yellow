<template>
  <div class="container">
      <map id="myMap"  :longitude="centerX" :latitude="centerY" :scale="scale" @controls="controls" @controltap="controltap" :include-points="includePoints" :markers="markers" @markertap="markertap" @regionchange="regionchange" @tap="hidentap" show-location :style="winStyle"></map>
      <div v-show="showDetail" class="all-bg">
      <cover-image class='bg' src='/static/dw_bg.png'></cover-image>
      <cover-image src='/static/dw_call.png' @click='callSomeone' class='dw_call'></cover-image>
      <cover-image src='/static/dw_msg.png' class='dw_msg'></cover-image>
      <cover-image src='https://api2.huanjiaohu.com/user/getAvatar?userId=5157' class='dw_head'></cover-image>
      <cover-view class='dw-text-body'>立即购买大是大非水电费水电费水电费水电费水电费沙发上发呆水电费水电费给对方更好</cover-view>
      <cover-view class='dw-text-name'>秋天的故事</cover-view>
      <cover-view class='dw-text-address1'>上海市浦东新区</cover-view>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      types: ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'],
      typeIndex: 3,
      scale: 10,
      colors: ['light', 'stable', 'positive', 'calm', 'balanced', 'energized', 'assertive', 'royal', 'dark'],
      colorIndex: 4,
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
      popupVisible: false,
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
      console.log(e.type)
      if (e.type === 'end') {
        this.scale = e.scale
      }
    },
    markertap (e) {
      this.showDetail = true
    },
    hidentap (e) {
      this.showDetail = false
    },
    controltap (e) {
      console.log(e.controlId)
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
        height: 48
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
