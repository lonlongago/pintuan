<template>
	<div class="home">
		<div class="newevatop">
			<div class="newevatop1">
				<img :src="product_photo" class="newevatop2">
				<div class="newevatop3">{{product_title}}</div>
			</div>
			<div class="newevatop4">
				<textarea placeholder="亲，您对这个商品满意吗？您的评价会帮助我们选择更好的商品哦！" class="newevatop5" :value="content" @input="tapTxt"></textarea>
			</div>
			<div class="newevatop6">
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
		<div class="newevacon">
			<a href="javascript:;" @click="submitevaluate">
				<div class="newevacon1">提交评价</div>
			</a>
		</div>
		<v-msgbox :isshow="tipshow" :title="tips"></v-msgbox>
		</div>
		
			
		
	
</template>

<script>
	import vMsgbox from '../../../src/template/msgbox'
import vFooter from '../../template/Footer/Footer'
import vProductList from '../../template/ProductList/ProductList'
import vTip from '../../template/tip'
import BScroll from 'better-scroll'
import api from '../../api/api'
export default {
	data () {
		return {
			
			images:[],
			tips:'',
			tipshow:false,
			order_id: this.$route.query.order_id, //路由带来的order_id
			product_title: this.$route.query.product_title, //路由带来的product_title
			product_photo:this.$route.query.product_photo,
			content:'',
			files:[], //发布图片
			
		}
	},
	created(){
		
	},
	mounted () {
		
		
	},
	
	components:{vFooter,vProductList,vTip,vMsgbox},
	methods:{
		addPic(e){
                e.preventDefault();
                $('input[type=file]').trigger('click');
                return false;
            },
          
            delImage:function(index){
                this.images.shift(index);
            },
            removeImage: function(e) {
                this.images = [];
            },
            //发布描述
			tapTxt(e){
				this.content = e.target.value;
				console.log(this.content)
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
		          if(that.images.length == 3){api.tipload(that,'最多三张图片哟');}else{
		          	console.log(that.images.length)
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
		        }
		    },
            //提交评价
            submitevaluate(){
            	var that = this;
            	var params={
            			order_id:that.order_id,
						content:that.content,
						files:that.files,
					};
				api.comment1(params,function(res){
//					console.log(res)
					if(res.error == "0") {
							api.tipload(that,res.message);
							setTimeout(function(){
								that.$router.go(-1);
							},1200)
							
						} else {
							api.tipload(that,res.message);
						}
				})
            }
	}
}
</script>


<style scoped>
	.newevatop{padding: 9px 0 15px 0;background: #fff;}
	.newevatop1{display: flex;align-items: center;padding-bottom: 8px;border-bottom: 1px solid #ECECEC;padding-left: 12px;padding-right: 12px;}
	.newevatop2{width: 40px;height: 40px;border: 1px solid #f2f2f2;}
	.newevatop3{padding-left: 7px;flex: 1;font-size: 15px;color: #555555;}
	.newevatop4{padding: 8px 18px 8px 12px;}
	.newevatop5{font-size: 15px;color: #333;resize: none;width: 100%;height: 80px;border: 0;line-height: 1.5;}
	.newevatop6{padding-left: 12px;display: inline-block;}
	.newevatop7{height: 80px;width: 80px;opacity: 0;}
	.newevatop8{background-image: url(../../assets/Group2@2x.png);background-size: 100% 100%;width: 80px;height: 80px;display: inline-block;}
	ul { list-style: none outside none; margin:0; padding: 0; }
    	li { margin: 0 10px; display: inline; }
    	.newimg1{display: inline-block;}
    	.newimg2{width: 70px;height: 70px;margin-right: 10px;border-radius: 4px;}
    	.newevacon{padding: 22px 5%;}
    	.newevacon1{background: #FF7700;border-radius: 6px;height: 44px;width: 100%;font-size: 17px;color: #FFFFFF;line-height: 44px;text-align: center;}
</style>


