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
							<button class="btn-primary btn" id="modal-751906" href="#modal-container-751906"  data-toggle="modal"  >修改</button>
						</td>
					</tr>

				</tbody>
			</table>


      <!--弹出层-->
       <div class="modal fade" id="modal-container-751906" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
						<h4 class="modal-title" id="myModalLabel">
							修改信息
						</h4>
					</div>

					<div class="modal-body">
						<form action="" method="post">
		                    <div class="form-group">
		                        <label for="recipient-name" class="control-label">字段1:</label>
		                        <input type="text" class="form-control" id="recipient-name">
		                    </div>
		                    <div class="form-group">
		                        <label for="message-text" class="control-label">字段2:</label>
		                        <input type="text" class="form-control" id="recipient-name">
		                    </div>
		                    <div class="form-group">
		                        <label for="message-text" class="control-label">字段3:</label>
		                        <input type="text" class="form-control" id="recipient-name">
		                    </div>
		                    <div class="form-group">
		                        <label for="message-text" class="control-label">字段4:</label>
		                        <input type="text" class="form-control" id="recipient-name">
		                    </div>
		                </form>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
						<button type="submit" class="btn btn-primary">修改</button>
					</div>
					</form>
				</div>

			</div>

	    </div>
		<!--弹出层结束-->

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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
