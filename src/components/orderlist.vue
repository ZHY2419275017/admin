<template>
 <div>
   <table class="table table-bordered">
				<caption><h4 style="text-align: center;"><b>订单列表</b></h4></caption>
				<thead>
					<tr >
						<th style="text-align: center;">OrderNo</th>
						<th style="text-align: center;">Product</th>
						<th style="text-align: center;">UserId</th>
						<th style="text-align: center;">Address</th>
						<th style="text-align: center;">Status</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="order in orders">
						<td>{{order.orderNo}}</td>
						<td>{{order.userId}}</td>
						<td>{{order.product.name}}</td>
						<td>{{order.address}}</td>

						<td v-if="order.status==1"><button @click="send(order.id)">发货</button></td>
						<td v-else-if="order.status==0">未付款</td>
						<td v-else-if="order.status==2">已发货</td>

					</tr>


				</tbody>
			</table>
      <ul class="pagination" v-for="index in size">
				<li><a href="#" @click="loadlist(index)">{{index}}</a></li>

			</ul>
  </div>
</template>

<script>
export default {
  name: 'orderlist',
  data () {
    return {
       orders:[],
       size:''
    }
  },
  created:function(){
  	this.loadlist(1);
  }, methods:{
  	loadlist:function(page){
  		this.$http.get('http://192.168.0.63:8081/order/selectAll',{params:{page:page}}).then(
  			function(ret){
  				console.log(ret.body);
  				this.orders=ret.body;
  				this.size=this.orders[0].count;
  			},function(){
  				alert("加载数据失败");
  			}
  		)
  	},send:function(id){
  		this.$http.get('http://192.168.0.63:8081/order/updateStatus',{
  			params:{
  				'id':id,
  				'status':2
  			}
  		}).then(function(ret){
  			this.orders=ret.body;
  			alert("已发货");
  		},function(){})
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
