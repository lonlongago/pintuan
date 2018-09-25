import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import Prodetl from '@/components/Prodetl/Prodetl'
import Orderlist from '@/components/Order/Orderlist'//订单-列表
import Orderdetail from '@/components/Order/Orderdetail'//订单-详情
import Share from '@/components/Order/Share'//订单-分享
import Sharesuccess from '@/components/Order/Sharesuccess'//订单-分享成功
import Orderpay from '@/components/Order/Orderpay'//订单-支付
import Refund from '@/components/Order/Refund'//订单-申请退款
import Refunddetail from '@/components/Order/Refunddetail'//订单-退款详情
import HotList from '@/components/HotList/HotList'
import Shops from '@/components/Shops/Shops'
import Evaluate from '@/components/Evaluate/Evaluate'
import Address from '@/components/Address/Address'
import Modifyadd from '@/components/Modifyadd/Modifyadd'
import Service from '@/components/Service/Service'
import Logistics from '@/components/Logistics/Logistics'
import Refunds from '@/components/Refunds/Refunds'
import Newevaluate from '@/components/Newevaluate/Newevaluate'
import Apply from '@/components/Apply/Apply'
import Search from '@/components/search/search'
import Gdmap from '@/components/Address/gdmap'
import GoodsAddr from '@/components/Address/goodsAddr'
import Erwei from '@/components/erwei/erwei'
import Orderpayinf from '@/components/orderpay/orderpayinf'
import GoToPay from '@/components/GoToPay/GoToPay'
import Evapicbig from '@/components/Evaluate/evapicbig'
import InviteFriends from '@/components/InviteFriends/InviteFriends'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/prodetl',
      component: Prodetl
    },
    {
      path: '/InviteFriends',
      component: InviteFriends
    },
    {
      path: '/orderlist',//订单-列表
      component: Orderlist
    },
    {
      path: '/orderdetail',//订单-详情
      component: Orderdetail
    },
    {
      path: '/share',//订单-分享
      component: Share
    },
    {
      path: '/sharesuccess',//订单-分享成功
      component: Sharesuccess
    },
    {
      path: '/orderpay',//订单-支付
      component: Orderpay
    },
    {
      path: '/refund',//订单-申请退款
      component: Refund
    },
    {
      path: '/refunddetail',//订单-退款详情
      component: Refunddetail
    },
    {
      path: '/hotList',
      component: HotList
    },
    {
      path: '/shops',
      component: Shops
    },
    {
      path: '/evaluate',
      component: Evaluate
    },
    {
      path: '/modifyadd',
      component: Modifyadd
    },
    {
      path: '/address',
      component: Address
    },
    {
      path: '/service',
      component: Service
    },
    {
      path: '/logistics',
      component: Logistics
    },
    {
      path: '/refunds',
      component: Refunds
    },
    {
      path: '/newevaluate',
      component: Newevaluate
    },
    {
      path: '/apply',
      component: Apply
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/gdmap',
      component: Gdmap
    },
     {
      path: '/goodsAddr',
      component: GoodsAddr
    },
    {
      path: '/erwei',
      component: Erwei
    },
    {
      path: '/evapicbig',
      component: Evapicbig
    },
    {
      path: '/orderpayinf',
      component: Orderpayinf,
      beforeEnter: (to, from, next) => {
        console.log(to,22)
        console.log(from)
        if(from.path == '/orderlist'){
          if(from.query.backpro == 'true'){
            next({path:'/home'})
          }else{
            next();
          }
        }else{
          next();
        }
        // next();
      }
    },
    {
      path: '/GoToPay',
      component: GoToPay
    },
  ]
})


// router.beforeEach((to, from, next) => {
//   console.log(to)
//   console.log(from)
//   console.log(next)
//   // if(from.path == '/orderpayinf'){
//   //   if(to.query.backpro == 'true'){
//   //     console.log(222)
//   //     next({path:'/home'})
//   //   }else{
//   //     console.log(333)
//   //     next();
//   //   }
//   // }else{
//   //   next()
//     // if(from.path == '/orderpayinf'){
//     //   if(to.query.backpro == 'true'){
//     //     console.log(555)
//     //     next({path:'/home'})
//     //   }else{
//     //     console.log(666)
//     //     next();
//     //   }
//     // }
//   // }
//   next()
// })



export default router;