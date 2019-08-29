import Vue from 'vue'
import Router from 'vue-router'
import productlist from '@/components/productlist'
import userlist from '@/components/userlist'
import addproduct from '@/components/addproduct'
import orderlist from '@/components/orderlist'
import upload from '@/components/upload'
import login from '@/components/login'
import commentlist from '@/components/commentlist'
import updateUser from '@/components/updateUser'
import productupdate from '@/components/productupdate'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/productlist',
      name: 'productlist',
      component: productlist,
      meta: {
        requireAuth: true,  // 判断是否需要登录
      },
    },
    {
      path: '/productupdate',
      name: 'productupdate',
      component: productupdate,
       meta: {
        requireAuth: true,  // 判断是否需要登录
      },
    },
     {
      path: '/userlist',
      name: 'userlist',
      component: userlist,
      meta: {
        requireAuth: true,  // 判断是否需要登录
      },
    },
    {
      path: '/addproduct',
      name: 'addproduct',
      component: addproduct,
       meta: {
        requireAuth: true,  // 判断是否需要登录
      },
    },
    {
      path: '/orderlist',
      name: 'orderlist',
      component: orderlist,
       meta: {
        requireAuth: true,  // 判断是否需要登录
      },
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
    },
    {
      path: '/commentlist',
      name: 'commentlist',
      component: commentlist,
      meta: {
        requireAuth: true,  // 判断是否需要登录
      },
    },
     {
      path: '/updateUser',
      name: 'updateUser',
      component: updateUser,
       meta: {
        requireAuth: true,  // 判断是否需要登录
      },
    }

  ]

})
