var map;
var marker;
var infowindow

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
	getMyLocation();
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
		title: "Here I Am!"
		});
	marker.setMap(map);
					
				// Open info window on click of marker
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.setContent(marker.title);
		infowindow.open(map, marker);
	});
			
}