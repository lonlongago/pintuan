<template>
	<div class="home">
	    <!--评论内容-->
	    <div class="view_wrap" ref="viewWrap">
	    	<scroller :on-infinite="infinite" ref="my_scroller" :scrollTo="scrollTop" :on-refresh="refresh">
		    	<div class="evaluate" v-for="item in list">
		    		<div class="evauser">
		    			<img :src="item.face" class="userimg">
		    			<div class="username">{{item.nickname}}</div>
		    			<div class="usertime">{{item.dateline}}</div>
		    		</div>
		    		<div class="evacon">{{item.content}}</div>
		    		<div class="evaimg">
		    			<!-- <router-link :to="{path:'/evapicbig?',query: {imgpic: item.photos}}"> -->
			    			<img v-for="em in item.photos" :src="em" class="evaimgone">
			    		<!-- </router-link> -->
		    			<!-- <img src="../../assets/Rectangle 3@2x.png" class="evaimgone">
		    			<img src="../../assets/Rectangle 3@2x.png" class="evaimgone">
		    			<img src="../../assets/Rectangle 3@2x.png" class="evaimgone">
		    			<img src="../../assets/Rectangle 3@2x.png" class="evaimgone"> -->
		    		</div>
		    		<!-- <div style="padding-top: 8px;color: #0075FF;font-size: 12px;padding-right: 6px;">{{item.spec_name}}</div> -->
		    	</div>
		    </scroller>
	    </div>
	    <!-- <div class="imgbox" v-if="imgboxflag" @click="imgboxFn"></div>
	    <div class="imgdan" v-if="imgdanflag == true">
		    <swiper :options="swiperOption">
					<swiper-slide v-for="item in imgallyu" :key="item.id">
						<img :class="isChoose == false ? 'imgchu':'imgact'" :src="item" @click="imgbigFn" alt="">
					</swiper-slide>
					<div class="swiper-pagination" slot="pagination"></div>
				</swiper>
			</div> -->
	</div>
</template>

<script>
import api from '../../../src/api/api.js'
import vFooter from '../../template/Footer/Footer'
import vProductList from '../../template/ProductList/ProductList'
import BScroll from 'better-scroll'
export default {
	created(){
		
	},
	mounted () {
		var that = this;
		document.title=this.title;
		that.getvalFn();
	},
	data () {
		return {
			title:"商品评价",
			product_id: this.$route.query.product_id,
			page: 1,
			list: [],
			scrollTop:(0,0),
			isscroll:false,
		}
	},
	components:{vFooter,vProductList},
	methods:{
		getvalFn: function(){
			var that = this;
			var product_id = that.product_id;
			var page = that.page = 1;
			api.comment({'product_id': product_id,'page': page},function(res){
				console.log(res)
				if(res.error == '0'){
					that.list = res.data.items;
				}
			})
		},
		// imgbigFn(){
		// 	var that = this;
		// 	that.isChoose = !that.isChoose;
		// },
		// imgyuFn: function(e){
		// 	var that = this;
		// 	that.imgallyu = e;
		// 	that.imgdanflag = true;
		// 	that.imgboxflag = true;
		// },
		// imgboxFn(){
		// 	var that = this;
		// 	that.imgdanflag = false;
		// 	that.imgboxflag = false;
		// },
		infinite(done) {//下拉加载
	    	console.log(22)
		  		var that = this;
		  		var page = that.page + 1;
		  		if(!that.isscroll){
		  			console.log(11)
		  			setTimeout(()=>{
				      	this.$refs.my_scroller.finishInfinite(2);
				     })
				    // return;
		  		}
        	api.home({"page": page,"product_id": that.product_id},function(res){
          	if(res.error == 0){
          		console.log(res)
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
	.evaluate{padding: 17px 12px 11px 12px;background: #fff;margin-bottom: 8px;}
	.evauser{display: flex;align-items: center;}
	.userimg{width: 30px;height: 30px;border-radius: 100%;}
	.username{padding-left: 7px;font-size: 16px;color: #333333;flex: 1;}
	.usertime{font-size: 12px;color: #888888;}
	.evacon{font-size: 15px;color: #444444;padding-top: 11px;line-height: 1.5;}
	.evaimg{display: flex;align-items: center;}
	.evaimgone{width: 31%;height: auto;margin-right: 13px;margin-top: 10px;}
	/*.view_wrap{padding-bottom: 52px;}*/
	.listxian{padding: 20px 15%;height: 1px;display: flex;align-items: center;}
	.xianone{height: 1px;background: #999999;width: 20%;}
	.listend{font-size: 13px;color: #666666;text-align: center;flex: 1;}

	.imgbox{background: rgba(0,0,0,1);position: fixed;top: 0;bottom: 0;left: 0;right: 0;z-index: 3;}
	.imgdan{position: fixed;top: 30%;left: 0;right: 0;max-height: 220px;z-index: 5;text-align: center;overflow: hidden;}

	.imgchu {
		transform: scale(1);          /*图片原始大小1倍*/
 		transition: all ease 0.5s;        /*图片放大所用时间*/
 	}  
 	.imgact {     
		 transform: scale(3);          /*图片需要放大3倍*/
		 position: absolute;           /*是相对于前面的容器定位的，此处要放大的图片，不能使用position：relative；以及float，否则会导致z-index无效*/
		 z-index: 6; 
	}  
</style>


