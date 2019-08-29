<template>
	<div>
		<table class="table table-bordered">
			<caption>
				<h4 style="text-align: center;"><b>商品信息列表</b></h4></caption>
			<thead>
				<tr>

					<th style="text-align: center;">商品id</th>
					<th style="text-align: center;">商品分类</th>
					<th style="text-align: center;">商品名称</th>

					<th style="text-align: center;">产品主图</th>

					<th style="text-align: center;">价格</th>
					<th style="text-align: center;">库存数量</th>
					<th style="text-align: center;">商品状态</th>
					<th style="text-align: center;">创建时间</th>
					<th style="text-align: center;">更新时间</th>
					<th style="text-align: center;">操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="product in products">
					<td>{{product.id}}</td>
					<td>{{product.categoryName}}</td>
					<td>{{product.name}}</td>

					<td>
						<img id="main_image" style="height: 50px; width: 50px;" v-bind:src="'http://192.168.0.57:8086/image/'+product.main_image" />
					</td>
					<!--<td>{{product.main_image}}</td>-->
					<td>{{product.price}}</td>
					<td>{{product.stock}}</td>
					<td v-if="product.status==1">在售</td>
					<td v-if="product.status==2">下架</td>
					<td v-if="product.status==3">已删除</td>
					<td><span> {{dateFormat(product.create_time)}}</span></td>
					<td>{{dateFormat(product.update_time)}}</td>

					<td>
						<router-link>跳转</router-link>
						<button class="btn btn-info" @click="update(product.id)">修改</button>
						<button class="btn btn-danger" v-on:click="del(product.id,product.status)">删除</button>
						<button class="btn btn-warning" @click="down(product.id,product.status)">下架</button>
						<button class="btn btn-success" v-on:click="upper(product.id,product.status)">上架</button>

					</td>
				</tr>

			</tbody>
		</table>
		<ul class="pagination">
			<li>
				<a class="btn" v-bind:class="{disabled:pageinfo.pageNum==1}" href="javascript:void(0)" v-on:click="prePage()">上一页</a>
			</li>
			<template v-for="item in pageinfo.pages">
				<li v-bind:class="{active:item==pageinfo.pageNum}">
					<a href="javascript:void(0)" v-on:click="goPage(item)">{{item}}</a>
				</li>
			</template>
			<li>
				<a class="btn" v-bind:class="{disabled:pageinfo.pageNum==pageinfo.pages}" href="javascript:void(0)" v-on:click="nextPage()">下一页</a>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'productlist',
		data() {
			return {
				products: [],
				pageinfo: {
					isFirstPage: '', //是否是第一页
					isLastPage: '', //是否是最后一页
					pageNum: '1', //当前页号
					pageSize: '8', //每页大小
					pages: '' //导航条
				}
			}
		},
		created: function() {
			this.loadProduct();
		},
		methods: {
			//商品列表的加载展示
			loadProduct: function() {
				this.$http.get("http://192.168.0.57:8086/ProductManager/selectAll", {
					params: {
						pageNum: this.pageinfo.pageNum,
						pageSize: this.pageinfo.pageSize
					}
				}).then(
					function(result) {

						this.products = result.body.list;
						this.pageinfo.isFirstPage=result.body.isFirstPage;
			            this.pageinfo.isLastPage=result.body.isLastPage;
			            this.pageinfo.pageNum=result.body.pageNum;
			            this.pageinfo.pageSize=result.body.pageSize;
			            this.pageinfo.pages=result.body.pages;
					},
					function(error) {
						alert("加载数据失败");
					}
				)
			},
			prePage: function() {
				//当前页码减一后重新发送请求
				this.$http.get("http://192.168.0.57:8086/ProductManager/selectAll", {
					params: {
						pageNum: this.pageinfo.pageNum - 1,
						pageSize: this.pageinfo.pageSize

					}

				}).then(function(result) {
					console.log(result.body.pageNum);
						this.products = result.body.list;
						this.pageinfo.isFirstPage=result.body.isFirstPage;
			            this.pageinfo.isLastPage=result.body.isLastPage;
			            this.pageinfo.pageNum=result.body.pageNum;
			            this.pageinfo.pageSize=result.body.pageSize;
			            this.pageinfo.pages=result.body.pages;

				}, function(error) {
					alert(error)
				})
			},
			goPage: function(item) {
				this.$http.get("http://192.168.0.57:8086/ProductManager/selectAll", {
					params: {
						pageNum: item,
						pageSize: this.pageinfo.pageSize
					}
				}).then(function(result) {

					this.products = result.body.list;
					this.pageinfo.isFirstPage = result.body.isFirstPage;
					this.pageinfo.isLastPage = result.body.isLastPage;
					this.pageinfo.pageNum = result.body.pageNum;
					this.pageinfo.pageSize = result.body.pageSize;
					this.pageinfo.pages = result.body.pages;

				}, function(error) {
					alert(error)
				})
			},
			nextPage: function() {
				//当前页加一之后重新发送请求
				this.$http.get("http://192.168.0.57:8086/ProductManager/selectAll", {
					params: {
						pageNum: this.pageinfo.pageNum + 1,
						pageSize: this.pageinfo.pageSize
					}
				}).then(function(result) {

					this.products = result.body.list;
					this.pageinfo.isFirstPage = result.body.isFirstPage;
					this.pageinfo.isLastPage = result.body.isLastPage;
					this.pageinfo.pageNum = result.body.pageNum;
					this.pageinfo.pageSize = result.body.pageSize;
					this.pageinfo.pages = result.body.pages;
				}, function(error) {
					alert(error)
				})
			},
			//商品的假删除
			del: function(id, status) {
				if(status != 3) {
					this.$http.get("http://192.168.0.57:8086/ProductManager/deleteProductByPrimaryKey", {
						params: {
							id: id
						}
					}).then(
						function(result) {
							alert("删除成功");
							this.loadProduct();
						},
						function(error) {
							alert("加载数据失败");
						}
					)
				} else {
					alert("商品已删除无法再次删除！！");
				}

			},
			//商品的下架
			down: function(id, status) {
				if(status == 1) {
					this.$http.get("http://192.168.0.57:8086/ProductManager/productDown", {
						params: {
							id: id
						}
					}).then(
						function(result) {

							alert("下架成功");
							this.loadProduct();
						},
						function(error) {
							alert("加载数据失败");
						}
					)
				} else if(status == 2) {
					alert("商品已下架！！");
				} else {
					alert("商品已删除无法下架！！");
				}

			},

			//商品的上架
			upper: function(id, status) {

				if(status != 1) {
					this.$http.get("http://192.168.0.57:8086/ProductManager/productUp", {
						params: {
							id: id
						}
					}).then(
						function(result) {
							alert("上架成功");
							this.loadProduct();
						},
						function(error) {
							alert("加载数据失败");
						}
					)
				} else {
					alert("商品已上架无法再次上架！！");
				}

			},
			//商品的修改
			update: function(id) {
				this.$router.push({
					path: "/productupdate",
					query: {
						id: id
					}
				})
			},
			/*mouseOut1:function(){
		document.getElementById('main_image').style.width='50px';
  		document.getElementById('main_image').style.height='50px'
  	},*/
			dateFormat: function(time) {
				var date = new Date(time);
				var year = date.getFullYear();
				/* 在日期格式中，月份是从0开始的，因此要加0
				 * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
				 * */
				var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
				var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
				var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
				var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
				var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				// 拼接
				return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
