<template>
	<div>
		<form class="form-horizontal" role="form">
			<div class="form-group" hidden="hidden">
				<label for="lastname" class="col-sm-1 control-label">商品id</label>
				<div class="col-sm-10">
					<input type="text" id="id" v-model="product.id" class="form-control" placeholder="请输入年龄">
				</div>
			</div>
			<div class="form-group">
				<label for="firstname" class="col-sm-1 control-label">商品分类</label>
				<div class="col-sm-10">
					<select name="types" style="width:100%;height: 34px;" v-model="product.categoryId" class="form-control" >
						<option v-for="productType in productTypeList" name="categoryId" :value="productType.category_id"  >{{productType.categoryName}}</option>
					</select>
				</div>
			</div>
			<div class="form-group">
				<label for="lastname" class="col-sm-1 control-label">商品名称</label>
				<div class="col-sm-10">
					<input type="text" id="name" v-model="product.name" class="form-control" placeholder="">
				</div>
			</div>
			<div class="form-group" hidden="hidden">
				<label for="lastname" class="col-sm-1 control-label">副标题</label>
				<div class="col-sm-10">
					<input type="text" id="subtitle" v-model="product.subtitle" class="form-control" placeholder="">
				</div>
			</div>

			<div class="form-group">
				<label for="lastname" class="col-sm-1 control-label">价格</label>
				<div class="col-sm-10">
					<input type="text" id="price" v-model="product.price" class="form-control" placeholder="" style="">
				</div>
			</div>
			<div class="form-group">
				<label for="lastname" class="col-sm-1 control-label">库存数量</label>
				<div class="col-sm-10">
					<input type="text" id="stock" v-model="product.stock" class="form-control" placeholder="">
				</div>
			</div>
			<div class="form-group" hidden="hidden">
				<label for="lastname" class="col-sm-1 control-label">商品状态</label>
				<div class="col-sm-10">
					<input type="text" id="status" v-model="product.status" class="form-control" placeholder="">
				</div>
			</div>
			<div class="form-group" hidden="hidden">
				<label for="lastname" class="col-sm-1 control-label">创建时间</label>
				<div class="col-sm-10">
					<input type="text" id="create_time" v-model="product.createTime" class="form-control" placeholder="">
				</div>
			</div>
			<div class="form-group" hidden="hidden">
				<label for="lastname" class="col-sm-1 control-label">更新时间</label>
				<div class="col-sm-10">
					<input type="text" id="update_time" v-model="product.updateTime" class="form-control" placeholder="">
				</div>
			</div>

			<div class="form-group">
				<label for="lastname" class="col-sm-1 control-label">产品主图</label>
				<div class="col-sm-10">
					<img id="main_image" v-bind:src="'http://192.168.0.57:8086/image/'+product.mainImage" />
				</div>
			</div>
			<div class="form-group" hidden="hidden" >
        <p>商品详情</p>
        {{product.detail}}
				<!-- <label for="lastname" class="col-sm-1 control-label">商品详情</label>
				<div class="col-sm-10">
					<input type="text" id="detail" v-model="product.detail" class="form-control" placeholder="">
				</div> -->
			</div>
			<div class="form-group">
				<div class="col-sm-10 col-sm-offset-1">
					<button type="button" class="btn btn-primary" v-on:click="sub">修改</button>
					<button type="button" class="btn btn-default" v-on:click="ret">返回</button>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
	import upload from '@/components/upload'
	export default {
		name: 'productupdate',
		data() {
			return {
				productVo: {
					id: 0,
					category_id: 0,
					name: '',
					subtitle: '',
					main_image: '',
					detail: '',
					price: 0,
					stock: 1,
					status: 0,
					create_time: 0,
					update_time: 0
				},
				product: {},
				productTypeList: [],


			}
		},
		created: function() {
			this.info();
			this.loadProduct();
		},
		components: {
			upload //组件私有注册
		},

		methods: {
			info: function() {
				var id = this.$route.query.id;

				this.$http.get("http://192.168.0.57:8086/ProductManager/selectProductvoById", {
					params: {
						id: id
					}
				}).then(function(result) {
					console.log(result);
					this.productVo.id = result.body.id;
					this.productVo.categoryName = result.body.categoryName;
					this.productVo.name = result.body.name;
					this.productVo.subtitle = result.body.subtitle;
					this.productVo.main_image = result.body.main_image;
					this.productVo.detail = result.body.detail;
					this.productVo.price = result.body.price;
					this.productVo.stock = result.body.stock;
					this.productVo.status = result.body.status;
					this.productVo.create_time = this.dateFormat(result.body.create_time);
					this.productVo.update_time = this.dateFormat(result.body.update_time);
				}, function(error) {
					alert("加载数据失败！！");
				});
       //加载商品信息
        this.$http.get("http://192.168.0.57:8086/product/selectById", {
        	params: {
        		id: id
        	}
        }).then(function(result){
          this.product=result.body
        },function(error){
          alert("数据加载失败11");
        })


			},
			loadProduct: function() {
				this.$http.get("http://192.168.0.57:8086/ProductManager/selectAllTpye").then(
					function(result) {
						console.log(result);
						this.productTypeList = result.body;
					},
					function(error) {
						alert("加载数据失败");
					}
				)
			},
			ret: function() {
				this.$router.push({
					path: "/productlist"

				})
			},

			sub: function() {
       if(confirm("确认要更改信息吗？")){
          this.$http.post("http://192.168.0.57:8086/ProductManager/updateProduct", {
             "id":this.product.id,
             "categoryId":this.product.categoryId,
             "name":this.product.name,
             "price":this.product.price,
             "stock":this.product.stock
          }).then(
            function(result) {
              console.log(result);
              if(result.bodyText=="success"){
                  alert("信息修改成功！")
                  this.$router.push({
                  path: "/productlist"
                  })
              }
            },
            function(error) {
              alert("加载数据失败");
            }
          )
        }

			},

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
	};


</script>

<style scoped>

</style>
