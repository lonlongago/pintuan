<template>
	<div class="akspopup" v-if="isshow">
		<div class="mask_bg" @click="hide"></div>
		<div class=" popup popuptime tishitan" style="height:auto">
			<p class="tips">{{title}}</p>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		props:['title','isshow'],
		methods:{
			hide(){
				this.$emit('cancel',false)
			},
			confirm(){
				this.$emit('confirm',false)
			}

		}
	}
</script>
<style scoped>
	.tishitan{padding:20px;position: fixed;top: 43%;left: 0;right: 0;z-index: 100;}
	.tips{background: rgba(0,0,0,0.6);padding: 10px;text-align: center;font-size: 15px;color: #fff;border-radius: 8px;}
</style>