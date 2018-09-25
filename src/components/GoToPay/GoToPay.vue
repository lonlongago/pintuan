<template>
	<div>
	
		<div class="GTP_paytan tan">
			<div class="paytan2">
				<div class="GTP_paytan3">应支付金额 <span style="color: #20ad20;">{{userhu.need_pay}}</span></div>
				
			</div>
			<div>
				<div class="paytan5">
					<img src="../../assets/yuepay@2x.png" class="paytan6">
					<div class="paytan7">
						<div class="paytan8">余额支付</div>
						<div class="paytan9">余额 <span style="color: #20ad20;">￥{{userhu.member_money}}</span></div>
					</div>
					<img v-if="yuexuanflag == false" src="../../assets/Switch-SwitchOff@2x.png" style="max-width:16%" class="ordind_con3" @click="yuepay(userhu.member_money,userhu.need_pay)">
					<img v-else src="../../assets/Switch-SwitchOn@2x.png" class="ordind_con3" style="max-width:16%"  @click="yuepay(userhu.member_money,userhu.need_pay)">
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
			<div class="GTP_paytan12">
				<div class="paytan13" @click="paymonFn">支付</div>
			</div>
		</div>
		<v-msgbox :isshow="tipshow" :title="tips" class="vmsgbox"></v-msgbox>
	</div>
</template>

<script>
import api from '../../api/api'
import vMsgbox from '../../../src/template/msgbox'
export default {
	created(){
		
	},
	data () {
		return {
			title:"支付",
			order_id: this.$route.query.order_id, //路由带来的order_id
			code: '',
			use_money: '',
			yuexuanflag: false,
			active: 1,
			userhu:'',
			tips: '',
			tipshow: false,
		}
	},
	mounted () {
		var that = this;
		document.title = that.title;
		api.paymentinfo({'order_id': that.order_id},function(es){
							if(es.error == '0'){
								that.userhu = es.data;
								console.log(that.userhu)
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
	},
	
	components:{vMsgbox},
	methods:{
		
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
					setTimeout(function(){
						that.$router.go(-1);
					},1200)
				}else{
					api.tipload(that,res.message);
				}
			})
		},
		
	}
}
</script>


<style type="text/css">	
	.GTP_paytan{position: fixed;bottom: 0;left: 0;right: 0;height: 100%;background: #fff;z-index: 3;transition: all linear 0.3s;transform: translateY(100%);}
	.tan{transform: translateY(0)!important;}
	.paytan2{padding: 20px 23px;display: flex;align-items: center;text-align: center;}
	.GTP_paytan3{font-size: 20px;color: #000000;flex: 1;}
	.paytan4{width: 16px;height: 16px;}
	.paytan5{display: flex;align-items: center;border-top: 1px solid #F1F1F1;padding: 10px 18px 10px 20px;}
	.paytan6{width: 30px;height: 30px;}
	.paytan7{flex: 1;padding-left: 38px;}
	.paytan8{font-size: 15px;color: #000000;}
	.paytan9{font-size: 10px;color: #000000;padding-top: 5px;}
	.paytan10{width: 26px;height: 26px;}
	.paytan11{width: 22px;height: 22px;}
	.GTP_paytan12{padding: 60px 30px 20px;position: absolute;left: 0;bottom:0;width:100%;}
	.paytan13{background: #FF7F00;border-radius: 6px;height: 44px;color: #FFFFFF;font-size: 18px;text-align: center;line-height: 44px;}
	.vmsgbox{z-index: 999;}
</style>


