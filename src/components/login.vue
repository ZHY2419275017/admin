<template>
<div >

 <div class="container">
			<br /><br /><br />
			<br /><br /><br />
			<h2 style="text-align:center">请登录</h2>
			<div class="col-md-6 col-md-offset-3">
				<form action="loginServlet" method="post">

					<div class="form-group has-feedback">
						<label for="username">用户名{{admin.username}}</label>
						<div class="input-group">
							<span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
							<input v-model="admin.username" id="username" class="form-control" type="text" name="username" required autocomplete="off" maxlength="20" placeholder="请输入您的用户名">
						</div>
						    <span id="usernameMsg" style="color:red;" class="tips"></span>
							<span id="usernameOk" style="display: none;" class="glyphicon glyphicon-ok form-control-feedback"></span>

					</div>

					<div class="form-group has-feedback">
						<label for="password">密码{{admin.password}}</label>
						<div class="input-group">
							<span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
							<input v-model="admin.password" id="password" class="form-control" name="password" required placeholder="请输入密码" maxlength="20" type="password">

						</div>
						<span id="passwordMsg" style="color:red;" class="tips"></span>
						<span id="passwordOk" style="display: none;" class="glyphicon glyphicon-ok form-control-feedback"></span>
						<br />
						<span>忘记密码？<a href="#">找回密码</a></span>
					</div>

					<div class="form-group">
						<input @click="login" type="button" class="form-control btn btn-primary" id="submit" value="登录">
					</div>
        </form>
    </div>
</div>
</div>
</template>

<script>
export default {
  name: 'login',
   data () {
      return {
         admin:{
           username:"",
           password:""
         }
      }
    },

      methods: {
        login:function(){
            if(this.admin.username == ''|| this.admin.password == ''){
                alert("用户名或密码不能为空"); return;
            }
           this.$http.get("http://127.0.0.1:8085/admin/login",{
             params:{
               username:this.admin.username,
               password:this.admin.password
             }
           }).then(function(result){
               alert(result.bodyText);
               if(result.bodyText=='success'){
                 //转到成功页面
                this.$router.push({
                path:"/userlist"
               })
               }
           },function(error){
               alert("请求失败");
           })
        }

      }


}
</script>

<style scoped>

</style>
