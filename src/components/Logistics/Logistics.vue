<template>
	<div class="home">
		<!-- 头部 -->
		<!--<div class="logisttop">
			<div class="logisttop1">
				<img src="../../assets/Rectangle 6 Copy@3x.png" class="logisttop2">
				<div class="logisttop3">
					<div class="logisttop4">已签收</div>
					<div class="logisttop5">{{logistics.express}} : {{logistics.express_no}}</div>
					<div class="logisttop5">物流电话 : <div style="color: #408CFF;display:inline-block;">021-68999888</div></div>
				</div>
			</div>
		</div>-->
		<div class="logisttop">
			<div class="logisttop1">
				<div class="logisttop5">{{logistics.express}} : {{logistics.express_no}}</div>
			</div>
		</div>
		<div class="logistcon">
			<div class="logistcon1" v-for="(item,index) in logisticsList" v-if="index == 0">
				<div class="logistcon2">
					<div class="logisttime">{{logisticsTimeD[index]}}</div>
					<div class="logistday">{{logisticsTimeY[index]}}</div>
				</div>
				<img src="../../assets/dui@2x.png" class="logistcon3">
				<div class="logisxian"></div>
				<div class="logistcon4">{{item.context}}</div>
			</div>
			
			<div class="logistcon5" v-for="(item,index) in logisticsList" v-if="index > 0">
				<div class="logistcon2">
					<div class="logisttimes">{{logisticsTimeD[index]}}</div>
					<div class="logistdays">{{logisticsTimeY[index]}}</div>
				</div>
				<img src="../../assets/jian@2x.png" class="logistcon3">
				<div class="logisxian2"></div>
				<div class="logistcon6">{{item.context}}</div>
			</div>
			<!--<div class="logistcon5">
				<div class="logistcon2">
					<div class="logisttimes">21:10</div>
					<div class="logistdays">2018‐4‐17</div>
				</div>
				<img src="../../assets/jian@2x.png" class="logistcon3">
				<div class="logisxian2"></div>
				<div class="logistcon6">[合肥市]快递已经到达合肥蜀山四部</div>
			</div>
			<div class="logistcon5">
				<div class="logistcon2">
					<div class="logisttimes">21:10</div>
					<div class="logistdays">2018‐4‐17</div>
				</div>
				<img src="../../assets/jian@2x.png" class="logistcon3">
				<div class="logisxian2"></div>
				<div class="logistcon6">[合肥市]快递离开合肥中转部已发往合肥蜀山四部</div>
			</div>
			<div class="logistcon5">
				<div class="logistcon2">
					<div class="logisttimes">21:10</div>
					<div class="logistdays">2018‐4‐17</div>
				</div>
				<img src="../../assets/jian@2x.png" class="logistcon3">
				<div class="logisxian2"></div>
				<div class="logistcon6">[合肥市]快递已到达合肥中转部</div>
			</div>
			<div class="logistcon5">
				<div class="logistcon2">
					<div class="logisttimes">21:10</div>
					<div class="logistdays">2018‐4‐17</div>
				</div>
				<img src="../../assets/jian@2x.png" class="logistcon3">
				<div class="logisxian2"></div>
				<div class="logistcon6">[合肥市]快递已到达合肥中转部</div>
			</div>
			<div class="logistcon5">
				<div class="logistcon2">
					<div class="logisttimes">21:10</div>
					<div class="logistdays">2018‐4‐17</div>
				</div>
				<img src="../../assets/jian@2x.png" class="logistcon3">
				
				<div class="logistcon6">[合肥市]快递已到达合肥中转部</div>
			</div>-->
		</div>
	</div>
</template>

<script>
import vFooter from '../../template/Footer/Footer'
import vProductList from '../../template/ProductList/ProductList'
import BScroll from 'better-scroll'
import api from '../../api/api'
export default {
	data () {
		return {
			logistics:{},
			logisticsList:[],
			logisticsTimeY:[],
			logisticsTimeD:[],
			order_id: this.$route.query.order_id, //路由带来的order_id
		}
	},
	created(){
		
	},
	mounted () {
		//请求物流信息
		var that = this;
		api.logistics({order_id: that.order_id},function(res){
//			console.log(res)
			if(res.error == "0") {
				that.logistics = res.data;
				that.logisticsList = res.data.items;
				for(var i=0;i<that.logisticsList.length;i++){
					that.logisticsTimeY.push(that.logisticsList[i].time.slice(0,10));
					that.logisticsTimeD.push(that.logisticsList[i].time.slice(10,16));
				};
				console.log(res)

			}else{
				console.log(res.message)
			}
		})
		
	},
	
	components:{vFooter,vProductList},
	methods:{
		
	}
}
</script>


<style type="text/css">
	.logisttop{padding: 13px 12px 16px 12px;background: #fff;}
	.logisttop1{display: flex;align-items: center;}
	.logisttop2{width: 70px;height: 70px;border-radius: 2px;}
	.logisttop3{flex: 1;padding-left: 13px;}
	.logisttop4{font-size: 17px;color: #FF7700;}
	.logisttop5{font-size: 15px;color: #8B8B8B;padding-top: 2px;}
	.logistcon{margin-top: 8px;background: #fff;padding: 22px 20px 22px 12px;}
	.logistcon1{display: flex;align-items: center;position: relative;left: 0;right: 0;}
	.logistcon2{text-align: center;padding-right: 15px;}
	.logisttime{font-size: 14px;color: #333333;}
	.logistday{font-size: 10px;color: #999999;padding-top: 2px;}
	.logistcon3{width: 15px;height: 15px;position: absolute;left: 20%;}
	.logistcon4{font-size: 14px;color: #333333;flex: 1;padding-left: 16px;line-height: 1.5;}
	.logistcon5{display: flex;align-items: center;margin-top: 32px;position: relative;left: 0;right: 0;}
	.logisttimes{font-size: 14px;color: #999999;}
	.logistdays{font-size: 10px;color: #999999;padding-top: 2px;}
	.logistcon6{font-size: 14px;color: #999999;flex: 1;padding-left: 16px;line-height: 1.5;}
	.logisxian{position: absolute;width: 2px;background: #E6E6E6;height: 110%;left: 21.3%;top: 62%;}
	.logisxian2{position: absolute;width: 2px;background: #E6E6E6;height: 140%;left: 21.3%;top: 70%;}
	
	@media only screen and (max-width: 375px) {
		.logistcon3{width: 15px;height: 15px;position: absolute;left: 22%;}
		.logisxian{position: absolute;width: 2px;background: #E6E6E6;height: 110%;left: 23.3%;top: 62%;}
		.logisxian2{position: absolute;width: 2px;background: #E6E6E6;height: 140%;left: 23.3%;top: 70%;}
	}
	@media only screen and (max-width: 320px) {
		.logistcon3{width: 15px;height: 15px;position: absolute;left: 24%;}
		.logisxian{position: absolute;width: 2px;background: #E6E6E6;height: 110%;left: 25.3%;top: 62%;}
		.logisxian2{position: absolute;width: 2px;background: #E6E6E6;height: 140%;left: 25.3%;top: 70%;}
	}
</style>


