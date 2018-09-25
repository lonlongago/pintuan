<template>
	<div class="home">
	    <div class="shop_top">
			<img :src="shopdetail.detail.logo" class="spimgone">
			<div class="shopstit">{{shopdetail.detail.title}}</div>
			<div class="shopway">
				<a style="display: flex;flex: 1;" :href="'tel:'+shopdetail.detail.phone">
					<div style="flex:0.8;text-align:right;">
						<img src="../../assets/Page 1@2x.png" class="callimg">
					</div>
					<div class="callone">联系客服</div>
				</a>
			</div>
	    </div>
	    <!--列表-->
	    <div class="view_wrap" ref="viewWrap">
	    	<div class="list_box" ref="listBox">
	    		<scroller ref="my_scroller" :scrollTo="scrollTop" :on-refresh="refresh">
		    		<div v-if="prolists.length != 0">
		    			<v-productList :lists="prolists"></v-productList>
		    		</div>
		    		<div v-else class="shopsno">亲,该店铺没有拼单商品哟</div>
		    	</scroller>
	    	</div>
	    	<!-- <div class="listxian">
	    		<div class="xianone"></div>
	    		<div class="listend">亲，我也是有底线的</div>
	    		<div class="xianone"></div>
	    	</div> -->
	    </div>		
		<!--底部-->
		<!-- <v-footer :footerIdx='3'></v-footer> -->
	</div>
</template>

<script>
import api from '../../../src/api/api.js'
import vFooter from '../../template/Footer/Footer'
import vProductList from '../../template/ProductList/ProductList'
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
	},
	data () {
		return {
			catelist:[],
			prolists:[],
			title:"商铺详情",
			shopdetail: [],
			shop_id: this.$route.query.shop_id || '',
			scrollTop:(0,0),
			isscroll:false,
		}
	},
	components:{vFooter,vProductList},
	methods:{
		getvalFn: function(){
			var that = this;
			var shop_id = that.shop_id;
			api.shopsdetail({'shop_id': shop_id},function(res){
				console.log(res)
				if(res.error == '0'){
					that.shopdetail = res.data;
					that.prolists = res.data.items;
				}
			})
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


<style scoped>
	._v-container{top: 130px!important;margin-top: 10px;}
	.proList{padding-bottom: 80px;}
	.shop_top{text-align: center;padding: 15px 24px 12px 24px;background: #fff;}
	.spimgone{height: 50px;width: 50px;border: 1px solid #E6E6E6;border-radius: 100%;}
	.shopway{display: flex;align-items: center;padding-top: 10px;}
	.callimg{height: 19px;width: 18px;}
	.callone{flex: 1;text-align: left;font-size: 14px;color: #666666;padding-left: 7px;}
	.shopstit{color: #333333;font-size: 17px;padding-top: 3px;}
	/*.view_wrap{padding-bottom: 52px;}*/
	.listxian{padding: 20px 15%;height: 1px;display: flex;align-items: center;}
	.xianone{height: 1px;background: #999999;width: 20%;}
	.listend{font-size: 13px;color: #666666;text-align: center;flex: 1}
	.shopsno{text-align: center;font-size: 16px;color: #999;background: #fff;padding: 30% 0 20%;margin-top: 10px;}
</style>


