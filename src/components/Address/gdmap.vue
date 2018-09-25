<template>
    <div class="amap-page-container">
      <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
      <el-amap vid="amapDemo" v-if="mapCenter" :zoom="12" :center="mapCenter" :plugin="plugin" class="amap-demo">
         <!-- :center="mapCenter" -->
        <!-- <el-amap-marker v-for="marker in markers" :position="marker" ></el-amap-marker> -->
      </el-amap>
      <div class="mylocal">
        <div class="mylocal2"  @click='back(addvic,true)'>
          <div class="mylocal3"><span class="mylocal4">[当前]</span>{{addvic}}</div>
        </div>
        <div>
        	<div class="mylocal2" v-for="item in abouadv"  @click='back(item,false)'>
	          <div class="mylocal3">
							<div class="mylocal6">
								<div class="mylocal5">{{item.name}}</div>
								<div class="mylocal5" style="padding-top: 3px;">{{item.address}}</div>
							</div>
	          </div>
	        </div>
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
  </style>

  <script>
    import Hub from '../../../config/eventBus.js';
    import VueAMap from 'vue-amap';
    export default {
      data: function() {
      	var self = this;
        return {
          markers: [
            [121.59996, 31.197646],
            [121.40018, 31.197622],
            [121.69991, 31.207649]
          ],
          searchOption: {},
          // addre: [],
          addvic: '',
          abouadv: [],
          mapCenter: [121.59996, 31.197646],
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
        that.addMarker();
        // console.log(this.addre)
        setTimeout(function(){
          that.req_post();
        },1000)
      },
      methods: {
        addMarker: function() {
          console.log(222)
          let lng = 121.5 + Math.round(Math.random() * 1000) / 10000;
          let lat = 31.197646 + Math.round(Math.random() * 500) / 10000;
          this.markers.push([lng, lat]);
          console.log(this.markers.push([lng, lat]))
        },
        onSearchResult(pois) {
          console.log(333)
          console.log(pois)
          let latSum = 0;
          let lngSum = 0;
          if (pois.length > 0) {
            pois.forEach(poi => {
              let {lng, lat} = poi;
              lngSum += lng;
              latSum += lat;
              this.markers.push([poi.lng, poi.lat]);
            });
            let center = {
              lng: lngSum / pois.length,
              lat: latSum / pois.length
            };
            this.mapCenter = [center.lng, center.lat];
          }
          this.abouadv = pois;
        },
        req_post() {
            const that=this;
            const registerUrl="http://restapi.amap.com/v3/batch?key=7141ff87786a9da4c2f0b3a02649aa76";
            const newUserInfo={
              "ops": [
                {
                  "url": "/v3/place/around?offset=10&page=1&key=7141ff87786a9da4c2f0b3a02649aa76&location="+that.lng+","+that.lat+"&output=json&radius=100000&types=080000"
                }
              ]
            };
            that.axios.post(registerUrl, newUserInfo, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            })
              .then(function (response) {
                console.log(response['data'][0]['body']['pois'])
                that.abouadv = response['data'][0]['body']['pois'];
              })
              .catch(function (error) {
                console.log(error);
              });

          },
          back(e,t){
            // console.log(e.address + '-' + e.name)
          	// console.log(e.location.split(',')[0])
          	// this.$router.go(-1)
          	if(t == false){
              console.log(e)
              var hehe = e.name + '-' + e.address;
              var lat = e.location.split(',')[1];
              var lng = e.location.split(',')[0];
              // this.$router.push({name: 'adv',params: { addvices: hehe,back: true } })
              // console.log(hehe)
              Hub.$emit('change',hehe); //Hub触发事件
              Hub.$emit('ding',lat);
              Hub.$emit('wei',lng);
              Hub.$emit('gogogo',true);
              // this.$emit('addvicemsg',e.address + '-' + e.name)
	      //   		this.$store.dispatch('lat',e.location.split(',')[1]);
							// this.$store.dispatch('lng',e.location.split(',')[0]);
							// this.$store.dispatch('editaddr',e.address+'-'+e.name);
              this.$router.go(-1)
          	}else{
              Hub.$emit('change',e); //Hub触发事件
              Hub.$emit('ding',this.lat);
              Hub.$emit('wei',this.lng);
              Hub.$emit('gogogo',true);
              // this.$emit('addvicemsg',e)
							// this.$store.dispatch('lat',this.lat);
							// this.$store.dispatch('lng',this.lng);
							// this.$store.dispatch('editaddr',e);
							this.$router.go(-1)
          	}
					},
      }
    };
</script>




<!-- <template>
  <div class="amap-page-container">
    <div :style="{width:'100%',height:'300px'}">
      <el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center">
      </el-amap>
    </div>


    <div class="toolbar">
        <span v-if="loaded">
          location: {{advic}}
        </span>
      <span v-else>正在定位</span>
    </div>
    <div
      v-on:click="req_post()"
    >
      查询周边
    </div>
  </div>
</template>
<style>
  .amap-demo {
    height: 300px;
  }
</style>
 <script>
    export default {
    	name: "pwd-forget",
      data: function() {
        const self = this;
          return {
            center: [121.59996, 31.197646],
            lng: 0,
            lat: 0,
            loaded: false,
            advic: '',
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
                init(o) {
                  // o 是高德地图定位插件实例
                  o.getCurrentPosition((status, result) => {
                    console.log(result)
                    if (result && result.position) {
                      self.lng = result.position.lng;
                      self.lat = result.position.lat;
                      self.center = [self.lng, self.lat];
                      self.advic = result.formattedAddress;
                      self.loaded = true;
                      self.$nextTick();
                    }
                  });
                }
              }
            }]
          }
      },
      mounted(){
      	console.log(this.axios)
      	this.req_post();
      },
      methods: {
      	req_post() {
            const that=this;
            const registerUrl="http://restapi.amap.com/v3/batch?key=7141ff87786a9da4c2f0b3a02649aa76";
            const newUserInfo={
              "ops": [
                {
                  "url": "/v3/place/around?offset=10&page=1&key=7141ff87786a9da4c2f0b3a02649aa76&location="+that.lng+","+that.lat+"&output=json&radius=100000&types=080000"
                }
              ]
            };
            that.axios.post(registerUrl, newUserInfo, {
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            })
              .then(function (response) {
                console.log(response['data'][0]['body']['pois'])
              })
              .catch(function (error) {
                console.log(error);
              });

          }
      }
    };
</script> -->
