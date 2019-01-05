<template>
  <div class="container">
    <h1 class="title_head">礁岩海水到位服务帮助</h1>
    <span class="text_info_one">欢迎访问礁岩海水到位服务，本系统汇集全国各地商家、工作室等资源，方便用户之间沟通，商家用户想加入，请及时联系我们，以便我们帮您加进体统。</span>
    <span class="text_info_two">如需其他团购、生物资料等服务，请点击此按钮跳转至礁岩海水小程序首页。</span>
    <button class="button_index" >礁岩海水首页</button>  
    <span class="text_info_three">大家的支持，是我们服务向前的动力，祝大家在礁岩海水玩的愉快。谢谢大家！</span>
    <span class="text_info_four">关注<div style="color:red">环礁湖微信服务号</div>，即可获得在线帮助。</span>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },

  methods: {
    onShareAppMessage (res) {
      if (res.from === 'menu') {
      // 来自页面内转发按钮
        console.log(res.target)
      }
      return {
        title: '自定义转发标题',
        path: '/page/user?id=123'
      }
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
.text_info_one{
  width:85% ;
  top: 18%;
  position:absolute;
  font-family: HelveticaNeue,Helvetica,Arial,sans-serif;
  font-size: 14px;
  color: #9b9b9b;
  white-space:normal;
}
.text_info_two{
  width:85% ;
  top: 35%;
  position:absolute;
  font-family: HelveticaNeue,Helvetica,Arial,sans-serif;
  font-size: 14px;
  color: #9b9b9b;
  white-space:normal;
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
.text_info_three{
  width:85% ;
  top: 56%;
  position:absolute;
  font-family: HelveticaNeue,Helvetica,Arial,sans-serif;
  font-size: 14px;
  color: #9b9b9b;
  white-space:normal;
}
.text_info_four{
  width:85% ;
  top: 65%;
  position:absolute;
  font-family: HelveticaNeue,Helvetica,Arial,sans-serif;
  font-size: 14px;
  color: #9b9b9b;
  white-space:normal;
  display:inline-flex;
}
</style>
