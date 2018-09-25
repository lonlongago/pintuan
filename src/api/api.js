import axios from 'axios'
import { setStore, getStore } from './mutils'
var root = process.env.API_ROOT
window.__orderData = '';
    //系统参数
window.__CFG = window.__CFG || {
    'APIURL': root,
    'CLIENT_OS': "VUEAPP",
    "WX_OPENID": '',
    "TOKEN": "16-KTB591F6CF535A917E0BEE0D47A199C6DF",
    "UxLocation": { "lng": 117.349715, "lat": 31.876294 },
    "CITY_ID": 1,
    "CITY": "合肥",
    "C_PREFIX": "KT-",
    "IMG_URL": "",
    "SITEURL":"http://sqdemo.jhcms.cn",
    "IN_APP_CLIENT":"",
    "DOCUMENT_TITLE":document.title,
    "CLIENT_VER":"3.1.20171115",
    "GDKEY":"",
};
//请求方法
function callapi(api, parmas, callback) {
    get_parmas();
    parmas = parmas || {};
    callback = typeof(callback) == 'function' ? callback : function(res) {};
    //公共参数
    var common_parmas = {
        'TOKEN': window.__CFG.TOKEN,
        "CITY": window.__CFG.CITY,
        "CITY_ID": window.__CFG.CITY_ID,
        "LNG": window.__CFG.UxLocation.lng,
        "LAT": window.__CFG.UxLocation.lat,
        "CLIENT_OS": "VUEAPP",
        "CLIENT_API": "CUSTOM",
        "CLIENT_VER":window.__CFG.CLIENT_VER,
        "API": api,
        "data": JSON.stringify(parmas)
    }
    //common_parmas.TOKEN = common_parmas.TOKEN || get_cookie("TOKEN");
    //alert(window.__CFG.TOKEN);

    var config = {
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        method: "post",
        baseURL: './'
    }
    var postdata = [];
    for (var k in common_parmas) {
        postdata.push(k + "=" + common_parmas[k]);
    }
    axios.post(window.__CFG.APIURL, postdata.join("&"), config)
        .then(function(res) {
            if(res.data.error == 101){
                login();
            }else{
                callback(res.data);
            }
            //callback(res.data);
        })
        .catch(function(err) {
            // console.log(err)
        })

}

function checkIsAndroid(){

}

function checkIsApp(){
    return typeof(window.JHAPP) == 'object' ? true :false;
}

function login(){
    var isapp = checkIsApp();
    var rebackurl = window.location.href;
    if(isapp && typeof(window.JHAPP.onLogin) == 'function'){
        setTimeout(function(){
            var params = {rebackurl:rebackurl};
            window.JHAPP.onLogin(JSON.stringify(params));
        }, 10)
    }else{
        rebackurl = encodeURIComponent(rebackurl);
        var request = '/passport/login';
        window.location.href = request + "?rebackurl=" + rebackurl;
    }
}

//获取系统参数
function get_parmas() {
    if (!window.__CFG.TOKEN) {
        var document_TOKEN = get_cookie('TOKEN');
        var Local_TOKEN = getStore('TOKEN');
        if (document_TOKEN == Local_TOKEN) {
            window.__CFG.TOKEN = Local_TOKEN;
        } else {
            window.__CFG.TOKEN = get_cookie('TOKEN');
            setStore('TOKEN', document_TOKEN);
        }

    }
    if (!window.__CFG.CITY_ID) {
        var local_CITY_ID = getStore('CITY_ID');
        var doucment_CITY_ID = get_cookie('UxCityId');
        if (local_CITY_ID == doucment_CITY_ID) {
            window.__CFG.CITY_ID = local_CITY_ID;
        } else {
            window.__CFG.CITY_ID = doucment_CITY_ID;
            setStore('CITY_ID', doucment_CITY_ID);
        }
    }
    if (!window.__CFG.CITY) {
        var local_CITY = getStore('CITY');
        var doucment_CITY = get_cookie('UxCity');
        if (local_CITY = doucment_CITY) {
            window.__CFG.CITY = local_CITY;
        } else {
            window.__CFG.CITY = doucment_CITY;
            setStore('CITY', doucment_CITY);
        }
    }
    if (!window.__CFG.UxLocation.lng || !window.__CFG.UxLocation.lat) {
        var document_UxLocation = get_cookie('UxLocation');
        // console.log(document_UxLocation)
        if (document_UxLocation) {
            var format_document_UxLocation =document_UxLocation.split(",");
            // console.log(format_document_UxLocation)
            if (format_document_UxLocation) {
                var data_uxlocation = {
                    "lng":format_document_UxLocation[1],
                    "lat":format_document_UxLocation[0]

                }
                window.__CFG.UxLocation = data_uxlocation;
            }
        }

    }
    // KT-UxLocation



}
//获取浏览区cookie
function get_cookie(key) {
    if (!key) {
        return false;
    } else {
        var keys = window.__CFG.C_PREFIX + key;
        var reg = new RegExp("(^| )" + keys + "=([^;]*)(;|\x24)");
        var result = reg.exec(document.cookie);
        if (result) {
            return result[2] || '';
        }
        return '';
    }
}

export default {
    //接口
       myOrder(params, callback) {
           return callapi('client/pintuan/ucenter/order/items', params, callback) //我的订单列表
       },
       home(params, callback) {
           return callapi('client/pintuan/index/index', params, callback) //首页
       },
       addres(params, callback) {
           return callapi('client/pintuan/ucenter/addr/index', params, callback) //收货地址
       },
        edit(params, callback) {
           return callapi('client/pintuan/ucenter/addr/edit', params, callback) //收货地址编辑
       },
        delete(params, callback) {
           return callapi('client/pintuan/ucenter/addr/delete', params, callback) //收货地址删除
       },
        collcet(params, callback) {
           return callapi('client/pintuan/product/collect', params, callback) //商品收藏,取消收藏
       },
        detail(params, callback) {
           return callapi('client/pintuan/product/detail', params, callback) //商品详情
       },
        hots(params, callback) {
           return callapi('client/pintuan/product/hots', params, callback) //商品详情
       },
       //jn-订单接口
       orderDetail(params, callback) {
           return callapi('client/pintuan/ucenter/order/detail', params, callback) //我的订单详情
       },
       logistics(params, callback) {
           return callapi('client/pintuan/ucenter/order/logistics', params, callback) //我的订单详情
       },
       cancelOd(params, callback) {
           return callapi('client/pintuan/ucenter/order/cancel', params, callback) //取消订单
       },
       cancel_reason(params, callback) {
           return callapi('client/pintuan/ucenter/order/cancel_reason', params, callback) //取消订单原因
       },
       upload(params,callback) {
            return callapi('client/pintuan/ucenter/order/upload', params,callback) //上传图片
        },
       comment1(params, callback) {
           return callapi('client/pintuan/ucenter/order/comment', params, callback)   //发布评论
       },
       refund(params, callback) {
           return callapi('client/pintuan/ucenter/refund/apply', params, callback)   //申请退款
       },
       checkCode(params, callback) {
           return callapi('client/pintuan/ucenter/order/verifycode', params, callback)   //查看券码
       },
       refundDetail(params, callback) {
           return callapi('client/pintuan/ucenter/refund/detail', params, callback)   //退款详情
       },
       ModifyAddress(params, callback) {
           return callapi('client/pintuan/ucenter/addr/edit', params, callback)   //用户收货地址编辑
       },
       addrcreate(params, callback) {
           return callapi('client/pintuan/ucenter/addr/create', params, callback)   //用户收货地址创建
       },
       auto_position(params, callback) {
           return callapi('client/pintuan/ucenter/addr/auto_position', params, callback)   //ip自动定位
       },
       get_region(params, callback) {
           return callapi('client/pintuan/ucenter/addr/get_region', params, callback)   //获取省市区
       },
       search(params, callback) {
           return callapi('client/pintuan/product/search', params, callback)   //热搜
       },
       shopsdetail(params, callback) {
           return callapi('client/pintuan/shop/detail', params, callback)   //拼团商家
       },
       deleteOrder(params, callback) {
           return callapi('client/pintuan/ucenter/order/delete', params, callback)   //删除订单
       },
       confirmGoods(params, callback) {
           return callapi('client/pintuan/ucenter/order/confirm', params, callback)   //确认收货
       },
       preinfo(params, callback) {
           return callapi('client/pintuan/ucenter/order/preinfo', params, callback)   //下单页数据
       },
       paymentinfo(params, callback) {
           return callapi('client/pintuan/payment/info', params, callback)   //账户余额
       },
       buyAgain(params, callback) {
           return callapi('client/pintuan/ucenter/order/again', params, callback)   //再次购买
       },
       groupAgain(params, callback) {
           return callapi('client/pintuan/ucenter/order/newgroup', params, callback)   //重新开团
       },
       create(params, callback) {
           return callapi('client/pintuan/ucenter/order/create', params, callback)   //下单创建
       },
       moneywhere(params, callback) {
           return callapi('client/pintuan/ucenter/order/moneywhere', params, callback)   //钱款去向
       },
       pintuanpay(params, callback) {
           return callapi('client/pintuan/payment/pintuan', params, callback)   //去支付
       },
       comment(params, callback) {
           return callapi('client/pintuan/product/comment', params, callback)   //评价详情
       },
       pingroup(params, callback) {
           return callapi('client/pintuan/product/group', params, callback)   //在拼商品
       },
 	   yaohaoyou(params, callback) {
           return callapi('client/pintuan/share/index', params, callback)   //邀请好友拼单
       },

        // 提示框
        tipload(glo, msg, isback) {
            glo.tipshow = true
            glo.tips = msg
            setTimeout(function() {
                glo.tipshow = false;
                if (isback) {
                    glo.$router.go(-1)
                }
            }, 1500)
        }

}


//判断是否微信
function checkIsWeixin(){
    if(/(micromessenger)/.test(navigator.userAgent.toLowerCase())){
        return true;
    }else{
        return false;
    }
};
function wxShare(){
    if(checkIsWeixin()){ //微信分享
         wx.ready(function(){
            wx.onMenuShareTimeline({
                title: document.title, // 分享标题
                desc: '<{$detail.title}>', // 分享描述
                link: '<{$url}>', // 分享链接
                imgUrl: '<{$pager.img}>/<{$detail.thumb}>', // 分享图标
                success: function () {
                    fenxiang();
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
            wx.onMenuShareAppMessage({
                title: document.title, // 分享标题
                desc: '<{$detail.title}>', // 分享描述
                link: '<{$url}>', // 分享链接
                imgUrl: '<{$pager.img}>/<{$detail.thumb}>', // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link

                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    fenxiang();
                },
                cancel: function () {
                }
            });
            wx.onMenuShareQQ({
                title: document.title, // 分享标题
                desc: '<{$detail.title}>', // 分享描述
                link: '<{$url}>', // 分享链接
                imgUrl: '<{$pager.img}>/<{$detail.thumb}>', // 分享图标
                success: function () {
                   fenxiang();
                },
                cancel: function () {
                   // 用户取消分享后执行的回调函数
                }
            });
        });   
    }
};
