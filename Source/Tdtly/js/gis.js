var tdtMapLayer = new ol.layer.Tile({
    title: "google",
    source: new ol.source.XYZ({
        url: "http://t1.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}"
    })
});

var tdtLBLayer = new ol.layer.Tile({
    title: "google",
    source: new ol.source.XYZ({
        url: "http://t1.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}"
    })
});

//var txtstyle = new ol.style.Text({
//        font: '12px Calibri,sans-serif',
//        overflow: true,
//        fill: new ol.style.Fill({
//            color: '#000'
//        }),
//        stroke: new ol.style.Stroke({
//            color: '#fff',
//            width: 3
//        })
//        });

//var shipsource = new ol.source.Vector({ wrapX: false });
////轮船图层
////shipsource.on({
////    'featureselected': function (feature) {
////        alert("clicked");
////    },
////    'featureunselected': function (feature) {
////        alert("clicked2");
////    }

////});

//var createShipTextStyle = function (feature, resolution, angle) {
//            return new ol.style.Text({
//                //textAlign: align == '' ? undefined : align,
//                //textBaseline: baseline,
//                font:'12px Calibri,sans-serif',
//                text: feature["ShipName"],
//                fill: new ol.style.Fill({ color: '#233399' }),
//                stroke: new ol.style.Stroke({ color: '#040089', width:1 }),
//                //offsetX: offsetX,
//                //offsetY: offsetY,
//                //placement: placement,
//                //maxAngle: maxAngle,
//                //overflow: overflow,
//                rotation: angle
//            });
//        };

//function shipStyleFunction(feature, resolution) {
//    var angle = getAngle(feature["Lon0"], feature["Lat0"], feature["Lon"], feature["Lat"]);
//    return new ol.style.Style({
//        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
//            anchor: [0.5, 30],
//            anchorXUnits: 'fraction',
//            anchorYUnits: 'pixels',
//            opacity: 0.95,
//            rotation:angle,
//            src: './img/ship.png'
//        })),
//        text: createShipTextStyle(feature, resolution, angle)
//    });
//}

//var shiplayer = new ol.layer.Vector({
//    source: shipsource,
//    style:shipStyleFunction
////    ,style: new ol.style.Style({
////        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
////            anchor: [0.5, 46],
////            anchorXUnits: 'fraction',
////            anchorYUnits: 'pixels',
////            opacity: 0.95,
////            src: './img/ship.png'
////        }))
////    })
//});


//var createBSTextStyle = function (feature, resolution, angle) {
//    return new ol.style.Text({
//        //textAlign: align == '' ? undefined : align,
//        //textBaseline: baseline,
//        font: '12px Calibri,sans-serif',
//        text: feature["BSName"],
//        fill: new ol.style.Fill({ color: '#000' }),
//        stroke: new ol.style.Stroke({ color: '#111', width: 1 }),
//        //offsetX: offsetX,
//        offsetY: 20,
//        //placement: placement,
//        //maxAngle: maxAngle,
//        //overflow: overflow,
//        rotation: 0
//    });
//};

//function bsStyleFunction(feature, resolution) {
//    return new ol.style.Style({
//        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
//            anchor: [0.5, 30],
//            anchorXUnits: 'fraction',
//            anchorYUnits: 'pixels',
//            opacity: 0.95,
//            src: './img/bs.png'
//        })),
//        text: createBSTextStyle(feature, resolution, 0)
//    });
//}



////基站图层
//var bssource = new ol.source.Vector({ wrapX: false });
//var bslayer = new ol.layer.Vector({
//    source: bssource,
//    style: bsStyleFunction
////    style: new ol.style.Style({
////        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
////            anchor: [0.5, 30],
////            anchorXUnits: 'fraction',
////            anchorYUnits: 'pixels',
////            opacity: 0.95,
////            src: './img/bs.png'
////        }))
////    })
//});

////基站范围图层
//var bsrangesource = new ol.source.Vector({ wrapX: false });
//var bsrangelayer = new ol.layer.Vector({
//    source: bsrangesource,
//    style: new ol.style.Style({
//        stroke: new ol.style.Stroke({
//            width: 1,
//            color: [200, 94, 83, 0.5]
//        }),
//        fill: new ol.style.Fill({
//            color: [200, 232, 89, 0.2]
//        })
//    })
//});


//绘制大矩形
var styles = [
/* We are using two different styles for the polygons:
*  - The first style is for the polygons themselves.
*  - The second style is to draw the vertices of the polygons.
*    In a custom `geometry` function the vertices of a polygon are
*    returned as `MultiPoint` geometry, which will be used to render
*    the style.
*/
        new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'blue',
                width: 1
            }),
            fill: new ol.style.Fill({
                color: 'rgba(0, 0, 255, 0.1)'
            })
        }),
        new ol.style.Style({
            image: new ol.style.Circle({
                radius: 2,
                fill: new ol.style.Fill({
                    color: 'orange'
                })
            }),
            geometry: function (feature) {
                // return the coordinates of the first ring of the polygon
                var coordinates = feature.getGeometry().getCoordinates()[0];
                return new ol.geom.MultiPoint(coordinates);
            }
        })
      ];

        

//最外边大的矩形
var bigsource = new ol.source.Vector({ wrapX: false });

var startx = 116.20;
var endx = 116.54;
var starty = 39.83;
var endy = 40.03;

////绘大矩形
//var polygon = new ol.geom.Polygon([[[startx, endy], [endx, endy], [endx, starty], [startx, starty], [startx, endy]]]);
//polygon.applyTransform(ol.proj.getTransform('EPSG:4326', 'EPSG:3857'));
//var feature = new ol.Feature(polygon);

//bigsource.addFeature(feature);

var bigrectlayer = new ol.layer.Vector({
    source: bigsource,
    style: styles
});


var xcout = 10; //x轴均分数量
var ycout = 10; //y轴均分数量


//基站图层
var centersource = new ol.source.Vector({ wrapX: false });
var centerlayer = new ol.layer.Vector({
    source: centersource,
    style: new ol.style.Style({
        image: new ol.style.Circle({
            radius: 1,
            stroke: new ol.style.Stroke({
                color: '#fff'
            }),
            fill: new ol.style.Fill({
                color: '#3399CC'
            })
        }),
        stroke: new ol.style.Stroke({
            color: 'blue',
            width: 1
        }),
        fill: new ol.style.Fill({
            color: 'rgba(0, 0, 255, 0.1)'
        })
    })
});


//分割的小矩形
var smallsource = new ol.source.Vector({ wrapX: false });

var xdistance = endx - startx;
var ydistance = endy - starty;

for (var i = 0; i < xcout; i++) {
    for (var j = 0; j < ycout; j++) {

        var startx_cell = startx+i*xdistance/xcout;
        var endx_cell = startx + (i+1) * xdistance / xcout;
        var starty_cell = starty + j * ydistance / ycout; ;
        var endy_cell = starty + (j + 1) * ydistance / ycout;

        var polygon_cell = new ol.geom.Polygon([[[startx_cell, endy_cell], [endx_cell, endy_cell], [endx_cell, starty_cell], [startx_cell, starty_cell], [startx_cell, endy_cell]]]);
        polygon_cell.applyTransform(ol.proj.getTransform('EPSG:4326', 'EPSG:3857'));
        //绘制中点
        var feature_cell = new ol.Feature(polygon_cell);
        feature_cell["i"] = i;
        feature_cell["j"] = j;
        feature_cell["cellid"] = i+"-"+j;
        smallsource.addFeature(feature_cell);
        
        //绘制中心点
//        var centerpoint = polygon_cell.getInteriorPoint();
//        var feature_cell_center = new ol.Feature(centerpoint);
//        centersource.addFeature(feature_cell_center);
    }
 }

var smallrectlayer = new ol.layer.Vector({
    source: smallsource,
    style: styles
});


//鼠标移动显示经纬度信息
var mousePositionControl = new ol.control.MousePosition({
    coordinateFormat: ol.coordinate.createStringXY(4),
    projection: 'EPSG:4326',  //4326
    // comment the following two lines to have the mouse position
    // be placed within the map.
    className: 'custom-mouse-position',
    target: document.getElementById('mouse-position'),
    undefinedHTML: '&nbsp;'
});

var arrowlinesource = new ol.source.Vector();

var arrowStyleFunction = function (feature) {
    var geometry = feature.getGeometry();
    var styles = [
    // linestring
          new ol.style.Style({
              stroke: new ol.style.Stroke({
                  color: '#ffcc33',
                  width: feature["width"]
              })
          })
        ];

    geometry.forEachSegment(function (start, end) {
        var dx = end[0] - start[0];
        var dy = end[1] - start[1];
        var rotation = Math.atan2(dy, dx);
        // arrows
        styles.push(new ol.style.Style({
            geometry: new ol.geom.Point(end),
            image: new ol.style.Icon({
                src: 'https://openlayers.org/en/v4.6.5/examples/data/arrow.png',
                anchor: [0.75, 0.5],
                rotateWithView: true,
                rotation: -rotation
            })
        }));
    });

    return styles;
};
var arrowlinevector = new ol.layer.Vector({
    source: arrowlinesource,
    style: arrowStyleFunction
})

var map = new ol.Map({
    controls: ol.control.defaults({
        attributionOptions: {
            collapsible: false
        }
    }).extend([mousePositionControl]),
    layers: [tdtMapLayer, tdtLBLayer, bigrectlayer, smallrectlayer, centerlayer, arrowlinevector],  //tdtSTLayer
    view: new ol.View({
        center: [12953824, 4855737], //108.51, 34.55
        projection: 'EPSG:3857',
        zoom: 12
    }),
    target: 'map'
});

//map.addInteraction(new ol.interaction.Draw({
//    source: linesource,
//    type: 'LineString'
//}));


//从后台获取gps数据
$.ajax({
    type: "get",
    //contentType: "application/json",
    url: "./data.ashx?xcout=" + xcout + "&ycout=" + ycout + "&startx=" + startx + "&endx=" + endx + "&starty=" + starty + "&endy=" + endy,
    //data: "{}",  //这里是要传递的参数，格式为 data: "{paraName:paraValue}",下面将会看到       
    dataType: 'json',   //WebService 会返回Json类型
    success: function (result) {     //回调函数，result，返回值
        if (result.length > 0) {
            //console.log(result);
            for (var i = 0; i < result.length; i++) {

                var line = new ol.geom.LineString([[result[i].startx, result[i].starty], [result[i].endx, result[i].endy]]);
                line.applyTransform(ol.proj.getTransform('EPSG:4326', 'EPSG:3857'));

                //                var feature_start_center = new ol.Feature(start);
                //                var feature_end_center = new ol.Feature(end);
                //centersource.addFeature(feature_start_center);
                //centersource.addFeature(feature_end_center);

                var featureLine = new ol.Feature(line);
                featureLine["width"] = parseInt(result[i].power / 10)+1;
                arrowlinesource.addFeature(featureLine);

                //console.log(result[i].taxi_id);

                //console.log(result[i].taxi_id);
                //                var p = new ol.geom.Point(result[i].lon, result[i].lat);
                //                p.applyTransform(ol.proj.getTransform('EPSG:4326', 'EPSG:3857'));
                //                var feature_cell_center = new ol.Feature(p);
                //                centersource.addFeature(feature_cell_center);

                ////////                //var p = [result[i].lon, result[i].lat];
                ////////                var p = new ol.geom.Point(result[i].lon, result[i].lat);
                ////////                p.applyTransform(ol.proj.getTransform('EPSG:4326', 'EPSG:3857'));
                ////////                var fcell = null;
                ////////                smallsource.forEachFeature(function (feature) {
                ////////                    var gp = feature.getGeometry();
                ////////                    //gp.applyTransform(ol.proj.getTransform('EPSG:3857', 'EPSG:4326'))
                ////////                    if (p.intersectsExtent(gp.getExtent())) {
                ////////                        fcell = feature;
                ////////                    }
                ////////                });
                ////////                if (fcell != null) {
                ////////                    console.log(fcell); //["cellid"]
                ////////                }
                //                if (thecell != undefined) {
                //                    console.log(thecell);
                //                }

                //                //添加基站 
                //                var bspoint = new ol.Feature(new ol.geom.Point([result[i].Lon, result[i].Lat]));
                //                bspoint["type"] = "bs";
                //                bspoint["BSID"]=result[i].BSID;
                //                bspoint["BSNO"]=result[i].BSNO;
                //                bspoint["BSName"]=result[i].BSName;
                //                bspoint["Contact"]=result[i].Contact;
                //                bspoint["Range"]=result[i].Range;
                //                bssource.addFeature(bspoint);

                //                //添加基站范围
                //                var circle4326 = ol.geom.Polygon.circular(wgs84Sphere, [result[i].Lon, result[i].Lat], result[i].Range, 64);
                //                var bsrange = new ol.Feature(circle4326);
                //                //var circle3857 = circle4326.clone().transform('EPSG:4326', 'EPSG:3857');
                //                bsrange["type"] = "bsrange";
                //                bsrange["BSID"] = result[i].BSID;
                //                bsrange["BSNO"] = result[i].BSNO;
                //                bsrange["BSName"] = result[i].BSName;
                //                bsrange["Contact"] = result[i].Contact;
                //                bsrange["Range"] = result[i].Range;
                //                bsrangesource.addFeature(bsrange);

            }
        }
        //alert("ok");
    },
    error: function (err) {     //  出错s
        console.log(err);
    }
});

getCell = function (pt) {
    smallsource.forEachFeature(function (feature) {
        var gp = feature.getGeometry();
        gp.applyTransform(ol.proj.getTransform('EPSG:3857', 'EPSG:4326'))
        if (gp.intersectsCoordinate(pt)) {
            return feature;
        }
    });
    return null;
}
////添加船舶 
//var pointFeature = new  ol.Feature(new ol.geom.Point([0,0]));
//shipsource.addFeature(pointFeature);



////添加基站 
//var bcpoint = new ol.Feature(new ol.geom.Point([5, 5]));
//bssource.addFeature(bcpoint);

//基站范围 半径是米
//var circle = new ol.geom.Circle(ol.proj.transform([0, 0], 'EPSG:4326',
//'EPSG:3857'), 1000);
//bssource.addFeature(circle);



//var x, y;
//for (x = -180; x < 180; x += 30) {
//    for (y = -90; y < 90; y += 30) {
//        var circle4326 = ol.geom.Polygon.circular(wgs84Sphere, [x, y], radius, 64);
//        //var circle3857 = circle4326.clone().transform('EPSG:4326', 'EPSG:3857');
//        bssource.addFeature(new ol.Feature(circle4326));
//        //vectorLayer3857.getSource().addFeature(new ol.Feature(circle3857));
//    }
//}

////调用数据库加载船舶 定时刷新
//setInterval(function () {
//    $.ajax({
//        type: "get",
//        //contentType: "application/json",
//        url: "./data.ashx?t=ships",
//        //data: "{}",  //这里是要传递的参数，格式为 data: "{paraName:paraValue}",下面将会看到       
//        dataType: 'json',   //WebService 会返回Json类型
//        success: function (result) {     //回调函数，result，返回值
//            shipsource.clear();
//            if (result.length > 0) {
//                for (var i = 0; i < result.length; i++) {
//                    //添加基站 
//                    var shippoint = new ol.Feature(new ol.geom.Point([result[i].Lon, result[i].Lat]));
//                    shippoint["type"] = "ship";
//                    shippoint["ShipID"] = result[i].ShipID;
//                    shippoint["ShipNO"] = result[i].ShipNO;
//                    shippoint["ShipName"] = result[i].ShipName;
//                    shippoint["Owner"] = result[i].Owner;
//                    shippoint["OwnerCompany"] = result[i].OwnerCompany;
//                    shippoint["Contact"] = result[i].Contact;

//                    shippoint["Lon"] = result[i].Lon;
//                    shippoint["Lat"] = result[i].Lat;
//                    shippoint["Lon0"] = result[i].Lon0;
//                    shippoint["Lat0"] = result[i].Lat0;

////                    var angle = getAngle(result[i].Lon0, result[i].Lat0, result[i].Lon, result[i].Lat);
////                    var shipstyle = new ol.style.Style({
////                        image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
////                            anchor: [0.5, 46],
////                            anchorXUnits: 'fraction',
////                            anchorYUnits: 'pixels',
////                            opacity: 0.95,
////                            rotation:angle,
////                            src: './img/ship.png'
////                        }))
//////                        , text: function (feature) {
//////                          txtstyle.setText("测试") //txtstyle.setText("测试")labelStyle.getText().setText(feature.get('name'));
//////                          return txtstyle;
//////                        } //shippoint["ShipNO"]+"-"+shippoint["ShipName"]
////                    });
////                    
////                    //shipstyle.setRotation(angle); // 旋转
////                    shippoint.setStyle(shipstyle);
//                    shipsource.addFeature(shippoint);


//                }
//            }
//        },
//        error: function (err) {     //  出错s
//            console.log(err);
//        }
//    });
//}, 3000);

//var wgs84Sphere = new ol.Sphere(6378137);


////调用数据库加载基站和范围
//$.ajax({
//    type: "get",
//    //contentType: "application/json",
//    url: "./data.ashx?t=bs",
//    //data: "{}",  //这里是要传递的参数，格式为 data: "{paraName:paraValue}",下面将会看到       
//    dataType: 'json',   //WebService 会返回Json类型
//    success: function (result) {     //回调函数，result，返回值
//        if (result.length > 0) {
//            for (var i = 0; i < result.length; i++) {
//                //添加基站 
//                var bspoint = new ol.Feature(new ol.geom.Point([result[i].Lon, result[i].Lat]));
//                bspoint["type"] = "bs";
//                bspoint["BSID"]=result[i].BSID;
//                bspoint["BSNO"]=result[i].BSNO;
//                bspoint["BSName"]=result[i].BSName;
//                bspoint["Contact"]=result[i].Contact;
//                bspoint["Range"]=result[i].Range;
//                bssource.addFeature(bspoint);

//                //添加基站范围
//                var circle4326 = ol.geom.Polygon.circular(wgs84Sphere, [result[i].Lon, result[i].Lat], result[i].Range, 64);
//                var bsrange = new ol.Feature(circle4326);
//                //var circle3857 = circle4326.clone().transform('EPSG:4326', 'EPSG:3857');
//                bsrange["type"] = "bsrange";
//                bsrange["BSID"] = result[i].BSID;
//                bsrange["BSNO"] = result[i].BSNO;
//                bsrange["BSName"] = result[i].BSName;
//                bsrange["Contact"] = result[i].Contact;
//                bsrange["Range"] = result[i].Range;
//                bsrangesource.addFeature(bsrange);

//            }
//        }
//    },
//    error: function (err) {     //  出错s
//        console.log(err);
//    }
//});

//function showinfo(title,info) {
//    layer.alert(info, {
//        skin: 'layui-layer-lan'
//    , closeBtn: 1
//    , title: title
//    , anim: 4 //动画类型
//    });
//}

//var select = new ol.interaction.Select({
//    condition: ol.events.condition.click
//});

//map.addInteraction(select);
//select.on('select', function (e) {
//    if (e.selected[0]["type"] == 'ship') {
//        var bsname = getBSName(e.selected[0]);
//        var info = "编号:" + e.selected[0]["ShipNO"] + "<br>" +
//        "船名:" + e.selected[0]["ShipName"] + "<br>" +
//        "所有者:" + e.selected[0]["Owner"] + "<br>" +
//        "所属公司:" + e.selected[0]["OwnerCompany"] + "<br>" +
//        "联系方式:" + e.selected[0]["Contact"] + "<br>" +
//        "归属基站:" + bsname;
//        showinfo('船舶信息', info);
//    }
//    else if (e.selected[0]["type"] == 'bs' ) {
//        var info = "编号:" + e.selected[0]["BSNO"] + "<br>" +
//        "基站名称:" + e.selected[0]["BSName"] + "<br>" +
//        "联系方式:" + e.selected[0]["Contact"] + "<br>" +
//        "辐射范围:" + e.selected[0]["Range"] + " 米<br>";
//        showinfo('基站信息', info);
//    }
//    else {
//        //showinfo(e.selected[0]["type"]);
//    }
//    //console.log(e.target.getFeatures());

//});

////查找基站船舶所属基站名称
//function getBSName(shipfeature) {
//    var extent = shipfeature.getGeometry().getExtent();
//    var bfind = false;
//    var bsname="暂无"
//    bsrangesource.forEachFeatureIntersectingExtent(extent, function (feature) {
//        bfind = true;
//        bsname=feature["BSName"];
//    });
//    return bsname;
//}


//function getAngle(start, end) {
//    var diff_x = end.x - start.x,
//        diff_y = end.y - start.y;
//    //返回角度,不是弧度
//    return Math.atan(diff_y / diff_x); //  360 * Math.atan(diff_y / diff_x) / (2 * Math.PI);
//}

////function getAngle(x1, y1, x2, y2) {
////    var lengthAB = Math.sqrt(Math.pow(x2 - x1, 2) +
////                Math.pow(y1 - y1, 2)),
////    lengthAC = Math.sqrt(Math.pow(x2 - x2, 2) +
////                Math.pow(y1- y2, 2)),
////    lengthBC = Math.sqrt(Math.pow(x1 - x2, 2) +
////                Math.pow(y1 - y2, 2));
////    var cosA = (Math.pow(lengthAB, 2) + Math.pow(lengthAC, 2) - Math.pow(lengthBC, 2)) /
////                (2 * lengthAB * lengthAC);
////    return Math.round(Math.acos(cosA) * 180 / Math.PI);  
////}

//function getAngle(x1,y1,x2,y2) {
//    var diff_x = x2 - x1,
//        diff_y = y2 - y1;
//    //返回角度,不是弧度
//    var angle = 360 * Math.atan(diff_y / diff_x) / (2 * Math.PI);
////    if (angle > 90 && angle <= 180) {
////        angle= 180 - angle;
////    }
////    else if(angle>180 && angle<270)
////    {
////        angle= angle-180;
////    }
////    else if(angle>=270)
////    {
////        angle= 360-angle;
////    }
////    else
////    {
////        angle= angle;
////    }
//    return 0 - Math.PI * angle/180;

//}

////
//function getAngle2(px, py, mx, my) {//获得人物中心和鼠标坐标连线，与y轴正半轴之间的夹角
//    var x = Math.abs(px - mx);
//    var y = Math.abs(py - my);
//    var z = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
//    var cos = y / z;
//    var radina = Math.acos(cos); //用反三角函数求弧度
//    var angle = Math.floor(180 / (Math.PI / radina)); //将弧度转换成角度

//    if (mx > px && my > py) {//鼠标在第四象限
//        angle = 180 - angle;
//    }

//    if (mx == px && my > py) {//鼠标在y轴负方向上
//        angle = 180;
//    }

//    if (mx > px && my == py) {//鼠标在x轴正方向上
//        angle = 90;
//    }

//    if (mx < px && my > py) {//鼠标在第三象限
//        angle = 180 + angle;
//    }

//    if (mx < px && my == py) {//鼠标在x轴负方向
//        angle = 270;
//    }

//    if (mx < px && my < py) {//鼠标在第二象限
//        angle = 360 - angle;
//    }



//    return angle;
//}