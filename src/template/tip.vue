<template>
	<div class="akspopup" v-if="isshow">
		<div class="mask_bg" @click="hide"></div>
		<div class="tipsOut">
			<div class="popup popuptime tipsIn">
				<p class="tips">{{tips}}</p>
				<div class="line"></div>
				<div class="tipsBtn">
					<div class="know-btn"  @click="hide">取消</div>
					<div class="know-btn"  @click="confirm">确定</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		props:['tips','isshow'],
		methods:{
			hide(){
				this.$emit('cancelbtn',false)
			},
			confirm(){
				this.$emit('confirmbtn',false)
			}

		}
	}
</script>


<style scoped>
	.akspopup{width:100%;height: 100%;position:fixed;left: 0;top:0;}
	.mask_bg1{position: fixed;width: 100%;height: 100%;background: rgba(0,0,0,.4);top: 0;left: 0;}
	.tipsOut{width:100%;height: 100%;display: flex;justify-content:center;align-items:center;color:#ff0000;position: absolute;left: 0;top:0;z-index: 99;}
	.tipsIn{background: #fff;height: auto;width:80%;margin:0 auto;border-radius: 10px;padding:15px 0;}
	.tips{text-align: center;font-size: 18px;color:#333;}
	.tipsBtn{height: 30px;line-height: 30px;margin-top: 20px;}
	.know-btn{width:50%;float: left;text-align: center;border-right: 1px solid #ccc;font-size: 16px;color:#333;}
	.know-btn:last-child{color:#f60;border-right:0;}
	.line{height: 1px;background: #ccc;margin-top: 20px;}
</style>