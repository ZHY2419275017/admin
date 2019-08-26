<template>
 <div>
   <table class="table table-bordered">
				<caption><h4 style="text-align: center;"><b>用户列表</b></h4></caption>
				<thead>
					<tr >
						<th style="text-align: center;">用户名</th>
						<th style="text-align: center;">邮箱</th>
						<th style="text-align: center;">密保问题</th>
						<th style="text-align: center;">密保答案</th>
            <th style="text-align: center;">注册时间</th>
            <th style="text-align: center;">上次更新信息时间</th>
            <th style="text-align: center;">用户角色</th>
            <th style="text-align: center;">操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="user in users" >
						<td>{{user.username}}</td>
						<td>{{user.email}}</td>
						<td>{{user.question}}</td>
            <td>{{user.answer}}</td>
            <td>{{user.createTime}}</td>
            <td>{{user.updateTime}}</td>
            <!-- <td>{{user.role}}</td> -->
            <td v-if="user.role==0">管理员</td>
            <td v-if="user.role==1">用户</td>
						<td>
						  <router-link >跳转</router-link>
							<button class="btn-danger btn"  @click="del(user.id)">删除</button>
							<button class="btn-primary btn" @click="updateUser(user.id)">修改</button>
						</td>
					</tr>

				</tbody>
			</table>



  </div>
</template>

<script>
export default {
  name: 'userlist',
  data () {
    return {
       users:[]
    }
  },
  created:function(){
    this.getList();
  },
  methods:{
    getList:function(){
      this.$http.get("http://192.168.0.23:8085/admin/selectAllUser").then(
        function(result){
          console.log(result.body);
          this.users=result.body
        },function(){
          alert("请求失败");
        }
      )
    },
    del:function(id){
      var y = confirm("确定要删除该用户吗？")
      if(y==true){
        this.$http.get("http://192.168.0.23:8085/admin/deleteByUserId",{
          params:{
            userId:id
          }
        }).then(function(result){
            this.getList();
            alert("删除成功");
        },function(error){
          alert(error);
        })
      }
    },
    updateUser:function(id){
       this.$router.push({
          path:"/updateUser",
          query:{
            userId:id
          }
       })
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
