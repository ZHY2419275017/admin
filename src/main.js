// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import resource from 'vue-resource'//从node_modules内导入需要的资源
Vue.use(resource)

Vue.http.options.emulateJSON = true;//ajax发送post请求时必须加的一句话
Vue.config.productionTip = false
Vue.http.options.withCredential = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
