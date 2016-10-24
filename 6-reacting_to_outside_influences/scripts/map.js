'use strict';

function HEREMap (mapContainer, platform, mapOptions) {
  this.platform = platform;
  this.position = mapOptions.center;

  var defaultLayers = platform.createDefaultLayers();

  // Instantiate wrapped HERE map
  this.map = new H.Map(mapContainer, defaultLayers.normal.map, mapOptions);

  // Marker objects
  this.markers = {
    myLocation: null,
    origin: null,
    destination: null
  };
  
  // Instantiate router object
  this.router = new HERERouter(this.map, this.platform);

  // Instantiate places search
  this.places = new HEREPlaces(this.map, this.platform);

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
  this.updateMarker('myLocation', this.position)

  // Draw the route from current location to HERE HQ if not yet drawn
  this.drawRoute(this.position, HEREHQcoordinates);

  this.map.setCenter(this.position);
};

HEREMap.prototype.addMarker = function(coordinates, icon) {
  var markerOptions = {};

  // Dictonary for icon data
  var icons = {
    myLocation: {
      url: './images/marker-gelato.svg',
      options: {
        size: new H.math.Size(26, 34),
        anchor: new H.math.Point(14, 34)
      }
    },
    origin: {
      url: './images/origin.svg',
      options: {
        size: new H.math.Size(30, 36),
        anchor: new H.math.Point(12, 36)
      }
    },
    destination: {
      url: './images/destination.svg',
      options: {
        size: new H.math.Size(30, 36),
        anchor: new H.math.Point(12, 36)
      }
    }
  };

  if (icons[icon]) {
    markerOptions = {
      icon: new H.map.Icon(icons[icon].url, icons[icon].options)
    };
  }

  var marker = new H.map.Marker(coordinates, markerOptions);
  this.map.addObject(marker);

  return marker;
};

HEREMap.prototype.removeMarker = function(marker) {
  this.map.removeObject(marker);
};

HEREMap.prototype.updateMarker = function(markerName, coordinates) {
  if (this.markers[markerName]) {
    this.removeMarker(this.markers[markerName]);
  }

  this.markers[markerName] = this.addMarker(coordinates, markerName);
}

HEREMap.prototype.resizeToFit = function() {
  this.map.getViewPort().resize();
};

HEREMap.prototype.drawRoute = function(fromCoordinates, toCoordinates) {
  var routeOptions = {
    mode: 'fastest;car',
    representation: 'display',
    alternatives: 2,
    routeattributes: 'waypoints,summary,shape,legs',
    waypoint0: Utils.locationToWaypointString(fromCoordinates),
    waypoint1: Utils.locationToWaypointString(toCoordinates)
  };

  this.updateMarker('origin', fromCoordinates);
  this.updateMarker('destination', toCoordinates);

  this.router.drawRoute(routeOptions);
};

HEREMap.prototype.searchForIcecreamShop = function(coordinates) {
    var { lat, lng } = coordinates;
    var query = {
      'q': 'ice cream',
      'at': `${lat},${lng}`
    };

    this.places.searchPlaces(query);
}
