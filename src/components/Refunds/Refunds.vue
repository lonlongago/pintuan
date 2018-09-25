<template>
	<div class="home">
		<div class="refundtop">
			<div class="retop1">退款金额</div>
			<div class="retop2">￥<div class="retop3">{{moneyDetail.real_pay}}</div></div>
			<div class="retop4">已退款，{{moneyDetail.pay_code}}处理中</div>
			<div class="retop5">
				<div class="retop6">支付方式</div>
				<div class="retop7">{{moneyDetail.pay_code}}</div>
			</div>
		</div>
		<div class="refundcon">
			<div class="recon1">退款流程</div>
			<div class="recon2">
				
				<div class="recon3" v-for="(item,index) in logs" v-if="index == 0">
					<div style="width:25px;text-align:center;">
						<img src="../../assets/Group 2@2x.png" class="recon4">
					</div>
					<div class="refunxian"></div>
					<div class="recon5">
						<div class="recon6">
							<div class="recon8">{{logs.title}}</div>
							<div>{{logs.dateline}}</div>
						</div>
						<div class="recon7">{{logs.info}}</div>
					</div>
				</div>
				
				<div class="recon9"  v-for="(item,index) in logs" v-if="index > 0">
					<div style="width:25px;text-align:center;">
						<img src="../../assets/Oval 3 Copy@2x.png" class="recon10">
					</div>
					<div class="refunxian2"></div>
					<div class="recon5">
						<div class="recon6">
							<div class="recon8">{{logs.title}}</div>
							<div>{{logs.dateline}}</div>
						</div>
						<div class="recon7">{{logs.info}}</div>
					</div>
				</div>
				
				
			</div>
		</div>
	</div>
</template>

<script>
import vFooter from '../../template/Footer/Footer'
import vProductList from '../../template/ProductList/ProductList'
import BScroll from 'better-scroll'
import api from '../../api/api'	
export default {
	created(){
		
	},
	
	data () {
		return {
			title:'退款金额',
			order_id: this.$route.query.order_id, //路由带来的order_id
			moneyDetail:{},
			logs:[],
		}
	},
	mounted () {
		var that = this;
		document.title = that.title;
		api.moneywhere({"order_id": that.order_id},function(res){
				if(res.error == "0") {
					that.moneyDetail = res.data.order;
					that.logs = res.data.logs;
					console.log(res)
				} else {
					console.log(res.message)
				}
			});
	},
	components:{vFooter,vProductList},
	methods:{
		
	}
}
</script>


<style type="text/css">
	.refundtop{padding: 20px 12px 5px 14px;background: #fff;}
	.retop1{font-size: 15px;color: #333333;text-align: center;}
	.retop2{font-size: 22px;color: #333333;text-align: center;padding-top: 7px;}
	.retop3{display: inline-block;font-size: 34px;padding-left: 2px;}
	.retop4{font-size: 15px;color: #999999;padding-top: 8px;text-align: center;}
	.retop5{display: flex;align-items: center;padding-top: 18px;}
	.retop6{flex: 1;font-size: 14px;color: #8F8F8F;}
	.retop7{font-size: 14px;color: #666666;}
	.refundcon{margin-top: 10px;background: #fff;}
	.recon1{padding: 11px 14px;font-size: 16px;color: #333333;border-bottom: 1px solid #DEDEDE;}
	.recon2{padding: 19px 13px;}
	.recon3{display: flex;align-items: center;position: relative;left: 0;right: 0;}
	.recon4{width: 17px;height: 17px;}
	.recon5{flex: 1;padding-left: 10px;}
	.recon6{display: flex;align-items: center;font-size: 15px;color: #999999;}
	.recon7{font-size: 14px;color: #999999;padding-top: 3px;}
	.recon8{flex: 1;color: #FF7700;}
	.recon9{margin-top: 40px;display: flex;align-items: center;position: relative;left: 0;right: 0;}
	.recon10{width: 9px;height: 9px;}
	.recon11{font-size: 15px;color: #999999;flex: 1;}
	.refunxian{position: absolute;background: #E5E5E5;width: 1px;height: 155%;top: 71%;left: 3.5%;}
	.refunxian2{position: absolute;background: #E5E5E5;width: 1px;height: 172%;top: 53%;left: 3.5%;}
</style>


