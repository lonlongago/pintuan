<template>
<div>
	<scroller :on-infinite="infinite" ref="my_scroller" :scrollTo="scrollTop" :on-refresh="refresh">
	<div>
		<div v-for="item in lists" class="orderList_list">
			<div class="pub_list top_box">
				<div class="pub_list_bd name"><i></i>{{item.shop_title}}</div>
				<div class="fontcl5">{{item.status_lable}}</div>
			</div>
			<div class="cont_box" @click="toDetail(item.order_id)">
				<div class="fl img"><img :src="item.product_photo" /></div>
				<div class="text">
					<h3 class="tit">{{item.product_title}}</h3>
					<div class="black9">规格：{{item.product_spec}}</div>
					<div>￥{{item.product_price}}<div class="fr num">x{{item.product_num}}</div></div>
				</div>
				<div class="clear"></div>
				</div>
				<div class="border_b text_r price_box">实付：<span>￥{{item.amount}}</span>（{{item.freight == 0 ? '免运费' : item.freight + '元运费'}}）</div>
				<div class="text_r btn_box">
					<div class="btn" v-for="li in item.btn_list" v-if="li.title == '取消订单'" @click="toCancelOrder(item.order_id)">{{li.title}}</div>
					<div class="btn" v-for="li in item.btn_list" v-if="li.title == '删除订单'" @click="toDeleteOrder(item.order_id)">{{li.title}}</div>
					<div class="btn" v-for="li in item.btn_list" v-if="li.title == '查看物流'" @click="toLogistics(item.order_id)">{{li.title}}</div>
					<div class="btn" v-for="li in item.btn_list" v-if="li.title == '钱款去向'" @click="toMoneyWhere(item.order_id)">{{li.title}}</div>
					<div class="btn" v-for="li in item.btn_list" v-if="li.title == '退款'" @click="toRefund(item.order_id)">{{li.title}}</div>
					
					<div class="btn btn1" v-for="li in item.btn_list" v-if="li.title == '再次购买'" @click="toBugAngin(item.order_id)">{{li.title}}</div>			
					<div class="btn btn1" v-for="li in item.btn_list" v-if="li.title == '重新开团'" @click="toGroupAgain(item.order_id)">{{li.title}}</div>						
					<div class="btn btn1" v-for="li in item.btn_list" v-if="li.title == '去支付'" @click="toPay(item.order_id)">{{li.title}}</div>			
					<div class="btn btn1" v-for="li in item.btn_list" v-if="li.title == '邀请好友拼单'" @click="toShare(item.order_id,item.product_title,item.product_photo)">{{li.title}}</div>			
					<div class="btn btn1" v-for="li in item.btn_list" v-if="li.title == '去核销'" @click="toVerification(item.order_id)">{{li.title}}</div>			
					<div class="btn btn1" v-for="li in item.btn_list" v-if="li.title == '确认收货'" @click="toConfirm(item.order_id)">{{li.title}}</div>			
					<div class="btn btn1" v-for="li in item.btn_list" v-if="li.title == '去评价'" @click="toNewevaluate(item.order_id,item.product_title,item.product_photo)">{{li.title}}</div>
						
					
			</div>
		</div>
	</div>
	</scroller>

	<!--提示框开始-->
		<div>
			
			<v-tip :isshow="visshow" :tips="vtips"   @cancelbtn="cancelBtn" @confirmbtn="confirmBtn"></v-tip>
			<v-msgbox :isshow="tipshow" :title="tips"></v-msgbox>
		</div>
		
		<!--提示框结束-->	
		<!-- 取消订单弹出框 -->
		<div class="cancelOrd_pop" v-if="iscancelOrdshow">
			<div class="mask_bg" @click="maskHide"></div>
			<div class="cont">
				<div class="border_b tit">
					<div>请选择原因</div>
					<p class="black9">订单一旦取消，无法恢复，优惠劵将原路返还</p>
				</div>
				<ul class="list_box">
					<li v-for="item in cancelList" @click="cancelOrder">{{item}}</li>
					
				</ul>
				<div class="cancel_btn" @click="cancel">取消</div>
			</div>
		</div>
		<!-- 取消订单弹出框end -->
</div>
</template>

<script>
import Vue from 'vue';
    import Scroller from 'vue-scroller';
    Vue.use(Scroller);
import vTip from '../../template/tip'
import vMsgbox from '../../../src/template/msgbox'
import api from '../../api/api'	
export default{
	props:['tab'],
	
	data(){
		return{
			iscancelOrdshow:false,
			cancelList:[],
			cancleOrder_id:"",
			
			visshow:false,
			tipshow:false,
			vtips:"",
			tips:"",
			tipType:"",
			tip_order_id:"",
			
			page:1,
			scrollTop:(0,0),
			isscroll:false,
			
			lists:[],
			bugAgain:{},
			groupAgain:{},
			
			bugAgainType:'',
			groupAgainType:'',
		}
	},
	components:{vTip,vMsgbox},
	
	mounted(){
		var that = this;
        	var page = that.page;
        	api.myOrder({"page": page,"status":that.tab},function(res){
//				console.log(res)
			if(res.error == "0"){
				that.lists = res.data.items;
//				console.log(that.orderList)
			}else{
				console.log(message)
			}
		})
        	

		
	},
	methods:{
		
		//提示框取消
		cancelBtn(){
			console.log("成功取消")
			this.visshow = false;
		},
		//提示框确认
		confirmBtn(){
//			if(this.tipType == "bugAngin"){
//				var that = this;
////				console.log(that.tip_order_id)
////				api.buyAgain({"order_id": that.tip_order_id},function(res){
////					if(res.error == "0"){
////						location. reload();
////						console.log(res)
////					}else{
////						console.log(res.message)
////					}
////				});
//				console.log("点击了再次购买")
//			}
			if(this.tipType == "deleteOrder"){
				var that = this;
//				console.log(that.tip_order_id)
				api.deleteOrder({"order_id": that.tip_order_id},function(res){
					if(res.error == "0"){
						api.tipload(that,res.message);
						
						setTimeout(function(){
							location. reload();
						},1200)
					}else{
						console.log(res.message)
					}
				})
				
				console.log("点击了删除订单")
			}
			if(this.tipType == "confirm"){
				var that = this;
//				console.log(that.tip_order_id)
				api.confirmGoods({"order_id": that.tip_order_id},function(res){
					if(res.error == "0"){
						api.tipload(that,res.message);
						setTimeout(function(){
							location. reload();
						},1200)
					}else{
						console.log(res.message)
					}
				});
				console.log("点击了确认收货")
			}
//			console.log("成功确认")
			this.visshow = false;
			
		},
		//跳转详情页
		toDetail(order_id){
			this.$router.push({path:'/Orderdetail',query:{order_id:order_id}});
//			console.log(order_id)
		},
		//跳转物流页
		toLogistics(order_id){
			this.$router.push({path:'/Logistics',query:{order_id:order_id}});
			console.log(order_id)
		},
		//跳转评价页面
		toNewevaluate(order_id,product_title,product_photo){
			this.$router.push({path:'/Newevaluate',query:{order_id:order_id,product_title:product_title,product_photo:product_photo}});
		},
		//跳转核销页面
		toVerification(order_id){
			this.$router.push({path:'/erwei',query:{order_id:order_id}});
		},
		//跳转支付页面
		toPay(order_id,use_money){
			this.$router.push({path:'/GoToPay',query:{order_id:order_id}});
		},
		//申请退款
		toRefund(order_id) {
			this.$router.push({path:'/Refund',query:{order_id:order_id}});
		},
		//点击取消订单
		toCancelOrder(order_id){
			//取消订单原因
			var that = this;
			api.cancel_reason({},function(res){
					if(res.error == "0") {
						that.cancelList = res.data.items;
					} else {
						console.log(res.message)
					}
			});
			that.iscancelOrdshow = true;
			that.cancleOrder_id = order_id;
		},
		maskHide(){
			this.iscancelOrdshow = false;
		},
		cancel() {
				this.iscancelOrdshow = false;
		},
		cancelOrder(){
			var that = this;
			api.cancelOd({"order_id": that.cancleOrder_id},function(res){
				if(res.error == "0"){
					that.iscancelOrdshow = false;
			        api.tipload(that,res.message);
			            setTimeout(function(){
			              location. reload();
			            },1200)
				}else{
					that.iscancelOrdshow = false;
         			api.tipload(that,res.message);
				}
			})
		},
		//删除订单
		toDeleteOrder(order_id){
			var that = this;
			that.tip_order_id = order_id;
			that.visshow = true;
			that.tipType = "deleteOrder";
			that.vtips="您确定要删除订单吗?"

		},
		//确认收货
		toConfirm(order_id){
			var that = this;
			that.tip_order_id = order_id;
			that.visshow = true;
			that.tipType = "confirm";
			that.vtips="您确定要确认收货吗?"
//			api.confirmGoods({"order_id": order_id},function(res){
//				if(res.error == "0"){
//					console.log(res)
//				}else{
//					console.log(res.message)
//				}
//			})
		},
		//再次购买
		toBugAngin(order_id){
//			this.tip_order_id = order_id;
//			this.visshow = true;
//			this.tipType = "bugAngin";
//			this.vtips="您确定要再次购买吗?"
			var that = this;
				api.buyAgain({"order_id": order_id},function(res){
					if(res.error == "0"){
						that.bugAgain = res.data.detail;
						that.bugAgainType = res.data.detail.type.split("_")[0];
//						console.log(that.bugAgain)
						that.$router.push({path:'/orderpayinf',query:{product_id:that.bugAgain.product_id,shoptype:that.bugAgainType,shopguige:that.bugAgain.product_spec_id,shopnum:that.bugAgain.product_num}});
					}else{
						api.tipload(that,res.message);
						console.log(res.message)
					}
				});

		},
		//重新开团
		toGroupAgain(order_id){
			var that = this;
				api.groupAgain({"order_id": order_id},function(res){
					if(res.error == "0"){
						that.groupAgain = res.data.detail;
						that.groupAgainType = res.data.detail.type.split("_")[0];
						that.$router.push({path:'/orderpayinf',query:{product_id:that.groupAgain.product_id,shoptype:that.groupAgainType,shopguige:that.groupAgain.product_spec_id,shopnum:that.groupAgain.product_num}});
					}else{
						console.log(res.message)
					}
				});
		},
		//钱款去向
		toMoneyWhere(order_id){
			this.$router.push({path:'/Refunds',query:{order_id:order_id}});
		},
	    infinite(done) {
	    	//下拉加载
		  		var that = this;
//		  		console.log("下拉加载成功")
		  		var page = that.page + 1;
		  		if(!that.isscroll){
		  			setTimeout(()=>{
				      	this.$refs.my_scroller.finishInfinite(2);
				     })
//				    return;
		  		}
        	api.myOrder({"page": page,"status": that.tab},function(res){
          	if(res.error == 0){
          		that.page = page;
          		var length = res.data.items.length;
          		if(length > 0){
          			that.lists = that.lists.concat(res.data.items);
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
		    		console.log("that.tab="+that.tab)
						var page = that.page = 1;
		    	        api.myOrder({"page": page,"status":that.tab},function(res){
							if(res.error == "0"){
//								that.lists = res.data.items;
							}else{
								console.log(message)
							}
						})

		    		done();
		    	},1000);
		},
		//分享
	        toShare(order_id,product_title,product_photo){
				//网页版分享
				var that = this;
				if(that.checkIsWeixin()){
					wx.ready(function(){
						wx.onMenuShareTimeline({
	                        title: product_title, // 分享标题
//	                        desc: that.orderDetail.group_info.lable, // 分享描述
	                        link: window.__CFG.SITEURL + '/#/InviteFriends?order_id=' + order_id , // 分享链接
	                        imgUrl: product_photo, // 分享图标
	                        success: function () {
	                        	fenxiang();
	                        },
	                        cancel: function () {
	                            // 用户取消分享后执行的回调函数
	                        }
	                    });
						wx.onMenuShareAppMessage({
	                        title:product_title, // 分享标题
//	                        desc: that.orderDetail.group_info.lable, // 分享描述
	                        link: window.__CFG.SITEURL + '/#/InviteFriends?order_id=' + order_id, // 分享链接
	                        imgUrl: product_photo, // 分享图标
	                        type: '', // 分享类型,music、video或link，不填默认为link

	                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
	                        success: function () {
	                        	fenxiang();
	                        },
	                        cancel: function () {
	                        }
	                    });
						wx.onMenuShareQQ({
	                        title: product_title, // 分享标题
//	                        desc: that.orderDetail.group_info.lable, // 分享描述
	                        link: window.__CFG.SITEURL + '/#/InviteFriends?order_id=' + order_id, // 分享链接
	                        imgUrl: product_photo, // 分享图标
	                        success: function () {
	                        	fenxiang();
	                        },
	                        cancel: function () {
	                           // 用户取消分享后执行的回调函数
	                       }
	                   });
					});
				};
			},
	}
}
</script>

<style scoped>
._v-container{top:35px!important;}
.orderList_list{ margin-bottom: 10px; background: #fff; }
.orderList_list .top_box{ line-height: 20px; padding: 12px 10px; }
.orderList_list .top_box .name{ font-size: 14px; }
.orderList_list .top_box .name i{ display: inline-block; width: 16px; height: 16px; background: url(../../assets/shop@3x.png) no-repeat; background-size: contain; vertical-align: sub; margin-right: 5px; }
.orderList_list .cont_box{ padding: 10px; background: #F2F2F2; }
.orderList_list .cont_box .img{ width: 80px; height: 80px; overflow: hidden; }
.orderList_list .cont_box .img img{ width: 100%; height: 100%;background: #fff; }
.orderList_list .cont_box .text{ margin-left: 90px; line-height: 20px; }
.orderList_list .cont_box .text .tit{ font-size: 14px; height: 40px; line-height: 20px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; -webkit-text-overflow: ellipsis; }
.orderList_list .price_box{ padding: 8px 10px; line-height: 20px; }
.orderList_list .price_box span{ color: #eb3636; }
.orderList_list .btn_box{ padding: 10px; }
.orderList_list .btn_box .btn{ display: inline-block; min-width: 80px; height: 30px; padding: 0 10px; line-height: 28px; text-align: center; border: 1px solid #FF7F00; border-radius: 4px; font-size: 14px; color: #FF7F00; margin-left: 5px; }
.orderList_list .btn_box .btn1{ background: #FF7F00; color: #fff; }


/*取消订单*/
.cancelOrd_pop .cont {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 100;
		width: 100%;
		max-height: 70%;
		text-align: center;
		background: #fff;
		transform: translate(0, 0);
		-webkit-transform: translate(0, 0);
		transition: all 0.6s ease;
		-webkit-transition: all 0.6s ease;
	}
	
	.cancelOrd_pop .cont .tit {
		padding: 10px;
		font-size: 13px;
		color: #030303;
	}
	
	.cancelOrd_pop .cont .tit>div {
		font-size: 14px;
		line-height: 20px;
		margin-bottom: 5px;
	}
	
	.cancelOrd_pop .cont .list_box li {
		display: block;
		padding: 15px 10px;
		line-height: 20px;
		font-size: 14px;
		border-bottom: 1px solid #e6e6e6;
	}
	
	.cancelOrd_pop .cont .cancel_btn {
		height: 52px;
		line-height: 52px;
		color: #999;
		font-size: 15px;
	}
</style>