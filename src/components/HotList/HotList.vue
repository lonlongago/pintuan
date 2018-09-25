<template>
	<div class="home">
	    <!--列表-->
	    <div class="view_wrap" ref="viewWrap">
	    	<div class="list_box" ref="listBox">
	    		<scroller :on-infinite="infinite" ref="my_scroller" :scrollTo="scrollTop" :on-refresh="refresh">
		    		<v-productLists :lists="prolists"></v-productLists>
		    	</scroller>
	    	</div>
	    	<!-- <div class="listxian">
	    		<div class="xianone"></div>
	    		<div class="listend">亲，我也是有底线的</div>
	    		<div class="xianone"></div>
	    	</div> -->
	    </div>		
		<!--底部-->
		<v-footer :footerIdx='3'></v-footer>
	</div>
</template>

<script>
import api from '../../../src/api/api.js'
import vFooter from '../../template/Footer/Footer'
import vProductLists from '../../template/ProductList/ProductList'
import BScroll from 'better-scroll'
    import Vue from 'vue';
    import Scroller from 'vue-scroller';
    Vue.use(Scroller);
export default {
	created(){
		this.getvalFn();
		// this.prolists = [
  //           {
  //               tuan_num:530,
  //               title:'【仅限深圳同城地区】夏季 老北京商务运动休闲鞋',
  //               pics:[
  //                   '',
  //                   '',
  //                   ''
  //               ],
  //               price:75,
  //               group_num:4
  //           },
  //           {
  //               tuan_num:530,
  //               title:'【仅限深圳同城地区】夏季 老北京商务运动休闲鞋',
  //               pics:[
  //                   '',
  //                   '',
  //                   ''
  //               ],
  //               price:75,
  //               group_num:4
  //           }
  //       ];
	},
	mounted () {
		document.title=this.title;
		// this.getvalFn();
	},
	data () {
		return {
			prolists: [],
			title:"热榜",
			page: 1,
			scrollTop:(0,0),
			isscroll:false,
		}
	},
	components:{vFooter,vProductLists},
	methods:{
		getvalFn: function(){
			var that = this;
			var page = that.page = 1;
			api.hots({"page": page},function(res){
				console.log(res)
				if(res.error == "0"){
					console.log(22)
					that.prolists = res.data.items;
					console.log(that.prolists)
				}
			})
		},
		infinite(done) {//下拉加载
		  		var that = this;
		  		var page = that.page + 1;
		  		if(!that.isscroll){
		  			setTimeout(()=>{
				      	this.$refs.my_scroller.finishInfinite(2);
				     })
				    // return;
		  		}
        	api.hots({"page": page},function(res){
          	if(res.error == 0){
          		that.page = page;
          		var length = res.data.items.length;
          		if(length > 0){
          			that.prolists = that.prolists.concat(res.data.items);
								if(length >= 10){
									setTimeout(() => {
							          	setTimeout(() => {
							            	done()
							          	})
							        }, 1000);
								}else{
									that.isscroll = false;
			          				setTimeout(() => {
								        done(true)
								    },0);
								}
          		}else{
          			that.isscroll = false;
        				setTimeout(() => {
						        done(true)
						    },0);
          		}
          	}else{
          		// api.tipload(that,res.message);
          	}	            	
        	});		  		
		    },
		    refresh(done) {
		    	//console.log('refresh');
		    	var that = this;
		    	setTimeout(function(){
		    		that.getvalFn();
		    		done();
		    	},1000);
				},
	}
}
</script>


<style type="text/css">
	.view_wrap{padding-bottom: 52px;}
	.listxian{padding: 20px 15%;height: 1px;display: flex;align-items: center;}
	.xianone{height: 1px;background: #999999;width: 20%;}
	.listend{font-size: 13px;color: #666666;text-align: center;flex: 1}
</style>


