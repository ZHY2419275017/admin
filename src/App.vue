<template>
  <div id="app">
    <div class="container">
      <nav class="navbar navbar-default navbar-inverse" role="navigation">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span
              class="icon-bar"></span></button> <a  class="navbar-brand" href="#">Bee商城后台管理系统</a>
        </div>

        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav">
            <li>
              <RouterLink to="/userlist"> <span class="glyphicon glyphicon-user"></span> 用户管理</RouterLink>
            </li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">商品管理<strong class="caret"></strong></a>
              <ul class="dropdown-menu">
                <li>
                  <RouterLink to="/productlist">商品信息管理</RouterLink>
                </li>
                <li class="divider">
                </li>
                <li>
                  <RouterLink to="/addproduct">增加商品信息</RouterLink>
                </li>
              </ul>
            </li>
            <li>
               <RouterLink to="/orderlist">订单管理</RouterLink>
            </li>
            <li>
               <RouterLink to="/commentlist">评价管理</RouterLink>
            </li>
          </ul>

          <ul class="nav navbar-nav navbar-right">
            <li class="active">
              <a href="#"> <span class="glyphicon glyphicon-user"></span> 欢迎：{{admin.username}}管理员</a>
            </li>
           <!-- <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">个人中心<strong class="caret"></strong></a>
              <ul class="dropdown-menu">
                <li>
                  <a href="#">个人信息修改</a>
                </li>
                <li class="divider">
                </li>
                <li>
                  <a href="#">修改密码</a>
                </li>
              </ul>
            </li> -->
            <li class="active" v-if="admin.username==null">
              <RouterLink to="/">登录</RouterLink>
            </li>
            <li class="active" v-if="admin.username!=null">
              <a href="javascript:void(0)" v-on:click="logout"><span class="glyphicon glyphicon-log-out"></span>退出</a>
            </li>
          </ul>
        </div>
      </nav>

      <router-view />

    </div>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data () {
      return {
         admin:{
           username:"请登录"
         }
      }
    },
    mounted:function(){
      this.getUsername(),
      setInterval(this.getUsername(),500)
    },
    methods:{
      getUsername:function(){
         this.admin.username=sessionStorage.getItem("username");
         router.go(0)
      },
      logout:function(){
         sessionStorage.removeItem("username");
         this.admin.username=sessionStorage.getItem("username");
          this.$router.push({
           path: "/"
           })
      }
    }

  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    /* margin-top: 60px; */
  }
</style>
