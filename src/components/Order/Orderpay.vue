<template>
	<div class="orderpay">
		<div class="orderpay_cont">
			<div class="pub_list goods_box">
				<div class="img"><img src="" /></div>
				<div class="ml10 pub_list_bd text">
					<h3 class="tit">{{orderDetail.product_title}}</h3>
					<div class="black9">{{orderDetail.product_spec}}</div>
					<div>￥{{orderDetail.product_price}}<div class="fr num">x{{orderDetail.product_num}}</div></div>
				</div>
			</div>
			<div class="border_t pub_list list_box">
				<div class="pub_list_bd">是否自提</div>
				<!--<input type="checkbox" name="" v-model="toggle" @change="check">-->
					<input type="checkbox" name="" >
			</div>
			<!-- <div class="border_t pub_list list_box">
				<div class="pub_list_bd">自提地址</div>
				<div class="mr10 black9">请添加您的收货地址</div>
				<i class="rArrow_ico"></i>
			</div> -->
			<div class="border_t pub_list add_box">
				<div class="pub_list_bd">
					<div>{{orderDetail.contact}} {{orderDetail.mobile}}</div>
					<p>{{orderDetail.addr_detail}}</p>
				</div>
				<i class="rArrow_ico"></i>
			</div>
			<div class="border_t pub_list list_box">
				<div class="pub_list_bd">红包</div>
				<div class="mr10 black9">暂无可用红包</div>
				<i class="rArrow_ico"></i>
			</div>
			<div class="border_t word_box">
				<div class="bt">买家留言</div>
				<textarea placeholder="点击输入（选填）"></textarea>
			</div>
		</div>
		<div class="pub_list orderpay_footer">
			<div class="pub_list_bd">应付：<span>￥{{orderDetail.amount}}</span>（免运费）</div>
			<div class="btn">立即支付</div>
		</div>
	</div>
</template>

<script>
import api from '../../api/api'
export default{

	data(){
		return{
			orderDetail:{},
			checked:"",
		}
	},
	components:{},
	mounted(){
		var that = this;
		
        	api.orderDetail({"order_id":1023},function(res){
				console.log(res)
			if(res.error == "0"){
				that.orderDetail = res.data.detail;
//				if(that.orderDetail.is_ziti == 0){
//					that.isCheck = false;
//					console.log(that.isCheck)
//				}else{
//					that.isCheck = true;
//					console.log(that.isCheck)
//				}
			}else{
				console.log(message)
			}
		})
	},
	methods:{

	}
}
</script>

<style type="text/css">
.orderpay{ height: 100%; background: #fff; }
.orderpay_cont{ padding-bottom: 50px; }
.orderpay_cont .goods_box{ padding: 10px; }
.orderpay_cont .goods_box .img{ width: 80px; height: 80px; overflow: hidden; }
.orderpay_cont .goods_box .img img{ width: 100%; height: 100%; }
.orderpay_cont .goods_box .text{ line-height: 20px; }
.orderpay_cont .goods_box .text .tit{ font-size: 14px; height: 40px; line-height: 20px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; text-overflow: ellipsis; overflow: hidden; }

.orderpay_cont .list_box{ padding: 10px; line-height: 30px; font-size: 14px; }
.orderpay_cont .rArrow_ico{ display: inline-block; width: 10px; height: 20px; background: url(../../assets/dianji@3x.png)  no-repeat; background-size: contain; vertical-align: middle; }
.orderpay_cont .list_box input[type='checkbox']{ position: relative; width: 40px; height: 24px; border: 1px solid #dfdfdf; outline: 0; border-radius: 16px; box-sizing: border-box; background-color: #dfdfdf; -webkit-appearance: none; appearance: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); transition: background-color 0.1s, border 0.1s; }
.orderpay_cont .list_box input[type='checkbox']:after{ content: " "; position: absolute;
	    top: 0; left: 0; width: 22px; height: 22px; border-radius: 15px; background-color: #fff; transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35); }
.orderpay_cont .list_box input[type='checkbox']:checked{ border-color: #FF7F00; background-color: #FF7F00; }
.orderpay_cont .list_box input[type='checkbox']:checked:after{ transform: translateX(16px); }

.orderpay_cont .add_box{ padding: 10px; line-height: 20px; }
.orderpay_cont .add_box .pub_list_bd>div{ font-size: 14px; }

.orderpay_cont .word_box{ padding: 10px; }
.orderpay_cont .word_box .bt{ font-size: 14px; line-height: 20px; margin-bottom: 10px; }
.orderpay_cont .word_box textarea{ resize: none; width: 100%; height: 100px; line-height: 20px; padding: 10px; border: 1px solid #F1F1F1; -weblit-box-sizing: border-box; box-sizing: border-box; vertical-align: top; }

.orderpay_footer{ position: fixed; left: 0; bottom: 0; z-index: 99; width: 100%; height: 50px; background: #f7f7f7; }
.orderpay_footer .pub_list_bd{ line-height: 20px; padding: 15px 10px; font-size: 14px; }
.orderpay_footer .pub_list_bd span{ color: #eb3636; }
.orderpay_footer .btn{ width: 140px; height: 50px; line-height: 50px; text-align: center; background: #FF7F00; font-size: 16px; color: #fff; }
</style>