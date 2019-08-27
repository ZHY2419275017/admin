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
					<tr v-for="user in page.list" >
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

     <ul class="pagination" >
      <li ><a class="btn" v-bind:class="{disabled:page.pageNum==1}" href="javascript:void(0)" v-on:click="prePage()">上一页</a></li>
       <template v-for="item in page.pages">
         <li v-bind:class="{active:item==page.pageNum}"><a href="javascript:void(0)" v-on:click="goPage(item)">{{item}}</a></li>
       </template>
      <li><a class="btn" v-bind:class="{disabled:page.pageNum==page.pages}" href="javascript:void(0)"  v-on:click="nextPage()">下一页</a></li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'userlist',
  data () {
    return {
       page:''
    }
  },
  created:function(){
    this.getList();
  },
  methods:{
    getList:function(){
      this.$http.get("http://192.168.0.23:8085/admin/selectAllUser",{
        params:{
          pageNum:1,
          pageSize:6
        }
      }).then(
        function(result){
          // console.log(result.body);
          this.page=result.body
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
          alert("请求失败");
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
    },
    prePage:function(){
      //当前页码减一后重新发送请求
       this.$http.get("http://192.168.0.23:8085/admin/selectAllUser",{
         params:{
           pageNum:this.page.pageNum-1,
           pageSize:this.page.pageSize
         }
       }).then(function(result){
          this.page=result.body
       },function(error){
          alert("请求失败")
       })
    },
    goPage:function(item){
         this.$http.get("http://192.168.0.23:8085/admin/selectAllUser",{
          params:{
            pageNum:item,
            pageSize:this.page.pageSize
          }
        }).then(function(result){
           this.page=result.body
        },function(error){
           alert("请求失败")
        })

    },
    nextPage:function(){
        this.$http.get("http://192.168.0.23:8085/admin/selectAllUser",{
          params:{
            pageNum:this.page.pageNum+1,
            pageSize:this.page.pageSize
          }
        }).then(function(result){
           this.page=result.body
        },function(error){
           alert("请求失败")
        })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
