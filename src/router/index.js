import Vue from 'vue'
import Router from 'vue-router'
import productlist from '@/components/productlist'
import userlist from '@/components/userlist'
import addproduct from '@/components/addproduct'
import orderlist from '@/components/orderlist'
import upload from '@/components/upload'
import login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/productlist',
      name: 'productlist',
      component: productlist
    },
     {
      path: '/userlist',
      name: 'userlist',
      component: userlist
    },
    {
      path: '/addproduct',
      name: 'addproduct',
      component: addproduct
    },
    {
      path: '/orderlist',
      name: 'orderlist',
      component: orderlist
    },
    {
      path: '/upload',
      name: 'upload',
      component: upload
    },
     {
      path: '/',
      name: 'login',
      component: login
    }
  ]
})
