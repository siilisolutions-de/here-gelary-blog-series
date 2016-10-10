function HEREMap (mapContainer, platform, mapOptions) {
  this.platform = platform;
  this.position = mapOptions.center;

  var defaultLayers = platform.createDefaultLayers();

  // Instantiate wrapped HERE map
  this.map = new H.Map(mapContainer, defaultLayers.normal.map, mapOptions);

  // Basic behavior: Zooming and panning
  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));

  // Watch the user's geolocation and display it
  navigator.geolocation.watchPosition(this.updateMyPosition.bind(this));

  // Resize the map when the window is resized
  window.addEventListener('resize', this.resizeToFit.bind(this));
}

HEREMap.prototype.updateMyPosition = function(event) {
  this.position = {
    lat: event.coords.latitude,
    lng: event.coords.longitude
  };

  // Remove old location marker if it exists
  if (this.myLocationMarker) {
    this.myLocationMarker.remove();
  }

  // Draw the route from current location to HERE HQ if not yet drawn
  if (!this.route) {
    this.drawRoute(this.position, HEREHQcoordinates);
  }

  this.myLocationMarker = this.addMarker(this.position);
  this.map.setCenter(this.position);
};

HEREMap.prototype.addMarker = function(coordinates) {
  var marker = new H.map.Marker(coordinates);
  this.map.addObject(marker);
};

HEREMap.prototype.drawRoute = function(fromCoordinates, toCoordinates) {
  var routeOptions = {
    mode: 'fastest;car',
    representation: 'display',
    waypoint0: Utils.locationToWaypointString(fromCoordinates),
    waypoint1: Utils.locationToWaypointString(toCoordinates)
  };

  this.routes = new HERERoute(this.map, this.platform, routeOptions);
};

HEREMap.prototype.resizeToFit = function() {
  this.map.getViewPort().resize();
};