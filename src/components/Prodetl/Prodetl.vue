<template>
	<div class="prodetl">
		<!-- <div class="shopDetl mb10">
			<div class="logo"></div>
			<div class="txt_box">
				<h3>新疆</h3>
				<p>商品数量：9  已拼3.9万件</p>
			</div>
			<div class="btn"><i class="ico"></i>进店逛逛</div>
		</div> -->
		<!--商品详情-->
		<!-- <div class="prodetl_tit">商品详情</div>
		<div class="articleBox">此处为后台编辑内容</div> -->
		<div class="prodetl_top">
			<img :src="detail.photo" class="prodetl_top2">
			<div class="prodetl_top3">
				<div class="prodetl_top4">
					<div class="prodetl_top5"><span style="font-size: 13px;">¥</span> {{detail.tuan_price}}</div>
					<div class="prodetl_top6">¥ {{detail.single_price}}</div>
					<div class="prodetl_top7">已团{{detail.sale_count}}件</div>
				</div>
				<div class="prodetl_top8">{{detail.title}}</div>
			</div>
			<div id="scr" :class=" scrollju == true ? 'prodetl_top9 isfix':'prodetl_top9'">
				<div style="width: 28px;">
					<transition name="fade">
						<img :src="tongzhiflag == false ? require('../../assets/tongzhi.png') : require('../../assets/naba.png')" :class="tongzhiflag == false ? 'prodetl_top10 weiliang':'prodetl_top10'">
					</transition>
					<!-- <transition name="fade" v-else>
						<img src="../../assets/naba.png" class="prodetl_top10">
					</transition> -->
				</div>
				<div class="prodetl_top11">支持开团并邀请{{detail.tuan_num - 1}}人参团，人数不足自动退款</div>
			</div>
			<div class="prodetl_con">
				<div class="prodetl_con2">
					<div class="prodetl_con3">以下小伙伴正在发起团购，您可以直接参与</div>
					<div class="prodetl_con4" @click="seemoreFn">查看更多</div>
					<img src="../../assets/seemore.png" class="prodetl_con5" @click="seemoreFn">
				</div>
				<div>
					<div class="prodetl_con6" v-for="item in group_list">
						<img :src="item.face" class="prodetl_con7">
						<div class="prodetl_con8">{{item.nickname}}</div>
						<div class="prodetl_con11">
							<div class="prodetl_con9">还差{{item.last_num}}人成团</div>
							<div class="prodetl_con10">剩余{{item.djs}}</div>
						</div>
						<div class="prodetl_con12" @click="cantuanFn(item.face,item.nickname,item.last_num,item.end_time,item.group_id)">去参团</div>
					</div>
					<!-- <div class="prodetl_con6">
						<img src="../../assets/Rectangle 6 Copy 2@2x.png" class="prodetl_con7">
						<div class="prodetl_con8">不知道先</div>
						<div class="prodetl_con11">
							<div class="prodetl_con9">还差1人成团</div>
							<div class="prodetl_con10">剩余07：51：25</div>
						</div>
						<div class="prodetl_con12" @click="cantuanFn">去参团</div>
					</div> -->
				</div>
			</div>
			<div class="prodetl_con">
				<div class="prodetl_con2">
					<div class="prodetl_con3">用户评价</div>
					<router-link style="display: flex;align-items: center;" :to="{path:'/evaluate?',query: {product_id: detail.product_id}}">
						<div class="prodetl_con4">共{{detail.comment_count}}条评论</div>
						<img src="../../assets/seemore.png" class="prodetl_con5">
					</router-link>
				</div>
				<div>
					<div class="prodetl_con13" v-for="item in details.comment_list">
						<div class="prodetl_con14">
							<img :src="item.face" class="prodetl_con15">
							<div class="prodetl_con16">{{item.nickname}}</div>
							<div class="prodetl_con17">{{item.dateline}}</div>
						</div>
						<div class="prodetl_con18">{{item.content}}</div>
						<div class="prodetl_con19">{{item.spec_name}}</div>
					</div>
				</div>
			</div>
			<div class="prodetl_con">
				<div class="prodetl_con2">
					<div class="prodetl_con3">商品详情</div>
				</div>
				<div class="articleBox" v-html="detail.content"></div>
			</div>
		</div>
		<!--底部-->
		<div class="prodetl_footer">
			<router-link style="flex: 1;" :to="{path:'/home'}">
				<div class="list">
					<i class="home_ico"></i>
					<p>首页</p>
				</div>
			</router-link>
			<div class="list" @click="colecFn(detail.product_id)">
				<i class="collect_ico"></i>
				<p v-if="detail.is_collect == 1">已收藏</p>
				<p v-else>收藏</p>
			</div>
			<a style="flex: 1;" :href="'tel:'+detail.phone">
				<div class="list">
					<i class="tel_ico"></i>
					<p>联系商家</p>
				</div>
			</a>
			<div class="one_btn" @click="danduFn(1)">
				<p>￥{{detail.single_price}}</p>
				<p>单独购买</p>
			</div>
			<div class="tuan_btn" @click="danduFn(2)">
				<p>￥{{detail.tuan_price}}</p>
				<p>{{detail.tuan_num}}人团</p>
			</div>
		</div>
		<transition name="fade">
			<div class="shadow" @click="shaFn" v-if="shaflag"></div>
		</transition>
		<transition name="fade">
			<div class="pindantan" v-if="pindanflag">
				<img src="../../assets/quxiao.png" class="pindantan9" @click="closetanFn">
				<div class="pindantan2">参与{{tuan_user}}的拼单</div>
				<div class="pindantan3">仅剩{{tuan_usernum}}个名单，{{tuan_userdao}}后结束</div>
				<div class="pindantan4">
					<img :src="tuan_userimg" class="pindantan5">
					<img src="../../assets/pindanren.png" class="pindantan6">
				</div>
				<div class="pindantan7">
					<div class="pindantan8" @click="pintuanpay(group_id)">参与拼团</div>
				</div>
			</div>
		</transition>
		<div :class="danduflag == true ? 'dandugou zhan' : 'dandugou'">
			<div v-for="(item,index) in details.spec_items">
				<div class="dandugou2" v-if="active == index">
					<img :src="item.spec_photo" class="dandugou3">
					<div class="dandugou4">
						<div class="dandugou7">
							<div class="dandugou5" v-if="tuanflag == 2">¥ {{item.tuan_price}}</div>
							<div class="dandugou5" v-if="tuanflag == 1">¥ {{item.single_price}}</div>
							<img src="../../assets/danduqu.png" class="dandugou8" @click="danducloseFn">
						</div>
						<div class="dandugou6">{{detail.title}}</div>
					</div>
				</div>
			</div>
			<div class="dandugou9">
				<div v-for="(item,index) in details.spec_items" :class="active == index ? 'dandugou10 on' : 'dandugou10'" @click="jinxuanFn(index,item.spec_id,item.sale_sku)">{{item.spec_name}}</div>
				<!-- <div :class="active == 2 ? 'dandugou10 on' : 'dandugou10'" @click="jinxuanFn(2)" class="dandugou10">5斤装</div>
				<div :class="active == 3 ? 'dandugou10 on' : 'dandugou10'" @click="jinxuanFn(3)" class="dandugou10">10斤装</div> -->
			</div>
			<div v-for="(item,index) in details.spec_items">
				<div class="dandugou11" v-if="active == index">
					<div class="dandugou12">购买数量<span class="dandugou13">（库存{{item.sale_sku}}）</span></div>
					<div class="dandugou14">
						<div class="dandugou15" @click="jianFn">-</div>
						<div class="dandugou16">{{nums}}</div>
						<div class="dandugou15" @click="jiaFn">+</div>
					</div>
				</div>
			</div>
			<div class="dandugou17" @click="payforFn">确定</div>
		</div>
		<!-- 拼团名单 -->
		<transition name="fade">
			<div class="morepin" v-if="morepinflag">
				<img src="../../assets/quxiao.png" class="pindantan9" @click="closemoreFn">
				<div class="morepin2">正在拼团</div>
				<div class="morepin3">
					<div class="morepin5" v-for="item in group_lists">
						<img :src="item.face" class="morepin6">
						<div class="morepin7">
							<div class="morepin8">{{item.nickname}}  <span class="morepin10">还差{{item.last_num}}人</span></div>
							<div class="morepin9">剩余{{item.ds}}</div>
						</div>
						<div class="morepin11" @click="gopindan(item.group_id)">去拼单</div>
					</div>
				</div>
				<div class="morepin4">仅显示10个正在拼单的人</div>
			</div>
		</transition>
		<v-msgbox :isshow="tipshow" :title="tips"></v-msgbox>
	</div>
</template>
<script>
function InitTime(endtime){
    var dd,hh,mm,ss = null;
    var time = parseInt(endtime) - new Date().getTime();
    if(time<=0){
    		clearInterval(time);
    		this.getvalFn();
        return '结束'
    }else{
        dd = Math.floor(time / 60 / 60 / 24);
        hh = Math.floor((time / 60 / 60) % 24);
        mm = Math.floor((time / 60) % 60);
        ss = Math.floor(time  % 60);
        var str = dd+":"+hh+":"+mm+":"+ss;
        return str;
    }
};
var timer;

import api from '../../../src/api/api.js'
import vFooter from '../../template/Footer/Footer'
import vMsgbox from '../../../src/template/msgbox'
export default {
	created(){
		// this.getvalFn();
	},
	watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getParams'
  },
	mounted () {
		var that = this;
		document.title=this.title;
		that.getvalFn();
	 	that.offsetTop = document.querySelector('#scr').offsetTop;
		window.addEventListener('scroll', that.tongzhitopFn)
		setInterval(()=>{
			that.imgqieFn();
		},500)
		// console.log(this.product_id)
	},
	data () {
		return {
			title: "商品详情",
			shaflag: false,
			pindanflag: false,
			active: 0,
			nums: 1,
			danduflag: false,
			morepinflag: false,
			product_id: this.$route.query.produc,
			details: [],
			tuanflag: '',
			arr: [],
			detail: [],
			shoptype: '',
			shopguige: '',
			sctime: [],
			group: [],
			tuan_user: '',
			tuan_userimg: '',
			tuan_usernum: '',
			tuan_userdao: '',
			group_id: '',
			grouplist: [],
			tips: '',
			tipshow: false,
			clock: '',
			group_list:[],
			group_lists: [],
			tongzhiflag: false,
			scrollju: false,
			offsetTop: '',
			kucunnum: '',
			tuannum: '',
		}
	},
	components:{vFooter,vMsgbox},
	computed:{
		details1(){
			let tuan_userdao = this.tuan_userdao;
			// let group_list=this.details.group_list;
			console.log(group_list)
			return 1
		},
		
	},
	methods:{
		tongzhitopFn(){
			var that = this;
		 	var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop - 10;
		 	var offsetTop = that.offsetTop;
		 	if(scrollTop > offsetTop){
	 			that.scrollju = true;
		 	}else{
		 		that.scrollju = false;
		 	}
		},
		imgqieFn: function(){
			var that = this;
			var tong = that.tongzhiflag;
			if(tong == false){
				that.tongzhiflag = true;
			}else{
				that.tongzhiflag = false;
			}
		},
		getvalFn: function(){
			var that = this;
			var arr = that.arr;
			api.detail({"product_id": this.product_id},function(res){
				if(res.error == "0"){
					that.details = res.data;
					that.detail = res.data.detail;
					if(res.data.spec_items.length > 0){
						that.kucunnum = res.data.spec_items[0].sale_sku;
					}else{
						that.kucunnum = res.data.detail.sale_sku;
					}
					that.tuannum = res.data.detail.tuan_num - 1;
					var group_list = that.details.group_list;
					group_list.map( (obj,index)=>{
			            that.$set(
			                obj,"djs",InitTime(obj.end_time*1000)
			            );
			        })
			        that.group_list = group_list;

			        setInterval( ()=> {
			            for (var key in that.group_list) {
			                var aaa = parseInt( that.group_list[key]["end_time"] ) * 1000;
			                var bbb = new Date().getTime();
			                var rightTime = aaa - bbb;
			                if (rightTime > 0) {
			                    var dd = (Math.floor(rightTime / 1000 / 60 / 60 / 24) < 10) ? ("0" + Math.floor(rightTime / 1000 / 60 / 60 / 24)) : Math.floor(rightTime / 1000 / 60 / 60 / 24);
			                    var hh = (Math.floor((rightTime / 1000 / 60 / 60) % 24) < 10) ? ("0" + Math.floor((rightTime / 1000 / 60 / 60) % 24)) : Math.floor((rightTime / 1000 / 60 / 60) % 24);
			                    var mm = (Math.floor((rightTime / 1000 / 60) % 60) < 10) ? ("0" + Math.floor((rightTime / 1000 / 60) % 60)) : Math.floor((rightTime / 1000 / 60) % 60);
			                    var ss = (Math.floor((rightTime / 1000) % 60) < 10) ? ("0" + Math.floor((rightTime / 1000) % 60)) : Math.floor((rightTime / 1000) % 60);
			                }
			                that.group_list[key]["djs"] = dd + ":" + hh + ":" + mm + ":" + ss;
			            }
			        }, 1000);
				}else{
					alert(res.message)
					that.$router.go(-1);
				}
			})
		},

		//原倒计时
		countdown: function(time){
			var that = this;
			console.log(that.group)
			console.log(time)
			// var arr = that.arr;
				// var myData = new Date();
				// var timestamp=myData.getTime();
				// var timestamp=Math.round(new Date() / 1000);
				// console.log(timestamp,2)
				// var time = [];
				// var sctime = that.sctime;
				for(let y = 0;y <= time.length;y++){
					// var time = arr[y] - timestamp;
					// if(time > 0){
						// time.push(arr[y] - timestamp);
						// var time = arr[y] - timestamp;
						var tim = time[y].daotime;
						// console.log(time[y].daotime)
						var times = setInterval(function(){
							tim = tim - 1;
							var days=parseInt(tim/(24*60*60));
							var hour=parseInt(tim/(60*60)%24);
							var minute=parseInt(tim/60%60);
							var second=parseInt(tim%60);
							var shengTime = days+':' + hour+':' + minute+":"+second;
							// time[y].daotime = shengTime;
							// console.log(tim)
							console.log(time[y].daotime)
							that.details.group_list[y].daotime = shengTime;
							// this.details.push(that.details);
							console.log(shengTime)
							if(tim <= 0){
								clearInterval(times);
							}
						}, 1000)
					 	
						// that.detail.push()
						
					  // 个位数前补零
					  // hour = hour > 9 ? hour : '0' + hour
					  // minute = minute > 9 ? minute : '0' + minute
					  // second = second > 9 ? second : '0' + second
					  // console.log(days,hour,minute,second)
					 //  setTimeout(function(){
					 //  	console.log(shengTime)
						// 		this.countdown(shengTime)
						// },1000)
					// }
				}
					console.log(that.details,55)
		},
		getParams: function(){
			this.product_id = this.$route.query.produc;
			this.getvalFn();
		},
		shaFn: function(){
			var that = this;
			that.shaflag = false;
			that.pindanflag = false;
			that.danduflag = false;
			that.morepinflag = false;
			that.nums = 1;
			clearInterval(timer);
		},
		cantuanFn: function(a,b,c,d,e){
			var that = this;
			that.shaflag = true;
			that.pindanflag = true;
			that.tuan_userimg = a;
			that.tuan_user = b;
			that.tuan_usernum = c;
			if(d.length > 0){
				timer = setInterval( ()=> {
			        var aaa = parseInt( d ) * 1000;
			        var bbb = new Date().getTime();
			        var rightTime = aaa - bbb;
			        if (rightTime > 0) {
			            var dd = (Math.floor(rightTime / 1000 / 60 / 60 / 24) < 10) ? ("0" + Math.floor(rightTime / 1000 / 60 / 60 / 24)) : Math.floor(rightTime / 1000 / 60 / 60 / 24);
			            var hh = (Math.floor((rightTime / 1000 / 60 / 60) % 24) < 10) ? ("0" + Math.floor((rightTime / 1000 / 60 / 60) % 24)) : Math.floor((rightTime / 1000 / 60 / 60) % 24);
			            var mm = (Math.floor((rightTime / 1000 / 60) % 60) < 10) ? ("0" + Math.floor((rightTime / 1000 / 60) % 60)) : Math.floor((rightTime / 1000 / 60) % 60);
			            var ss = (Math.floor((rightTime / 1000) % 60) < 10) ? ("0" + Math.floor((rightTime / 1000) % 60)) : Math.floor((rightTime / 1000) % 60);
			        }
			        that.tuan_userdao = dd + ":" + hh + ":" + mm + ":" + ss;
			    }, 1000);	
			};
			
			// console.log(that.tuan_userdao)
			// that.tuan_userdao = d;
			that.group_id = e;
		},
		pintuanpay: function(e){
			var that = this;
			that.group_id = e;
			that.pindanflag = false;
			that.tuannum = that.tuan_usernum - 1;
			that.danduFn(2);
			// that.shoptype = 'tuan';
			// this.tuanflag = 2;
			// var product_id = that.product_id;
			// var shopnum = that.nums;
			// var group_id = that.group_id;
			// that.$router.push('/orderpayinf?product_id='+ product_id + '&shopnum=' + shopnum + '&group_id' + group_id);
		},
		closetanFn: function(){
			var that = this;
			that.shaflag = false;
			that.pindanflag = false;
			clearInterval(timer);
		},
		jinxuanFn: function(e,y,t){
			var that = this;
			that.active = e;
			that.nums = 1;
			that.shopguige = y;
			that.kucunnum = t;
		},
		jianFn: function(){
			var that = this;
			var nums = that.nums;
			if(nums > 1){
				that.nums = nums - 1;
			}
		},
		jiaFn: function(){
			var that = this;
			var nums = that.nums;
			var kucunnum = that.kucunnum;
			console.log(kucunnum)
			if(kucunnum > nums){
				that.nums = nums + 1;
			}else{
				api.tipload(that,'亲,该款式库存只能支持您购买 '+ nums +' 件哟~');
			}
		},
		danduFn: function(e){
			var that = this;
			this.tuanflag = e;
			if(e == 1){
				that.shoptype = 'single';
			}else if(e == 2){
				that.shoptype = 'tuan';
			}
			if(that.details.spec_items != ''){
				that.shaflag = true;
				that.danduflag = true;
			}else{
				var product_id = that.product_id;
				var shopnum = that.nums;
				var shoptype = that.shoptype;
				var group_id = that.group_id;
				var kucunnum = that.kucunnum;
				var tuannum = that.tuannum;
				if(shoptype == 'tuan'){
					if(kucunnum >= 0){
						if(kucunnum == 0){
							api.tipload(that,'亲,该款式暂时没有库存哟~');
						}else{
							if(kucunnum - tuannum >= 0){
								that.$router.push('/orderpayinf?product_id='+ product_id + '&shopnum=' + shopnum + '&shoptype=' + shoptype + '&group_id=' + group_id + '&backpro=' + true);
							}else{
								api.tipload(that,'亲,该款式库存只能支持您购买 '+ shopnum +' 件哟~');
							}
						}
					}else{
						api.tipload(that,'亲,该款式暂时没有库存哟~');
					}
				}else if(shoptype == 'single'){
					if(kucunnum >= 0){
						if(kucunnum == 0){
							api.tipload(that,'亲,该款式暂时没有库存哟~');
						}else{
								that.$router.push('/orderpayinf?product_id='+ product_id + '&shopnum=' + shopnum + '&shoptype=' + shoptype + '&group_id=' + group_id + '&backpro=' + true);
						}
					}else{
						api.tipload(that,'亲,该款式暂时没有库存哟~');
					}
				}
			}
		},
		danducloseFn: function(){
			var that = this;
			that.shaflag = false;
			that.danduflag = false;
			that.nums = 1;
		},
		seemoreFn: function(){
			var that = this;
			that.shaflag = true;
			that.morepinflag = true;
			var product_id = that.product_id;
			api.pingroup({'product_id': product_id},function(res){
				console.log(res)
				if(res.error == '0'){
					that.grouplist = res.data.items;
					var group_lists = that.grouplist;
					group_lists.map( (obj,index)=>{
	            that.$set(
	                obj,"ds",InitTime(obj.end_time*1000)
	            );
	        })
	        that.group_lists = group_lists;

	        setInterval( ()=> {
	            for (var key in that.group_lists) {
	                var aaa = parseInt( that.group_lists[key]["end_time"] ) * 1000;
	                var bbb = new Date().getTime();
	                var rightTime = aaa - bbb;
	                if (rightTime > 0) {
	                    var dd = (Math.floor(rightTime / 1000 / 60 / 60 / 24) < 10) ? ("0" + Math.floor(rightTime / 1000 / 60 / 60 / 24)) : Math.floor(rightTime / 1000 / 60 / 60 / 24);
	                    var hh = (Math.floor((rightTime / 1000 / 60 / 60) % 24) < 10) ? ("0" + Math.floor((rightTime / 1000 / 60 / 60) % 24)) : Math.floor((rightTime / 1000 / 60 / 60) % 24);
	                    var mm = (Math.floor((rightTime / 1000 / 60) % 60) < 10) ? ("0" + Math.floor((rightTime / 1000 / 60) % 60)) : Math.floor((rightTime / 1000 / 60) % 60);
	                    var ss = (Math.floor((rightTime / 1000) % 60) < 10) ? ("0" + Math.floor((rightTime / 1000) % 60)) : Math.floor((rightTime / 1000) % 60);
	                }
	                that.group_lists[key]["ds"] = dd + ":" + hh + ":" + mm + ":" + ss;
	            }
	        }, 1000);
				}
			})
		},
		gopindan: function(e){
			var that = this;
			that.group_id = e;
			that.morepinflag = false;
			that.danduFn(2);
		},
		closemoreFn: function(){
			var that = this;
			that.shaflag = false;
			that.morepinflag = false;
		},
		colecFn: function(e){  //收藏
			var that = this;
			console.log(e)
			api.collcet({"product_id": e},function(res){
				if(res.error == '0'){
					console.log(res)
					if(res.data.status == '0'){
						api.tipload(that,'已取消收藏');
					}else if(res.data.status == '1'){
						api.tipload(that,'已收藏');
					}
					that.getvalFn();
				}
			})
		},
		payforFn: function(){
			var that = this;
			var product_id = that.product_id;
			var shoptype = that.shoptype;
			var shopguige = that.shopguige || that.details.spec_items[0].spec_id;
			var shopnum = that.nums;
			var group_id = that.group_id;
			var kucunnum = that.kucunnum;
			var tuannum = that.tuannum;
			console.log(tuannum)
			if(shoptype == 'tuan'){
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
				}else{}
			}else if(shoptype == 'single'){
					if(kucunnum >= 0){
						if(kucunnum == 0){
							api.tipload(that,'亲,该款式暂时没有库存哟~');
						}else{
							if(kucunnum - shopnum >= 0){
								that.$router.push('/orderpayinf?product_id='+ product_id + '&shoptype=' + shoptype + '&shopguige=' + shopguige + '&shopnum=' + shopnum + '&group_id=' + group_id + '&backpro=' + true);
							}else{
								api.tipload(that,'亲,该款式库存不足哟~');
							}
						}
					}else{
						api.tipload(that,'亲,该款式暂时没有库存哟~');
					}
			}else{
				console.log(888)
			}
			
		}
	},
}
</script>


<style scoped>
	.isfix{position: fixed;top: 0;left: 0;right: 0;z-index: 2;}
	.prodetl{padding-bottom: 0}
	.prodetl_tit{background: #fff; border-bottom: 1px solid #e6e6e6; padding: 10px; line-height: 20px; overflow: hidden; font-size: 14px;}
	.prodetl_tit .more{font-size: 12px; color: #999; float: right;}
	

	.shopDetl{background: #fff; padding:15px 12px; overflow: hidden;}
	.shopDetl .logo{background-color: #eee; background-position:center; background-repeat: no-repeat; background-size: cover; width: 50px; height: 50px; border-radius: 100%; float: left;}
	.shopDetl .txt_box{margin-left: 60px; margin-right: 100px;}
	.shopDetl .txt_box{margin-left: 60px; margin-right: 100px;}


	.prodetl_footer{position: fixed; left: 0; bottom: 0; width: 100%;display: flex; height: 50px; background: #fff;}
	.prodetl_footer .list{flex: 1; text-align: center; font-size: 10px; color: #666; height: 50px; position: relative; padding-top: 6px;}
	.prodetl_footer .list:after{content: ''; width: 1px; height: 100%; background: #e6e6e6; position: absolute; right: 0; top: 0;}
	.prodetl_footer .list p{font-size: 12px;}
	.prodetl_footer .list i{display: inline-block; width: 20px; height: 20px; background-repeat: no-repeat; background-position: center; background-size: contain;}
	.prodetl_footer .list .home_ico{background-image: url(../../assets/shouye@3x.png);}
	.prodetl_footer .list .collect_ico{background-image: url(../../assets/shoucang@3x.png);}
	.prodetl_footer .list .tel_ico{background-image: url(../../assets/dianhua@3x.png);}
	.prodetl_footer .one_btn,.prodetl_footer .tuan_btn{width: 88px; text-align: center; color: #fff; height: 50px; font-size: 14px; line-height: 16px; padding-top:10px; box-sizing: border-box;}
	.prodetl_footer .one_btn{background:#ffa200;}
	.prodetl_footer .tuan_btn{background:#eb3636;}


	.prodetl_top{padding-bottom: 50px;}
	.prodetl_top2{width: 100%;height: 290px;}
	.prodetl_top3{padding: 16px 12px;background: #fff;}
	.prodetl_top4{display: flex;align-items: flex-end;padding-bottom: 15px;}
	.prodetl_top5{font-size: 20px;color: #eb3636;}
	.prodetl_top6{font-size: 14px;color: #666666;padding-left: 8px;flex: 1;text-decoration: line-through;}
	.prodetl_top7{font-size: 14px;color: #666666;}
	.prodetl_top8{font-size: 16px;color: #333333;line-height: 1.4;}
	.prodetl_top9{height: 44px;background: #ffa200;width: 100%;display: flex;align-items: center;padding: 0 12px;}
	.prodetl_top10{width: 25px;height: 18px;}
	.weiliang{width: 20px;height: 16px;}
	.prodetl_top11{padding-left: 6px;flex: 1;color: #fff;font-size: 14px;}
	.prodetl_con{margin-top: 8px;background: #fff;}
	.prodetl_con2{padding: 0 12px;border-bottom: 1px solid #f5f5f5;height: 36px;display: flex;align-items: center;}
	.prodetl_con3{font-size: 14px;color: #333333;flex: 1;}
	.prodetl_con4{font-size: 14px;color: #999999;}
	.prodetl_con5{width: 15px;height: 12px;}
	.prodetl_con6{padding: 6px 12px;border-bottom: 1px solid #f5f5f5;display: flex;align-items: center;}
	.prodetl_con7{height: 48px;width: 48px;border-radius: 100px;}
	.prodetl_con8{padding-left: 12px;flex: 1;font-size: 14px;color: #333333;}
	.prodetl_con9{font-size: 14px;color: #333333;}
	.prodetl_con10{color: #999999;font-size: 12px;}
	.prodetl_con11{text-align: center;padding-right: 8px;}
	.prodetl_con12{height: 32px;width: 80px;background: #eb3636;border-radius: 4px;font-size: 14px;color: #ffffff;text-align: center;line-height: 32px;}
	.prodetl_con13{padding: 15px 12px;border-bottom: 1px solid #f5f5f5;}
	.prodetl_con14{display: flex;align-items: center;padding-bottom: 10px;}
	.prodetl_con15{height: 30px;width: 30px;border-radius: 100px;}
	.prodetl_con16{padding-left: 12px;flex: 1;font-size: 14px;color: #333333;}
	.prodetl_con17{color: #999999;font-size: 13px;}
	.prodetl_con18{font-size: 14px;color: #666666;padding-bottom: 12px;}
	.prodetl_con19{font-size: 13px;color: #999999;}

	.shadow{position: fixed;top: 0;left: 0;right: 0;bottom: 0;background: rgba(0,0,0,0.4);z-index: 2;}
	.pindantan{position: fixed;top: 25%;left: 10%;right: 10%;background: #fff;z-index: 3;border-radius: 6px;text-align: center;}
	.pindantan2{font-size: 18px;color: #333333;padding-top: 30px;}
	.pindantan3{padding-top: 12px;font-size: 15px;color: #333333;}
	.pindantan4{padding-top: 20px;}
	.pindantan5{height: 48px;width: 48px;border-radius: 100px;border: 2px solid #fada9a;margin-right: 12px;}
	.pindantan6{height: 48px;width: 48px;border-radius: 100px;}
	.pindantan7{padding: 22px 20px;}
	.pindantan8{font-size: 18px;color: #fff;background: #eb3636;height: 44px;line-height: 44px;text-align: center;border-radius: 6px;}
	.pindantan9{position: absolute;top: -13px;right: -13px;height: 30px;width: 30px;}


	.fade-enter-active, .fade-leave-active {
    	transition: opacity .5s;
	}
    .fade-enter, .fade-leave-to {
	    opacity: 0;
	}


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


	.morepin{position: fixed;top: 13%;left: 10%;right: 10%;background: #fff;border-radius: 6px;z-index: 3;}
	.morepin2{height: 52px;text-align: center;line-height: 52px;font-size: 18px;color: #333333;border-bottom: 1px solid #f5f5f5;}
	.morepin3{height: 345px;overflow-y: scroll;padding: 0 10px;}
	.morepin4{height: 45px;line-height: 45px;text-align: center;font-size: 14px;color: #999999;border-top: 1px solid #f5f5f5;}
	.morepin5{padding: 12px 0;border-bottom: 1px solid #f5f5f5;display: flex;align-items: center;}
	.morepin6{height: 48px;width: 48px;border-radius: 100px;}
	.morepin7{padding-left: 8px;flex: 1;}
	.morepin8{font-size: 14px;color: #333333;}
	.morepin10{color: #666666;font-size: 12px;padding-left: 12px;}
	.morepin9{color: #999999;font-size: 12px;padding-top: 5px;}
	.morepin11{width: 62px;height: 28px;line-height: 28px;text-align: center;color: #fff;font-size: 12px;background: #eb3636;border-radius: 6px;}
</style>


