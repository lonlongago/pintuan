<template>
	<div>
		
		<div class="Orderdetail_state" v-bind:class="[orderDetail.status_title == '订单已取消' ? 'bg2' : 'bg1',groupInfo.status == 0 ? 'bg3' : '']">
			<i class="ico1" v-if="orderDetail.status_icon == 'time'"></i>
			<i class="ico2" v-if="orderDetail.status_icon == 'error'"></i>
			<i class="ico3" v-if="orderDetail.status_icon == 'success'"></i> 
			{{orderDetail.status_title}}
		</div>

		<div class="Orderdetail_cont">
			<div class="border_b pub_list list" v-if="orderDetail.refund_status_lable" @click="toRefundDetail(order_id)">
				<div class="pub_list_bd fontcl5">{{orderDetail.refund_status_lable}}</div>
				<i class="rArrow_ico"></i>
			</div>

			<div class="border_b pub_list pin_box" v-if="groupInfo.status == 0 || groupInfo.status == 2">
				<div class="fontcl5 pub_list_bd">{{groupInfo.lable}}</div>
				<div class="img"><img src="../../assets/pintuanIcon.png" /></div>
				<div class="img"><img src="../../assets/pintuanIcon.png" /></div>
			</div>
			
			<div class="border_b pub_list shop_box" v-if="orderDetail.is_ziti == 1">
				<div class="img" @click="toShops(orderDetail.shop_id)"><img :src="orderDetail.shop_log" /></div>
				<div class="pub_list_bd ml10 text" @click="toShops(orderDetail.shop_id)">
					<div class="shop_title">{{orderDetail.shop_title}}<span>{{orderDetail.shop_mobile}}</span></div>
					<p class="mt5 black9">{{orderDetail.shop_addr}}</p>
				</div>
				<a :href="'tel:'+shopsTel"><i class="phone_ico"></i></a>
			</div>

			<div class="border_b pub_list addr_box" v-if="orderDetail.is_ziti == 0">
				<div class="pub_list_bd">
					<div class="maijiaName">{{orderDetail.contact}}<span>{{orderDetail.mobile}}</span></div>
					<p class="black6">{{orderDetail.addr_detail}}</p>
				</div>
				<!--<div class="btn" @click="toModifyadd(order_id)" v-if="orderDetail.is_ziti == 0 && orderDetail.status_title == '代付款'">修改</div>-->
			</div>
			<div class="border_b ord_share_box" v-if="groupInfo.time > 0 && orderDetail.status_title != '订单已取消'">
				<div class="mb10 bt">{{groupInfo.lable}}{{hours}} : {{minutes}} : {{second}}</div>
				<div class="">
					<div class="fl left">
						<ul>
							<li v-for="items in member_face">
								<img :src="item" v-for="item in items" />
								
							</li>
						</ul>
						<div class="clear"></div>
					</div>
					<div class="fr btn" @click="toShare">邀请好友</div>
					<div class="clear"></div>
				</div>
			</div>
			<div class="pub_list goods_box">
				<div class="img"><img :src="orderDetail.product_photo" /></div>
				<div class="ml10 pub_list_bd text">
					<h3 class="tit">{{orderDetail.product_title}}</h3>
					<div class="black9">规格：{{orderDetail.product_spec}}</div>
					<div>¥{{orderDetail.product_price}}
						<div class="fr num">x{{orderDetail.product_num}}</div>
					</div>
				</div>
			</div>
			<div class="border_b pub_list list">
				<div class="pub_list_bd">实付：<span>{{orderDetail.amount}}</span>（{{orderDetail.freight == 0 ? '免运费' : orderDetail.freight + '元运费'}}）</div>
			</div>

			<div class="border_b pub_list shop_box"  v-if="orderDetail.is_ziti == 0">
				<div class="img" @click="toShops(orderDetail.shop_id)"><img :src="orderDetail.shop_log" /></div>
				<div class="pub_list_bd ml10 text" @click="toShops(orderDetail.shop_id)">
					<div class="shop_title">{{orderDetail.shop_title}}<span>{{orderDetail.shop_mobile}}</span></div>
					<p class="mt5 black9">{{orderDetail.shop_addr}}</p>
				</div>
				<a :href="'tel:'+shopsTel"><i class="phone_ico"></i></a>
			</div>
			
			<div class="border_b info_box">
				<p>订单编号：{{orderDetail.order_id}}</p>
				<p>红包抵扣：<span style="color: #f60;">{{orderDetail.hongbao_amount}}</span></p>
				<p>支付方式：{{orderDetail.pay_code_lable}}</p>
				<p>下单时间：{{orderDetail.dateline_lable}}</p>
			</div>
			
			<div class="border_b pub_list list" v-if="item.title == '查看券码'" v-for="item in orderDetail.product_btn_list" @click="toVerification(orderDetail.order_id)">
				<div class="pub_list_bd fontcl5"><i class="mr5 quan_ico"></i>{{item.title}}</div>
				<i class="ml10 rArrow_ico"></i>
			</div>
			<div class="border_b pub_list list" v-if="item.title == '查看券码'" v-for="item in orderDetail.product_btn_list">
				<div class="pub_list_bd black6">密码：{{code}}</div>
				<div class="fontcl5">{{spend_statusTxt}}</div>
			</div>
			
			
			<!--<button @click="toTest">测试按钮</button>-->
			
			
			
			<!--<div class="border_b black6 list" >评价内容：衣服很不错</div>-->
			<!--<div class="border_b pub_list black6 list">
				<div class="pub_list_bd">遇到问题</div>
				<div>呼叫人工服务</div>
				<i class="ml10 rArrow_ico"></i>
			</div>-->
		</div>
		<div class="Orderdetail_btn" v-if="btnLength>0">
			<div v-for="li in orderDetail.btn_list" v-if="li.title == '取消订单'" class="btn" @click="cancelOrd(order_id)">{{li.title}}</div>
			<div v-for="li in orderDetail.btn_list" v-if="li.title == '删除订单'" class="btn" @click="toDeleteOrder(order_id)">{{li.title}}</div>
			<div v-for="li in orderDetail.btn_list" v-if="li.title == '查看物流'" class="btn" @click="toLogistics(order_id)">{{li.title}}</div>
			<div v-for="li in orderDetail.btn_list" v-if="li.title == '钱款去向'" class="btn" @click="toMoneyWhere(order_id)">{{li.title}}</div>
			<div v-for="li in orderDetail.btn_list" v-if="li.title == '退款'" class="btn" @click="toRefund(order_id)">{{li.title}}</div>
			
			<div v-for="li in orderDetail.btn_list" v-if="li.title == '再次购买'" class="btn btn1" @click="toBugAngin(order_id)">{{li.title}}</div>
			<div v-for="li in orderDetail.btn_list" v-if="li.title == '重新开团'" class="btn btn1" @click="toGroupAgain(order_id)">{{li.title}}</div>						
			<div v-for="li in orderDetail.btn_list" v-if="li.title == '去支付'" class="btn btn1" @click="toPay(order_id)">{{li.title}}</div>
			<div v-for="li in orderDetail.btn_list" v-if="li.title == '去核销'" class="btn btn1" @click="toVerification(order_id)">{{li.title}}</div>
			<div v-for="li in orderDetail.btn_list" v-if="li.title == '邀请好友拼单'" class="btn btn1" @click="toShare">{{li.title}}</div>			
			<div v-for="li in orderDetail.btn_list" v-if="li.title == '去评价'" class="btn btn1" @click="toNewevaluate(order_id,orderDetail.product_title,orderDetail.product_photo)">{{li.title}}</div>
			<div v-for="li in orderDetail.btn_list" v-if="li.title == '确认收货'" class="btn btn1" @click="toConfirm(order_id)">{{li.title}}</div>
			
		</div>

		<!-- 取消订单弹出框 -->
		<div class="cancelOrd_pop" v-if="iscancelOrdshow">
			<div class="mask_bg1" @click="maskHide"></div>
			<div class="cont">
				<div class="border_b tit">
					<div>请选择原因</div>
					<p class="black9">订单一旦取消，无法恢复，优惠劵将原路返还</p>
				</div>
				<ul class="list_box">
					<li v-for="item in cancelList" @click="cancelOrder">{{item}}</li>
				</ul>
				<div class="btn" @click="cancel">取消</div>
			</div>
		</div>
		<!-- 取消订单弹出框end -->
		<!--提示框开始-->
		<div>
			<v-tip :isshow="visshow" :tips="vtips"   @cancelbtn="cancelBtn" @confirmbtn="confirmBtn"></v-tip>
			<v-msgbox :isshow="tipshow" :title="tips"></v-msgbox>
		</div>
		
		<!--提示框结束-->	
	</div>
</template>

<script>
	import vTip from '../../template/tip'
	import vMsgbox from '../../../src/template/msgbox'
	import api from '../../api/api'
	export default {
		data() {
			return {
				title: "订单详情",
				iscancelOrdshow: false,
				orderDetail: {},
				groupInfo: {},
				groupInfoTime:"",
				
				member_face: [
					["","","","",""],
					["","","","",""],
				],
				order_id: this.$route.query.order_id, //路由带来的order_id
				cancelList:[],
				cancleOrder_id:'',
				statusTxt:'',
				btnLength:'',
				code:'',
				spend_statusTxt:'',
				visshow:false,
				tipshow:false,
				vtips:"",
				tips:"",
				tipType:"",
				tip_order_id:"",
				peopleNum:'',
				hours:'',
				minutes:'',
				second:'',
				bugAgain:'',
				groupAgain:'',
				shopsTel:'',
				bugAgainType:'',
				groupAgainType:''
			}
		},
		components:{vTip,vMsgbox},
		mounted() {
			var that = this;
			document.title=that.title;
			//订单详情接口
			api.orderDetail({order_id: that.order_id}, function(res) {
				
				if(res.error == "0") {
					that.orderDetail = res.data.detail;
					that.groupInfo = res.data.group_info;
					that.member_face = res.data.group_info.member_face;
					that.btnLength = res.data.detail.btn_list.length;
					that.groupInfoTime = res.data.group_info.time;
					that.shopsTel = res.data.detail.shop_mobile;
					//网页版分享
					if(that.checkIsWeixin()){
						wx.ready(function(){
							wx.onMenuShareTimeline({
		                        title: that.orderDetail.product_title, // 分享标题
		                        desc: that.orderDetail.group_info.lable, // 分享描述
		                        link: window.location.href, // 分享链接
		                        imgUrl: that.orderDetail.product_photo, // 分享图标
		                        success: function () {
		                        	fenxiang();
		                        },
		                        cancel: function () {
		                            // 用户取消分享后执行的回调函数
		                        }
		                    });
							wx.onMenuShareAppMessage({
		                        title: that.orderDetail.product_title, // 分享标题
		                        desc: that.orderDetail.group_info.lable, // 分享描述
		                        link: window.location.href, // 分享链接
		                        imgUrl: that.orderDetail.product_photo, // 分享图标
		                        type: '', // 分享类型,music、video或link，不填默认为link

		                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
		                        success: function () {
		                        	fenxiang();
		                        },
		                        cancel: function () {
		                        }
		                    });
							wx.onMenuShareQQ({
		                        title: that.orderDetail.product_title, // 分享标题
		                        desc: that.orderDetail.group_info.lable, // 分享描述
		                        link: window.location.href, // 分享链接
		                        imgUrl: that.orderDetail.product_photo, // 分享图标
		                        success: function () {
		                        	fenxiang();
		                        },
		                        cancel: function () {
		                           // 用户取消分享后执行的回调函数
		                       }
		                   });
						});
					};
				} else {
					console.log(res.message)
				}
			});
			setInterval(function(){
				that.groupInfoTime--;
					that.hours = Math.floor(that.groupInfoTime / 60 / 60 % 24);
					if(that.hours>=0 && that.hours<10){
						that.hours = '0'+that.hours
					}
					that.minutes = Math.floor(that.groupInfoTime / 60 % 60);
					if(that.minutes>=0 && that.minutes<10){
						that.minutes = '0'+that.minutes
					}
					that.second =  Math.floor(that.groupInfoTime % 60);
					if(that.second>=0 && that.second<10){
						that.second = '0'+that.second
					}
			},1000);
			//查看券码
			api.checkCode({"order_id": that.order_id},function(res){
					if(res.error == "0"){
						that.code = res.data.detail.spend_number;
						if(res.data.detail.spend_status == 0){
							that.spend_statusTxt = "未核销";
						}else{
							that.spend_statusTxt = "已核销";
						}
					}else{
						console.log(res.message)
					}
			});
			
		},
		methods: {
			//提示框取消
			cancelBtn(){
				console.log("成功取消")
				this.visshow = false;
			},
			//提示框确认
			confirmBtn(){
				//if(this.tipType == "bugAngin"){
					//var that = this;
					////console.log(that.tip_order_id)
					////api.buyAgain({"order_id": that.tip_order_id},function(res){
						////if(res.error == "0"){
							////location. reload();
							////console.log(res)
						////}else{
							////console.log(res.message)
						////}
					////});
					//console.log("点击了再次购买")
				//}
				if(this.tipType == "deleteOrder"){
					var that = this;
					//console.log(that.tip_order_id)
					api.deleteOrder({"order_id": that.tip_order_id},function(res){
						if(res.error == "0"){
							api.tipload(that,res.message);
							
							setTimeout(function(){
								that.$router.go(-1);
							},1200)
							
						}else{
							console.log(res.message)
						}
					});
					console.log("点击了删除订单")
				}
				if(this.tipType == "confirm"){
					var that = this;
					//console.log(that.tip_order_id)
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
				this.visshow = false;
				
			},
						
			cancelOrd(order_id) {
				var that = this;
				//取消订单原因
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
			maskHide() {
				this.iscancelOrdshow = false;
			},
			cancel() {
				this.iscancelOrdshow = false;
			},
			//选择取消订单的具体原因
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
			//申请退款
			toRefund(order_id) {
				this.$router.push({path:'/Refund',query:{order_id:order_id}});
			},
			//跳转退款详情页
			toRefundDetail(order_id) {
				this.$router.push({path:'/Refunddetail',query:{order_id:order_id}});
			},
			//跳转物流页
			toLogistics(order_id){
				this.$router.push({path:'/Logistics',query:{order_id:order_id}});
			},
			//跳转评价页面
			toNewevaluate(order_id,product_title,product_photo){
				this.$router.push({path:'/Newevaluate',query:{order_id:order_id,product_title:product_title,product_photo:product_photo}});
			},
			//跳转修改地址页
			//toModifyadd(order_id){
				//this.$router.push({path:'/Modifyadd',query:{order_id:order_id}});
			//},
			//删除订单
			toDeleteOrder(order_id){
				var that = this;
				that.tip_order_id = order_id;
				that.visshow = true;
				that.tipType = "deleteOrder";
				that.vtips="您确定要删除订单吗?"

			},
			//跳转核销页面
			toVerification(order_id){
				this.$router.push({path:'/erwei',query:{order_id:order_id}});
			},
			//确认收货
			toConfirm(order_id){
				var that = this;
				that.tip_order_id = order_id;
				that.visshow = true;
				that.tipType = "confirm";
				that.vtips="您确定要确认收货吗?"
			},
			//再次购买
			toBugAngin(order_id){
				//this.tip_order_id = order_id;
				//this.visshow = true;
				//this.tipType = "bugAngin";
				//this.vtips="您确定要再次购买吗?"
				var that = this;
					api.buyAgain({"order_id": order_id},function(res){
						if(res.error == "0"){
							that.bugAgain = res.data.detail;
							that.bugAgainType = res.data.detail.type.split("_")[0];
							
							console.log(that.bugAgainType)
							that.$router.push({path:'/orderpayinf',query:{product_id:that.bugAgain.product_id,shoptype:that.bugAgainType,shopguige:that.bugAgain.product_spec_id,shopnum:that.bugAgain.product_num,backordetail: true}});
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
							that.$router.push({path:'/orderpayinf',query:{product_id:that.groupAgain.product_id,shoptype:that.groupAgainType,shopguige:that.groupAgain.product_spec_id,shopnum:that.groupAgain.product_num,backordetail: true}});
						}else{
							api.tipload(that,res.message);
							console.log(res.message)
						}
					});
			},
			//钱款去向
			toMoneyWhere(order_id){
				this.$router.push({path:'/Refunds',query:{order_id:order_id}});
			},
			//去支付
			toPay(order_id){
				this.$router.push({path:'/GoToPay',query:{order_id:order_id}});
			},
			//判断是否微信
	        checkIsWeixin(){
	            if(/(micromessenger)/.test(navigator.userAgent.toLowerCase())){
	                return true;
	            }else{
	                return false;
	            }
	        },
	        //跳转商家详情
	        toShops(shop_id){
	        	this.$router.push({path:'/Shops',query:{shop_id:shop_id}});
	        },
	        
//	        toTest(){
//	        	window.location.href= '/#/InviteFriends?order_id=' + this.order_id;
//	        },
	        
	        
	        //分享
	        toShare(){
				//网页版分享
				var that = this;
				if(that.checkIsWeixin()){
					wx.ready(function(){
						wx.onMenuShareTimeline({
	                        title: that.orderDetail.product_title, // 分享标题
//	                        desc: that.orderDetail.group_info.lable, // 分享描述
	                        link: window.__CFG.SITEURL + '/#/InviteFriends?order_id=' + that.order_id , // 分享链接
	                        imgUrl: that.orderDetail.product_photo, // 分享图标
	                        success: function () {
	                        	fenxiang();
	                        },
	                        cancel: function () {
	                            // 用户取消分享后执行的回调函数
	                        }
	                    });
						wx.onMenuShareAppMessage({
	                        title: that.orderDetail.product_title, // 分享标题
//	                        desc: that.orderDetail.group_info.lable, // 分享描述
	                        link: window.__CFG.SITEURL + '/#/InviteFriends?order_id=' + that.order_id, // 分享链接
	                        imgUrl: that.orderDetail.product_photo, // 分享图标
	                        type: '', // 分享类型,music、video或link，不填默认为link

	                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
	                        success: function () {
	                        	fenxiang();
	                        },
	                        cancel: function () {
	                        }
	                    });
						wx.onMenuShareQQ({
	                        title: that.orderDetail.product_title, // 分享标题
//	                        desc: that.orderDetail.group_info.lable, // 分享描述
	                        link: window.__CFG.SITEURL + '/#/InviteFriends?order_id=' + that.order_id, // 分享链接
	                        imgUrl: that.orderDetail.product_photo, // 分享图标
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

<style type="text/css">
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
	
	.cancelOrd_pop .cont .btn {
		height: 52px;
		line-height: 52px;
		color: #999;
		font-size: 15px;
	}
	
	.Orderdetail_state {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 45px;
		padding: 10px;
		line-height: 25px;
		font-size: 16px;
		color: #fff;
	}
	
	.Orderdetail_state.bg1 {
		background: #FF7F00;
	}
	
	.Orderdetail_state.bg2 {
		background: #C5C5C5;
	}
	
	.Orderdetail_state.bg3 {
		background: #EB3636;
	}
	
	.Orderdetail_state i {
		display: inline-block;
		width: 20px;
		height: 20px;
		background-repeat: no-repeat;
		background-size: contain;
		vertical-align: sub;
		margin-right: 5px;
	}
	
	.Orderdetail_state i.ico1 {
		background-image: url(../../assets/wait@3x.png);
		margin-right: 20px;
	}
	
	.Orderdetail_state i.ico2 {
		background-image: url(../../assets/shibai@3x.png);
	}
	
	.Orderdetail_state i.ico3 {
		background-image: url(../../assets/chenggong@3x.png);
	}
	
	.Orderdetail_btn {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 50px;
		padding: 10px;
		background: #fff;
		text-align: right;
	}
	
	.Orderdetail_btn .btn {
		display: inline-block;
		min-width: 80px;
		height: 30px;
		padding: 0 10px;
		line-height: 28px;
		text-align: center;
		border: 1px solid #FF7F00;
		border-radius: 4px;
		font-size: 14px;
		color: #FF7F00;
		margin-left: 5px;
	}
	
	.Orderdetail_btn .btn1 {
		background: #FF7F00;
		color: #fff;
	}
	
	.Orderdetail_cont {
		padding: 45px 0 50px;
	}
	
	.Orderdetail_cont .list {
		padding: 10px;
		line-height: 20px;
		background: #fff;
		font-size: 14px;
	}
	
	.Orderdetail_cont .list span {
		color: #f60;
	}
	
	.Orderdetail_cont .list i {
		display: inline-block;
		background-repeat: no-repeat;
		background-size: contain;
	}
	
	.Orderdetail_cont .list .rArrow_ico {
		width: 10px;
		height: 20px;
		background-image: url(../../assets/dianji@3x.png);
		vertical-align: middle;
	}
	
	.Orderdetail_cont .list .quan_ico {
		width: 15px;
		height: 15px;
		background-image: url(../../assets/ckqm@3x.png);
		vertical-align: sub;
	}
	
	.Orderdetail_cont .shop_box {
		background: #fff;
		padding: 10px;
	}
	
	.Orderdetail_cont .shop_box .img {
		width: 50px;
		height: 50px;
		overflow: hidden;
	}
	
	.Orderdetail_cont .shop_box .img img {
		width: 100%;
		height: 100%;
		border: 1px solid #f2f2f2;
	}
	
	.Orderdetail_cont .shop_box .text>div {
		font-size: 14px;
	}
	
	.Orderdetail_cont .shop_box .phone_ico {
		display: inline-block;
		width: 35px;
		height: 35px;
		background: url(../../assets/dial@3x.png) no-repeat;
		background-size: contain;
		vertical-align: middle;
	}
	
	.Orderdetail_cont .goods_box {
		background: #F2F2F2;
		padding: 10px;
	}
	
	.Orderdetail_cont .goods_box .img {
		width: 80px;
		height: 80px;
		overflow: hidden;
	}
	
	.Orderdetail_cont .goods_box .img img {
		width: 100%;
		height: 100%;
		background: #fff;
	}
	
	.Orderdetail_cont .goods_box .text {
		line-height: 20px;
	}
	
	.Orderdetail_cont .goods_box .text .tit {
		font-size: 14px;
		height: 40px;
		line-height: 20px;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-text-overflow: ellipsis;
	}
	
	.Orderdetail_cont .info_box {
		background: #fff;
		padding: 10px;
		color: #666;
		line-height: 20px;
	}
	
	.Orderdetail_cont .addr_box {
		background: #fff;
		padding: 10px;
		line-height: 20px;
	}
	
	.Orderdetail_cont .addr_box .pub_list_bd>div {
		font-size: 14px;
	}
	
	.Orderdetail_cont .addr_box .btn {
		width: 55px;
		height: 25px;
		line-height: 25px;
		text-align: center;
		border-radius: 4px;
		border: 1px solid #FF7F00;
		color: #FF7F00;
	}
	
	.Orderdetail_cont .pin_box {
		background: #fff;
		padding: 10px;
		font-size: 14px;
	}
	
	.Orderdetail_cont .pin_box .img {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		overflow: hidden;
		margin-left: 10px;
	}
	
	.Orderdetail_cont .pin_box .img img {
		width: 100%;
		height: 100%;
	}
	
	.Orderdetail_cont .ord_share_box {
		background: #fff;
		padding: 10px 10px 0;
	}
	
	.Orderdetail_cont .ord_share_box .bt {
		font-size: 14px;
		line-height: 20px;
	}
	
	.Orderdetail_cont .ord_share_box .left {
		width: 200px;
	}
	
	.Orderdetail_cont .ord_share_box .left li {
		height: 30px;
		margin-bottom: 10px;
	}
	
	.Orderdetail_cont .ord_share_box .left li img {
		width: 30px;
		height: 30px;
		display: inline-block;
		margin-right: 10px;
		border-radius: 50%;
		background: #D8D8D8;
	}
	
	.Orderdetail_cont .ord_share_box .left li img:last-child {
		margin-right: 0;
	}
	
	.Orderdetail_cont .ord_share_box .btn {
		width: 68px;
		height: 25px;
		line-height: 25px;
		text-align: center;
		border-radius: 4px;
		border: 1px solid #FF7F00;
		color: #FF7F00;
		margin-top: 22.5px;
		margin-bottom: 22.5px;
	}
	
	.maijiaName {
		font-size: 15px;
		color: #333;
	}
	
	.maijiaName span {
		font-size: 12px;
		color: #4A4A4A;
		margin-left: 10px;
	}
	
	.black6 {
		font-size: 12px;
		color: #4A4A4A;
	}
	
	.shop_title span {
		margin-left: 15px;
	}
</style>