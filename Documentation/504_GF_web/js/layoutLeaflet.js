
var map;
var zoomify;
var panoWin;

function initializeMap()
{	

	var map_rows = 37096.0000000000000000;
	var map_cols = 31380.0000000000000000;
	var map_maxZoom = 8;
	var map_path = 'sections/section_1';
	var map_resolutionX = 0.0050000000000000;
	var map_resolutionY = 0.0050000000000000;
	var map_name = 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001_Standard_Top';
	var map_TopX = -115.3149999999999977;
	var map_TopY = 55.1100000000000136;
	var map_coordPrefix = "xy[m] ";	

    // Custom CRS
    L.CRS.PointCab = L.extend({}, L.CRS, {
		projection: L.extend( L.Projection.LonLat, {
		        bounds: L.bounds([0, 0], [map_cols, map_rows])
		    }),
        projection: L.Projection.LonLat,
        transformation: new L.Transformation(1, 0, 1, 0),
        scale: function (zoom) {
            return Math.pow(2, zoom - map_maxZoom);
        },		
		
		adjust: {
            x: map_TopX,
            y: map_TopY,
            scale: {
                x: map_resolutionX,
                y: map_resolutionY,
            }
        },
        latLngToPoint: function(latlng, zoom) {
            var adjlatlng = L.latLng((latlng.lat-this.adjust.y)/this.adjust.scale.y, (latlng.lng-this.adjust.x)/this.adjust.scale.x);
            return L.CRS.Simple.latLngToPoint(adjlatlng, zoom - map_maxZoom);
        },
        pointToLatLng: function(point, zoom) {
            var latlng = L.CRS.Simple.pointToLatLng(point, zoom-map_maxZoom);
            latlng.lng = (latlng.lng*this.adjust.scale.x)+this.adjust.x;
            latlng.lat = (latlng.lat*this.adjust.scale.y)+this.adjust.y;
            return latlng;
        },
    });

	// init the tile map
	map = L.map('sectionmap', {
		crs: L.CRS.PointCab,
		fullscreenControl: true, // enable fullscreen plugin
		});	
				
	var layer = L.tileLayer('./' + map_path + '/{z}/{x}/{y}.png',
	{		
		tileSize: 256,
		minZoom: 1,
		maxZoom: map_maxZoom + 5,
		maxNativeZoom: map_maxZoom,
		noWrap: true,
		crs: L.CRS.PointCab,
        continuousWorld: true,	
		attributionControl: false,
		attribution: map_name,
	}).addTo(map);
		
	var southWest = map.unproject([0, map_rows], map_maxZoom);
	var northEast = map.unproject([map_cols, 0], map_maxZoom);
	map.setMaxBounds(new L.LatLngBounds(southWest, northEast));
	
	map.setView([map_cols/4, map_rows/4], 1);
	
	var mousePos = new L.control.mousePosition(
	{
		position: 'topright',
		lngFirst: true,
		numDigits: 4,
		emptystring: "Coordinate",
		prefix: map_coordPrefix,
	});
	mousePos.addTo(map);
	
	var measureArea = new L.Control.Measure(
	{
		position: 'bottomleft',
		primaryLengthUnit: 'meters',
		secondaryLengthUnit: undefined,
		primaryAreaUnit: 'sqmeters',
		secondaryAreaUnit: undefined,
		activeColor: '#FF0000',
		completedColor: '#FF0000',
		localization: 'en'
	});	
	measureArea.addTo(map);	
var startPoint = L.icon({ iconUrl: './img/startPoint.png', iconSize: [13, 13], iconAnchor: [6, 6]});	
	// all scan markers
	var marker1 = L.icon({ iconUrl: './img/marker1.png', iconSize: [13, 13], iconAnchor: [6, 6]});
	var marker2 = L.icon({ iconUrl: './img/marker2.png', iconSize: [13, 13], iconAnchor: [6, 6]});
	var marker3 = L.icon({ iconUrl: './img/marker3.png', iconSize: [13, 13], iconAnchor: [6, 6]});
	var marker4 = L.icon({ iconUrl: './img/marker4.png', iconSize: [13, 13], iconAnchor: [6, 6]});
	var marker5 = L.icon({ iconUrl: './img/marker5.png', iconSize: [13, 13], iconAnchor: [6, 6]});
	var marker6 = L.icon({ iconUrl: './img/marker6.png', iconSize: [13, 13], iconAnchor: [6, 6]});
	var marker7 = L.icon({ iconUrl: './img/marker7.png', iconSize: [13, 13], iconAnchor: [6, 6]});
	var marker8 = L.icon({ iconUrl: './img/marker8.png', iconSize: [13, 13], iconAnchor: [6, 6]});
	var marker9 = L.icon({ iconUrl: './img/marker9.png', iconSize: [13, 13], iconAnchor: [6, 6]});
	var marker10 = L.icon({ iconUrl: './img/marker10.png', iconSize: [13, 13], iconAnchor: [6, 6]});
	var marker11 = L.icon({ iconUrl: './img/marker11.png', iconSize: [13, 13], iconAnchor: [6, 6]});
	var marker12 = L.icon({ iconUrl: './img/marker12.png', iconSize: [13, 13], iconAnchor: [6, 6]});
		
	var scan108 = L.marker([-40.5317,-67.0660],{icon: marker4, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-197 - Z=-62.883 [m]'}).on('click', function(e){OpenPano(108);}).addTo(map);
	var scan180 = L.marker([-18.4362,-8.8251],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-62 - Z=-62.483 [m]'}).on('click', function(e){OpenPano(180);}).addTo(map);
	var scan118 = L.marker([-14.3512,-34.1691],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-206 - Z=-62.479 [m]'}).on('click', function(e){OpenPano(118);}).addTo(map);
	var scan77 = L.marker([1.1487,-14.4949],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-169 - Z=-62.558 [m]'}).on('click', function(e){OpenPano(77);}).addTo(map);
	var scan219 = L.marker([21.5107,13.9711],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-98 - Z=-62.676 [m]'}).on('click', function(e){OpenPano(219);}).addTo(map);
	var scan71 = L.marker([-35.9588,-64.9482],{icon: marker4, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-163 - Z=-62.930 [m]'}).on('click', function(e){OpenPano(71);}).addTo(map);
	var scan190 = L.marker([-8.1008,-10.8386],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-71 - Z=-62.457 [m]'}).on('click', function(e){OpenPano(190);}).addTo(map);
	var scan140 = L.marker([-78.6028,-47.3890],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-26 - Z=-62.525 [m]'}).on('click', function(e){OpenPano(140);}).addTo(map);
	var scan177 = L.marker([-6.4952,-14.2947],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-6 - Z=-62.455 [m]'}).on('click', function(e){OpenPano(177);}).addTo(map);
	var scan192 = L.marker([-3.9185,-18.4769],{icon: marker1, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-73 - Z=-65.023 [m]'}).on('click', function(e){OpenPano(192);}).addTo(map);
	var scan120 = L.marker([-15.2066,-19.6258],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-208 - Z=-62.501 [m]'}).on('click', function(e){OpenPano(120);}).addTo(map);
	var scan104 = L.marker([-45.6861,-67.1282],{icon: marker4, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-193 - Z=-62.882 [m]'}).on('click', function(e){OpenPano(104);}).addTo(map);
	var scan136 = L.marker([-84.8382,-78.3587],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-222 - Z=-62.548 [m]'}).on('click', function(e){OpenPano(136);}).addTo(map);
	var scan134 = L.marker([-88.5729,-87.6526],{icon: marker4, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-220 - Z=-62.819 [m]'}).on('click', function(e){OpenPano(134);}).addTo(map);
	var scan12 = L.marker([-79.5814,-52.1738],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-11 - Z=-62.593 [m]'}).on('click', function(e){OpenPano(12);}).addTo(map);
	var scan46 = L.marker([-65.7969,-35.8114],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-140 - Z=-62.641 [m]'}).on('click', function(e){OpenPano(46);}).addTo(map);
	var scan194 = L.marker([-7.3910,-6.0321],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-75 - Z=-62.454 [m]'}).on('click', function(e){OpenPano(194);}).addTo(map);
	var scan99 = L.marker([-37.6303,-20.3745],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-189 - Z=-62.513 [m]'}).on('click', function(e){OpenPano(99);}).addTo(map);
	var scan119 = L.marker([-12.6005,-23.8742],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-207 - Z=-62.435 [m]'}).on('click', function(e){OpenPano(119);}).addTo(map);
	var scan164 = L.marker([-33.3901,-25.1315],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-48 - Z=-62.573 [m]'}).on('click', function(e){OpenPano(164);}).addTo(map);
	var scan191 = L.marker([-6.7681,-13.6188],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-72 - Z=-62.449 [m]'}).on('click', function(e){OpenPano(191);}).addTo(map);
	var scan168 = L.marker([-41.1822,-30.1147],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-51 - Z=-62.569 [m]'}).on('click', function(e){OpenPano(168);}).addTo(map);
	var scan18 = L.marker([-92.5096,-63.1718],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-115 - Z=-62.526 [m]'}).on('click', function(e){OpenPano(18);}).addTo(map);
	var scan43 = L.marker([-55.6384,-28.5599],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-138 - Z=-62.645 [m]'}).on('click', function(e){OpenPano(43);}).addTo(map);
	var scan24 = L.marker([-18.8790,-30.5891],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-120 - Z=-62.526 [m]'}).on('click', function(e){OpenPano(24);}).addTo(map);
	var scan195 = L.marker([-8.7149,-3.5050],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-76 - Z=-62.453 [m]'}).on('click', function(e){OpenPano(195);}).addTo(map);
	var scan31 = L.marker([-24.8878,-18.6013],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-127 - Z=-62.451 [m]'}).on('click', function(e){OpenPano(31);}).addTo(map);
	var scan8 = L.marker([-29.0488,-31.9998],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-106 - Z=-62.552 [m]'}).on('click', function(e){OpenPano(8);}).addTo(map);
	var scan33 = L.marker([-57.3607,-52.9503],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-129 - Z=-62.612 [m]'}).on('click', function(e){OpenPano(33);}).addTo(map);
	var scan56 = L.marker([-74.9340,-59.6765],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-15 - Z=-62.574 [m]'}).on('click', function(e){OpenPano(56);}).addTo(map);
	var scan213 = L.marker([16.8554,-1.8870],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-92 - Z=-62.690 [m]'}).on('click', function(e){OpenPano(213);}).addTo(map);
	var scan142 = L.marker([-80.3219,-46.2553],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-28 - Z=-62.518 [m]'}).on('click', function(e){OpenPano(142);}).addTo(map);
	var scan34 = L.marker([-76.2775,-56.7243],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-13 - Z=-62.579 [m]'}).on('click', function(e){OpenPano(34);}).addTo(map);
	var scan149 = L.marker([-72.8852,-58.6667],{icon: marker1, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-34 - Z=-65.029 [m]'}).on('click', function(e){OpenPano(149);}).addTo(map);
	var scan152 = L.marker([-71.4056,-54.4704],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-37 - Z=-62.462 [m]'}).on('click', function(e){OpenPano(152);}).addTo(map);
	var scan111 = L.marker([-6.6415,-14.1753],{icon: marker9, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-2 - Z=-59.850 [m]'}).on('click', function(e){OpenPano(111);}).addTo(map);
	var scan69 = L.marker([-34.1503,-62.3045],{icon: marker4, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-161 - Z=-62.930 [m]'}).on('click', function(e){OpenPano(69);}).addTo(map);
	var scan2 = L.marker([12.6504,8.3832],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-100 - Z=-62.690 [m]'}).on('click', function(e){OpenPano(2);}).addTo(map);
	var scan174 = L.marker([-18.0900,-19.7501],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-57 - Z=-62.539 [m]'}).on('click', function(e){OpenPano(174);}).addTo(map);
	var scan25 = L.marker([-19.9939,-28.6048],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-121 - Z=-62.530 [m]'}).on('click', function(e){OpenPano(25);}).addTo(map);
	var scan144 = L.marker([-5.3244,-13.6544],{icon: marker9, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-3 - Z=-59.850 [m]'}).on('click', function(e){OpenPano(144);}).addTo(map);
	var scan79 = L.marker([-10.2412,-7.7845],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-170 - Z=-62.480 [m]'}).on('click', function(e){OpenPano(79);}).addTo(map);
	var scan169 = L.marker([-38.9195,-33.4004],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-52 - Z=-62.562 [m]'}).on('click', function(e){OpenPano(169);}).addTo(map);
	var scan97 = L.marker([-32.3532,-20.7369],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-187 - Z=-62.505 [m]'}).on('click', function(e){OpenPano(97);}).addTo(map);
	var scan127 = L.marker([-83.9653,-91.0875],{icon: marker4, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-214 - Z=-62.864 [m]'}).on('click', function(e){OpenPano(127);}).addTo(map);
	var scan39 = L.marker([-47.1422,-40.4954],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-134 - Z=-62.651 [m]'}).on('click', function(e){OpenPano(39);}).addTo(map);
	var scan132 = L.marker([-92.5709,-85.1585],{icon: marker4, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-219 - Z=-62.827 [m]'}).on('click', function(e){OpenPano(132);}).addTo(map);
	var scan38 = L.marker([-50.8264,-43.2482],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-133 - Z=-62.667 [m]'}).on('click', function(e){OpenPano(38);}).addTo(map);
	var scan19 = L.marker([-96.5019,-65.5827],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-116 - Z=-62.526 [m]'}).on('click', function(e){OpenPano(19);}).addTo(map);
	var scan173 = L.marker([-16.0775,-23.3107],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-56 - Z=-62.538 [m]'}).on('click', function(e){OpenPano(173);}).addTo(map);
	var scan53 = L.marker([-108.6536,-61.5334],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-147 - Z=-62.551 [m]'}).on('click', function(e){OpenPano(53);}).addTo(map);
	var scan72 = L.marker([-24.9530,-57.1976],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-164 - Z=-62.620 [m]'}).on('click', function(e){OpenPano(72);}).addTo(map);
	var scan198 = L.marker([-11.6077,-2.0188],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-79 - Z=-62.458 [m]'}).on('click', function(e){OpenPano(198);}).addTo(map);
	var scan109 = L.marker([-40.3950,-71.5808],{icon: marker4, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-198 - Z=-62.877 [m]'}).on('click', function(e){OpenPano(109);}).addTo(map);
	var scan3 = L.marker([24.4124,5.7492],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-101 - Z=-62.674 [m]'}).on('click', function(e){OpenPano(3);}).addTo(map);
	var scan139 = L.marker([-79.0450,-41.2060],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-25 - Z=-62.520 [m]'}).on('click', function(e){OpenPano(139);}).addTo(map);
	var scan93 = L.marker([-76.4048,-73.9164],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-183 - Z=-62.476 [m]'}).on('click', function(e){OpenPano(93);}).addTo(map);
	var scan17 = L.marker([-89.7131,-68.0853],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-114 - Z=-62.521 [m]'}).on('click', function(e){OpenPano(17);}).addTo(map);
	var scan106 = L.marker([-41.1117,-64.4351],{icon: marker4, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-195 - Z=-62.893 [m]'}).on('click', function(e){OpenPano(106);}).addTo(map);
	var scan11 = L.marker([-72.2434,-61.2496],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-109 - Z=-62.437 [m]'}).on('click', function(e){OpenPano(11);}).addTo(map);
	var scan181 = L.marker([-16.5165,-11.8273],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-63 - Z=-62.512 [m]'}).on('click', function(e){OpenPano(181);}).addTo(map);
	var scan60 = L.marker([-99.5877,-64.1987],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-153 - Z=-62.541 [m]'}).on('click', function(e){OpenPano(60);}).addTo(map);
	var scan146 = L.marker([-79.0671,-43.6747],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-31 - Z=-62.479 [m]'}).on('click', function(e){OpenPano(146);}).addTo(map);
	var scan75 = L.marker([-2.7642,-13.5517],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-167 - Z=-62.553 [m]'}).on('click', function(e){OpenPano(75);}).addTo(map);
	var scan147 = L.marker([-76.8025,-50.7211],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-32 - Z=-62.466 [m]'}).on('click', function(e){OpenPano(147);}).addTo(map);
	var scan199 = L.marker([-3.1222,-18.3798],{icon: marker1, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-8 - Z=-65.034 [m]'}).on('click', function(e){OpenPano(199);}).addTo(map);
	var scan6 = L.marker([5.4846,4.3020],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-104 - Z=-62.681 [m]'}).on('click', function(e){OpenPano(6);}).addTo(map);
	var scan7 = L.marker([2.5563,2.6906],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-105 - Z=-62.582 [m]'}).on('click', function(e){OpenPano(7);}).addTo(map);
	var scan156 = L.marker([-70.1774,-40.0315],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-40 - Z=-62.471 [m]'}).on('click', function(e){OpenPano(156);}).addTo(map);
	var scan74 = L.marker([-23.7234,-60.8979],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-166 - Z=-62.691 [m]'}).on('click', function(e){OpenPano(74);}).addTo(map);
	var scan35 = L.marker([-58.7547,-50.3602],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-130 - Z=-62.703 [m]'}).on('click', function(e){OpenPano(35);}).addTo(map);
	var scan163 = L.marker([-36.2233,-26.8948],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-47 - Z=-62.571 [m]'}).on('click', function(e){OpenPano(163);}).addTo(map);
	var scan157 = L.marker([-67.8103,-43.9928],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-41 - Z=-62.475 [m]'}).on('click', function(e){OpenPano(157);}).addTo(map);
	var scan196 = L.marker([-7.9188,-0.8465],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-77 - Z=-62.453 [m]'}).on('click', function(e){OpenPano(196);}).addTo(map);
	var scan204 = L.marker([-1.5901,-16.8896],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-84 - Z=-62.460 [m]'}).on('click', function(e){OpenPano(204);}).addTo(map);
	var scan102 = L.marker([-41.3699,-22.4663],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-191 - Z=-62.506 [m]'}).on('click', function(e){OpenPano(102);}).addTo(map);
	var scan81 = L.marker([-10.1439,-5.7870],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-172 - Z=-62.478 [m]'}).on('click', function(e){OpenPano(81);}).addTo(map);
	var scan125 = L.marker([-78.1771,-93.6154],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-212 - Z=-62.697 [m]'}).on('click', function(e){OpenPano(125);}).addTo(map);
	var scan209 = L.marker([16.6179,-7.8614],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-89 - Z=-62.683 [m]'}).on('click', function(e){OpenPano(209);}).addTo(map);
	var scan94 = L.marker([-53.0679,-60.4074],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-184 - Z=-62.586 [m]'}).on('click', function(e){OpenPano(94);}).addTo(map);
	var scan122 = L.marker([-85.0088,-48.1691],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-21 - Z=-62.582 [m]'}).on('click', function(e){OpenPano(122);}).addTo(map);
	var scan188 = L.marker([-5.2868,-13.3244],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-7 - Z=-62.451 [m]'}).on('click', function(e){OpenPano(188);}).addTo(map);
	var scan148 = L.marker([-75.1403,-53.4420],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-33 - Z=-62.453 [m]'}).on('click', function(e){OpenPano(148);}).addTo(map);
	var scan28 = L.marker([-30.4412,-26.0711],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-124 - Z=-62.446 [m]'}).on('click', function(e){OpenPano(28);}).addTo(map);
	var scan36 = L.marker([-59.0659,-47.0047],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-131 - Z=-62.721 [m]'}).on('click', function(e){OpenPano(36);}).addTo(map);
	var scan159 = L.marker([-63.5494,-51.6069],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-43 - Z=-62.516 [m]'}).on('click', function(e){OpenPano(159);}).addTo(map);
	var scan13 = L.marker([-73.4077,-58.9058],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-110 - Z=-62.428 [m]'}).on('click', function(e){OpenPano(13);}).addTo(map);
	var scan151 = L.marker([-72.7176,-52.3680],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-36 - Z=-62.460 [m]'}).on('click', function(e){OpenPano(151);}).addTo(map);
	var scan68 = L.marker([-35.4032,-59.9353],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-160 - Z=-62.543 [m]'}).on('click', function(e){OpenPano(68);}).addTo(map);
	var scan20 = L.marker([-99.3569,-60.6866],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-117 - Z=-62.525 [m]'}).on('click', function(e){OpenPano(20);}).addTo(map);
	var scan211 = L.marker([15.3801,-5.2807],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-90 - Z=-62.691 [m]'}).on('click', function(e){OpenPano(211);}).addTo(map);
	var scan105 = L.marker([-43.3895,-66.3162],{icon: marker4, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-194 - Z=-62.883 [m]'}).on('click', function(e){OpenPano(105);}).addTo(map);
	var scan40 = L.marker([-46.5302,-36.2749],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-135 - Z=-62.661 [m]'}).on('click', function(e){OpenPano(40);}).addTo(map);
	var scan143 = L.marker([-76.1468,-46.9044],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-29 - Z=-62.519 [m]'}).on('click', function(e){OpenPano(143);}).addTo(map);
	var scan179 = L.marker([-22.6051,-11.3656],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-61 - Z=-62.512 [m]'}).on('click', function(e){OpenPano(179);}).addTo(map);
	var scan116 = L.marker([-31.5963,-40.3671],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-204 - Z=-62.443 [m]'}).on('click', function(e){OpenPano(116);}).addTo(map);
	var scan101 = L.marker([-37.9225,-16.4166],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-190 - Z=-62.510 [m]'}).on('click', function(e){OpenPano(101);}).addTo(map);
	var scan165 = L.marker([-32.6454,-26.4940],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-49 - Z=-62.574 [m]'}).on('click', function(e){OpenPano(165);}).addTo(map);
	var scan170 = L.marker([-35.9185,-37.7123],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-53 - Z=-62.557 [m]'}).on('click', function(e){OpenPano(170);}).addTo(map);
	var scan189 = L.marker([-7.5158,-17.5721],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-70 - Z=-62.444 [m]'}).on('click', function(e){OpenPano(189);}).addTo(map);
	var scan130 = L.marker([-90.3897,-78.1130],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-217 - Z=-62.436 [m]'}).on('click', function(e){OpenPano(130);}).addTo(map);
	var scan83 = L.marker([-12.1987,-10.1652],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-174 - Z=-62.477 [m]'}).on('click', function(e){OpenPano(83);}).addTo(map);
	var scan208 = L.marker([17.4146,-9.3993],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-88 - Z=-62.599 [m]'}).on('click', function(e){OpenPano(208);}).addTo(map);
	var scan212 = L.marker([12.0052,-4.8482],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-91 - Z=-62.688 [m]'}).on('click', function(e){OpenPano(212);}).addTo(map);
	var scan117 = L.marker([-25.5557,-40.1238],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-205 - Z=-62.463 [m]'}).on('click', function(e){OpenPano(117);}).addTo(map);
	var scan37 = L.marker([-54.9035,-45.3514],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-132 - Z=-62.657 [m]'}).on('click', function(e){OpenPano(37);}).addTo(map);
	var scan9 = L.marker([-27.2425,-35.0395],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-107 - Z=-62.552 [m]'}).on('click', function(e){OpenPano(9);}).addTo(map);
	var scan21 = L.marker([-95.7603,-58.6744],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-118 - Z=-62.524 [m]'}).on('click', function(e){OpenPano(21);}).addTo(map);
	var scan90 = L.marker([-90.5927,-50.3485],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-180 - Z=-62.442 [m]'}).on('click', function(e){OpenPano(90);}).addTo(map);
	var scan61 = L.marker([-96.4221,-69.5744],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-154 - Z=-62.548 [m]'}).on('click', function(e){OpenPano(61);}).addTo(map);
	var scan73 = L.marker([-23.6989,-59.3227],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-165 - Z=-62.689 [m]'}).on('click', function(e){OpenPano(73);}).addTo(map);
	var scan82 = L.marker([-12.5146,-9.0484],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-173 - Z=-62.482 [m]'}).on('click', function(e){OpenPano(82);}).addTo(map);
	var scan128 = L.marker([-82.6327,-87.4077],{icon: marker4, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-215 - Z=-62.859 [m]'}).on('click', function(e){OpenPano(128);}).addTo(map);
	var scan65 = L.marker([-64.6078,-83.9480],{icon: marker4, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-158 - Z=-62.829 [m]'}).on('click', function(e){OpenPano(65);}).addTo(map);
	var scan5 = L.marker([23.6267,9.9546],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-103 - Z=-62.570 [m]'}).on('click', function(e){OpenPano(5);}).addTo(map);
	var scan135 = L.marker([-81.6024,-84.1566],{icon: marker4, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-221 - Z=-62.829 [m]'}).on('click', function(e){OpenPano(135);}).addTo(map);
	var scan64 = L.marker([-65.7326,-79.2794],{icon: marker4, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-157 - Z=-62.834 [m]'}).on('click', function(e){OpenPano(64);}).addTo(map);
	var scan123 = L.marker([-12.6233,-23.9854],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-210 - Z=-62.505 [m]'}).on('click', function(e){OpenPano(123);}).addTo(map);
	var scan206 = L.marker([-0.8515,-6.7360],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-86 - Z=-62.463 [m]'}).on('click', function(e){OpenPano(206);}).addTo(map);
	var scan126 = L.marker([-81.5252,-88.2688],{icon: marker4, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-213 - Z=-62.858 [m]'}).on('click', function(e){OpenPano(126);}).addTo(map);
	var scan186 = L.marker([-10.6442,-12.2739],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-68 - Z=-62.452 [m]'}).on('click', function(e){OpenPano(186);}).addTo(map);
	var scan88 = L.marker([-94.5195,-53.6533],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-179 - Z=-62.442 [m]'}).on('click', function(e){OpenPano(88);}).addTo(map);
	var scan86 = L.marker([-88.8177,-64.3201],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-177 - Z=-62.437 [m]'}).on('click', function(e){OpenPano(86);}).addTo(map);
	var scan84 = L.marker([-13.3406,-6.6252],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-175 - Z=-62.484 [m]'}).on('click', function(e){OpenPano(84);}).addTo(map);
	var scan113 = L.marker([-64.8202,-55.1648],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-201 - Z=-62.481 [m]'}).on('click', function(e){OpenPano(113);}).addTo(map);
	var scan176 = L.marker([-20.3458,-15.3579],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-59 - Z=-62.534 [m]'}).on('click', function(e){OpenPano(176);}).addTo(map);
	var scan112 = L.marker([-59.4012,-64.1685],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-200 - Z=-62.523 [m]'}).on('click', function(e){OpenPano(112);}).addTo(map);
	var scan182 = L.marker([-14.7421,-14.5015],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-64 - Z=-62.532 [m]'}).on('click', function(e){OpenPano(182);}).addTo(map);
	var scan27 = L.marker([-24.6884,-29.1827],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-123 - Z=-62.443 [m]'}).on('click', function(e){OpenPano(27);}).addTo(map);
	var scan124 = L.marker([-76.4324,-95.7601],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-211 - Z=-62.574 [m]'}).on('click', function(e){OpenPano(124);}).addTo(map);
	var scan89 = L.marker([-79.9435,-63.0722],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-18 - Z=-62.567 [m]'}).on('click', function(e){OpenPano(89);}).addTo(map);
	var scan121 = L.marker([-13.9832,-21.7046],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-209 - Z=-62.499 [m]'}).on('click', function(e){OpenPano(121);}).addTo(map);
	var scan133 = L.marker([-84.6296,-43.8225],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-22 - Z=-62.586 [m]'}).on('click', function(e){OpenPano(133);}).addTo(map);
	var scan215 = L.marker([24.7546,2.0193],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-94 - Z=-62.688 [m]'}).on('click', function(e){OpenPano(215);}).addTo(map);
	var scan171 = L.marker([-34.5116,-35.0498],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-54 - Z=-62.554 [m]'}).on('click', function(e){OpenPano(171);}).addTo(map);
	var scan193 = L.marker([-5.6432,-9.3318],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-74 - Z=-62.459 [m]'}).on('click', function(e){OpenPano(193);}).addTo(map);
	var scan185 = L.marker([-9.4577,-19.7925],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-67 - Z=-62.530 [m]'}).on('click', function(e){OpenPano(185);}).addTo(map);
	var scan80 = L.marker([-9.5165,-6.8562],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-171 - Z=-62.477 [m]'}).on('click', function(e){OpenPano(80);}).addTo(map);
	var scan66 = L.marker([-68.7967,-80.1017],{icon: marker4, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-159 - Z=-62.834 [m]'}).on('click', function(e){OpenPano(66);}).addTo(map);
	var scan4 = L.marker([26.2579,6.7879],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-102 - Z=-62.580 [m]'}).on('click', function(e){OpenPano(4);}).addTo(map);
	var scan201 = L.marker([-3.4980,-12.2217],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-81 - Z=-62.455 [m]'}).on('click', function(e){OpenPano(201);}).addTo(map);
	var scan26 = L.marker([-21.5364,-27.2941],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-122 - Z=-62.439 [m]'}).on('click', function(e){OpenPano(26);}).addTo(map);
	var scan59 = L.marker([-101.5553,-72.6077],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-152 - Z=-62.548 [m]'}).on('click', function(e){OpenPano(59);}).addTo(map);
	var scan145 = L.marker([-77.8714,-44.9110],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-30 - Z=-62.523 [m]'}).on('click', function(e){OpenPano(145);}).addTo(map);
	var scan44 = L.marker([-60.7981,-31.7155],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-139 - Z=-62.634 [m]'}).on('click', function(e){OpenPano(44);}).addTo(map);
	var scan47 = L.marker([-61.8425,-42.7075],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-141 - Z=-62.657 [m]'}).on('click', function(e){OpenPano(47);}).addTo(map);
	var scan54 = L.marker([-103.2697,-54.6996],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-148 - Z=-62.540 [m]'}).on('click', function(e){OpenPano(54);}).addTo(map);
	var scan23 = L.marker([-78.1141,-54.6744],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-12 - Z=-62.583 [m]'}).on('click', function(e){OpenPano(23);}).addTo(map);
	var scan172 = L.marker([-33.4524,-36.8429],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-55 - Z=-62.536 [m]'}).on('click', function(e){OpenPano(172);}).addTo(map);
	var scan95 = L.marker([-43.8934,-58.9198],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-185 - Z=-62.564 [m]'}).on('click', function(e){OpenPano(95);}).addTo(map);
	var scan220 = L.marker([20.0341,17.1851],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-99 - Z=-62.673 [m]'}).on('click', function(e){OpenPano(220);}).addTo(map);
	var scan0 = L.marker([-3.2726,-18.4243],{icon: startPoint, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-1 - Z=-57.953 [m]'}).on('click', function(e){OpenPano(0);}).addTo(map);
	var scan153 = L.marker([-70.9093,-47.1385],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-38 - Z=-62.467 [m]'}).on('click', function(e){OpenPano(153);}).addTo(map);
	var scan52 = L.marker([-114.2653,-65.4098],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-146 - Z=-62.541 [m]'}).on('click', function(e){OpenPano(52);}).addTo(map);
	var scan141 = L.marker([-79.6980,-47.5236],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-27 - Z=-62.518 [m]'}).on('click', function(e){OpenPano(141);}).addTo(map);
	var scan210 = L.marker([-83.9369,-54.6649],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-9 - Z=-62.558 [m]'}).on('click', function(e){OpenPano(210);}).addTo(map);
	var scan197 = L.marker([-5.1508,1.2164],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-78 - Z=-62.454 [m]'}).on('click', function(e){OpenPano(197);}).addTo(map);
	var scan100 = L.marker([-81.4176,-48.8006],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-19 - Z=-62.581 [m]'}).on('click', function(e){OpenPano(100);}).addTo(map);
	var scan98 = L.marker([-34.4359,-21.7607],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-188 - Z=-62.512 [m]'}).on('click', function(e){OpenPano(98);}).addTo(map);
	var scan58 = L.marker([-104.9104,-66.5091],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-151 - Z=-62.554 [m]'}).on('click', function(e){OpenPano(58);}).addTo(map);
	var scan162 = L.marker([-34.3714,-30.9649],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-46 - Z=-62.573 [m]'}).on('click', function(e){OpenPano(162);}).addTo(map);
	var scan107 = L.marker([-42.2642,-68.0464],{icon: marker4, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-196 - Z=-62.876 [m]'}).on('click', function(e){OpenPano(107);}).addTo(map);
	var scan10 = L.marker([-31.7632,-29.3341],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-108 - Z=-62.537 [m]'}).on('click', function(e){OpenPano(10);}).addTo(map);
	var scan183 = L.marker([-13.0843,-17.6574],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-65 - Z=-62.524 [m]'}).on('click', function(e){OpenPano(183);}).addTo(map);
	var scan218 = L.marker([17.1849,10.9569],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-97 - Z=-62.693 [m]'}).on('click', function(e){OpenPano(218);}).addTo(map);
	var scan166 = L.marker([-3.8108,-18.6664],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-5 - Z=-62.458 [m]'}).on('click', function(e){OpenPano(166);}).addTo(map);
	var scan175 = L.marker([-20.4005,-20.3087],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-58 - Z=-62.538 [m]'}).on('click', function(e){OpenPano(175);}).addTo(map);
	var scan63 = L.marker([-67.2627,-76.7287],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-156 - Z=-62.508 [m]'}).on('click', function(e){OpenPano(63);}).addTo(map);
	var scan41 = L.marker([-48.1366,-31.9011],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-136 - Z=-62.665 [m]'}).on('click', function(e){OpenPano(41);}).addTo(map);
	var scan155 = L.marker([-2.5198,-17.9914],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-4 - Z=-62.459 [m]'}).on('click', function(e){OpenPano(155);}).addTo(map);
	var scan22 = L.marker([-97.5852,-54.6224],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-119 - Z=-62.529 [m]'}).on('click', function(e){OpenPano(22);}).addTo(map);
	var scan85 = L.marker([-85.0627,-65.0354],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-176 - Z=-62.446 [m]'}).on('click', function(e){OpenPano(85);}).addTo(map);
	var scan92 = L.marker([-84.2189,-60.6302],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-182 - Z=-62.441 [m]'}).on('click', function(e){OpenPano(92);}).addTo(map);
	var scan76 = L.marker([0.0588,-12.0185],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-168 - Z=-62.553 [m]'}).on('click', function(e){OpenPano(76);}).addTo(map);
	var scan30 = L.marker([-28.5363,-13.7195],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-126 - Z=-62.451 [m]'}).on('click', function(e){OpenPano(30);}).addTo(map);
	var scan187 = L.marker([-8.6454,-15.4149],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-69 - Z=-62.442 [m]'}).on('click', function(e){OpenPano(187);}).addTo(map);
	var scan16 = L.marker([-88.2384,-70.6045],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-113 - Z=-62.539 [m]'}).on('click', function(e){OpenPano(16);}).addTo(map);
	var scan205 = L.marker([-3.3270,-7.9927],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-85 - Z=-62.460 [m]'}).on('click', function(e){OpenPano(205);}).addTo(map);
	var scan160 = L.marker([-68.0943,-54.5820],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-44 - Z=-62.527 [m]'}).on('click', function(e){OpenPano(160);}).addTo(map);
	var scan103 = L.marker([-46.6465,-64.2309],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-192 - Z=-62.492 [m]'}).on('click', function(e){OpenPano(103);}).addTo(map);
	var scan45 = L.marker([-77.5493,-58.8571],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-14 - Z=-62.573 [m]'}).on('click', function(e){OpenPano(45);}).addTo(map);
	var scan51 = L.marker([-110.5359,-70.1879],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-145 - Z=-62.540 [m]'}).on('click', function(e){OpenPano(51);}).addTo(map);
	var scan50 = L.marker([-106.8050,-74.3899],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-144 - Z=-62.542 [m]'}).on('click', function(e){OpenPano(50);}).addTo(map);
	var scan1 = L.marker([-81.8074,-53.4875],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-10 - Z=-62.560 [m]'}).on('click', function(e){OpenPano(1);}).addTo(map);
	var scan48 = L.marker([-101.1016,-78.1067],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-142 - Z=-62.455 [m]'}).on('click', function(e){OpenPano(48);}).addTo(map);
	var scan161 = L.marker([-32.1625,-34.9790],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-45 - Z=-62.579 [m]'}).on('click', function(e){OpenPano(161);}).addTo(map);
	var scan57 = L.marker([-100.7566,-58.8306],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-150 - Z=-62.543 [m]'}).on('click', function(e){OpenPano(57);}).addTo(map);
	var scan202 = L.marker([-2.5800,-14.4466],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-82 - Z=-62.455 [m]'}).on('click', function(e){OpenPano(202);}).addTo(map);
	var scan29 = L.marker([-33.9921,-17.2127],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-125 - Z=-62.452 [m]'}).on('click', function(e){OpenPano(29);}).addTo(map);
	var scan87 = L.marker([-91.0611,-59.6498],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-178 - Z=-62.438 [m]'}).on('click', function(e){OpenPano(87);}).addTo(map);
	var scan200 = L.marker([-14.2447,-3.8778],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-80 - Z=-62.454 [m]'}).on('click', function(e){OpenPano(200);}).addTo(map);
	var scan91 = L.marker([-87.6839,-54.9206],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-181 - Z=-62.443 [m]'}).on('click', function(e){OpenPano(91);}).addTo(map);
	var scan96 = L.marker([-30.4318,-56.0054],{icon: marker6, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-186 - Z=-62.067 [m]'}).on('click', function(e){OpenPano(96);}).addTo(map);
	var scan214 = L.marker([20.5373,-0.0909],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-93 - Z=-62.694 [m]'}).on('click', function(e){OpenPano(214);}).addTo(map);
	var scan129 = L.marker([-86.1243,-89.7995],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-216 - Z=-62.512 [m]'}).on('click', function(e){OpenPano(129);}).addTo(map);
	var scan154 = L.marker([-74.3167,-43.3446],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-39 - Z=-62.472 [m]'}).on('click', function(e){OpenPano(154);}).addTo(map);
	var scan216 = L.marker([30.3039,-0.2348],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-95 - Z=-62.678 [m]'}).on('click', function(e){OpenPano(216);}).addTo(map);
	var scan217 = L.marker([20.0001,5.6401],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-96 - Z=-62.685 [m]'}).on('click', function(e){OpenPano(217);}).addTo(map);
	var scan32 = L.marker([-21.6547,-23.9709],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-128 - Z=-62.449 [m]'}).on('click', function(e){OpenPano(32);}).addTo(map);
	var scan49 = L.marker([-102.1455,-76.5762],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-143 - Z=-62.543 [m]'}).on('click', function(e){OpenPano(49);}).addTo(map);
	var scan15 = L.marker([-82.2752,-64.9085],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-112 - Z=-62.439 [m]'}).on('click', function(e){OpenPano(15);}).addTo(map);
	var scan78 = L.marker([-79.5715,-60.4564],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-17 - Z=-62.570 [m]'}).on('click', function(e){OpenPano(78);}).addTo(map);
	var scan114 = L.marker([-66.4491,-52.4003],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-202 - Z=-62.478 [m]'}).on('click', function(e){OpenPano(114);}).addTo(map);
	var scan158 = L.marker([-66.1899,-46.8365],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-42 - Z=-62.497 [m]'}).on('click', function(e){OpenPano(158);}).addTo(map);
	var scan42 = L.marker([-51.2208,-27.3247],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-137 - Z=-62.657 [m]'}).on('click', function(e){OpenPano(42);}).addTo(map);
	var scan67 = L.marker([-79.2809,-57.6608],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-16 - Z=-62.567 [m]'}).on('click', function(e){OpenPano(67);}).addTo(map);
	var scan138 = L.marker([-82.1560,-42.6845],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-24 - Z=-62.517 [m]'}).on('click', function(e){OpenPano(138);}).addTo(map);
	var scan131 = L.marker([-89.1297,-80.9844],{icon: marker4, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-218 - Z=-62.833 [m]'}).on('click', function(e){OpenPano(131);}).addTo(map);
	var scan115 = L.marker([-35.0662,-50.2529],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-203 - Z=-62.526 [m]'}).on('click', function(e){OpenPano(115);}).addTo(map);
	var scan70 = L.marker([-31.8544,-61.2855],{icon: marker4, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-162 - Z=-62.927 [m]'}).on('click', function(e){OpenPano(70);}).addTo(map);
	var scan137 = L.marker([-89.4895,-46.5668],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-23 - Z=-62.504 [m]'}).on('click', function(e){OpenPano(137);}).addTo(map);
	var scan62 = L.marker([-92.8826,-67.1388],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-155 - Z=-62.548 [m]'}).on('click', function(e){OpenPano(62);}).addTo(map);
	var scan110 = L.marker([-37.9220,-70.6298],{icon: marker4, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-199 - Z=-62.880 [m]'}).on('click', function(e){OpenPano(110);}).addTo(map);
	var scan203 = L.marker([-0.7910,-14.4311],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-83 - Z=-62.456 [m]'}).on('click', function(e){OpenPano(203);}).addTo(map);
	var scan14 = L.marker([-81.0168,-67.1010],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-111 - Z=-62.444 [m]'}).on('click', function(e){OpenPano(14);}).addTo(map);
	var scan55 = L.marker([-99.4833,-52.3508],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-149 - Z=-62.488 [m]'}).on('click', function(e){OpenPano(55);}).addTo(map);
	var scan178 = L.marker([-23.2903,-15.4620],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-60 - Z=-62.539 [m]'}).on('click', function(e){OpenPano(178);}).addTo(map);
	var scan167 = L.marker([-38.6435,-28.4429],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-50 - Z=-62.572 [m]'}).on('click', function(e){OpenPano(167);}).addTo(map);
	var scan150 = L.marker([-74.4735,-49.2284],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-35 - Z=-62.461 [m]'}).on('click', function(e){OpenPano(150);}).addTo(map);
	var scan207 = L.marker([1.9530,-5.0254],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-87 - Z=-62.480 [m]'}).on('click', function(e){OpenPano(207);}).addTo(map);
	var scan184 = L.marker([-11.2871,-20.6544],{icon: marker5, title: 'KAFD-LF-504-MIXU-GF0-00000-TXG-SUR-PCL-01001-66 - Z=-62.524 [m]'}).on('click', function(e){OpenPano(184);}).addTo(map);

	
	//OpenPano(108);
	
	// force teh div element to be able to resize to height 100%
	$(window).on("resize", function() {
		$("#sectionmap").height($(window).height()).width($(window).width());
		map.invalidateSize();
	}).trigger("resize");	
};

function OpenPano(id){
	if (id < 0) return;
	
	var panoType = 2;
	
	if ((panoType == 1) || (panoType == 2))//Planar & Bubble
	{
		panoWin = window.open("./pano_" + id + ".html", "framepano");
	}
	else if (panoType == 3)// PointCloud
	{
		panoWin = window.open("./pointclouds/pointcloud_" + id + ".html", "framepano");
	}
	panoWin.focus();
};

var previousSrc;var previousImgTag;addEventListener('click', function(event) {var container = event.target;if (container.tagName === 'IMG') {if (previousImgTag) {previousImgTag.src = previousSrc;}previousSrc = container.src;previousImgTag = container;container.src = './img/active.png';}});