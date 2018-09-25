<template>
	<div class="shareSuccess_cont">
		<div class="wz"><i></i>分享成功</div>
		<div class="btn_box">
			<div class="btn btn1">继续分享</div>
			<div class="btn">前往首页</div>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return{

		}
	},
	components:{},
	mounted(){
		
	},
	methods:{

	}
}
</script>

<style type="text/css">
.shareSuccess_cont{ height: 100%; background: #fff; }
.shareSuccess_cont .wz{ font-size: 14px; text-align: center; padding: 30px 0 55px; }
.shareSuccess_cont .wz i{ display: inline-block; width: 30px; height: 30px; background: url(../../assets/completion@3x.png) no-repeat; background-size: contain; vertical-align: middle; margin-right: 8px; }
.shareSuccess_cont .btn_box{ width: 80%; margin: 0 auto; }
.shareSuccess_cont .btn_box .btn{ width: 100%; height: 44px; line-height: 44px; text-align: center; border: 1px solid #FF7F00; border-radius: 4px; font-size: 14px; color: #FF7F00; margin-bottom: 15px; }
.shareSuccess_cont .btn_box .btn1{ background: #FF7F00; color: #fff; }
</style>