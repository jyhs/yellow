<template>
  <div class="container">
    <h1 class="title_head">礁岩海水到位服务帮助</h1>
    <span class="text_info one ">欢迎访问礁岩海水到位服务，本系统汇集全国各地商家、工作室等资源，方便用户之间沟通，商家用户想加入，请及时联系我们，以便我们帮您加进体统。</span>
    <span class="text_info two">如需其他团购、生物资料等服务，请点击此按钮跳转至礁岩海水小程序首页。</span>
    <button class="button_index" @click='gotoJyhs'>礁岩海水首页</button>  
    <span class="text_info three">大家的支持，是我们服务向前的动力，祝大家在礁岩海水玩的愉快。谢谢大家！</span>
    <span class="text_info four">关注<span style="color:red">环礁湖微信服务号</span>，即可获得在线帮助。</span>
    <span>
    <button open-type="contact" class="button_contact"> 在线帮助</button>
    <button class="button_goback" @click="gotoMap"> 返回</button>
    </span>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },

  methods: {
    gotoMap () {
      wx.navigateBack()
    },
    gotoJyhs () {
      wx.navigateToMiniProgram({
        appId: 'wx9f635f06da7360d7'
      })
    }
  }

}
</script>

<style scoped>
.kefu{
  width: 55px;
  height: 55px;
  position: absolute;
  top: 5%;
  right: 5%;
}
.title_head{
  position:absolute;
  top: 8%;
  font-size:  20px;
}
.text_info{
  width:85% ;
  position:absolute;
  font-family: HelveticaNeue,Helvetica,Arial,sans-serif;
  font-size: 14px;
  color: #9b9b9b;
  text-align: justify;
}
.one {
  top: 18%;
}
.two {
  top: 35%;
}     
.three {
  top: 56%;
}
.four {
  top: 65%;
}
.button_index{
  width:120px ;
  top: 46%;
  left: 8%;
  position:absolute;
  border-radius: 8px;
  background-color: #0082d5;
  color: white;
  font-size: 14px;
}
.button_contact{
  background-color: #2db311;
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: 0;
  color: white;
  width: 60%;
  background-image: url('https://static.huanjiaohu.com/icon/phone.png');
  background-repeat: no-repeat;
}
.button_goback{
  background-color: #5d5d5d;
  position: absolute;
  bottom: 0;
  left: 0;
  border-radius: 0;
  color: white;
  width: 40%;
}
</style>
