var map;
var marker;
var infowindow;
var prevMarker;
var myinfowindow;

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

['South Station', 42.352271, -71.05524200000001, 1, "place-sstat"],
['Andrew', 42.330154, -71.057655, 2, "place-andrw"],
['Porter Square',   42.3884, -71.11914899999999, 3, "place-portr" ],
['Harvard Square',  42.373362, -71.118956, 4, "place-harsq"],
['JFK/UMass', 42.320685, -71.052391, 5, "place-jfk"],
['Savin Hill', 42.31129, -71.053331, 6, "place-shmnl"],
['Park Street', 42.35639457,-71.062424, 7, "place-pktrm"],
['Broadway', 42.342622, -71.056967, 8, "place-brdwy"],
['North Quincy', 42.275275, -71.029583, 9, "place-nqncy"],
['Shawmut', 42.29312583, -71.06573796000001, 10, "place-smmnl"],
['Davis', 42.39674, -71.121815, 11, "place-davis"],
['Alewife', 42.395428, -71.142483, 12, "place-alfcl"],
['Kendall/MIT', 42.36249079, -71.08617653, 13, "place-knncl"],
['Charles/MGH', 42.361166, -71.070628, 14, "place-chmnl"],
['Downtown Crossing', 42.355518 , -71.060225, 15, "place-dwnxg"],
['Quincy Center', 42.251809, -71.005409, 16, "place-qnctr"],
['Quincy Adams', 42.233391, -71.007153, 17, "place-qamnl"],
['Ashmont', 42.284652, -71.06448899999999, 18, "place-asmnl"],
['Wollaston', 42.2665139, -71.0203369, 19, "place-wlsta"],
['Fields Corner', 42.300093, -71.061667, 20, "place-fldcr"],
['Central Square', 42.365486, -71.103802, 21, "place-cntsq"],
['Braintree', 42.2078543, -71.0011385, 22, "place-brntn"]

];

var stationClick =[];

function setMarkers(map){
	
    for (var i = 0; i < stops.length; i++) {

    	var contentString = ""; 
    	var station = stops[i];

        var infowindow = new google.maps.InfoWindow({
        	content: station[0]
        })

    	var marker = new google.maps.Marker({
        	position: {lat: station[1], lng: station[2]},
        	map: map,
        	icon: {
           		url: "mbta.png",
            	size: new google.maps.Size(40, 40),
            	scaledSize: new google.maps.Size(40, 40)
        	},
        	infowindow: infowindow,
        	title: station[0],
        	zIndex: station[3],
        	customInfo: stops[i][4] 	//put station ID info into each marker 
    	});

     	stationClick[i] = marker;


		google.maps.event.addListener(stationClick[i], 'click', function() {

			var request = new XMLHttpRequest();
			request.open("GET", "https://chicken-of-the-sea.herokuapp.com/redline/schedule.json?stop_id=" + this.customInfo, true);

			//arrow function doesn't have own "this"; retains "this" value from its context
		 	request.onreadystatechange = () => { 
		 		if (request.readyState == 4 && request.status == 200) {
		 			string = request.responseText;		 			
		 			info = JSON.parse(string);

		 			if (info != undefined && info.data != undefined){

				 		var lengthData;
				 		if (info.data.length != undefined){
				 			lengthData = info.data.length;	//# of departure times for each station
				 		}

			 			var departures = [];
		 		
			 			if (lengthData > 10) {
			 				lengthData = 10; 	//only get the next 10 subway times 
			 			}

			 			for (var j = 0; j < lengthData; j++) {
			 				if (info.data[j].attributes.departure_time != undefined) {
			 					departures.push(info.data[j].attributes.departure_time.substring(11, 16)); //only display times 
			 				}
			 			}
			 			
			 			for (var x = 0; x < departures.length; x++){
			 				contentString +='<br>' + departures[x] 	//save all the dept time info into a formatted string
			 			}

		 				this.infowindow.setContent(this.title + "<br>"+ "<br>" + "Departure Times: " + contentString);
		 			}
				}
		 	}
		 	request.send();

		 	//checks if there's a window already open, close it if there is 
            if (prevMarker) {
            	prevMarker.infowindow.close();
            	contentString = "";
            	prevMarker = this;
            	this.infowindow.open(map, this);
            } 
            else {
            	this.infowindow.open(map, this);
            	prevMarker = this;
            }
		}) 
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
    strokeWeight: 5
    });

    BPath.setMap(map);

    var APath = new google.maps.Polyline({
    path: AshmontCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    trokeOpacity: 1.0,
    strokeWeight: 5
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
	// My location
	map.panTo(me);
				
	// Create a marker
	marker = new google.maps.Marker({
		position: me,
		title: "Here I Am!",
		});

	marker.setMap(map);

	myinfowindow = new google.maps.InfoWindow();

	// Open info window on click of marker
	google.maps.event.addListener(marker, 'click', function() {
		myinfowindow.open(map, marker);
	});

	findClosest(me,map);
}

function findClosest(me,map){

	var shortestDistance = google.maps.geometry.spherical.computeDistanceBetween(me, new google.maps.LatLng({lat: stops[0][1], lng: stops[0][2]}));
	var smallestLatLng = stops[0];

	for (var y = 0; y < stops.length; y++){
		var distance = google.maps.geometry.spherical.computeDistanceBetween(me, new google.maps.LatLng({lat: stops[y][1], lng: stops[y][2]})); 

		if (distance < shortestDistance){
			shortestDistance = distance;
			smallestLatLng = stops[y];
		}
	}

	var closestPath = new google.maps.Polyline({
	    path: [me, {lat: smallestLatLng[1], lng: smallestLatLng[2]}],
	    geodesic: true,
	    strokeColor: 'green',
	    strokeOpacity: 1.0,
	    strokeWeight: 5
	    });

    closestPath.setMap(map); 	//polyline connecting you to closest station

    myinfowindow.setContent("Closest station: " + "<br>" + smallestLatLng[0] + "<br>" + "<br>" + parseFloat(shortestDistance/1609).toFixed(2) 
    	+ " miles away");
}

