<template>
	<div v-if="isshow">
		<!-- <div class="maskbg"></div> -->
		<!-- <div class="public_dialog message-dialog">
			<div>
				<h3>提示信息</h3>
			</div>
			<div class="content">
				{{title}}
			</div>
			<div class="btns ml10 mr10 mb10" @click="showbtn">
				确定
			</div>
		</div> -->

		<div class="message-dialog public_dialog">
			<div class="message-dialog-cont">
				<p class="mb5">{{title}}</p>
				<div class="know-btn"  @click="showbtn">确定</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		props:['title','isshow'],
		methods:{
			showbtn(){
				this.$emit('diashow',false)
			}
		}
	}
</script>

<style type="text/css">
	/*.maskbg{position: fixed;width: 100%;height: 100%;background: rgba(0,0,0,.6);top: 0;left: 0;}*/
	/*.public_dialog{width: 80%;height: auto;position: fixed;top: 50%;left: 50%;z-index: 100;background: #fff;border-radius: 5px;transform: translate(-50%,-50%);}
	.public_dialog h3{font-size: 16px;height: 44px;line-height: 44px;text-align: center;border-bottom: 1px solid #dedede;}
	.public_dialog .content{padding:20px 10px;font-size: 14px;}
	.public_dialog .btns{height: 40px;line-height: 40px;font-size: 16px;line-height: 40px;background: #ff6600;color: #fff;text-align: center;border-radius: 5px;}*/
</style>