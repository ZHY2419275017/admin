<template>
	<div>
		<form class="form-horizontal" role="form">
			<div class="form-group" hidden="hidden">
				<label for="lastname" class="col-sm-1 control-label">商品id</label>
				<div class="col-sm-10">
					<input type="text" id="id" v-model="productVo.id" class="form-control" placeholder="请输入年龄">
				</div>
			</div>
			<div class="form-group">
				<label for="firstname" class="col-sm-1 control-label">商品分类</label>
				<div class="col-sm-10">
					<select name="types" style="width:100%;height: 34px;" v-model="categoryName" class="form-control">
						<option v-for="productType in productTypeList":value="productType.category_id">{{productType.categoryName}}</option>
					</select>
					<!--<select name="types" style="width: 100%;height: 34px" v-model="productVo.categoryName" class="form-control">
						<option id="categoryName" selected="selected" value="productVo.categoryName">{{productVo.categoryName}}</option>
						<option id="categoryName" value="productVo.categoryName">饮料</option>
						<option id="categoryName" value="productVo.categoryName">空调</option>
					</select>-->
				</div>
			</div>
			<div class="form-group">
				<label for="lastname" class="col-sm-1 control-label">商品名称</label>
				<div class="col-sm-10">
					<input type="text" id="name" v-model="productVo.name" class="form-control" placeholder="输入商品名">
				</div>
			</div>
			<div class="form-group" hidden="hidden">
				<label for="lastname" class="col-sm-1 control-label">副标题</label>
				<div class="col-sm-10">
					<input type="text" id="subtitle" v-model="productVo.subtitle" class="form-control" placeholder="">
				</div>
			</div>

			<div class="form-group">
				<label for="lastname" class="col-sm-1 control-label">价格</label>
				<div class="col-sm-10">
					<input type="text" id="price" v-model="productVo.price" class="form-control" placeholder="输入价格">
				</div>
			</div>
			<div class="form-group">
				<label for="lastname" class="col-sm-1 control-label">库存数量</label>
				<div class="col-sm-10">
					<input type="text" id="stock" v-model="productVo.stock" class="form-control" placeholder="输入库存数">
				</div>
			</div>
			<div class="form-group" hidden="hidden">
				<label for="lastname" class="col-sm-1 control-label">商品状态</label>
				<div class="col-sm-10">
					<input type="text" id="status" v-model="productVo.status" class="form-control" >
				</div>
			</div>
			<div class="form-group"  hidden="hidden">
				<label for="lastname" class="col-sm-1 control-label">创建时间</label>
				<div class="col-sm-10">
					<input type="text" id="create_time" v-model="productVo.create_time" class="form-control" placeholder="">
				</div>
			</div>
			<div class="form-group"  hidden="hidden">
				<label for="lastname" class="col-sm-1 control-label">更新时间</label>
				<div class="col-sm-10">
					<input type="text" id="update_time" v-model="productVo.update_time" class="form-control" placeholder="">
				</div>
			</div>

			<div class="form-group">
				<label for="lastname" class="col-sm-1 control-label">产品主图</label>
				<div class="col-sm-10">
					<upload @func="synImg" id="main_image" v-model="productVo.main_image"></upload>
				</div>
			</div>
			<div class="form-group" hidden="hidden">
				<label for="lastname" class="col-sm-1 control-label">商品详情</label>
				<div class="col-sm-10">
					<input type="text" id="detail" v-model="productVo.detail" class="form-control" placeholder="">
				</div>
			</div>
			<div class="form-group">
				<div class="col-sm-10 col-sm-offset-1">
					<button type="button" class="btn btn-default" v-on:click="sub">提交</button>
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
					categoryName: '',
					name: '',
					subtitle: '',
					main_image: '',
					detail: '',
					price: '',
					stock: '',
					status: 1,
					create_time: '',
					update_time: ''
				},
				productTypeList: []

			}
		},
		created: function() {

			this.loadProduct();
		},
		components: {
			upload //组件私有注册
		},

		methods: {

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

			synImg: function(data) {
				this.imgList = data;
			},
			sub: function() {

				var formdata = new FormData();


				formdata.append("name", this.emp.name);
				formdata.append("age", this.emp.age);
				formdata.append("sex", this.emp.sex);
				formdata.append("file", this.imgList.file);
				var config = {
					headers: {
						"Content-type": "multipart/form-data",
					}
				}

				this.$http.post("http://192.168.0.57:8086/upload", formdata, config).then(
					function(result) {
						console.log(result);
						console.log(result.bodyText);
						alert("文件上传成功");
						this.$router.go(0);
					},
					function(error) {
						console.log(error.body.message); //打印错误信息
					}
				)

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
	}
</script>

<style scoped>

</style>
