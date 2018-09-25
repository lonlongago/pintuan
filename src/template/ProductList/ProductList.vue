<template>
    <div class="proList">
        <!-- <scroller :on-infinite="infinite" ref="my_scroller" :scrollTo="scrollTop" :on-refresh="refresh"> -->
            <ul>
                <li class="list" v-for="item in lists" @click="gotoprodetl(item.product_id,item.btn_type,item.btn_title)">
                    <div class="pic"><img :src="item.photo">
                        <span>已团{{item.tuan_count}}件</span>
                    </div>
                    <div class="txt_box">
                        <h3>{{item.title}}</h3>
                        <!-- <div style="display: flex;align-items: center;"> -->
                            <ul class="head">
                                <div style="margin-right: 18px;">
                                    <li v-for="pic in item.tuan_user_photos"><img class="produpic" :src="pic"></li>
                                </div>
                                <li style="color: #A8A8A8;font-size: 12px;line-height: 38px;">{{item.sale_count}}人已参团</li>
                            </ul>
                        <!-- </div> -->
                        <div class="box">
                            <div class="price fl mr10"><small>￥</small>{{item.tuan_price}}</div>
                            <small class="fl black9">{{item.tuan_num}}人团</small>
                            <div class="btn fr" :style="item.btn_type == 'enable' ? '':'background:#6666;'">{{item.btn_title}}</div>
                        </div>
                    </div>
                </li>
            </ul>
        <!-- </scroller> -->
    </div>
</template>

<script>
    export default {
        props:['lists'],
        data(){
            return{
            }
        },
        // watch: {
        //     '$route' (to, from) {
        //         consolg.log("当前路由路径",this.$route.path);
        //     }
        // },
        methods:{
            gotoprodetl(e,t,r){
                if(t == 'enable'){
                    this.$router.push('/prodetl?produc='+e);
                }else if(t == 'disable'){
                    alert(r)
                }
            }
        }
    }
</script>

<style type="text/css">
    /*._v-container{top: 45px!important;bottom: 50px;height: auto!important;}*/
    .proList .list{background: #fff; margin: 10px 0; padding: 10px;display: flex;align-items: center;}
    .proList .list .pic{float: left; width: 110px; height: 110px; background: #eee; position: relative; overflow: hidden;border: 1px solid #f5f5f5;}
    .proList .list .pic span{position: absolute; left: 0; top: 10px; line-height: 20px; padding: 0 4px; color: #fff; background: #f8ab55;}
    .proList .list .txt_box{padding-left: 10px;flex: 1;}
    .proList .list .txt_box h3{font-size: 14px; line-height: 20px; height: 40px; overflow: hidden; text-overflow: ellipsis; text-overflow: -o-ellipsis-lastline; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;}
    .proList .list .txt_box .head{overflow: hidden; padding-left: 10px; margin: 4px 0;display: flex;}
    .proList .list .txt_box .head li{float: left; margin-left: -10px;}
    .proList .list .txt_box .box{overflow: hidden; line-height: 30px;}
    .proList .list .txt_box .price{font-size: 16px;color: #eb3636; font-weight:500;}
    .proList .list .txt_box .btn{padding: 0 10px; min-width: 78px; display: inline-block; line-height: 30px; height: 30px; border-radius: 4px; text-align:center; color: #fff; font-size: 14px; background: #eb3636;}
    .produpic{ border:1px solid #fff; border-radius: 100%;background: #eee; width: 36px; height: 36px;}
</style>