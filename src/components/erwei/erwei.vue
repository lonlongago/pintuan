<template>
	<div class="erwei">
		<div class="erwei_all">
			<div class="erwei_top">
				<div class="erwei_top2">
					<div class="erwei_top3">{{spend_statusTxt}}</div>
					<div class="erwei_top4">¥{{checkCode.total_price}}</div>
				</div>
				<div class="erwei_top5">
					<div class="erwei_top6">有&nbsp;&nbsp;&nbsp;效&nbsp;&nbsp;&nbsp;期：
						<span class="erwei_top7">{{checkCode.pay_time}}</span>
					</div>
					<div class="erwei_top8">核销码密码：
						<span  class="erwei_top9">{{checkCode.spend_number}}</span>
					</div>
					<div id="qrcode" class="erwei_top10"></div>
				</div>
			</div>
		</div>
	</div>
	
	
	
	
</template>

<script>
	import QRCode from 'qrcodejs2'
	import api from '../../api/api'
	import BScroll from 'better-scroll'
	export default {
		created(){
		},
		data () {
			return {
				title:"核销码",
				active: 1,
				order_id: this.$route.query.order_id, //路由带来的order_id
				checkCode:{},
				spend_statusTxt:"",
				code:""
				
			}
		},
		mounted () {
			var that = this;
			document.title=that.title;
			// this.getvalFn();
			api.checkCode({"order_id": that.order_id},function(res){
					if(res.error == "0"){
						that.checkCode = res.data.detail;
						that.code = res.data.detail.spend_number;
						if(res.data.detail.spend_status == 0){
							that.spend_statusTxt = "未核销";
						}else{
							that.spend_statusTxt = "已核销";
						}
						that.qrcode();
					}else{
						console.log(res.message)
					}
			});
			
		},
		components:{},
		methods:{
			qrcode () {
	      let qrcode = new QRCode('qrcode', {
	        width: 132,
	        height: 132, // 高度
	        text:this.code, // 二维码内容
	        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
	        // background: '#f0f'
	        // foreground: '#ff0'
	      });
//	      console.log(qrcode)
	    },
		}
	}
</script>


<style type="text/css">
	.erwei_all{padding: 12px;}
	.erwei_top{background: url(../../assets/erweibg.png) no-repeat;background-size: 100%;width: 100%;height: 395px;position: relative;}
	.erwei_top2{position: absolute;top: 0;left: 0;right: 0;height: 90px;text-align: center;}
	.erwei_top3{font-size: 15px;color: #eb3636;padding-top: 25px;}
	.erwei_top4{font-size: 15px;color: #666666;padding-top: 8px;}
	.erwei_top5{position: absolute;top: 90px;left: 0;right: 0;bottom: 0;text-align: center;}
	.erwei_top6{padding-top: 35px;font-size: 14px;color: #999999;}
	.erwei_top7{color: #333333;}
	.erwei_top11{color: #999999;}
	.erwei_top12{color: #999999;font-size: 16px;}
	.erwei_top8{padding-top: 15px;font-size: 14px;color: #999999;}
	.erwei_top9{font-size: 16px;color: #f8ab55;}
	.erwei_top10{margin-top: 27px;text-align: center;}
	#qrcode img{display: inline-block!important;border: 1px solid #cccccc;padding: 6px;}
</style>


