<template>
 <div>
   <table class="table table-bordered">
				<caption><h4 style="text-align: center;"><b>用户列表</b></h4></caption>
				<thead>
					<tr >
						<th style="text-align: center;">字段1</th>
						<th style="text-align: center;">字段2</th>
						<th style="text-align: center;">字段3</th>
						<th style="text-align: center;">字段4</th>
					</tr>
				</thead>
				<tbody>
					<tr >
						<td></td>
						<td></td>
						<td></td>
						<td>
						  <router-link >跳转</router-link>
							<button class="btn-default btn" >删除</button>
							<button class="btn-default btn" >修改</button>
						</td>
					</tr>
          <tr >
          	<td></td>
          	<td></td>
          	<td></td>
          	<td>
          	  <router-link >跳转</router-link>
          		<button class="btn-default btn" >删除</button>
          		<button class="btn-default btn" >修改</button>
          	</td>
          </tr>
          <tr >
          	<td></td>
          	<td></td>
          	<td></td>
          	<td>
          	  <router-link >跳转</router-link>
          		<button class="btn-default btn" >删除</button>
          		<button class="btn-default btn" >修改</button>
          	</td>
          </tr>

				</tbody>
			</table>
      <ul class="pagination">
				<li><a href="#">&laquo;</a></li>
				<li class="active"><a href="#">1</a></li>
				<li class="disabled"><a href="#">2</a></li>
				<li><a href="#">3</a></li>
				<li><a href="#">4</a></li>
				<li><a href="#">5</a></li>
				<li><a href="#">&raquo;</a></li>
			</ul>
  </div>
</template>

<script>
export default {
  name: 'userlist',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
