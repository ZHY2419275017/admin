// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import resource from 'vue-resource'//从node_modules内导入需要的资源

Vue.use(resource)


Vue.http.options.emulateJSON = true;//ajax发送post请求时必须加的一句话
Vue.config.productionTip = false
Vue.http.options.withCredentials = true

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',

});
//  路由判断登录 根据路由配置文件的参数
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)){  // 判断该路由是否需要登录权限
    console.log('需要登录');
    console.log(sessionStorage.getItem("username")!=null)
     // 判断当前的username是否存在 ；
    if (sessionStorage.getItem("username")!=null) {
      next();
    }
    else {
      next({
        path: '/',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })

      alert("请登录后查看信息")
    }
  }
  else {
    next();
  }
});
