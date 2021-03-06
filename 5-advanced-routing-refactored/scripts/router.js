'use strict';

function HERERouter (map, platform) {
  this.map = map;
  this.router = platform.getRoutingService();

  this.routePanel = null;
  this.selectedRoute = null;
  this.routeLineGroup = null;

  this.routeLineStyles = {
    normal: { strokeColor: 'rgba(0, 85, 170, 0.5)', lineWidth: 3 },
    selected: { strokeColor: 'rgba(255, 0, 0, 0.7)', lineWidth: 7 }
  };

  var panelElement = document.querySelector('#route-panel');
  var routePanelOptions = {
    onRouteSelection: this.onRouteSelection.bind(this)
  };
  this.routePanel = new HERERoutesPanel(panelElement, routePanelOptions);
}

HERERouter.prototype.drawRoute = function(options) {
  var onSuccess = function(routes, routeLineGroup) {
    if (this.routeLineGroup) {
      this.map.removeObject(this.routeLineGroup);
    }

    this.routeLineGroup = routeLineGroup;
    this.map.addObject(this.routeLineGroup);

    this.map.setViewBounds(routeLineGroup.getBounds());

    this.routePanel.setRoutes(routes);
  };

  this.getRoutes(options, onSuccess.bind(this));
};

HERERouter.prototype.getRoutes = function(options, onSuccessCallback) {
  var onSuccess,
      onError;

  onSuccess = function (result) {
    if (result.response.route) {
      var routeLineGroup = new H.map.Group();

      var routes = result.response.route.map(function(route) {
        var routeLine = this.getRouteLine(route);
        routeLineGroup.addObject(routeLine);

        return {
          route: route,
          routeLine: routeLine
        };
      }.bind(this));

      onSuccessCallback(routes, routeLineGroup);

    } else {
      onError(result.response.details);
    }
  };

  onError = function (error) {
    console.error('Oh no! There was some communication error!', error);
  };

  this.router.calculateRoute(options, onSuccess.bind(this), onError);
};

HERERouter.prototype.getRouteLine = function(route) {
  var routeShape = route.shape;

  // Create a strip to use as a point source for the route line
  var strip = new H.geo.Strip();

  // Push all the points in the shape into the strip:
  routeShape.forEach(function(point) {
    var parts = point.split(',');
    strip.pushLatLngAlt(parts[0], parts[1]);
  });

  // Create a polyline to display the route:
  var routeLine = new H.map.Polyline(strip,
    { style: this.routeLineStyles.normal }
  );

  return routeLine;
};

HERERouter.prototype.onRouteSelection = function(route) {
  if (this.selectedRoute) {
    this.selectedRoute.routeLine.setStyle(this.routeLineStyles.normal).setZIndex(1);
  }

  route.routeLine.setStyle(this.routeLineStyles.selected).setZIndex(10);
  this.selectedRoute = route;
};
