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
	    	<router-link :to="{path:'/gdmap'}">
		    	<div class="modtop1">
		    		<div class="modtop2">地址:</div>
		    		<input type="text" name="sname" placeholder="请选择地址" disabled="true" class="modtop3" v-model="advic" style="background:#fff;">
		    		<img src="../../assets/rightmore@2x.png" class="modtop6">
		    	</div>
		    </router-link>
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
	    <div class="modifymid">
		    <a href="javascript:;">
		    	<div class="modifybtn">保存</div>
  	    </a>
  	    <!-- <a href="javascript:;">
	    		<div class="modifybtn2">删除</div>
  	    </a> -->
	    </div>
	</div>
</template>

<script>
import api from '../../../src/api/api.js'
import vFooter from '../../template/Footer/Footer'
import vProductList from '../../template/ProductList/ProductList'
import BScroll from 'better-scroll'
export default {
	created(){
		
	},
	mounted () {
		document.title=this.title;
		// api.edit({"addr_id": this.addr_id,"contact": this.contact,"province_id": this.province_id,"city_id": this.city_id,"area_id": this.area_id,"addr": this.addr},function(res){
		// 	console.log(res)
		// })
		// console.log(this.addr_id)
		// if(this.addr_id != undefined){
			this.val = this.contact;
			this.tel = this.mobile;
			this.advic = this.province_name + this.city_name + this.area_name;
			this.door = this.addr;
		// }
	},
	data () {
		return {
			title:"修改地址",
			val:'',
			tel:'',
			advic:'',
			door:'',
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
		}
	},
	components:{vFooter,vProductList},
	methods:{
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
	}
}
</script>


<style type="text/css">
	.modifytop{background: #fff;}
	.modtop1{border-bottom: 1px solid #E6E6E6;padding: 14px 12px;display: flex;align-items: center;font-size: 15px;color: #333333;}
	.modtop2{width: 15%;}
	.modtop3{flex: 1;font-size: 15px;padding-left: 10px;}
	.modtop4{width: 18px;height: 18px;}
	.modtop5{padding: 14px 12px;display: flex;align-items: center;font-size: 15px;color: #333333;}
	.modifycon{background: #fff;margin-top: 10px;}
	.modtop6{width: 10px;height: 18px;}
	.modcon1{flex: 1;font-size: 12px;padding-left: 10px;display: flex;align-items: center;}
	.modifylable{height: 20px;width: 50px;text-align: center;border: 1px solid #999999;color:#333333;margin-right: 15px;border-radius: 2px;}
	.modifylable2{height: 20px;width: 50px;text-align: center;border: 1px solid #20AD20;color: #20AD20;margin-right: 15px;border-radius: 2px;}
	.modifymid{position: fixed;left: 0;right: 0;bottom: 0;background: #f5f5f5;z-index: 5;padding: 10px 5%;}
	.modifybtn{height: 44px;background: #FF7700;border-radius: 6px;color: #fff;line-height: 44px;text-align: center;font-size: 17px;}
	.modifybtn2{height: 44px;background: #fff;border-radius: 6px;color: #FF7700;margin-top: 12px;line-height: 44px;text-align: center;font-size: 17px;border: 1px solid #E6E6E6;}
</style>


