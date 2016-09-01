var mapContainer = document.getElementById('map-container');

var platform = new H.service.Platform({
  app_id: '...', // // <-- ENTER YOUR APP ID HERE
  app_code: '...', // <-- ENTER YOUR APP CODE HERE
  // Only necessary if served over HTTPS:
  useHTTPS: true
});

var HEREHQcoordinates = {
  // HERE HQ in Berlin, Germany:
  lat: 52.530974,
  lng: 13.384944
};

// Displaying the map
var mapOptions = {
  center: HEREHQcoordinates,
  zoom: 14
};

var defaultLayers = platform.createDefaultLayers();

var map = new H.Map(
  mapContainer,
  defaultLayers.normal.map,
  mapOptions);

// Resize the map when the window is resized
window.addEventListener('resize', function () {
  map.getViewPort().resize();
});

// Basic behavior: Zooming and panning
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// User location via browser's geolocation API
function updatePosition (event) {
  var coordinates = {
    lat: event.coords.latitude,
    lng: event.coords.longitude
  };

  // Add a new marker every time the position changes
  var marker = new H.map.Marker(coordinates);
  map.addObject(marker);
  // Recenter the map every time the position chnages
  map.setCenter(coordinates);
}

navigator.geolocation.watchPosition(updatePosition);