<template>
	<div class="share_cont">
		<div class="share_box">
			<div class="mb30 text_c text">
				<div>还差<span>1</span>人，赶快邀请好友来拼单吧</div>
				<p class="black9">拼单已发起，人满后立即发货</p>
			</div>
			<div class="text_c share_list">
				<div class="list">
					<img src="../../assets/pengyouquan@3x.png" />
					<p>朋友圈</p>
				</div>
				<div class="list">
					<img src="../../assets/weixin@3x.png" />
					<p>微信好友</p>
				</div>
				<div class="list">
					<img src="../../assets/qq@3x.png" />
					<p>QQ</p>
				</div>
				<div class="list">
					<img src="../../assets/kongjian@3x.png" />
					<p>QQ空间</p>
				</div>
				<div class="list">
					<img src="../../assets/saoma@3x.png" />
					<p>当面扫码</p>
				</div>
				<div class="list">
					<img src="../../assets/fenxiang@3x.png" />
					<p>分享图片</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

export default{
	data(){
		return{

		}
	},
	components:{},
	mounted(){
		
	},
	methods:{

	}
}
</script>

<style type="text/css">
.share_cont{ height: 100%; background: #fff; padding-top: 40px; }
.share_box{ width: 86%; margin: 0 auto 40px; padding: 20px 20px 10px; border: 1px solid #e6e6e6; }
.share_box .text>div{ font-size: 15px; margin-bottom: 15px; }
.share_list .list{ display: inline-block; margin: 0 20px 25px; }
.share_list img{ width: 50px; height: 50px; }
.share_list p{ line-height: 18px; margin-top: 10px; }
</style>