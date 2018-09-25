<template>
	<div class="home">
			<!--头部分类导航-->
			<div class="cate_wrap" ref="cateWrap">
				<ul ref="tabList">
					<li
						v-for="(item, index) in catelist"
						:class="{'active': item.cate_id == cateIdx}"
						@click="selectNav(item.cate_id)"
					>{{ item.title }}</li>
				</ul>
	    </div>
	    <!--列表-->
	    <div class="view_wrap" ref="viewWrap">
	    	<div class="list_box" ref="listBox">
	        <scroller :on-infinite="infinite" ref="my_scroller" :scrollTo="scrollTop" :on-refresh="refresh">
				    <!-- <div class="swiper-container">
			    		<div class="swiper-wrapper">
			    			<div class="swiper-slide" v-for="item in swiperitem"><img :src="item.thumb"></div>
    						<div class="swiper-slide"><img src="http://cdn.qcacg.com//img/Illustration/11_02.jpg"></div>
			    		</div>
			    		<div class="swiper-pagination swiprRem"></div>
			    	</div> -->
			    	<swiper v-if="swiperitem != ''" :options="swiperOption">
							<swiper-slide v-for="item in swiperitem" :key="item.id">
								<a :href="item.link">
									<img :src="item.thumb" style="height:176px;width: 100%;" alt="">
								</a>
							</swiper-slide>
							<div class="swiper-pagination" slot="pagination"></div>
						</swiper>
		    		<v-productList :lists="prolists"></v-productList>
		    	</scroller>
	    	</div>
	    </div>
		<!--底部-->
		<v-footer :footerIdx='0'></v-footer>
	</div>
</template>

<script>
import api from '../../../src/api/api.js'
import vFooter from '../../template/Footer/Footer'
import vProductList from '../../template/ProductList/ProductList'
import BScroll from 'better-scroll'
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';
    import Vue from 'vue';
    import Scroller from 'vue-scroller';
    Vue.use(Scroller);
export default {
	created(){
		this.getvalFn();
	},
	mounted () {
		var that = this;
		document.title=that.title;
		that.$nextTick(function(){
			// var mySwiper = new Swiper(".swiper-container",{  
		 //        direction:"horizontal",/*横向滑动*/  
		 //        loop:true,形成环路（即：可以从最后一张图跳转到第一张图  
		 //        pagination:".swiper-pagination",/*分页器*/  
		 //        autoplay:3000/*每隔3秒自动播放*/  
	  //   });
			that.scroll = new BScroll('.cate_wrap',{
			    scrollX: true,
			    scrollY: false,
          click: true
			});
		})
	},
	data () {
		return {
			title:"首页",
			catelist:[],
      cateIdx: this.$route.query.cate_id || 0,
      scrollList: [],
      prolists: [],
      cate_id: this.$route.query.cate_id || 0,
      page: 1,
      scrollTop:(0,0),
			isscroll:false,
			swiperitem: [],
			swiperOption: {
				pagination: '.swiper-pagination',
				paginationClickable: true,
				autoplay: 2500,
				autoplayDisableOnInteraction: false,
				loop: false,
				coverflow: {
				　　rotate: 30,
				　　stretch: 10,
				　　depth: 60,
				　　modifier: 2,
				　　slideShadows : true
				　　}
			},
		}
	},
	components:{vFooter,vProductList},
	methods:{
		_initTabListWidth() {
	        const tabList = this.$refs.tabList.children;
	        let li_width = 0
	        for (let i = 0; i < tabList.length; i++) {
	          li_width += tabList[i].clientWidth
	        }
	        this.$refs.tabList.style.width = (li_width + 1) + 'px'
	    },
	    selectNav(index) {
	    	console.log(index)
	    	this.$router.replace({ path: '/home',query: { 'cate_id': index}});
	        this.cateIdx = index;
	        this._adjust(index);
	        this.cate_id = index;
	        this.getvalFn();
	    },
	    _adjust(idx) {
	        const viewportWidth = this.$refs.cateWrap.clientWidth;  //页面长度
	        const tabListWidth = this.$refs.tabList.clientWidth;  //总长度
	        const minTranslate = Math.min(0, viewportWidth - tabListWidth);
	        const middleTranslate = viewportWidth / 2; //页面一半
	        const items = this.$refs.tabList.children;
	        let li_width = 0;
	        this.catelist.every((item, index) => {
	          if (index === idx) {
	            return false
	          }
	          li_width += items[index].clientWidth;
	          return true
	        });
	        let translate = middleTranslate - li_width;
	        translate = Math.max(minTranslate, Math.min(0, translate));
	        // this.scroll.scrollTo(translate, 0, 300);
	    },
	    getvalFn: function(){
	    	var that = this;
	    	var page = that.page = 1;
	    	var cate_id = that.cate_id;
	    	api.home({"page": page,"cate_id": cate_id},function(res){
	    		console.log(res)
	    		that.catelist = res.data.cate_items;
	    		that.prolists = res.data.items;
	    		that.swiperitem = res.data.slide_items;
	    		that.$nextTick(function () {
		            that._initTabListWidth();
		        });	
	    	})
	    },
	    infinite(done) {//下拉加载
		  		var that = this;
		  		var page = that.page + 1;
		  		if(!that.isscroll){
		  			setTimeout(()=>{
				      	this.$refs.my_scroller.finishInfinite(2);
				     })
				    // return;
		  		}
        	api.home({"page": page,"cate_id": that.cate_id},function(res){
          	if(res.error == 0){
          		console.log(res)
          		that.page = page;
          		var length = res.data.items.length;
          		if(length > 0){
          			that.prolists = that.prolists.concat(res.data.items);
								if(length >= 10){
									setTimeout(() => {
							          	setTimeout(() => {
							            	done()
							          	})
							        }, 1000);
								}else{
									that.isscroll = false;
			          				setTimeout(() => {
								        done(true)
								    },0);
								}
          		}else{
          			that.isscroll = false;
        				setTimeout(() => {
						        done(true)
						    },0);
          		}
          	}else{
          		// api.tipload(that,res.message);
          	}	            	
        	});		  		
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
	._v-container{top: 45px!important;bottom: 50px;height: auto!important;}
	.cate_wrap{display: block;position: relative;width: 100%;height: 44px;background:#fff;border-bottom: 1px solid #e6e6e6; overflow: hidden;}
	.cate_wrap ul{display: inline-block;}
	.cate_wrap ul li{display: inline-block; padding:0 8px; margin: 0 4px; line-height: 44px; font-size: 14px; position: relative;}
	.cate_wrap ul li.active{color: #ffa200;}
	.cate_wrap ul li.active:after{content: ''; width: 100%; height: 3px; background: #ffa200; position: absolute; left: 0; bottom: 0;}
	.swiper-container{height: 176px;}
</style>


