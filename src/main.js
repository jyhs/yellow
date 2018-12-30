import Vue from 'vue'
import App from './App'
import {post, get} from './utils/index.js'

Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$post = post
Vue.prototype.$get = get

const app = new Vue(App)
app.$mount()
