var map;
var zoom = 8;
var heatmapOverlay;
var infoWin = new T.InfoWindow();
if (!isSupportCanvas()) {
    alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~');
}
var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                lat: geoCoord[1],
                lng: geoCoord[0],
                count: data[i].value
            });
        }
    }
    return res;
};

map = new T.Map('mapDiv', {
    projection: 'EPSG:4326'
});
map.centerAndZoom(new T.LngLat(117.268592, 31.862188), zoom);


    //创建缩放平移控件对象
control = new T.Control.Zoom();
control.setPosition(T_ANCHOR_TOP_RIGHT);
//添加缩放平移控件
map.addControl(control);

//创建比例尺控件对象
var scale = new T.Control.Scale();
//添加比例尺控件
map.addControl(scale);
var htradius = 60;
var htmax = 1000;
var data = [];
var geoCoordMap = {};
var points;
$.ajax({
    type: "get",
    //contentType: "application/json",
    url: "./data.ashx",
    //data: "{}",  //这里是要传递的参数，格式为 data: "{paraName:paraValue}",下面将会看到       
    dataType: 'json',   //WebService 会返回Json类型
    success: function (result) {     //回调函数，result，返回值
        if (result.length > 0) {
            //console.log(result);
            for (var i = 0; i < result.length; i++) {
                data.push({ name: result[i].NAME, remark: result[i].REMARK, value: result[i].RD,lat:result[i].LAT,lon:result[i].LON});
                //                geoCoordMap["'"+result[i].NAME+"'"]=[result[i].LAT,result[i].LON];
                geoCoordMap[result[i].NAME] = [result[i].LAT, result[i].LON];
             }
             

             var points = convertData(data);
             //构造热力图
             heatmapOverlay = new T.HeatmapOverlay({
                 "radius": htradius

            });
            map.addOverLay(heatmapOverlay);
            heatmapOverlay.setDataSet({ data: points, max: htmax });
            heatmapOverlay.show();
         }
     }
});


        function isSupportCanvas() {
            var elem = document.createElement('canvas');
            return !!(elem.getContext && elem.getContext('2d'));
        }
        
        //是否显示热力图
        function openHeatmap() {
            clearAll();
            //heatmapOverlay.show();

            var points = convertData(data);
            //构造热力图
            heatmapOverlay = new T.HeatmapOverlay({
                "radius": htradius

            });
            map.addOverLay(heatmapOverlay);
            heatmapOverlay.setDataSet({ data: points, max: htmax });
            heatmapOverlay.show();
        }
        
        function closeHeatmap() {
            heatmapOverlay.hide();
        }

        //显示信息框
        function showPosition(marker, name, winHtml) {
            if (infoWin) {
                map.removeOverLay(infoWin);
                infoWin = null;
            }
            var html = "<h3>" + name + "</h3>";
            html += winHtml;
            infoWin = new T.InfoWindow(html);
            marker.openInfoWindow(infoWin);
        }

        //清空地图及搜索列表
        function clearAll() {
        closeHeatmap();
            map.clearOverLays();
        }
        //景区分布
        function showjq() {
        clearAll();
        
            for (var i = 0; i < data.length; i++) {
                //闭包
                (function (i) {
                    //名称
                    var name = data[i].name;
                    //地址
                    var rmark = data[i].remark;
                    //坐标
                    //var lnglatArr = data[i].lonlat.split(" ");
                    var lnglat = new T.LngLat(data[i].lat,data[i].lon);

                    var winHtml = "类型:" + rmark;

                    //创建标注对象
                    var marker = new T.Marker(lnglat);
                    //地图上添加标注点
                    map.addOverLay(marker);
                    //注册标注点的点击事件
                    marker.addEventListener("click", function () {
                        this.showPosition(marker, name, winHtml);

                    }, this)
                    //zoomArr.push(lnglat);

                    //在页面上显示搜索的列表
                    var a = document.createElement("a");
                    a.href = "javascript://";
                    a.innerHTML = name;
                    a.onclick = function () {
                        showPosition(marker, name, winHtml);
                    }

                })(i);
            }
        }