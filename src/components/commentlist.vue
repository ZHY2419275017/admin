<template>
  <div class="container">
	<div class="row clearfix">
    <h3>评价管理</h3>
		<div class="col-md-12 column" v-for="comment in  commentList">
			<div class="panel panel-primary">
				<div class="panel-heading">
					<h4 class="panel-title">
           {{comment.name}}
					</h4>
				</div>
				<div class="panel-body" >
           <b>评价标题</b> ：{{comment.comTitle}}
            <br>
           <b>评价内容</b> ：{{comment.comContent}}
            <br>
            <b>评价分数</b>：{{comment.comScore}}
            <br>
            <b>评价日期</b>：{{comment.comTime}}
            <br>
            <b>用户</b> ：{{comment.username}}
				</div>
				<!-- <div class="panel-footer">
					Panel footer
				</div> -->
			</div>
       <button type="button" class="btn btn-block btn-danger active" @click="del(comment.id)">删除该评价</button>
       <hr size="5px">
		</div>

    <ul class="pagination" >
    	<li ><a class="btn" v-bind:class="{disabled:pageinfo.pageNum==1}" href="javascript:void(0)" v-on:click="prePage()">上一页</a></li>
      <template v-for="item in pageinfo.pages">
        <li v-bind:class="{active:item==pageinfo.pageNum}"><a href="javascript:void(0)" v-on:click="goPage(item)">{{item}}</a></li>
      </template>
    	<li><a class="btn" v-bind:class="{disabled:pageinfo.pageNum==pageinfo.pages}" href="javascript:void(0)"  v-on:click="nextPage()">下一页</a></li>
    </ul>
	</div>

</div>
</template>

<script>
  export default {
    name: 'commentlist',
     data () {
        return {
           commentList:[],
           pageinfo:{
             isFirstPage: '',//是否是第一页
             isLastPage: '', //是否是最后一页
             pageNum:'1',//当前页号
             pageSize:'3',//每页大小
             pages:''//导航条
           }
        }
      },
      created:function(){
        this.getList();
      },
      methods:{
        getList:function(){
           this.$http.get("http://192.168.0.23:8083/adminComment/selectAll",{
             params:{
              pageNum:this.pageinfo.pageNum,
              pageSize:this.pageinfo.pageSize
             }
           }).then(
             function(result){
             console.log(result.body);
             this.commentList=result.body.list;
             this.pageinfo.isFirstPage=result.body.isFirstPage;
             this.pageinfo.isLastPage=result.body.isLastPage;
             this.pageinfo.pageNum=result.body.pageNum;
             this.pageinfo.pageSize=result.body.pageSize;
             this.pageinfo.pages=result.body.pages;

           },function(error){

           })
        },
        prePage:function(){
          //当前页码减一后重新发送请求
          this.$http.get("http://192.168.0.23:8083/adminComment/selectAll",{
            params:{
              pageNum:this.pageinfo.pageNum-1,
              pageSize:this.pageinfo.pageSize
            }
          }).then(function(result){
            console.log(result.body);
             this.commentList=result.body.list;
             this.pageinfo.isFirstPage=result.body.isFirstPage;
             this.pageinfo.isLastPage=result.body.isLastPage;
             this.pageinfo.pageNum=result.body.pageNum;
             this.pageinfo.pageSize=result.body.pageSize;
             this.pageinfo.pages=result.body.pages;

          },function(error){
            alert(error)
          })
        },
        goPage:function(item){
          this.$http.get("http://192.168.0.23:8083/adminComment/selectAll",{
           params:{
             pageNum:item,
             pageSize:this.pageinfo.pageSize
           }
         }).then(function(result){
           console.log(result.body);
            this.commentList=result.body.list;
            this.pageinfo.isFirstPage=result.body.isFirstPage;
            this.pageinfo.isLastPage=result.body.isLastPage;
            this.pageinfo.pageNum=result.body.pageNum;
            this.pageinfo.pageSize=result.body.pageSize;
            this.pageinfo.pages=result.body.pages;

         },function(error){
           alert(error)
         })
        },
        nextPage:function(){
          //当前页加一之后重新发送请求
          this.$http.get("http://192.168.0.23:8083/adminComment/selectAll",{
            params:{
              pageNum:this.pageinfo.pageNum+1,
              pageSize:this.pageinfo.pageSize
            }
          }).then(function(result){
            console.log(result.body);
             this.commentList=result.body.list;
             this.pageinfo.isFirstPage=result.body.isFirstPage;
             this.pageinfo.isLastPage=result.body.isLastPage;
             this.pageinfo.pageNum=result.body.pageNum;
             this.pageinfo.pageSize=result.body.pageSize;
             this.pageinfo.pages=result.body.pages;
          },function(error){
            alert(error)
          })
        },
        del:function(id){
          var y = confirm("确认要删除该评价吗？")
            if(y==true){
               this.$http.get("http://192.168.0.23:8083/adminComment/delete",{
                  params:{
                    id:id
                  }
                }).then(function(result){
                   console.log(result.body);
                   this.commentList=result.body.list;
                   this.pageinfo.isFirstPage=result.body.isFirstPage;
                   this.pageinfo.isLastPage=result.body.isLastPage;
                   this.pageinfo.pageNum=result.body.pageNum;
                   this.pageinfo.pageSize=result.body.pageSize;
                   this.pageinfo.pages=result.body.pages;
                },function(error){
                   alert(error);
                })
            }
          }

      }
  }
</script>

<style>
  hr {
      margin-top: 7px;/*解决ie和ff margin-top不一致问题*/
     *margin: 0;/**/
      border: 0;/*是去掉fierfoxf的一条阴影线*/
      color: black; /*是设置ie老版本水平线的颜色；*/
      background-color: black;/* 设置fierfox 下水平线的高度*/
      height: 2px;/* 水平高度*/
}
</style>
