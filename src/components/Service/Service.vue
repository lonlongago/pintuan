<template>
	<div class="home">
		<div class="sertop">
			<div class="sertop1">
				<img src="../../assets/Combined Shape@2x.png" class="sertop2">
				<div class="sertop3">投诉商家服务</div>
			</div>
			<div class="sercon1">
				<div class="sercon2">小美抱歉给您带来不愉快的用餐体验，您可以点击下方的【联系客服】，联系小美为你协调~</div>
				<div class="sercon3">
				<div style="flex:1;"></div>
					<div class="sercon4" @click="yesFn">
						<img v-if="yesflag == true" src="../../assets/Fill 3@2x.png" class="sercon5">
						<img v-else src="../../assets/Page 1 Copy@2x.png" class="sercon5">
						<div class="sercon6">有用</div>
					</div>
					<div class="sercon7" @click="noFn">
						<img v-if="noflag == true" src="../../assets/Page 1@2x(3).png" class="sercon5">
						<img v-else src="../../assets/Page 1@2x(2).png" class="sercon5">
						<div class="sercon6">没用</div>
					</div>
				</div>
			</div>
		</div>
		<div class="sermid">
			<a href="javascript:;" class="sermid3">
				<div class="sermid1">联系客服</div>
			</a>
			<a href="javascript:;" class="sermid4">
				<div class="sermid2">知道了</div>
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
			title:'在线客服',
			yesflag: false,
			noflag: false,
		}
	},
	components:{vFooter,vProductList},
	methods:{
		yesFn: function(){
			if(this.yesflag){
				this.yesflag = false;
			}else{
				if(this.noflag == true){
					this.yesflag = false;
				}else{
					this.yesflag = true;
				}
			}
		},
		noFn: function(){
			if(this.noflag){
				this.noflag = false;
			}else{
				if(this.yesflag == true){
					this.noflag = false;
				}else{
					this.noflag = true;
				}
			}
		},
	}
}
</script>


<style type="text/css">
	.sertop{padding: 8px 12px;margin-bottom: 80px;}
	.sertop1{background-image: url(../../assets/Rectangle@2x.png);background-size: 100% 100%;height: 43px;width: 100%;display: flex;align-items: center;}
	.sertop2{width: 20px;height: 20px;margin-left: 10px;}
	.sertop3{flex: 1;padding-left: 9px;font-size: 16px;color: #FFFFFF;}
	.sercon1{margin-top: 8px;padding: 17px 10px 15px 10px;background: #fff;box-shadow: 0 1px 7px 0 rgba(115,115,115,0.27);border-radius: 6px;}
	.sercon2{font-size: 15px;color: #333333;line-height: 1.5;}
	.sercon3{padding-top: 26px;display: flex;align-items: center;text-align: right;}
	.sercon4{display: flex;align-items: center;}
	.sercon5{width: 20px;height: 20px;}
	.sercon6{padding-left: 8px;font-size: 14px;color: #BFBFBF;}
	.sercon7{padding-left: 24px;display: flex;align-items: center;}
	.sermid{position: fixed;left: 0;right: 0;bottom: 0;padding: 18px 50px;background: #fff;z-index: 5;display: flex;align-items: center;}
	.sermid1{font-size: 14px;color: #333333;height: 35px;width: 100%;box-shadow: 0 0 6px 0 rgba(116,116,116,0.27);border-radius: 100px;line-height: 35px;text-align: center;}
	.sermid2{font-size: 14px;color: #FFFFFF;height: 35px;width: 100%;background: #FF7700;box-shadow: 0 0 6px 0 rgba(255,119,0,0.50);border-radius: 100px;line-height: 35px;text-align: center;}
	.sermid3{width: 42%;}
	.sermid4{width: 42%;margin-left: 16%;}
</style>


