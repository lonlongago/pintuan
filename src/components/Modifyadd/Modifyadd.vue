<template>
	<div class="home">
		<!-- 头部 -->
	    <div class="modifytop">
	    	<div class="modtop1">
	    		<div class="modtop2">收货人: </div>
	    		<input type="text" name="sname" placeholder="小猪佩奇" class="modtop3" v-model="val" v-on:focus="fouFn(1)" v-on:blur="bluFn(1)">
	    		<img src="../../assets/Group 7@2x.png" class="modtop4" :style="val=='' || tel1flag == true ?'display:none;':'display:block;'" @click="cleanFn">
	    	</div>
	    	<div class="modtop5">
	    		<div class="modtop2">手机号: </div>
	    		<input type="text" name="sname" placeholder="请输入11位手机号码" maxlength="11" class="modtop3" v-model="tel" v-on:focus="fouFn(2)" v-on:blur="bluFn(2)">
	    		<img src="../../assets/Group 7@2x.png" class="modtop4" :style="tel=='' || tel2flag == true ?'display:none;':'display:block;'" @click="clean2Fn">
	    	</div>
	    </div>
	    <!-- 地址 -->
	    <div class="modifycon">
	    	<div class="dingwei">
	    		<div class="sheng">
	    			<div class="sheng5" @click="xuanweiFn(1)">
		    			<div class="sheng2">省份</div>
		    			<input type="text" disabled name="" placeholder="请选择所属省份" v-model="sheng" class="sheng3">
	    			</div>
	    			<div class="sheng5" @click="xuanweiFn(2)">
		    			<div class="sheng2">城市</div>
		    			<input type="text" disabled name="" placeholder="请选择所属城市名" v-model="shi" class="sheng3">
		    		</div>
		    		<div class="sheng5" @click="xuanweiFn(3)">
		    			<div class="sheng2">县区</div>
		    			<input type="text" disabled name="" placeholder="请选择所属县/区名" v-model="qu" class="sheng3">
		    		</div>
	    		</div>
	    		<div class="sheng6" @click="dingweiFn">
	    			<img src="../../assets/dingwei.jpg" class="sheng8">
	    			<div class="sheng9">定位</div>
	    		</div>
	    	</div>
	    	<!-- <router-link :to="{path:'/gdmap'}">
		    	<div class="modtop1">
		    		<div class="modtop2">地址:</div>
		    		<input type="text" name="sname" placeholder="请选择地址" disabled="true" class="modtop3" v-model="advic" style="background:#fff;">
		    		<img src="../../assets/rightmore@2x.png" class="modtop6">
		    	</div>
		    </router-link> -->
	    	<div class="modtop1">
	    		<div class="modtop2">门牌号: </div>
	    		<input type="text" name="sname" placeholder="例如: 904" class="modtop3" v-model="door" v-on:focus="fouFn(3)" v-on:blur="bluFn(3)">
	    		<img src="../../assets/Group 7@2x.png" class="modtop4" :style="door=='' || tel3flag == true ?'display:none;':'display:block;'" @click="clean3Fn">
	    	</div>
	    	<div class="modtop5">
	    		<div class="modtop2">标签:  </div>
	    		<div class="modcon1">
	    			<div :class="act==1?'modifylable2':'modifylable'" @click="labFn(1)">家</div>
	    			<div :class="act==2?'modifylable2':'modifylable'" @click="labFn(2)">学校</div>
	    			<div :class="act==3?'modifylable2':'modifylable'" @click="labFn(3)">公司</div>
	    			<div :class="act==4?'modifylable2':'modifylable'" @click="labFn(4)">其它</div>
	    		</div>
	    	</div>
	    </div>
	    <!-- 设置默认地址 -->
	    <div class="mod_moren">
	    	<img v-if="defaflag == 0" src="../../assets/defalt_wei.jpg" class="mod_moren3" @click="shemorenFn(1)">
	    	<img v-else src="../../assets/defalt_gou.jpg" class="mod_moren3" @click="shemorenFn(0)">
	    	<div class="mod_moren2">默认地址</div>
	    </div>
	    <div class="modifymid">
		    <a href="javascript:;" @click="baocunFn">
		    	<div class="modifybtn">保存</div>
  	    </a>
  	    <a href="javascript:;" v-if="addr_id != undefined" @click="deladvFn">
	    		<div class="modifybtn2">删除</div>
  	    </a>
	    </div>
	    <transition name="fade">
		    <div class="shadow" v-if="shaflag" @click="shaFn"></div>
		  </transition>
		  <transition name="fade">
		    <div class="xuantan" v-if="xuantanflag">
		    	<div class="xuantan2">{{xuanname}}</div>
		    	<div class="xuantan3">
		    		<div v-for="item in xuanzhi" @click="tanxuanFn(item.region_id,item.region_name)" class="xuantan5">{{item.region_name}}</div>
		    	</div>
		    	<div class="xuantan6" @click="quxiaoFn">取消</div>
		    </div>
		  </transition>
		  <v-msgbox :isshow="tipshow" :title="tips"></v-msgbox>
		  <!-- <div class="tishitan" v-if="tishitan == true">{{tishival}}</div> -->
	</div>
</template>

<script>
import Hub from '../../../config/eventBus.js';
import api from '../../../src/api/api.js'
import vFooter from '../../template/Footer/Footer'
import vProductList from '../../template/ProductList/ProductList'
import BScroll from 'better-scroll'
import vMsgbox from '../../../src/template/msgbox'
export default {
	created(){
		var that = this;
		Hub.$on('change', (msg) => { //Hub接收事件
        that.advic = msg;
        console.log(that.advic)
    });
    Hub.$on('ding', (e) => { //Hub接收事件
        that.lat = e;
        console.log(e)
    });
    Hub.$on('wei', (r) => { //Hub接收事件
        that.lng = r;
        console.log(r)
    });
    Hub.$on('gogogo', (id) => { //Hub接收事件
        that.newadmap = id;
        console.log(id)
    });
	},
	watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getParams'
  },
	mounted () {
		document.title=this.title;
		var that = this;
		if(that.addr_id != undefined){
			document.title= "修改地址";
			that.val = that.contact;
			that.tel = that.mobile;
			that.sheng = that.province_name;
			that.shi = that.city_name;
			that.qu = that.area_name;
			// this.advic = this.province_name + this.city_name + this.area_name;
			that.door = that.addr;
			that.defaflag = that.is_default;
			that.act = that.type;
		}
	},
	data () {
		return {
			title:"新增地址",
			val:'',
			tel:'',
			advic:'',
			door:'',
			newadmap: '',
			act:1,
			tel1flag: false,
			tel2flag: false,
			tel3flag: false,
			addr_id: this.$route.query.addr_id,
			province_name: this.$route.query.province_name,
			city_name: this.$route.query.city_name,
			area_name: this.$route.query.area_name,
			contact: this.$route.query.contact,
			addr: this.$route.query.addr,
			mobile: this.$route.query.mobile,
			province_id: this.$route.query.province_id,
			city_id: this.$route.query.city_id,
			area_id: this.$route.query.area_id,
			is_default: this.$route.query.is_default,
			type: this.$route.query.type,
			sheng: '',
			shi: '',
			qu: '',
			dingval: [],
			shaflag: false,
			xuantanflag: false,
			xuanname: '省份',
			xuanzhi: [],
			lev: '',
			defaflag: 0,
			tishiflag: false,
			tishival: '',
			tips: '',
			tipshow: false,
		}
	},
	components:{vFooter,vProductList,vMsgbox},
	methods:{
		getParams: function(){
			var addr_id = this.$route.query.addr_id;
			// var ad = this.$route.params.addvices;
			// var ba = this.$route.params.back;
			// console.log(ad)
			// this.advic = ad;
			if(addr_id != undefined){
				var province_name = this.$route.query.province_name;
				var city_name = this.$route.query.city_name;
				var area_name = this.$route.query.area_name;
				var contact = this.$route.query.contact;
				var addr = this.$route.query.addr;
				var mobile = this.$route.query.mobile;
				var is_default = this.$route.query.is_default;
				var type = this.$route.query.type;
				this.province_id = this.$route.query.province_id;
				this.city_id = this.$route.query.city_id;
				this.area_id = this.$route.query.area_id;
				this.val = contact;
				this.tel = mobile;
				this.sheng = province_name;
				this.shi = city_name;
				this.qu = area_name;
				this.defaflag = is_default;
				this.act = type;
				// this.advic = province_name + city_name + area_name;
				this.door = addr;
			}else{
				this.val = '';
				this.tel = '';
				this.sheng = '';
				this.shi = '';
				this.qu = '';
				// this.advic = '';
				this.door = '';
			}
			console.log(addr_id)
		},
		cleanFn: function(){
			this.val = '';
		},
		clean2Fn: function(){
			this.tel = '';
		},
		clean3Fn: function(){
			this.door = '';
		},
		labFn: function(a){
			this.act  = a;
		},
		fouFn: function(e){
			var that = this;
			if(e == 1){
				that.tel1flag = false;
			}else if(e == 2){
				that.tel2flag = false;
			}else if(e == 3){
				that.tel3flag = false;
			}
		},
		bluFn: function(e){
			var that = this;
			if(e == 1){
				that.tel1flag = true;
			}else if(e == 2){
				that.tel2flag = true;
			}else if(e == 3){
				that.tel3flag = true;
			}
		},
		dingweiFn: function(){
			var that = this;
			api.auto_position({},function(res){
				console.log(res)
				if(res.error == '0'){
					that.dingval = res.data;
					that.sheng = res.data.province.region_name;
					that.province_id = res.data.province.region_id;
					that.shi = res.data.city.region_name;
					that.city_id = res.data.city.region_id;
					that.qu = '';
				}
			})
		},
		xuanweiFn: function(e){
			var that = this;
			that.lev = e;
			var province_id = that.province_id;
			console.log(province_id)
			if(e == 1){
				that.xuanname = '省份';
				api.get_region({'level': e},function(res){
					if(res.error == '0'){
						console.log(res)
						that.xuanzhi = res.data.items;
						that.shaflag = true;
						that.xuantanflag = true;
					}
				})
			}else if(e == 2){
				if(province_id != undefined){
					that.xuanname = '城市';
					api.get_region({'region_id': that.province_id,'level': e},function(res){
						if(res.error == '0'){
							console.log(res)
							that.xuanzhi = res.data.items;
							that.shaflag = true;
							that.xuantanflag = true;
						}
					})
				}else{
					api.tipload(that,'请先选择省份');
				}
			}else if(e == 3){
				if(that.city_id != undefined){
					that.xuanname = '县区';
					api.get_region({'region_id': that.city_id,'level': e},function(res){
						if(res.error == '0'){
							console.log(res)
							that.xuanzhi = res.data.items;
							that.shaflag = true;
							that.xuantanflag = true;
						}
					})
				}else{
					api.tipload(that,'请先选择省份/城市');
				}
			}
		},
		shaFn: function(){
			var that = this;
			that.shaflag = false;
			that.xuantanflag = false;
		},
		quxiaoFn: function(){
			var that = this;
			that.shaflag = false;
			that.xuantanflag = false;
		},
		tanxuanFn: function(e,t){
			var that = this;
			var lev = that.lev;
			if(lev == 1){
				that.sheng = t;
				that.province_id = e;
				that.shi = '';
				that.qu ='';
			}else if(lev == 2){
				that.shi = t;
				that.city_id = e;
				that.qu ='';
			}else if(lev == 3){
				that.qu = t;
				that.area_id = e;
			}
			that.shaflag = false;
			that.xuantanflag = false;
		},
		shemorenFn: function(e){
			var that = this;
			that.defaflag = e;
		},
		baocunFn: function(){
			var that = this;
			var addr_id = that.addr_id;
			var province_id = that.province_id;
			var city_id = that.city_id;
			var area_id = that.area_id;
			var contact = that.val;
			var mobile = that.tel;
			var addr = that.door;
			var type = that.act;
			var isdef = that.defaflag;
			if(addr_id != undefined){
				api.edit({'addr_id': addr_id,'province_id':province_id,'city_id':city_id,'area_id':area_id,'contact':contact,'mobile':mobile,'addr':addr,'type':type,'is_default':isdef},function(res){
						console.log(res)
						if(res.error == '0'){
							api.tipload(that,res.message);
							setTimeout(function(){
								that.$router.go(-1);
							},1200)
							// that.tishiflag = true;
							// that.tishival = res.message;
							// console.log(666,that.tishival)
						}else{
							api.tipload(that,res.message);
						}
				})
			}else{
				api.addrcreate({'province_id':province_id,'city_id':city_id,'area_id':area_id,'contact':contact,'mobile':mobile,'addr':addr,'type':type,'is_default':isdef},function(res){
					console.log(res)
					if(res.error == '0'){
						api.tipload(that,res.message);
						setTimeout(function(){
							that.$router.go(-1);
						},1200)
					}else{
						api.tipload(that,res.message);
					}
				})
			}
		},
		deladvFn: function(){
			var that = this;
			var addr_id = that.addr_id;
			api.delete({"addr_id": addr_id},function(res){
				console.log(res);
				if(res.error == '0'){
					api.tipload(that,res.message);
					setTimeout(function(){
							that.$router.go(-1);
					},1200)
				}else{
					api.tipload(that,res.message);
				}
			})
		},
	}
}
</script>


<style scoped>
	.modifytop{background: #fff;}
	.modtop1{border-bottom: 1px solid #E6E6E6;padding: 14px 12px;display: flex;align-items: center;font-size: 15px;color: #333333;}
	.modtop2{width: 20%;}
	.modtop3{flex: 1;font-size: 15px;padding-left: 10px;}
	.modtop4{width: 18px;height: 18px;}
	.modtop5{padding: 14px 12px;display: flex;align-items: center;font-size: 15px;color: #333333;}
	.modifycon{background: #fff;margin-top: 10px;}
	.modtop6{width: 10px;height: 18px;}
	.modcon1{flex: 1;font-size: 12px;padding-left: 10px;display: flex;align-items: center;line-height: 20px;}
	.modifylable{height: 20px;width: 50px;text-align: center;border: 1px solid #999999;color:#333333;margin-right: 15px;border-radius: 2px;}
	.modifylable2{height: 20px;width: 50px;text-align: center;border: 1px solid #20AD20;color: #20AD20;margin-right: 15px;border-radius: 2px;}
	.modifymid{position: fixed;left: 0;right: 0;bottom: 0;background: #f5f5f5;padding: 10px 5%;}
	.modifybtn{height: 44px;background: #FF7700;border-radius: 6px;color: #fff;line-height: 44px;text-align: center;font-size: 17px;}
	.modifybtn2{height: 44px;background: #fff;border-radius: 6px;color: #FF7700;margin-top: 12px;line-height: 44px;text-align: center;font-size: 17px;border: 1px solid #E6E6E6;}

	.dingwei{display: flex;align-items: center;}
	.sheng{flex: 1;}
	.sheng2{width: 29%;padding-left: 12px;font-size: 15px;color: #333333;}
	.sheng3{flex: 1;font-size: 15px;color: #333333;background: #fff;}
	.sheng5{display: flex;align-items: center;height: 50px;border-bottom: 1px solid #e6e6e6;}
	.sheng6{width: 60px;border-left: 1px solid #e6e6e6;border-bottom: 1px solid #e6e6e6;text-align: center;height: 150px;}
	.sheng7{background: url(../../assets/dingwei.jpg) no-repeat;width: 20px;height: 20px;background-size: 100%;text-align: center;}
	.sheng8{width: 25px;height: 25px;margin-top: 50px;}
	.sheng9{color: #f96720;padding-top: 10px;font-size: 15px;}

	.shadow{position: fixed;top: 0;bottom: 0;left: 0;right: 0;background: rgba(0,0,0,0.4);z-index: 6;}
	.xuantan{position: fixed;top: 15%;left: 15%;right: 15%;height: 60%;background: #fff;z-index: 7;border-radius: 6px;}
	.xuantan2{position: fixed;left: 15%;right: 15%;font-size: 16px;height: 50px;border-bottom: 1px solid #e6e6e6;line-height: 50px;padding-left: 5%;background: #fff;border-radius: 6px 6px 0 0;}
	.xuantan3{padding-left: 3%;padding-top: 50px;padding-bottom: 50px;max-height: 100%;overflow-y: scroll;}
	.xuantan5{height: 44px;line-height: 44px;border-bottom: 1px solid #e6e6e6;font-size: 14px;}
	.xuantan6{color: #999;font-size: 15px;position: fixed;top: 68%;left: 15%;right: 15%;background: #fff;text-align: center;height: 46px;line-height: 46px;border-top: 1px solid #e6e6e6;border-radius: 0 0 6px 6px;}
	
	.fade-enter-active, .fade-leave-active {
    	transition: opacity .5s;
	}
    .fade-enter, .fade-leave-to {
	    opacity: 0;
	}


	.mod_moren{margin-top: 10px;background: #fff;padding: 14px 12px;display: flex;align-items: center;}
	.mod_moren2{padding-left: 15px;flex: 1;font-size: 15px;color: #333;}
	.mod_moren3{width: 16px;height: 16px;border: 1px solid #999;border-radius: 2px;}

	.tishitan{background: rgba(0,0,0,0.8);position: fixed;top: 45%;left: 10%;right: 10%;height: 30px;border-radius: 8px;color: #fff;}
</style>


