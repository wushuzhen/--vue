// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

Vue.use(VueResource)

Vue.config.productionTip = false

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

Vue.use(MintUI)

// 配置根域名
Vue.http.options.root = 'http://www.lovegf.cn:8899/'

// 配置默认的post提交数据类型为传统表单
Vue.http.options.emulateJSON = true

// 导入moment包
import moment from 'moment'

// 定义全局过滤器 : dateFormat

Vue.filter('dateFormat', (content, pattern = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(content).format(pattern)
})

import comment from './components/common/comment'
// 定义全局组件, 参数1: 组件名 决定了将来如何使用 参数2: 组件对象
Vue.component('comment', comment)

import VuePreview from 'vue2-previeww'
Vue.use(VuePreview)
import store from './store'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store  // 将store挂载到vue实例身上
})
