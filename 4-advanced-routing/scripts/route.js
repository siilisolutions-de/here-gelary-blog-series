function HERERoute (map, platform, routeOptions) {

  var router = platform.getRoutingService();

  var onSuccess = function(result) {
    if (result.response.route) {
      var routes = result.response.route;
      var routeLines = routes.map(drawRoute);
      var routeLineGroup = new H.map.Group({ objects: routeLines });
      map.addObject(routeLineGroup);
      map.setViewBounds(routeLineGroup.getBounds());
    }
  };

  var onError = function(error) {
    console.error('Oh no! There was some communication error!', error);
  };

  var drawRoute = function(route) {
    // Pick the route's shape:
    var routeShape = route.shape;

    // Create a strip to use as a point source for the route line
    var strip = new H.geo.Strip();

    // Push all the points in the shape into the strip:
    routeShape.forEach(function(point) {
      var parts = point.split(',');
      strip.pushLatLngAlt(parts[0], parts[1]);
    });

    // Create a polyline to display the route:
    var routeLine = new H.map.Polyline(strip, {
      style: { strokeColor: 'rgba(0, 85, 170, 0.4)', lineWidth: 3 }
    });

    return routeLine;
  };

  router.calculateRoute(routeOptions, onSuccess, onError);
}