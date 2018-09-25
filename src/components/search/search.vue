<template>
	<div class="searchall" :style="sousuoflag == false ? '':'background: #f6f6f6'">
		<div class="search_top">
			<img src="../../assets/searchback.png" class="search_top2" @click="gobackFn">
			<div class="search_top6">
				<img src="../../assets/sousuo2.png" class="search_top5">
				<input type="text" name="" class="search_top3" @input="inpFn" v-model="shopming" placeholder="输入商品名称">
				<img src="../../assets/Group 7@2x.png" class="cleanall" v-if="cleanflag == true" @click="cleaconFn">
			</div>
			<div class="search_top4" @click="sousuoFn">搜索</div>
		</div>
		<div class="search_con" v-if="sousuoflag == false">
			<div class="search_con2">
				<div class="search_con3">
					<div class="search_con4">热门搜索</div>
					<!-- <img src="../../assets/huanyi.png" class="search_top5">
					<div class="search_con5">换一换</div> -->
				</div>
				<div class="search_con6">
					<div class="search_con7" @click="souFn(item)" v-for="item in keys">{{item}}</div>
				</div>
				<div class="search_con3 jushang">
					<div class="search_con4">搜索历史</div>
					<img src="../../assets/shanchu.png" class="search_top5" @click="cleanlocFn">
					<div class="search_con5" @click="cleanlocFn">删除</div>
				</div>
				<div class="search_con8" v-if="history.length != 0">
					<div class="search_con9" v-for="item in history" @click="souFn(item)">{{item}}</div>
					<!-- <div class="search_con9">测试麻辣香锅</div> -->
				</div>
				<div class="search_con10" v-else>暂无搜索历史</div>
			</div>
		</div>
		<div style="padding-top: 44px;" v-else>
			<scroller ref="my_scroller" :scrollTo="scrollTop" :on-refresh="refresh">
				<div v-if="prolists.length != 0">
						<v-productList :lists="prolists"></v-productList>
				</div>
				<div v-else class="search_con11">没有找到您要搜索的物品哟~</div>
			</scroller>
		</div>
	</div>
</template>
<script>
	import api from '../../../src/api/api.js'
	import vProductList from '../../template/ProductList/ProductList'
	import vFooter from '../../template/Footer/Footer'
    import Vue from 'vue';
    import Scroller from 'vue-scroller';
    Vue.use(Scroller);
	export default {
		created(){
		},
		mounted () {
			var that = this;
			document.title=that.title;
			that.getvalFn();
			that.localFn();
		},
		data () {
			return {
				title:"搜索",
				historys: '',
				shopming: '',
				sousuoflag: false,
				prolists: [],
				keys: [],
				history: [],
				cleanflag: false,
	      scrollTop:(0,0),
				isscroll:false,
			}
		},
		components:{vFooter,vProductList},
		methods:{
			refresh(done) {
	    	//console.log('refresh');
	    	var that = this;
	    	setTimeout(function(){
	    		that.getvalFn();
	    		done();
	    	},1000);
			},
			localFn: function(){//获取缓存
				var that = this;
				var hh = localStorage.getItem('hist');
				if(hh == null){
					this.history = [];
				}else{
					hh = hh.split(",");
					this.history = hh;
				}
			},
			getvalFn: function(){
				var that = this;
				api.search({},function(res){
					console.log(res)
					if(res.error == '0'){
						that.keys = res.data.keywords;
					}
				})
			},
			gobackFn: function(){
				this.$router.go(-1);
			},
			cleaconFn: function(){
				var that = this;
				that.shopming = '';
				that.cleanflag = false;
				that.sousuoflag = false;
				that.localFn();
			},
			cleanlocFn: function(){
				var that = this;
				localStorage.removeItem("hist");
				that.history = [];
			},
			sousuoFn: function(){
				var that = this;
				that.sousuoflag = true;
				that.history.push(that.shopming);
				localStorage.setItem('hist',this.history);
				var his = localStorage.getItem('hist');
				his = his.split(',');
				var arrTable = {},arrData = [];
				for(var t = 0;t <= his.length;t++){
					console.log(arrTable[ his[t] ])
					if( !arrTable[ his[t] ]){
            arrTable[ his[t] ] = true;
            arrData.push(his[t])
        	}
				}
				this.notempty(arrData)
				console.log(arrData)
				api.home({"title":that.shopming},function(res){
					console.log(res)
					if(res.error == "0"){
						that.prolists = res.data.items;
					}
				})
			},
			souFn: function(e){
				var that = this;
				that.sousuoflag = true;
				that.shopming = e;
				that.cleanflag = true;
				that.history.push(e);
				localStorage.setItem('hist',this.history);
				var his = localStorage.getItem('hist');
				his = his.split(',');
				var arrTable = {},arrData = [];
				for(var t = 0;t <= his.length;t++){
					console.log(arrTable[ his[t] ])
					if( !arrTable[ his[t] ]){
            arrTable[ his[t] ] = true;
            arrData.push(his[t])
        	}
				}
				this.notempty(arrData)
				// localStorage.setItem('hist',arrData);
				console.log(arrData)
				// return arrData;
				api.home({"title":e},function(res){
					console.log(res)
					if(res.error == "0"){
						that.prolists = res.data.items;
					}
				})
			},
			inpFn: function(e){
				var that = this;
				that.shopming = e.target.value;
				that.cleanflag = true;
				var shaop = that.shopming;
				console.log(888)
				if(shaop == ''){
					that.sousuoflag = false;
					that.localFn();
				}
				console.log(this.shopming)
			},
			notempty: function(e){
				console.log(e)
				for(var i=0; i<e.length; i++){
         if(e[i] == "" || typeof(e[i]) == "undefined"){
        	 e.splice(i,1);
              i--;
         }
	 			}
	 			localStorage.setItem('hist',e);
			},
		}
	}
</script>


<style scoped>
	._v-container{top: 44px!important;}
	.searchall{background: #fff;height: 100%}
	.search_top{padding: 0 24px;height: 44px;background: #fcfcfc;display: flex;align-items: center;position: fixed;left: 0;right: 0;top: 0;z-index: 2;max-width: 640px;margin: 0 auto;}
	.search_top2{height: 20px;width: 18px;}
	.search_top3{flex: 1;background: #f4f4f4;padding: 0 5px;font-size: 14px;width: 90%;}
	.search_top4{font-size: 15px;color: #333333;}
	.search_top5{height: 14px;width: 14px;}
	.search_top6{flex: 1;display: flex;align-items: center;background: #f4f4f4;height: 32px;border-radius: 100px;margin: 0 16px;padding: 0 8px;}
	.search_con{background: #fff;padding-top: 44px;}
	.search_con2{padding: 20px 12px 0;}
	.search_con3{display: flex;align-items: center;}
	.search_con4{flex: 1;font-size: 14px;color: #999999;}
	.search_con5{font-size: 14px;color: #999999;padding-left: 5px;}
	.search_con6{padding-top: 12px;}
	.search_con7{padding: 9px 20px;background: #f4f4f4;font-size: 14px;color: #4d4d4d;display: inline-block;border-radius: 4px;margin-right: 12px;margin-bottom: 12px;}
	.jushang{padding-top: 20px;}
	.search_con8{font-size: 14px;color: #919191;padding-top: 5px;}
	.search_con9{height: 44px;line-height: 40px;border-bottom: 1px solid #e6e6e6;}
	.search_con10{padding-top: 45px;color: #999;font-size: 14px;text-align: center;}
	.search_con11{padding: 50% 0;text-align: center;font-size: 16px;color: #999;}

	.cleanall{height: 20px;width: 20px;}
</style>


