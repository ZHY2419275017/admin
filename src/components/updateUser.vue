<template>
  <div class="container">
	<div class="row clearfix">
		<div class="col-md-10 column">
      <h3>修改用户信息</h3>
			<form class="form-horizontal" role="form">
				<div class="form-group">
					 <label class="col-sm-2 control-label">用户名</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="inputEmail3" v-model="username"  readonly="readonly"/>
					</div>
				</div>
				<div class="form-group">
					 <label  class="col-sm-2 control-label">邮箱</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="inputPassword3" v-model="email" />
					</div>
				</div>
        <div class="form-group">
        	 <label  class="col-sm-2 control-label">手机号码</label>
        	<div class="col-sm-10">
        		<input type="text" class="form-control" id="inputEmail3" v-model="phone" />
        	</div>
        </div>
        <div class="form-group">
        	 <label  class="col-sm-2 control-label">密保问题</label>
        	<div class="col-sm-10">
        		<input type="text" class="form-control" id="inputPassword3" v-model="question" />
        	</div>
        </div>
         <div class="form-group">
        	 <label  class="col-sm-2 control-label">密保答案</label>
        	<div class="col-sm-10">
        		<input type="text" class="form-control" id="inputPassword3" v-model="answer" />
        	</div>
        </div>



				<div class="form-group">
					<div class="col-sm-offset-2 col-sm-10">
						 <button type="button" class="btn btn-primary" @click="updateUser">修改</button>
             <button type="button" class="btn btn-default" @click="goBack">返回</button>
					</div>

				</div>
			</form>
		</div>
	</div>
</div>
</template>

<script>
  export default {
    name: 'updateUser',
    data () {
      return {
         id:'',
         username:'',
         email:'',
         phone:'',
         question:'',
         answer:'',
      }
    },
    created:function(){
      this.getUserInfo();
    },
    methods:{
      getUserInfo:function(){
         var userId =  this.$route.query.userId;
         this.$http.get("http://192.168.0.23:8085/admin/selectUserByUserId",{
           params:{
             userId:userId
           }
         }).then(function(result){
            console.log(result.body);
            this.id=result.body.id;
            this.username=result.body.username;
            this.email=result.body.email;
            this.phone=result.body.phone;
            this.question=result.body.question;
            this.answer=result.body.answer;
         },function(error){
           alert("请求失败！");
         })
      },
      updateUser:function(){
        if(confirm("确认修改吗？")){
          this.$http.put("http://192.168.0.23:8085/admin/updateUser",{
            'id':this.id,
            'username':this.username,
            'email':this.email,
            'phone':this.phone,
            'question':this.question,
            'answer':this.answer
          }).then(function(result){
              if(result.bodyText=='success'){
                alert("修改成功！")
                 this.$router.push({
                  path:"/userlist"
                 })
              }
              if(result.bodyText=='error'){
                alert("更新失败！")
              }
          },function(error){
             alert("请求失败")
          })
        }

      },
      goBack:function(){
          this.$router.push({
           path:"/userlist"
          })
      }

    }

  }
</script>

<style>
</style>
