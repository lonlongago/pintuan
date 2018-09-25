<template>
	<div class="home">
	    <!-- 头部标题 -->
	    <!-- <div class="addresstit">
		<div style="padding-left: 19px;">我的收货地址</div>
	    </div> -->
	    <!--列表-->
	    <scroller ref="my_scroller" :scrollTo="scrollTop" :on-refresh="refresh">
		    <div class="view_wrap" v-if="adresall.length > 0">
		    	<div class="useradress" @click="xuanFn(index,item.contact,item.mobile,item.province_name,item.city_name,item.area_name,item.addr)" v-for="(item,index) in adresall">
			    	<div class="useradres">
			    		<div class="userchoice">
			    			<div class="usertel">{{item.contact}}-{{item.mobile}}<span v-if="item.is_default == 1" class="morendi">[默认地址]</span></div>
			    			<span v-if="payxuanflag == true">
				    			<img src="../../assets/Group 6@2x.png" v-if="active == index" class="userchoxuan">
				    			<img src="../../assets/Group 6 Copy@2x.png" v-else class="userchoxuan">
			    			</span>
			    		</div>
			    		<div class="useradressdet">{{item.province_name}}{{item.city_name}}{{item.area_name}}{{item.addr}}</div>
		    		</div>
		    		<div class="useradrlab">
		    			<div class="userlab1" v-if="item.type == 1">家</div>
		    			<div class="userlabl2" v-if="item.type == 2">学校</div>
		    			<div class="userlabl3" v-if="item.type == 3">公司</div>
		    			<div class="userlabl4" v-if="item.type == 4">其它</div>
		    			<div class="userlab3"></div>
		    			<div class="userlab2">
		    				<router-link :to="{path:'/modifyadd?',query: {addr_id: item.addr_id,province_name: item.province_name,city_name: item.city_name,area_name: item.area_name,contact: item.contact,mobile: item.mobile,addr: item.addr,province_id: item.province_id,city_id: item.city_id,area_id: item.area_id,is_default: item.is_default,type: item.type}}">
			    				<div class="userlab3">
			    					<img src="../../assets/Page 1@2x(1).png" class="labimg1">
			    					<div class="labbian">编辑</div>
			    				</div>
			    			</router-link>
		    				<div class="userlab4" @click="delhuanFn(item.addr_id)">
		    					<img src="../../assets/Fill 1@2x.png" class="labimg2">
		    					<div class="labbian">删除</div>
		    				</div>
		    			</div>
		    		</div>
		    	</div>
		    	<!-- <div class="listxian">
		    		<div class="xianone"></div>
		    		<div class="listend">亲，我也是有底线的</div>
		    		<div class="xianone"></div>
		    	</div> -->
		    </div>
		    <div v-else style="font-size: 15px;padding-top: 65%;text-align: center;">亲,暂无收货地址哟</div>
		  </scroller>
	    <div class="newadd">
		      <a href="#/modifyadd">
		    		<div class="newaddbtn1">添加收货地址</div>
	    		</a>
	    </div>
	    <transition name="fade">
		    <div class="shadow" v-if="shaflag" @click="shaFn"></div>
		  </transition>
		  <transition name="fade">
			  <div class="deltan" v-if="deltanflag">
			  	<div class="deltan2">确认删除吗?</div>
			  	<div class="deltan3">
			  		<div class="deltan4" @click="qudelFn">取消</div>
			  		<div class="deltan5" @click="quedelFn">确定</div>
			  	</div>
			  </div>
			</transition>
			<v-msgbox :isshow="tipshow" :title="tips"></v-msgbox>
	</div>
</template>

<script>
import Hub from '../../../config/eventBus.js'
import api from '../../../src/api/api.js'
import vFooter from '../../template/Footer/Footer'
import vProductList from '../../template/ProductList/ProductList'
import BScroll from 'better-scroll'
import vMsgbox from '../../../src/template/msgbox'
    import Vue from 'vue';
    import Scroller from 'vue-scroller';
    Vue.use(Scroller);
export default {
	created(){},
	mounted () {
		var that = this;
		document.title=that.title;
		that.getvalFn();
		that.payxuanflag = that.$route.query.payxuanflag;
	},
	data () {
		return {
			title:"我的收货地址",
			active: '',
			adresall: [],
			deltanflag: false,
			shaflag: false,
			deladdid: '',
			payxuanflag: false,
			tips: '',
			tipshow: false,
      scrollTop:(0,0),
			isscroll:false,
		}
	},
	components:{vFooter,vProductList,vMsgbox},
	methods:{
		xuanFn: function(a,b,c,d,e,f,g){
			var that = this;
			that.active=a;
			var adv = d+e+f+g;
			localStorage.setItem('name',b);
			localStorage.setItem('tel',c);
			localStorage.setItem('adv',adv);
			localStorage.setItem('back','true');
			// Hub.$emit('name',b);
			// Hub.$emit('tel',c);
			// Hub.$emit('adv',adv);
			// Hub.$emit('back','true');
			if(that.payxuanflag == true){
				// setTimeout(function(){
					that.$router.go(-1);
				// },1500)
			}
		},
		getvalFn: function(){
			var that = this;
			api.addres({},function(res){
				console.log(res)
				that.adresall = res.data.items;
			})
		},
		shaFn: function(){
			var that = this;
			that.shaflag = false;
			that.deltanflag = false;
		},
		qudelFn: function(){
			var that = this;
			that.shaflag = false;
			that.deltanflag = false;
		},
		delhuanFn: function(e){
			var that = this;
			that.deladdid = e;
			that.shaflag = true;
			that.deltanflag = true;
		},
		quedelFn: function(){
			var that = this;
			api.delete({"addr_id": that.deladdid},function(res){
				console.log(res);
				if(res.error == '0'){
					api.tipload(that,res.message);
					that.shaflag = false;
					that.deltanflag = false;
					that.getvalFn();
				}else{
					api.tipload(that,res.message);
				}
			})
		},
		refresh(done) {
    	//console.log('refresh');
    	var that = this;
    	setTimeout(function(){
    		that.getvalFn();
    		done();
    	},1000);
		},
	}
}
</script>


<style scoped>
	.addresstit{font-size: 18px;color: #333;background: #fff;padding: 7px 12px;position: fixed;left: 0;right: 0;top: 0;z-index: 2;}
	.useradres{border-bottom: 1px solid #E0E0E0;}
	.useradress{background: #fff;margin-bottom: 8px;}
	.userchoice{display: flex;align-items: center;padding-top: 15px;padding-left: 12px;padding-right: 12px;}
	.usertel{flex: 1;font-size: 14px;color: #333333;}
	.userchoxuan{width: 16px;height: 16px;;}
	.useradressdet{padding: 7px 12px 10px 12px;font-size: 13px;color: #666666;line-height: 1.5;}
	.useradrlab{padding: 9px 24px 10px 12px;background: #fff;display: flex;align-items: center;line-height: 20px;}
	.userlab1{border: 1px solid #FF7700;border-radius: 2px;height: 20px;width: 43px;font-size: 12px;color: #FF7700;text-align: center;}
	.userlabl2{border: 1px solid #20AD20;border-radius: 2px;height: 20px;width: 43px;font-size: 12px;color: #20AD20;text-align: center;}
	.userlabl3{border: 1px solid #0085FF;border-radius: 2px;height: 20px;width: 43px;font-size: 12px;color: #0085FF;text-align: center;}
	.userlabl4{border: 1px solid #666666;border-radius: 2px;height: 20px;width: 43px;font-size: 12px;color: #666666;text-align: center;}
	.userlab2{display: flex;align-items: center;width: 107px;}
	.userlab3{flex: 1;display: flex;align-items: center;}
	.labimg1{width: 17px;height: 17px;}
	.labbian{font-size: 13px;color: #666666;padding-left: 5px;}
	.userlab4{flex: 1;padding-left: 11px;display: flex;align-items: center;}
	.labimg2{height: 18px;width: 16px;}
	.view_wrap{padding-bottom: 65px;}
	.listxian{padding: 20px 15%;height: 1px;display: flex;align-items: center;}
	.xianone{height: 1px;background: #999999;width: 20%;}
	.listend{font-size: 13px;color: #666666;text-align: center;flex: 1}
	.newadd{padding: 10px 5%;position: fixed;left: 0;right: 0;bottom: 0;background: #f5f5f5;z-index: 2;}
	.newaddbtn1{background: #FF7700;border-radius: 6px;font-size: 17px;color: #FFFFFF;height: 44px;line-height: 44px;text-align: center;}


	.shadow{background: rgba(0,0,0,0.4);position: fixed;top: 0;bottom: 0;left: 0;right: 0;z-index: 5;}

	.fade-enter-active, .fade-leave-active {
    	transition: opacity .5s;
	}
    .fade-enter, .fade-leave-to {
	    opacity: 0;
	}

	.deltan{position: fixed;top: 35%;left: 10%;right: 10%;height: 120px;background: #fff;z-index: 6;border-radius: 8px;}
	.deltan2{font-size: 16px;text-align: center;height: 80px;line-height: 80px;border-bottom: 1px solid #f5f5f5;}
	.deltan3{display: flex;align-items: center;height: 40px;line-height: 40px;text-align: center;}
	.deltan4{flex: 1;font-size: 14px;color: #999;border-right: 1px solid #f5f5f5;}
	.deltan5{color: #0075FF;flex: 1;font-size: 14px;}

	.morendi{color: #f96720;font-size: 13px;padding-left: 8px;}
</style>


