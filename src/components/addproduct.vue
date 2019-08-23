<template>
  <div>
   <form class="form-horizontal" role="form">
				<div class="form-group">
					<label for="firstname" class="col-sm-1 control-label">姓名</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="name" v-model="emp.name"  placeholder="请输入姓名">
					</div>
				</div>
				<div class="form-group">
					<label for="lastname" class="col-sm-1 control-label">年龄</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="age" v-model="emp.age" placeholder="请输入年龄">
					</div>
				</div>
				<div class="form-group">
					<label for="lastname" class="col-sm-1 control-label">性别</label>
					<div class="col-sm-10">
						<input type="text" class="form-control" id="sex" v-model="emp.sex" placeholder="请输入性别">
					</div>
				</div>
				<div class="form-group">
					<label for="lastname" class="col-sm-1 control-label">头像</label>
					<div class="col-sm-10">
						<upload @func="synImg"></upload>
					</div>
				</div>
				<div class="form-group">
					<div class="col-sm-10 col-sm-offset-1">
						<button type="button" class="btn btn-default" v-on:click="sub" >提交</button>
					</div>
				</div>
			</form>
  </div>
</template>

<script>
import upload from '@/components/upload'

export default {
  name: 'addproduct',
  data () {
    return {
      emp:{
      	name:'',
      	age:'',
      	sex:''
      },
      imgList:[]

    }
  },
  components:{
  	upload  //组件私有注册
  },
  methods:{
  	synImg:function(data){
  		this.imgList=data;
  	},
  	sub:function(){


  		     var formdata = new FormData();
          	for(var i=0;i<this.imgList.length;i++){
          		formdata.append("file",this.imgList[i].file);
          	}

          	formdata.append("name",this.emp.name);
          	formdata.append("age",this.emp.age);
          	formdata.append("sex",this.emp.sex);
  	     var config={
		  			headers:{
		  				"Content-type":"multipart/form-data",
		  			}
		  		}

		  		this.$http.post("http://localhost:8086/upload",formdata,config).then(
		  			function(result){
		  				console.log(result);
		  				console.log(result.bodyText);
		  				alert("文件上传成功");
		  				this.$router.go(0);
		  			},function(error){
		  				console.log(error.body.message);//打印错误信息
		  			}
		  		)

  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
