<template>
    <div class="amap-page-container goodsAddr">
      
     <el-amap vid="amapDemo" v-if="mapCenter" :zoom="12" :center="mapCenter" :plugin="plugin" class="amap-demo mapTop">
         <!-- :center="mapCenter" -->
         <!-- <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :visible="marker.visible" :draggable="marker.draggable" :vid="index"></el-amap-marker> -->
         <el-amap-marker v-for="(marker,index) in markers" :key="marker.id" :position="marker.position" :vid="index" ></el-amap-marker> 
      </el-amap>
      <div class="mylocal mapBottom">
        <div class="mylocal2">
          <div class="mylocal3" style="margin-bottom: 10px;"><span class="mylocal4" style="font-size: 16px;color:#333;font-weight: bold;">{{goodsName}}</span></div>
         
          <div class="mylocal3"><span class="mylocal4" style="margin-right:5px">[商家位置]</span>{{addvic}}</div>
        </div>
       
      </div>
    </div>
  </template>

  <style>
    .amap-demo {
      height: 300px;
    }

    .search-box {
      position: absolute;
      top: 25px;
      left: 20px;
    }

    .amap-page-container {
      position: relative;
      height: 490px;
    }
    .el-vue-search-box-container{
      position: absolute!important;
      width: 90%!important;
    }
    .mylocal{background: #fff;}
    .mylocal2{border-bottom: 1px solid #f2f2f2;font-size: 14px;padding: 10px 15px;}
    .mylocal3{display: flex;align-items: center;}
    .mylocal4{font-weight: bold;}
    .mylocal5{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
    .mylocal6{flex: 1;overflow: hidden;}
    .goodsAddr{height: 100%;position: relative;}
    .mapTop{height: 100%;}
    .mapBottom{position: absolute;bottom:0;left: 0;z-index: 999;width:100%;}
  </style>

  <script>
    import Hub from '../../../config/eventBus.js';
    import VueAMap from 'vue-amap';
    export default {
      data: function() {
      	var self = this;
        return {
//      	lat:this.$route.query.lat,
//      	lng:this.$route.query.lng,
          markers: [
            {
              position:[Number(this.$route.query.lng),Number(this.$route.query.lat)],
              visible: true,
              draggable: false,
            }
          ],
          searchOption: {},
          // addre: [],
          addvic: this.$route.query.addvic,
          goodsName:this.$route.query.goodsName,
          abouadv: [],
          mapCenter: [this.$route.query.lng,this.$route.query.lat],
          plugin: [{
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 100,          //超过10秒后停止定位，默认：无穷大
            maximumAge: 0,           //定位结果缓存0毫秒，默认：0
            convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true,        //显示定位按钮，默认：true
            buttonPosition: 'RB',    //定位按钮停靠位置，默认：'LB'，左下角
            showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy:true,//定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
            extensions:'all',
            pName: 'Geolocation',
            events: {
              // init(instance) {
              //   console.log(instance);
              // },
              init(o) {
                // console.log(o)
                // o 是高德地图定位插件实例
                o.getCurrentPosition((status, result) => {
                  if (result && result.position) {
                  	console.log(result)
                    // console.log(result.addressComponent)
                    self.addvic = result.formattedAddress;
                    // console.log(self.addr.city)
                    // self.addre = [self.addr];
                    self.lng = result.position.lng;
                    self.lat = result.position.lat;
                    self.mapCenter = [self.lng, self.lat];
                    self.loaded = true;
                    self.$nextTick();
                  }
                });
              }
            }
          }]
        };
      },
      mounted(){
        var that = this;
        // that.addMarker();
        // // console.log(this.addre)
        // setTimeout(function(){
        //   that.req_post();
        // },1000)
      },
      methods: {
        // addMarker: function() {
        //   console.log(222)
        //   let lng = 121.5 + Math.round(Math.random() * 1000) / 10000;
        //   let lat = 31.197646 + Math.round(Math.random() * 500) / 10000;
        //   this.markers.push([lng, lat]);
        //   console.log(this.markers.push([lng, lat]))
        // },
        // onSearchResult(pois) {
        //   console.log(333)
        //   console.log(pois)
        //   let latSum = 0;
        //   let lngSum = 0;
        //   if (pois.length > 0) {
        //     pois.forEach(poi => {
        //       let {lng, lat} = poi;
        //       lngSum += lng;
        //       latSum += lat;
        //       this.markers.push([poi.lng, poi.lat]);
        //     });
        //     let center = {
        //       lng: lngSum / pois.length,
        //       lat: latSum / pois.length
        //     };
        //     this.mapCenter = [center.lng, center.lat];
        //   }
        //   this.abouadv = pois;
        // },
        // req_post() {
        //     const that=this;
        //     const registerUrl="http://restapi.amap.com/v3/batch?key=7141ff87786a9da4c2f0b3a02649aa76";
        //     const newUserInfo={
        //       "ops": [
        //         {
        //           "url": "/v3/place/around?offset=10&page=1&key=7141ff87786a9da4c2f0b3a02649aa76&location="+that.lng+","+that.lat+"&output=json&radius=100000&types=080000"
        //         }
        //       ]
        //     };
        //     that.axios.post(registerUrl, newUserInfo, {
        //       headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded'
        //       }
        //     })
        //       .then(function (response) {
        //         console.log(response['data'][0]['body']['pois'])
        //         that.abouadv = response['data'][0]['body']['pois'];
        //       })
        //       .catch(function (error) {
        //         console.log(error);
        //       });

        //   },
     //      back(e,t){
     //        // console.log(e.address + '-' + e.name)
     //      	// console.log(e.location.split(',')[0])
     //      	// this.$router.go(-1)
     //      	if(t == false){
     //          console.log(e)
     //          var hehe = e.name + '-' + e.address;
     //          var lat = e.location.split(',')[1];
     //          var lng = e.location.split(',')[0];
     //          // this.$router.push({name: 'adv',params: { addvices: hehe,back: true } })
     //          // console.log(hehe)
     //          Hub.$emit('change',hehe); //Hub触发事件
     //          Hub.$emit('ding',lat);
     //          Hub.$emit('wei',lng);
     //          Hub.$emit('gogogo',true);
     //          // this.$emit('addvicemsg',e.address + '-' + e.name)
	    //   //   		this.$store.dispatch('lat',e.location.split(',')[1]);
					// 		// this.$store.dispatch('lng',e.location.split(',')[0]);
					// 		// this.$store.dispatch('editaddr',e.address+'-'+e.name);
     //          this.$router.go(-1)
     //      	}else{
     //          Hub.$emit('change',e); //Hub触发事件
     //          Hub.$emit('ding',this.lat);
     //          Hub.$emit('wei',this.lng);
     //          Hub.$emit('gogogo',true);
     //          // this.$emit('addvicemsg',e)
					// 		// this.$store.dispatch('lat',this.lat);
					// 		// this.$store.dispatch('lng',this.lng);
					// 		// this.$store.dispatch('editaddr',e);
					// 		this.$router.go(-1)
     //      	}
					// },
      }
    };
</script>
