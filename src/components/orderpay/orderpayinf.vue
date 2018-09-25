<template>
	<div class="ord_ind">
		<div class="ordind_top">
			<img :src="shopinf.photo" class="ordind_top2">
			<div class="ordind_top3">
				<div class="ordind_top4">{{shopinf.title}}</div>
				<div class="ordind_top5">{{shopinf.spec_name}}</div>
				<div class="ordind_top6">
					<div class="ordind_top7">￥{{shopinf.price}}</div>
					<div>x{{shopinf.number}}</div>
				</div>
			</div>
		</div>
		<div class="ordind_con" v-if="shopinf.is_ziti != 0">
			<div class="ordind_con2">是否自提</div>
			<img v-if="zitiflag == false" src="../../assets/Switch-SwitchOff@2x.png" class="ordind_con3" @click="zitiFn">
			<img v-else src="../../assets/Switch-SwitchOn@2x.png" class="ordind_con3" @click="zitiFn">
		</div>
		<div class="ordind_con" v-if="zitiflag == true" @click="toGoodsMap">
			<div class="ordind_con4">
				<div class="ordind_con5">{{shops.shop.title}}<span class="ordind_con6">{{shops.shop.phone}}</span></div>
				<div class="ordind_con7">{{shops.shop.addr}}</div>
			</div>
			<img src="../../assets/Shape@2x.png" class="ordind_con8">
		</div>
		<div class="ordind_con" @click="advFn" v-else>
			<!-- <router-link style='display: flex;flex: 1;align-items: center;' :to="{path:'/address?',query: {payxuanflag: true}}"> -->
				<div v-if="zixuanflag == false" style="flex: 1;">
					<div style="display: flex;align-items: center;flex: 1;" v-if="shopfan.val == -1 || shops.addr_items == ''">
						<div class="ordind_con9">我的地址</div>
						<div class="ordind_con10">请添加您的收货地址</div>
					</div>
					<div class="ordind_con4" v-else>
						<div class="ordind_con5">{{shops.addr.contact}}<span class="ordind_con6">{{shops.addr.mobile}}</span></div>
						<div class="ordind_con7">{{shops.addr.province_name + shops.addr.city_name + shops.addr.area_name + shops.addr.addr}}</div>
					</div>
				</div>
				<div class="ordind_con4" v-else>
					<div class="ordind_con5">{{xuanname || shops.addr.contact}}<span class="ordind_con6">{{xuantel || shops.addr.mobile}}</span></div>
					<div class="ordind_con7">{{xuanadv || shops.addr.province_name + shops.addr.city_name + shops.addr.area_name + shops.addr.addr}}</div>
				</div>
				<img src="../../assets/Shape@2x.png" class="ordind_con8">
			<!-- </router-link> -->
		</div>
		<div class="ordind_con" @click="redbaoFn">
			<div class="ordind_con9">红包</div>
			<div class="ordind_con10">{{redmon}}</div>
			<img src="../../assets/Shape@2x.png" class="ordind_con8">
		</div>
		<div class="ordind_bot">
			<div class="ordind_bot2">买家留言</div>
			<div class="ordind_bot3">
				<textarea class="ordind_bot5" placeholder="点击输入（选填）" v-model="val"></textarea>
			</div>
		</div>
		<div class="ordind_btn">
			<div class="ordind_btn2">应付：<span class="ordind_btn3">{{shopinf.need_pay}}</span>（{{yunpay <= 0 ? '免运费' : '需'+ yunpay + '元运费'}})</div>
			<div class="ordind_btn5" @click="topayFn">立即支付</div>
		</div>
		<transition name="fade">
			<div class="shadow" v-if="shaflag" @click="shaFn"></div>
		</transition>
		<div :class="payflag == true ? 'paytan tan' : 'paytan'">
			<div class="paytan2">
				<div class="paytan3">应支付金额 <span style="color: #20ad20;">{{userhu.need_pay}}</span></div>
				<img src="../../assets/payclose@2x.png" class="paytan4" @click="closeFn">
			</div>
			<div>
				<div class="paytan5">
					<img src="../../assets/yuepay@2x.png" class="paytan6">
					<div class="paytan7">
						<div class="paytan8">余额支付</div>
						<div class="paytan9">余额 <span style="color: #20ad20;">￥{{userhu.member_money}}</span></div>
					</div>
					<img v-if="yuexuanflag == false" src="../../assets/Switch-SwitchOff@2x.png" class="ordind_con3" @click="yuepay(userhu.member_money,userhu.need_pay)">
					<img v-else src="../../assets/Switch-SwitchOn@2x.png" class="ordind_con3" @click="yuepay(userhu.member_money,userhu.need_pay)">
				<!-- 	<img v-if="active == 1" src="../../assets/Group@2x.png" class="paytan10">
					<img v-else src="../../assets/OvalCopy@2x.png" class="paytan11"> -->
				</div>
				<div class="paytan5" @click="payFn(2,userhu.member_money,userhu.need_pay)">
					<img src="../../assets/zhifupay@2x.png" class="paytan6">
					<div class="paytan7">
						<div class="paytan8">支付宝支付</div>
					</div>
					<img v-if="active == 2" src="../../assets/Group@2x.png" class="paytan10">
					<img v-else src="../../assets/OvalCopy@2x.png" class="paytan11">
				</div>
				<div class="paytan5" @click="payFn(3,userhu.member_money,userhu.need_pay)">
					<img src="../../assets/weixinpay@2x.png" class="paytan6">
					<div class="paytan7">
						<div class="paytan8">微信支付</div>
					</div>
					<img v-if="active == 3" src="../../assets/Group@2x.png" class="paytan10">
					<img v-else src="../../assets/OvalCopy@2x.png" class="paytan11">
				</div>
			</div>
			<div class="paytan12">
				<div class="paytan13" @click="paymonFn">支付</div>
			</div>
		</div>
		<div :class="advflag == true ? 'advtan tan' : 'advtan'">
			<div class="advtan2">
				<div class="paytan3">地址选择</div>
				<!-- <img src="../../assets/payclose@2x.png" class="paytan4" @click="closeadvFn"> -->
			</div>
			<div class="advtan8" v-if="adress.length > 0">
				<div class="advtan3" v-for="item in adress" @click="advyesFn(item.freight,item.contact,item.mobile,item.province_name,item.city_name,item.area_name,item.addr,item.addr_id)">
					<div class="advtan10" :style="item.freight == -1 ? 'opacity: 0.3;': ''">
						<div class="advtan4">{{item.contact}}<span class="advtan5">{{item.mobile}}</span><span v-if="item.is_default == 1" style="color: #20ad20;padding-left: 6px;">[默认地址]</span></div>
						<div class="advtan6">{{item.province_name + item.city_name + item.area_name + item.addr}}</div>
					</div>
					<img src="../../assets/nopei.png" v-if="item.freight == -1" class="advtan9">
				</div>
				<div class="noadvic" style="padding-bottom: 20px;">
					<a href="#/address">
						<div class="noadvic2">新增/编辑收货地址</div>
					</a>
				</div>
			</div>
			<div class="advtan8 noadvic" v-else>
				<a href="#/address">
					<div class="noadvic2">新增/编辑收货地址</div>
				</a>
			</div>
			<div class="advtan7" @click="advcloseFn">取消</div>
		</div>
		<div :class="redbaoflag == true ? 'advtan tan' : 'advtan'">
			<div class="advtan2">
				<div class="paytan3">红包选择</div>
				<!-- <img src="../../assets/payclose@2x.png" class="paytan4" @click="closeadvFn"> -->
			</div>
			<div class="advtan8">
				<div class="advtan3" @click="redxuanFn(item.hongbao_id,item.deduct_lable)" v-for="item in redbaoitem">
					<div class="redbao2">{{item.use_lable}}</div>
				</div>
			</div>
			<div class="advtan7" @click="redcloseFn">取消</div>
		</div>
		<v-msgbox :isshow="tipshow" :title="tips"></v-msgbox>
	</div>
</template>

<script>
import Hub from '../../../config/eventBus.js'
import api from '../../../src/api/api.js'
import vFooter from '../../template/Footer/Footer'
import vProductList from '../../template/ProductList/ProductList'
import BScroll from 'better-scroll'
import vMsgbox from '../../../src/template/msgbox'
export default {
	created(){
		var that = this;
		that.xuanname = localStorage.getItem('name');
		that.xuantel = localStorage.getItem('tel');
		that.xuanadv = localStorage.getItem('adv');
		that.back = localStorage.getItem('back');
		console.log(that.back)
		// Hub.$on('name', (msg) => { //Hub接收事件
  //       that.xuanname = msg;
  //       console.log(that.xuanname)
  //   });
  //   Hub.$on('tel', (msg) => { //Hub接收事件
  //       that.xuantel = msg;
  //       console.log(that.xuantel)
  //   });
  //   Hub.$on('adv', (msg) => { //Hub接收事件
  //       that.xuanadv = msg;
  //       console.log(that.xuanadv)
  //   });
  //   Hub.$on('back', (msg) => { //Hub接收事件
  //       that.back = msg;
  //       console.log(that.back)
  //   });
	},
	mounted () {
		var that = this;
		document.title=that.title;
		// localStorage.clear();
		that.getvalFn();
		console.log(this.product_id,this.shoptype,this.shopguige,this.shopnum)
	},
	data () {
		return {
			title:"订单确认",
			zitiflag: false,
			back: false,
			xuanname: '',
			xuantel: '',
			xuanadv: '',
			active: 1,
			shaflag: false,
			payflag: false,
			product_id: this.$route.query.product_id || '',
			shoptype: this.$route.query.shoptype || '',
			shopguige: this.$route.query.shopguige || '',
			shopnum: this.$route.query.shopnum || '',
			group_id: this.$route.query.group_id || '',
			backordetail: this.$route.query.backordetail || '',
			backpro: this.$route.query.backpro || '',
			is_ziti: 0,
			shops: [],
			shopinf: [],
			advflag: false,
			shopfan: [],
			adress: [],
			zixuanflag: false,
			yunpay: 0,
			addr_id: '',
			val: '',
			tips: '',
			tipshow: false,
			userhu: [],
			yuexuanflag: false,
			order_id: '',
			code: '',
			use_money: '',
			redbao: [],
			redbaoitem: [],
			redbaoflag: false,
			redmon: '',
			hongbao_id: 0,
			lat:'',
			lng:'',
		}
	},
	components:{vFooter,vProductList,vMsgbox},
	methods:{
		getvalFn: function(){
			var that = this;
			api.preinfo({'product_num': that.shopnum,'type': that.shoptype,'product_id': that.product_id,'spec_id': that.shopguige,'is_ziti': that.is_ziti,'hongbao_id':that.hongbao_id},function(res){
				console.log(res)
				if(res.error == '0'){
					that.shops = res.data;
					that.shopinf = res.data.info;
					that.shopfan = res.data.freight;
					that.adress = res.data.addr_items;
					that.yunpay = res.data.freight.val;
					that.redbao = res.data.hongbao;
					that.redmon = res.data.hongbao.deduct_lable;
					that.hongbao_id = res.data.hongbao.hongbao_id;
					that.redbaoitem = res.data.hongbao_items;
					that.lat = res.data.shop.lat;
					that.lng = res.data.shop.lng;
					that.goodsName = res.data.shop.title;
					that.addvic = res.data.shop.addr;
					for(var i = 0; i <= res.data.addr_items.length; i++){
						if(res.data.addr_items[i].is_default == 1){
							if(res.data.addr_items[i].freight >= 0){
								that.addr_id = res.data.addr_items[i].addr_id;
							}
							// console.log(res.data.addr_items[i].addr_id)
						}
					}
				}else{
					alert(res.message);
					that.$router.go(-1);
				}
			})
		},
		zitiFn: function(){
			var that = this;
			var ziti = that.zitiflag;
			if(ziti == false){
				that.zitiflag = true;
				that.is_ziti = 1;
			}else{
				that.zitiflag = false;
				that.is_ziti = 0;
			}
			that.getvalFn();
		},
		payFn: function(e,f,g){
			var that = this;
			var yue = that.yuexuanflag;
			if(f > 0){ //用户有余额
				if(f - g >= 0){  //余额够支付
					if(yue == false){  //余额支付关闭时
						that.active = e;
						if(e == 2){
							that.code = 'alipay';
						}else if(e == 3){
							that.code = 'wxpay';
						}
					}else{  //余额支付未关闭
						that.active = e;
						that.yuexuanflag = false;
						if(e == 2){
							that.code = 'alipay';
						}else if(e == 3){
							that.code = 'wxpay';
						}
					}
				}else{ //余额不够支付,但有余额
					if(yue == true){ //余额支付开启
						that.active = e;
						that.use_money = true;
						if(e == 2){
							that.code = 'alipay';
						}else if(e == 3){
							that.code = 'wxpay';
						}
					}else{  //余额支付关闭
						that.active = e;
						if(e == 2){
							that.code = 'alipay';
						}else if(e == 3){
							that.code = 'wxpay';
						}
					}
				}
			}else{ //无余额
				that.yuexuanflag = false;
				that.active = e;
				if(e == 2){
					that.code = 'alipay';
				}else if(e == 3){
					that.code = 'wxpay';
				}
			}
			// that.active = e;
			// if(that.yuexuanflag == true){
			// 	that.yuexuanflag = false;
			// }
			console.log(that.yuexuanflag)
		},
		shaFn: function(){
			var that = this;
			that.shaflag = false;
			that.payflag = false;
			that.advflag = false;
			that.redbaoflag = false;
		},
		topayFn: function(){
			var that = this;
			var product_num = that.shopnum;
			var type = that.shoptype;
			var note = that.val;
			var product_id = that.product_id;
			var spec_id = that.shopguige;
			var is_ziti = that.is_ziti;
			var addr_id = that.addr_id;
			var hongbao_id = that.hongbao_id;
			var group_id = that.group_id;  
			if(is_ziti == 0){
				api.create({'product_num':product_num,'type':type,'note':note,'product_id':product_id,'spec_id':spec_id,'is_ziti':is_ziti,'addr_id':addr_id,'hongbao_id':hongbao_id,'group_id':group_id},function(res){
					console.log(res)
					if(res.error == '0'){
						that.order_id = res.data.order_id;
						api.paymentinfo({'order_id': res.data.order_id},function(es){
							if(es.error == '0'){
								that.userhu = es.data;
								if(Number(es.data.member_money) > 0){  //有余额
									if(Number(es.data.member_money) - Number(es.data.need_pay) >= 0){  //余额够支付
										that.yuexuanflag = true;
										that.code = 'money';
									}else{ //余额不够支付,混合支付
										that.yuexuanflag = true;
										that.use_money = true;
										that.active = 2;
										that.code = 'alipay';
									}
								}else{ //无余额
									that.active = 2;
									that.code = 'alipay';
									that.yuexuanflag = false;
								}
							}
						})
						that.shaflag = true;
						that.payflag = true;
					}else{
						api.tipload(that,res.message);
					}
				})
			}else if(is_ziti == 1){
				api.create({'product_num':product_num,'type':type,'note':note,'product_id':product_id,'spec_id':spec_id,'is_ziti':is_ziti,'hongbao_id':hongbao_id,'group_id':group_id},function(res){
					// console.log(res)
					if(res.error == '0'){
						that.order_id = res.data.order_id;
						api.paymentinfo({'order_id': res.data.order_id},function(es){
							if(es.error == '0'){
								that.userhu = es.data;
								if(Number(es.data.member_money) > 0){  //有余额
									if(Number(es.data.member_money) - Number(es.data.need_pay) >= 0){  //余额够支付
										that.yuexuanflag = true;
										that.code = 'money';
									}else{  //余额不够支付,混合支付
										that.yuexuanflag = true;
										that.use_money = true;
										that.active = 2;
										that.code = 'alipay';
									}
								}else{  //无余额
									that.active = 2;
									that.code = 'alipay';
									that.yuexuanflag = false;
								}
							}
						})
						that.shaflag = true;
						that.payflag = true;
					}else{
						api.tipload(that,res.message);
					}
				})
			}
			
		},
		yuepay: function(e,t){
			var that = this;
			var yue = that.yuexuanflag;
			if(e > 0){  //有余额
				if(e - t >= 0){  //余额够支付
					if(yue == false){
						that.yuexuanflag = true;
						that.active = 1;
						that.code = 'money';
					}else{
						that.yuexuanflag = false;
						that.active = 2;
						that.code = 'alipay';
					}
				}else{  //有余额但不够支付,混合支付
					if(yue == false){
						that.yuexuanflag = true;
						that.active = 2;
						that.code = 'alipay';
						that.use_money = true;
					}else{
						that.yuexuanflag = false;
						that.active = 2;
						that.code = 'alipay';
						that.use_money = '';
					}
				}
			}else{  //没有余额
				that.yuexuanflag = false;
				api.tipload(that,'温馨提示:您没有余额');
				that.active = 2;
				that.code = 'alipay';
			}
		},
		paymonFn: function(){
			var that = this;
			api.pintuanpay({'order_id': that.order_id,'code': that.code,'use_money': that.use_money},function(res){
				console.log(res)
				if(res.error == '0'){
					if(res.message == 'success'){
						if(that.use_money == ''){
								if(that.code == 'alipay'){
								api.tipload(that,'支付宝支付成功');
							}else if(that.code == 'wxpay'){
								api.tipload(that,'微信支付成功');
							}else{
								api.tipload(that,res.message);
							}
						}else{
							api.tipload(that,'支付成功');
						}
					}else{
						api.tipload(that,res.message);
					}
					that.shaflag = false;
					that.payflag = false;
					if(that.backordetail == ''){
						if(that.backpro == ''){
							setTimeout(function(){
								that.$router.go(-1);
							},1200)
						}else{
							setTimeout(function(){
								that.$router.push({path:'/orderlist',query:{backpro: that.backpro}});
							},1200)
						}
						// setTimeout(function(){
						// 	that.$router.go(-1);
						// },1200)
					}else{
						setTimeout(function(){
							that.$router.go(-2);
						},1200)
					}
				}else{
					api.tipload(that,res.message);
				}
			})
		},
		closeFn: function(){
			var that = this;
			that.shaflag = false;
			that.payflag = false;
		},
		advFn: function(){
			var that = this;
			that.shaflag = true;
			that.advflag = true;
		},
		closeadvFn: function(){
			var that = this;
			that.shaflag = false;
			that.advflag = false;
		},
		advyesFn: function(a,b,c,d,e,f,g,h){
			var that = this;
			var adv = d + e + f + g;
			if(a != -1){
				that.yunpay = a;
				that.zixuanflag = true;
				that.xuanname = b;
				that.xuantel = c;
				that.addr_id = h;
				that.xuanadv = adv;
				that.shaflag = false;
				that.advflag = false;
			}else{

			}
		},
		redbaoFn: function(){
			var that = this;
			that.shaflag = true;
			that.redbaoflag = true;
		},
		redxuanFn: function(e,y){
			var that = this;
			that.hongbao_id = e;
			that.redmon = y;
			that.redbaoflag = false;
			that.shaflag = false;
			that.getvalFn();
		},
		redcloseFn: function(){
			var that = this;
			that.redbaoflag = false;
			that.shaflag = false;
		},
		advcloseFn: function(){
			var that = this;
			that.shaflag = false;
			that.advflag = false;
		},
		//跳转商家位置页面
		toGoodsMap:function(){
			this.$router.push({path:'/goodsAddr',query:{lat:this.lat,lng:this.lng,goodsName:this.goodsName,addvic:this.addvic}});
		},
	}
}
</script>


<style scoped>
	.ord_ind{background: #fff;height: 100%;}
	.ordind_top{padding: 15px;display: flex;align-items: center;border-bottom: 1px solid #F1F1F1;}
	.ordind_top2{width: 80px;height: 80px;border: 1px solid #f2f2f2;}
	.ordind_top3{padding-left: 18px;flex: 1;}
	.ordind_top4{font-size: 13px;color: #333;}
	.ordind_top5{color: #000000;font-size: 10px;padding-top: 13px;opacity: 0.7;}
	.ordind_top6{display: flex;align-items: center;padding-top: 5px;color: #030303;font-size: 12px;opacity: 0.8;}
	.ordind_top7{flex: 1;}
	.ordind_con{padding: 7px 16px;border-bottom: 1px solid #F1F1F1;display: flex;align-items: center;}
	.ordind_con2{color: #4A4A4A;font-size: 16px;flex: 1;}
	.ordind_con3{height: 34px;width: 45px;}
	.ordind_con4{flex: 1;}
	.ordind_con5{font-size: 14px;color: #4A4A4A;}
	.ordind_con6{font-size: 12px;padding-left: 18px;}
	.ordind_con7{font-size: 12px;color: #4A4A4A;padding-top: 6px;}
	.ordind_con8{height: 20px;width: 10px;}
	.ordind_con9{font-size: 16px;color: #4A4A4A;flex: 1;line-height: 1.8;}
	.ordind_con10{color: #000000;font-size: 14px;padding-right: 25px;opacity: 0.3;}
	.ordind_bot{padding: 0 16px 20px;}
	.ordind_bot2{padding: 13px 0;color: #4A4A4A;font-size: 16px;}
	.ordind_bot3{padding: 10px;border: 1px solid #F1F1F1;height: 100px;}
	.ordind_bot5{font-size: 13px;border: 0;resize:none;width: 100%;height: 100%;}
	.ordind_btn{position: fixed;left: 0;right: 0;bottom: 0;height: 49px;background: #eef2f5;display: flex;align-items: center;}
	.ordind_btn2{flex: 1;font-size: 14px;padding-left: 15px;}
	.ordind_btn3{color: #20AD20;padding: 0 5px;}
	.ordind_btn5{background: #FF7F00;width: 140px;height: 100%;text-align: center;line-height: 49px;color: #FFFFFF;font-size: 16px;}

	.shadow{position: fixed;top: 0;bottom: 0;left: 0;right: 0;background: rgba(0,0,0,0.4);z-index: 2;}
	.paytan{position: fixed;bottom: 0;left: 0;right: 0;background: #fff;z-index: 5;transition: all linear 0.3s;transform: translateY(100%);}
	.tan{transform: translateY(0)!important;}
	.paytan2{padding: 20px 23px;display: flex;align-items: center;text-align: center;}
	.paytan3{font-size: 14px;color: #000000;flex: 1;}
	.paytan4{width: 16px;height: 16px;}
	.paytan5{display: flex;align-items: center;border-top: 1px solid #F1F1F1;padding: 10px 18px 10px 20px;}
	.paytan6{width: 30px;height: 30px;}
	.paytan7{flex: 1;padding-left: 38px;}
	.paytan8{font-size: 15px;color: #000000;}
	.paytan9{font-size: 10px;color: #000000;padding-top: 5px;}
	.paytan10{width: 26px;height: 26px;}
	.paytan11{width: 22px;height: 22px;}
	.paytan12{padding: 60px 38px 20px;}
	.paytan13{background: #FF7F00;border-radius: 6px;height: 44px;color: #FFFFFF;font-size: 18px;text-align: center;line-height: 44px;}

	.fade-enter-active, .fade-leave-active {
    	transition: opacity .5s;
	}
    .fade-enter, .fade-leave-to {
	    opacity: 0;
	}

	.advtan{position: fixed;bottom: 0;left: 0;right: 0;background: #fff;z-index: 5;transform: translateY(100%);transition: all linear 0.3s;}
	.advtan2{padding: 15px 23px;display: flex;align-items: center;text-align: center;}
	.advtan3{padding: 10px 12px;border-top: 1px solid #f1f1f1;display: flex;align-items: center;}
	.advtan4{font-size: 14px;color: #4A4A4A;}
	.advtan5{padding-left: 12px;font-size: 12px;}
	.advtan6{font-size: 12px;padding-top: 6px;color: #4A4A4A;}
	.advtan7{color: #999;position: fixed;bottom: 0;left: 0;right: 0;background: #fff;height: 40px;text-align: center;line-height: 40px;font-size: 15px;border-top: 1px solid #f1f1f1;}
	.advtan8{padding-bottom: 40px;max-height: 350px;overflow-y: scroll;}
	.advtan10{flex: 1;}
	.advtan9{height: 40px;}
	.noadvic{border-top: 1px solid #f1f1f1;padding: 20px 10% 60px;}
	.noadvic2{background: #FF7700;border-radius: 6px;font-size: 17px;color: #FFFFFF;height: 44px;line-height: 44px;text-align: center;}

	.redbao2{flex: 1;font-size: 14px;color: @4A4A4A;text-align: center;}
</style>


