var map;
var marker;
var infowindow;

function initMap() {
	var myLat = 42.352271;
	var myLng = -71.05524200000001; //center on South Station
	var me = new google.maps.LatLng(myLat, myLng);
	var myOptions = {
		zoom: 15, // The larger the zoom number, the bigger the zoom
		center: me,
		mapTypeId: google.maps.MapTypeId.ROADMAP
		};
	infowindow = new google.maps.InfoWindow();
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
	setMarkers(map);
	getMyLocation();

}

var stops = [

['South Station', 42.352271, -71.05524200000001, 1],
['Andrew', 42.330154, -71.057655, 2],
['Porter Square',   42.3884, -71.11914899999999,3 ],
['Harvard Square',  42.373362, -71.118956,4],
['JFK/UMass', 42.320685, -71.052391, 5],
['Savin Hill', 42.31129, -71.053331, 6],
['Park Street', 42.35639457,-71.062424, 7],
['Broadway', 42.342622, -71.056967,8],
['North Quincy', 42.275275, -71.029583, 9],
['Shawmut', 42.29312583, -71.06573796000001, 10],
['Davis', 42.39674, -71.121815, 11],
['Alewife', 42.395428, -71.142483, 12],
['Kendall/MIT', 42.36249079, -71.08617653, 13],
['Charles/MGH', 42.361166, -71.070628, 14],
['Downtown Crossing', 42.355518 , -71.060225, 15],
['Quincy Center', 42.251809, -71.005409, 16],
['Quincy Adams', 42.233391, -71.007153, 17],
['Ashmont', 42.284652, -71.06448899999999, 18],
['Wollaston', 42.2665139, -71.0203369, 19],
['Fields Corner', 42.300093, -71.061667, 20],
['Central Square', 42.365486, -71.103802, 21],
['Braintree', 42.2078543, -71.0011385,22]

];

var poly=[];

function setMarkers(map){
	var image = {
          url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
          // This marker is 20 pixels wide by 32 pixels high.
          size: new google.maps.Size(20, 32),
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(0, 32)
        };
        // Shapes define the clickable region of the icon. The type defines an HTML
        // <area> element 'poly' which traces out a polygon as a series of X,Y points.
        // The final coordinate closes the poly by connecting to the first coordinate.
        var shape = {
          coords: [1, 1, 1, 20, 18, 20, 18, 1],
          type: 'poly'
        };

        for (var i = 0; i < stops.length; i++) {
        	var station = stops[i];
          	var marker = new google.maps.Marker({
            position: {lat: station[1], lng: station[2]},
            map: map,
            icon: image,
            shape: shape,
            title: station[0],
            zIndex: station[3]
         });

        }

        setPolyline(map);
}
     
var BraintreeCoordinates = [
    {lat: 42.395428, lng:  -71.142483 }, //alewife
    {lat:  42.39674, lng: -71.121815 }, //davis
    {lat: 42.3884, lng: -71.11914899999999}, //porter
    {lat: 42.373362, lng: -71.118956}, //harvard
    {lat: 42.365486, lng:  -71.103802}, //central
    {lat: 42.36249079, lng: -71.08617653}, //kendall/mit
    {lat: 42.361166, lng:  -71.070628}, //charles/mgh
    {lat: 42.35639457, lng: -71.0624242}, //park st
    {lat: 42.355518, lng: -71.060225}, //downtown
    {lat: 42.352271, lng:  -71.05524200000001}, //south st
    {lat: 42.342622, lng: -71.056967}, //broadway
    {lat: 42.330154, lng: -71.057655}, //andrew
    {lat: 42.320685, lng: -71.052391 }, //jfk/umass
	{lat: 42.275275, lng: -71.029583}, //NQ
	{lat: 42.2665139, lng: -71.0203369 }, //wollaston
	{lat: 42.251809, lng: -71.005409}, //QC
	{lat: 42.233391, lng: -71.007153}, //quincy adams
	{lat: 42.2078543, lng: -71.0011385} //braintree
];

 var AshmontCoordinates = [
 	{lat: 42.320685, lng: -71.052391 }, //jfk/umass
 	{lat:  42.31129, lng: -71.053331}, //savin hill
    {lat: 42.300093, lng: -71.061667}, //fields corner
	{lat: 42.29312583, lng: -71.06573796000001}, //shawmut
	{lat: 42.284652, lng:  -71.06448899999999} //ashmont
 ];

function setPolyline(map){
	var BPath = new google.maps.Polyline({
    path: BraintreeCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
     });

    BPath.setMap(map);


    var APath = new google.maps.Polyline({
    path: AshmontCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    trokeOpacity: 1.0,
    strokeWeight: 2
    });

     APath.setMap(map);
}

function getMyLocation(){
	if (navigator.geolocation) { // the navigator.geolocation object is supported on your browser
		navigator.geolocation.getCurrentPosition(function(position) {
		myLat = position.coords.latitude;
		myLng = position.coords.longitude;
		renderMap();
		});
	}
	else {
		alert("Geolocation is not supported by your web browser.");
	}

}

function renderMap(){
	me = new google.maps.LatLng(myLat, myLng);
	// Update map and go there...
	map.panTo(me);
				
	// Create a marker
	marker = new google.maps.Marker({
		position: me,
		title: "Here I Am!",
		});

	marker.setMap(map);
					
	// Open info window on click of marker
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(marker.title);
		infowindow.open(map, marker);
	});		
}