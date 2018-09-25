<template>
	<div class="home">
	    <div class="imgbox" v-if="imgboxflag" @click="imgboxFn"></div>
	    <div class="imgdan" v-if="imgdanflag == true">
		    <swiper :options="swiperOption">
					<swiper-slide v-for="item in imgpic" :key="item.id">
						<img :class="isChoose == false ? 'imgchu':'imgact'" :src="item" @click="imgbigFn" alt="">
					</swiper-slide>
					<div class="swiper-pagination" slot="pagination"></div>
				</swiper>
			</div>
	</div>
</template>

<script>
import api from '../../../src/api/api.js'
import vFooter from '../../template/Footer/Footer'
import vProductList from '../../template/ProductList/ProductList'
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
export default {
	created(){
		
	},
	mounted () {
		var that = this;
		document.title=this.title;
		console.log(that.imgpic)
	},
	data () {
		return {
			title:"图片展示",
			imgpic: this.$route.query.imgpic,
			imgboxflag: true,
			imgdanflag: true,
			isChoose: false,
		}
	},
	components:{vFooter,vProductList},
	methods:{
		imgbigFn(){
			var that = this;
			that.isChoose = !that.isChoose;
		},
		imgyuFn: function(e){
			var that = this;
			that.imgallyu = e;
			that.imgdanflag = true;
			that.imgboxflag = true;
		},
		imgboxFn(){
			var that = this;
			that.$router.go(-1);
		},
	}
}
</script>


<style type="text/css">	
	.evaluate{padding: 17px 12px 11px 12px;background: #fff;margin-bottom: 8px;}
	.evauser{display: flex;align-items: center;}
	.userimg{width: 30px;height: 30px;border-radius: 100%;}
	.username{padding-left: 7px;font-size: 16px;color: #333333;flex: 1;}
	.usertime{font-size: 12px;color: #888888;}
	.evacon{font-size: 15px;color: #444444;padding-top: 11px;line-height: 1.5;}
	.evaimg{display: inline-block;vertical-align: top;}
	.evaimgone{width: 104px;height: 104px;margin-right: 13px;margin-top: 10px;}
	/*.view_wrap{padding-bottom: 52px;}*/
	.listxian{padding: 20px 15%;height: 1px;display: flex;align-items: center;}
	.xianone{height: 1px;background: #999999;width: 20%;}
	.listend{font-size: 13px;color: #666666;text-align: center;flex: 1;}

	.imgbox{background: rgba(0,0,0,1);position: fixed;top: 0;bottom: 0;left: 0;right: 0;z-index: 3;}
	.imgdan{position: fixed;top: 30%;left: 0;right: 0;max-height: 220px;z-index: 5;text-align: center;overflow: hidden;}

	.imgchu {
		transform: scale(1);          /*图片原始大小1倍*/
 		transition: all ease 0.5s;        /*图片放大所用时间*/
 	}  
 	.imgact {     
		 transform: scale(3);          /*图片需要放大3倍*/
		 position: absolute;           /*是相对于前面的容器定位的，此处要放大的图片，不能使用position：relative；以及float，否则会导致z-index无效*/
		 z-index: 6; 
	}  
</style>


