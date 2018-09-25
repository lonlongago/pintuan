<template>
	<div class="home">
		<div class="applytop">
			<div class="applytop1">
				<textarea placeholder="请输入申请理由" class="applytop2"></textarea>
			</div>
			<div class="applytop3">
				<div class="applytop4">
					<img src="../../assets/Page1@2x.png" class="applytop5">
					<div class="applytop6">手机号码：18416535697</div>
				</div>
			</div>
		</div>
		<div class="applymid">
			<a href="javascript:;">
				<div class="applymid2">提交申请</div>
			</a>
		</div>
	</div>
</template>

<script>
import vFooter from '../../template/Footer/Footer'
import vProductList from '../../template/ProductList/ProductList'
import BScroll from 'better-scroll'
export default {
	created(){
		
	},
	mounted () {
		document.title = this.title;
	},
	data () {
		return {
			title:'申请售后',
		}
	},
	components:{vFooter,vProductList},
	methods:{
		
	}
}
</script>


<style type="text/css">
	.applytop{padding: 9px 13px;}
	.applytop1{background: #fff;padding: 16px 10px;box-shadow: 0 0 5px 0 rgba(0,0,0,0.10);border-radius: 8px;}
	.applytop2{font-size: 16px;color: #333;line-height: 1.5;resize: none;border: 0;width: 100%;height: 90px;}
	.applytop3{padding-top: 14px;}
	.applytop4{background: #fff;padding: 9px 12px;display: flex;align-items: center;border-radius: 4px;}
	.applytop5{width: 18px;height: 18px;}
	.applytop6{font-size: 16px;color: #999999;padding-left: 9px;}
	.applymid{position: fixed;left: 0;right: 0;bottom: 0;background: #f5f5f5;z-index: 5;padding: 10px 5%;}
	.applymid2{background: #FF7700;border-radius: 6px;height: 44px;line-height: 44px;text-align: center;width: 100%;font-size: 17px;color: #FFFFFF;}
</style>


