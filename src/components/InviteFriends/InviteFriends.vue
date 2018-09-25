<template>
	<div class="yaohaoyou">
		<div class="proDetail" @click="toProDetail">
			<div class="proLeft">
				<img :src="product.photo"/>
			</div>
			<div class="proRight">
				<div class="proTitle">{{product.title}}</div>
				<div class="num">{{product.tuan_num}}人拼单·已拼{{product.tuan_count}}件</div>
				<div class="price">¥{{product.tuan_price}}<span>¥{{product.single_price}}</span></div>
			</div>
		</div>

		<div class="touxiang">
			<ul>
				<li>
					<img :src="item.face" v-for="item in group_list"/>
				</li>
			</ul>
		</div>
		<div class="daojishi" v-if="endTime > 0">仅剩{{product.last_num}}个名额，<span>{{hours}} : {{minutes}} : {{second}}</span>后结束</div>
		<div class="daojishi" v-else>拼团已结束</div>
		<button class="pindanBtn" @click="pintuanBtn">一键拼团</button>	
		
		
		
		
		
		<transition name="fade">
			<div class="shadow" @click="shaFn" v-if="danduflag"></div>
		</transition>
		
		
		
		<div :class="danduflag == true ? 'dandugou zhan' : 'dandugou'">
			<div >
				<div class="dandugou2">
					<img :src="product.photo" class="dandugou3">
					<div class="dandugou4">
						<div class="dandugou7">
							<div class="dandugou5">¥ {{product.tuan_price}}</div>
							<img src="../../assets/danduqu.png" class="dandugou8" @click="danducloseFn">
						</div>
						<div class="dandugou6">{{product.title}}</div>
					</div>
				</div>
			</div>
			<!--<div class="dandugou9">
				<div v-for="" class="dandugou10" @click="">{{}}</div>
				
			</div>-->
			<div v-for="">
				<div class="dandugou11">
					<div class="dandugou12">购买数量<span class="dandugou13">（库存{{product.sale_sku}}）</span></div>
					<div class="dandugou14">
						<div class="dandugou15" @click="jianFn">-</div>
						<div class="dandugou16">{{nums}}</div>
						<div class="dandugou15" @click="jiaFn">+</div>
					</div>
				</div>
			</div>
			<div class="dandugou17" @click="payforFn">确定</div>
		</div>
		
		
		
		
		
	</div>
</template>
<script>


import api from '../../../src/api/api.js'
export default {
	data () {
		return {
			title: "邀请好友拼单",
			order_id: this.$route.query.order_id,
			product_id:'',
			group_list:[],
			product:{},
			order:{},
			endTime:'',
			hours:'',
			minutes:'',
			second:'',
			nums:1,
			tuannum:'',
			group_id:'',
			danduflag:false,
		}
	},
	mounted () {
		var that = this;
		document.title=that.title;
		api.yaohaoyou({"order_id": that.order_id},function(res){
			if(res.error == "0"){
				that.endTime = res.data.group.end_time;
				that.group_id = res.data.group.group_id;
				that.order = res.data.order;
				that.product = res.data.product;
				that.product_id = res.data.product.product_id;
				that.group_list	= res.data.group_list;	
			}else{
				console.log(res.message)
			}
		});
	setInterval(function(){
				that.endTime--;
					that.hours = Math.floor(that.endTime / 60 / 60 % 24);
					if(that.hours>=0 && that.hours<10){
						that.hours = '0'+that.hours
					}
					that.minutes = Math.floor(that.endTime / 60 % 60);
					if(that.minutes>=0 && that.minutes<10){
						that.minutes = '0'+that.minutes
					}
					that.second =  Math.floor(that.endTime % 60);
					if(that.second>=0 && that.second<10){
						that.second = '0'+that.second
					}
			},1000);
	},
	components:{},
	computed:{
		
		
	},
	methods:{
		//跳转商品详情页
		toProDetail:function(){
			this.$router.push({path:'/Prodetl',query:{produc:this.product_id}}); 
		},
		//点击减号
		jianFn: function(){
			var that = this;
			var nums = that.nums;
			if(nums > 1){
				that.nums = nums - 1;
			}
		},
		/*点击加号*/
		jiaFn: function(){
			var that = this;
			var nums = that.nums;
			var kucunnum = that.product.sale_sku;
			if(kucunnum > nums){
				that.nums = nums + 1;
			}else{
				api.tipload(that,'亲,该款式库存只能支持您购买 '+ nums +' 件哟~');
			}
		},
		//点击一键拼团
		pintuanBtn:function(){
			this.danduflag = true;
		},
		shaFn: function(){
			this.danduflag = false;
		},
		danducloseFn:function(){
			this.danduflag = false;
		},
		//购买
		payforFn: function(){
			var that = this;
			var product_id = that.product_id;
			var shoptype = "tuan";
			
			var shopguige = that.order.product_spec_id;
			
			var shopnum = that.nums;
			var group_id = that.group_id;
			var kucunnum = that.product.sale_sku;
			if(that.product.last_num>0){
				var tuannum = that.product.last_num-1;
			}else{
				var tuannum = 0;
			}
				if(kucunnum >= 0){
					if(kucunnum == 0){
						api.tipload(that,'亲,该款式暂时没有库存哟~');
					}else{ //库存大于0
						if(kucunnum - shopnum > 0){ //库存数量大于你要购买的数量
							if(kucunnum - tuannum - shopnum >= 0){ //库存量满足你要购买的数量并满足拼团人数拼团
								that.$router.push('/orderpayinf?product_id='+ product_id + '&shoptype=' + shoptype + '&shopguige=' + shopguige + '&shopnum=' + shopnum + '&group_id=' + group_id + '&backpro=' + true);
							}else{
								api.tipload(that,'亲,当前库存不满足拼团条件');
							}
						}else{ //不满足购买数量或刚好满足你购买数量(不足以开团)
							api.tipload(that,'亲,当前库存不满足拼团条件');
						}
					}
				}else{
					
				}
		}
	},
}
</script>


<style scoped>
.yaohaoyou{padding:10px 20px 0 20px;background: #fff;width:100%;height: 100%;}
.proDetail{height: 120px;}
.proLeft{float: left;width:35%;height: 100%;display: flex;justify-content:center;align-items:center;}
.proLeft img{max-width:100%;max-height: 100%;}
.proRight{float: right;width:65%;padding-left: 20px;}
.proTitle{font-size:14px;color:#333;line-height: 24px;height: 48px;overflow: hidden ;}
.num{font-size: 14px;color:#999;margin-top: 30px;}
.price{font-size: 18px;color:#ff0000;margin-top: 3px;}
.price span{font-size: 14px;color:#999;margin-left: 10px;text-decoration:line-through;}
.daojishi{text-align: center;font-size: 16px;color:#000;margin-top: 15px;}
.daojishi span{font-weight: bold;}
.pindanBtn{display: block;margin:0 auto;width:100%;height: 50px;line-height: 50px;color:#fff;font-size: 18px;text-align: center;background: #DE2D23;margin-top: 15px;border-radius: 5px;border:none;}
.touxiang{margin-top: 30px;}
.touxiang li{height: 50px;margin-top:10px;text-align: center;}
.touxiang li img{width:50px;height: 50px;display: inline-block;border-radius: 50%;margin:0 3px;}

	.zhan{transform: translateY(0)!important;}
	.dandugou{background: #fff;z-index: 3;position: fixed;bottom: 0;left: 0;right: 0;padding: 0 12px;max-height: 410px;transform: translateY(150%);transition: all linear 0.3s;}
	.dandugou2{display: flex;align-items: center;padding-bottom: 14px;border-bottom: 1px solid #f5f5f5;}
	.dandugou3{height: 90px;width: 90px;border: 1px solid #fff;border-radius: 6px;margin-top: -12px;border: 1px solid #f2f2f2;}
	.dandugou4{flex: 1;padding-left: 15px;}
	.dandugou5{color: #eb3636;font-size: 14px;flex: 1;}
	.dandugou7{display: flex;align-items: center;}
	.dandugou8{width: 20px;height: 20px;opacity: 0.4;}
	.dandugou6{font-size: 14px;color: #262121;line-height: 1.4;}
	.dandugou9{padding: 15px 0 0;border-bottom: 1px solid #f5f5f5;}
	.dandugou10{padding: 7px 20px;background: #e6e6e6;border-radius: 6px;font-size: 12px;color: #666666;display: inline-block;margin-right: 12px;margin-bottom: 15px;}
	.on{color: #fff;background: #ffa200;}
	.dandugou11{padding-top: 18px;display: flex;align-items: center;}
	.dandugou12{font-size: 14px;color: #333333;flex: 1;}
	.dandugou13{color: #666666;font-size: 12px;}
	.dandugou14{height: 24px;display: flex;align-items: center;}
	.dandugou15{background: #f2f2f2;color: #262121;font-size: 14px;width: 32px;text-align: center;line-height: 24px;}
	.dandugou16{padding: 0 12px;font-size: 14px;color: #333333;}
	.dandugou17{margin: 30px 0 14px 0;background: #eb3636;height: 45px;line-height: 45px;text-align: center;color: #fff;font-size: 16px;border-radius: 6px;}
	.shadow{position: fixed;top: 0;left: 0;right: 0;bottom: 0;background: rgba(0,0,0,0.4);z-index: 2;}

</style>


