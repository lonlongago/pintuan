<template>
	<div>
		<ul class="orderList_tab">
			<li @click="tabClick(0)" :class="{on:tabIndex == 0}">全部</li>
			<li @click="tabClick(1)" :class="{on:tabIndex == 1}">进行中</li>
			<li @click="tabClick(2)" :class="{on:tabIndex == 2}">已完成</li>
			<li @click="tabClick(3)" :class="{on:tabIndex == 3}">退款/售后</li>
		</ul>
		<div class="orderList_change">
			<v-orderlist  v-if="tabIndex == 0" :tab="tabIndex"></v-orderlist>

			<v-orderlist  v-if="tabIndex == 1" :tab="tabIndex"></v-orderlist>
			
			<v-orderlist  v-if="tabIndex == 2" :tab="tabIndex"></v-orderlist>
			
			<v-orderlist  v-if="tabIndex == 3" :tab="tabIndex"></v-orderlist>

		</div>
		
	</div>
</template>

<script>
import vOrderlist from '../../template/OrderList/OrderList'
	
import api from '../../api/api'
export default{
	
	data(){
		return{
			title: "订单列表",
			tabIndex:this.$route.query.tabIndex || 0,
//			orderList:[],
//			page:1,
		}
	},
	
	components:{vOrderlist},
	mounted(){
		var that = this;
		document.title=that.title;
//		this.tygetApi(0);
	},
	methods:{
		tabClick: function (i) {
				this.$router.replace({ path: '/orderlist',query: { 'tabIndex': i}});
				this.tabIndex = i;
//				console.log(i)
//				this.tygetApi(i);	
				window.location.reload();
//				console.log(this.tabIndex)
            },
//      tygetApi:function(e){
////      	console.log(e)
//      	var that = this;
//      	
//      	var page = that.page;
//      	api.myOrder({"page": page,"status":e},function(res){
////				console.log(res)
//			if(res.error == "0"){
//				that.orderList = res.data.items;
////				console.log(that.orderList)
//			}else{
//				console.log(message)
//			}
//		})
//      	
//      },
	
        
	}
}
</script>

<style scoped>
.orderList_tab{ position: fixed; top: 0; left: 0; z-index: 99; width: 100%; height: 35px; display: flex; background: #fff; border-bottom: 1px solid #e6e6e6; }
.orderList_tab li{ flex: 1; line-height: 34px; text-align: center; font-size: 14px; position: relative; }
.orderList_tab li.on:after{ content: ''; position: absolute; left: 50%; bottom: -1px; margin-left: -21%; width: 42%; height: 2px; background: #FF7F00; }
.orderList_change{ padding-top: 35px; }
</style>