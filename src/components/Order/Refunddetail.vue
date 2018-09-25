<template>
	<div class="refundDetail_cont">
		<div class="border_b top_box">
			<div class="tit"><i></i>申请已提交，商家处理中</div>
			<p>若商家同意：<span class="black9">申请将达成并退款至您支付帐号</span></p>
			<p>若商家拒绝：<span class="black9">您可以申请维权</span></p>
			<p>若商家未处理：<span class="black9">超过<span class="fontcl5">{{refundDetail.auto_refund_days}}</span>天系统自动为您退款</span></p>
		</div>
		<ul class="list_box">
			<li>店铺名称：<span class="black6">{{refundDetail.shop_title}}</span></li>
			<li>售后类型：<span class="black6">{{refundDetail.refund_type_lable}}</span></li>
			<li>收货状态：<span class="black6">{{refundDetail.goods_type_lable}}</span></li>
			<li>退款金额：<span class="black6">￥{{refundDetail.refund_money}}</span></li>
			<li>退款说明：<span class="black6">{{refundDetail.intro}}</span></li>
			<li>商品名称：<span class="black6">{{refundDetail.product_title}}</span></li>
			<li>订单编号：<span class="black6">{{refundDetail.order_id}}</span></li>
		</ul>
		<!--<div class="text_r"><div class="btn">查看详情</div></div>-->
	</div>
</template>

<script>
import api from '../../api/api'	
export default{
	data(){
		return{
			refundDetail:{},
			order_id: this.$route.query.order_id, //路由带来的order_id
		}
	},
	components:{},
	mounted(){
		var that = this;
		api.refundDetail({ "order_id": 1027},function(res){
					console.log(res)
					if(res.error == "0") {
							that.refundDetail = res.data.detail;
						} else {
							console.log(res.message)
						}
				})
	},
	methods:{

	}
}
</script>

<style type="text/css">
.refundDetail_cont{ height: 100%; background: #fff; }
.refundDetail_cont .top_box{ padding: 20px 10px 10px; }
.refundDetail_cont .top_box .tit{ font-size: 16px; margin-bottom: 15px; }
.refundDetail_cont .top_box .tit i{ display: inline-block; width: 25px; height: 25px; background: url(../../assets/wait_refund@3x.png) no-repeat; background-size: contain; vertical-align: middle; margin-right: 5px; }
.refundDetail_cont .top_box p{ font-size: 14px; line-height: 20px; margin-bottom: 10px; }
.refundDetail_cont .list_box li{ padding: 15px 10px; line-height: 20px; border-bottom: 1px solid #e6e6e6; font-size: 14px; }
.refundDetail_cont .btn{ display: inline-block; width: 80px; height: 30px; line-height: 30px; text-align: center; border-radius: 4px; border: 1px solid #FF7F00; color: #FF7F00; margin: 20px 10px; }
</style>