<template>
	<div class="refund_page">
		<div class="refund_cont">
			<div class="border_b pub_list list" @click="tcShow">
				<div class="pub_list_bd">退款类型</div>
				<div class="black9">{{refundStr}}</div>
				<i class="rArrow_ico"></i>
				<div class="refundType" v-show="tcshow">
					<ul>
						<li @click="getStr($event)">仅退款</li>
						<li @click="getStr($event)">退货退款</li>
					</ul>
				</div>
			</div>
			<div class="border_b pub_list list" @click="tcShow2">
				<div class="pub_list_bd">货物状态</div>
				<div class="black9">{{thingState}}</div>
				<i class="rArrow_ico"></i>
				<div class="refundType" v-show="tcshow2">
					<ul>
						<li @click="getStr2($event)">未收到货物</li>
						<li @click="getStr2($event)">收到货物</li>
					</ul>
				</div>
			</div>
			<div class="border_b pub_list list">
				<div class="pub_list_bd">退款金额</div>
				<input type="number" placeholder="" :value="money" @input="tapMoney"/>
			</div>
			<div class="border_b text">
				<div class="tit">退款说明</div>
				<textarea placeholder="请您详细填写申请说明（最多170个字）" :value="explain" @input="tapExplain"></textarea>
			</div>
			<div class="border_b pub_list list">
				<div class="pub_list_bd">联系电话</div>
				<input type="number" placeholder="" :value="tel" @input="tapTel" />
			</div>
			<div class="newevatop6">
				<h1>上传凭证<span>（最多三张）</span></h1>
				<div class="newevatop8">
					<input type="file" name="" class="newevatop7" multiple @change="uploadImage">
				</div>
				<div v-if="images.length >0" class="newimg1">
		               <ul>
		                  <li v-for="(key,image) in images">
		                     <img :src="key" @click='delImage(image)' class="newimg2" />
		                     <!-- <a href="#" style="position: absolute;" @click='delImage(key)'>
		                        <span class="glyphicon glyphicon-remove"></span>
		                    </a> -->
		                  </li>
		               </ul>
		            </div>
	        	</div>
	        	
		</div>
		<div class="refund_footer">
			<div class="btn" @click="submitRequest">提交申请</div>
		</div>
		<div class="refundMask" v-show="maskshow" @click="maskShow"></div>
	</div>
</template>

<script>
import api from '../../api/api'	
export default{
	data(){
		return{
			order_id: this.$route.query.order_id, //路由带来的order_id
			tcshow:false,
			tcshow2:false,
			maskshow:false,
			refundStr:'请选择',
			thingState:'请选择',
			money:'',
			explain:'',
			tel:'',
			files:[], //发布图片
			images:[],
			refund_type:'',
            goods_type:'',
		}
	},
	components:{},
	mounted(){
		
	},
	methods:{
		tcShow(){
			this.tcshow = !this.tcshow;
			this.maskshow = !this.maskshow;
		},
		tcShow2(){
			this.tcshow2 = !this.tcshow2;
			this.maskshow = !this.maskshow;
		},
		maskShow(){
			this.maskshow = !this.maskshow;
			this.tcshow = false;
			this.tcshow2 = false;
		},
		getStr(e){
			this.refundStr = e.target.innerHTML;
			if(this.refundStr == "仅退款"){
				this.refund_type = 0;
			}else{
				this.refund_type = 1;
			}
			console.log(this.refund_type)
		},
		getStr2(e){
			this.thingState = e.target.innerHTML;
			if(this.thingState == "未收到货物"){
				this.goods_type = 0;
			}else{
				this.goods_type = 1;
			}
			console.log(this.goods_type)
		},
		tapMoney(e){
			this.money = e.target.value
			console.log("退款金额"+this.money)
		},
		tapExplain(e){
			this.explain = e.target.value
			console.log("退款说明"+this.explain)
		},
		tapTel(e){
			this.tel = e.target.value
			console.log("联系电话"+this.tel)
		},
		//发布图片
			uploadImage(e) {
		        var files = e.target.files || e.dataTransfer.files;
		        //console.log(files);
		        if (!files.length) return;
		        var that = this;

		        for (var i = 0; i < files.length; i++) {
		          console.log('执行')
		          var tag = '';
		          var rFilter = /^(image\/gif|image\/jpeg|image\/jpg|image\/png)$/i;
		          if (!rFilter.test(files[i].type)) {
		            //alert("只允许上传JPG、PNG、GIF格式图片");
		            api.tipload(that,"只允许上传JPG、PNG、GIF格式图片");
		            return false;
		          }
		          console.log(files[i])

		          if (files[i].size > 1024 * 1024) {
		            var reader = new FileReader();
		            var file = files[i]
		            reader.onload = function (e) {
		              var target = e.target.result;
		              lrz(file,{width:1000}).then(function (rst) {
		                api.upload({file: rst.base64}, function (res) {
		                  if (res.error == 0) {
		                    that.images.push(rst.base64);
		                    that.images.splice(3)
		                    that.files.push(res.data);
		                    that.files.splice(3)
		                  }
		                });
		              }).always(function() {
		                e.target.value = null;
		              });
		            }
		            reader.readAsDataURL(files[i]);
		          } else {
		            var reader = new FileReader();
		            reader.onload = function (e) {
		              // console.log(e.target.result);
		              api.upload({file: e.target.result}, function (res) {
		                console.log(res);
		                if (res.error == 0) {
		                  that.images.push(e.target.result);
		                  that.images.splice(3)
		                  that.files.push(res.data);
		                  that.files.splice(3)
		                  console.log(that.files)
		                }
		              });
		            }
		            reader.readAsDataURL(files[i]);
		          }
		        }
		    },
		    delImage:function(index){
                this.images.shift(index);
            },
            //提交申请
            submitRequest(){
            	var that = this;
            	var params = {
            		order_id:that.order_id,
            		refund_money:that.money,
            		intro:that.explain,
            		mobile:that.tel,
            		refund_type:that.refund_type,
            		goods_type:that.goods_type,
            		files:that.files,
            	};
				api.refund(params,function(res){
						if(res.error == "0"){
							console.log(res)
						}else{
							console.log(res.message)
						}
					})
            	
            }
            
	}
}
</script>

<style type="text/css">
.refund_page{ height: 100%; background: #fff; }
.refund_cont{ padding-bottom: 74px; }
.refund_cont .list{ padding: 15px 10px; line-height: 20px; font-size: 14px; }
.refund_cont .list .rArrow_ico{ display: inline-block; width: 10px; height: 20px; background: url(../../assets/dianji@3x.png) no-repeat; background-size: contain; vertical-align: middle; margin-left: 10px; }
.refund_cont .list input[type="text"]{ height: 20px; line-height: 20px; border: none; text-align: right; font-size: 14px; color: #999; }
.refund_cont .list input[type="number"]{ height: 20px; line-height: 20px; border: none; text-align: right; font-size: 14px; color: #999; }
.refund_cont .text{ padding: 15px 10px; }
.refund_cont .text .tit{ font-size: 14px; line-height: 20px; }
.refund_cont .text .tit span{ font-size: 12px; color: #999; }
.refund_cont .text textarea{ width: 100%; height: 160px; line-height: 20px; padding: 10px; -webkit-box-sizing: border-box; box-sizing: border-box; border: none; resize: none; }
.refund_cont .uploadPic{ width: 48px; height: 48px; border: 1px solid #D1CECE; position: relative; }
.refund_cont .uploadPic:before,.refund_cont .uploadPic:after{ content: ''; position: absolute; top: 50%; left: 50%; background: #D1CECE; }
.refund_cont .uploadPic:before{ width: 24px; height: 2px; margin-left: -12px; margin-top: -1px; }
.refund_cont .uploadPic:after{ width: 2px; height: 24px; margin-left: -1px; margin-top: -12px; }
.refund_cont .uploadPic input{ opacity: 0; position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
.refund_footer{ position: fixed; left: 0; bottom: 0; width: 100%; z-index: 99; }
.refund_footer .btn{ width: 80%; margin: 15px auto; height: 44px; line-height: 44px; text-align: center; background: #FF7F00; border-radius: 4px; font-size: 16px; color: #fff; }
.pub_list{position: relative;}
.refundType{position: absolute;left: 0;top:51px;background: #eee;width:100%;z-index: 999;}
.refundType li{text-align: center;height: 50px;line-height: 50px;border-bottom:1px solid #fff;font-size: 14px;color:#333;}
.refundMask{width:100%;height: 100%;position: fixed;left: 0;top:0;z-index: 888;}
.newevatop6{padding-left: 12px;display: inline-block;}
.newevatop6 h1{font-size: 16px;color:#4A4A4A;margin:15px 0;}
.newevatop6 h1 span{font-size: 13px;color:#aaa;}
.newevatop7{height: 80px;width: 80px;opacity: 0;}
.newevatop8{background-image: url(../../assets/Group2@2x.png);background-size: 100% 100%;width: 80px;height: 80px;display: inline-block;}
.newimg1 ul{ list-style: none outside none; margin:0; padding: 0; }
.newimg1 li{ margin: 0 10px; display: inline; }
.newimg1{display: inline-block;}
.newimg2{width: 70px;height: 70px;margin-right: 10px;border-radius: 4px;}
.newevacon{padding: 22px 5%;}
.newevacon1{background: #FF7700;border-radius: 6px;height: 44px;width: 100%;font-size: 17px;color: #FFFFFF;line-height: 44px;text-align: center;}
</style>