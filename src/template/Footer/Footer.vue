<template>
    <div class="footer">
        <div class="list" v-for="(item,index) in lists" :class="{on:footerIdx == index}" @click='gotopage(item.link)'>
            <i :class="item.class"></i>
            <p>{{item.name}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        props:['footerIdx'],
        data(){
            return{
                lists:[
                    {
                        class:"ico_home",
                        name:'首页',
                        link:'home'
                    },
                    {
                        class:"ico_search",
                        name:'搜索',
                        link:'search'
                    },
                    {
                        class:"ico_order",
                        name:'订单',
                        link:'orderlist'
                    },
                    {
                        class:"ico_hot",
                        name:'热榜',
                        link:'hotList'
                    }
                ]
            }
        },
        methods:{
            // 跳转底部导航页面
            gotopage(link){
                this.$router.push(link);
            }
        }
    }
</script>

<style type="text/css">
    .footer{position:fixed; z-index:10; left:0px; bottom: 0px;right: 0px;height: 50px;background-color: #fff;box-shadow:inset 0px 1px 0px #e6e6e6;display:flex;}
    .footer .list{flex:1;text-align:center; font-size:12px; padding-top: 4px;}
    .footer .list i{display:inline-block;width:24px;height:24px;background-repeat:no-repeat;background-position: center;background-size: contain;}
    .footer .list .ico_home{background-image: url('../../assets/shouye@3x.png');}
    .footer .list .ico_search{background-image: url('../../assets/sousuo@3x.png');}
    .footer .list .ico_order{background-image: url('../../assets/dingdan@3x.png');}
    .footer .list .ico_hot{background-image: url('../../assets/rebang@3x.png');}
    .footer .list.on{color: #ffa200;}
    .footer .list.on .ico_home{background-image: url('../../assets/shouye1@3x.png');}
    .footer .list.on .ico_search{background-image: url('../../assets/sousuo1@3x.png');}
    .footer .list.on .ico_order{background-image: url('../../assets/dingdan1@3x.png');}
    .footer .list.on .ico_hot{background-image: url('../../assets/rebang1@3x.png');}
</style>