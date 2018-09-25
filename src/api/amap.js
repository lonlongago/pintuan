 export function MP(ak) {
    return new Promise(function (resolve, reject) {
        window.init = function () {
            initAMapUI(); //这里调用initAMapUI初始化
            resolve(AMap)
        }

        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "http://webapi.amap.com/maps?v=1.4.3&key="+ak+"&plugin=AMap.ToolBar,AMap.Autocomplete,AMap.PlaceSearch,AMap.Geocoder&callback=init";
        script.onerror = reject;
        document.head.appendChild(script);

        var script2 = document.createElement("script");
        script2.type = "text/javascript";
        script2.src = "//webapi.amap.com/ui/1.0/main-async.js";
        script2.onerror = reject;
        document.head.appendChild(script2);

    })
}