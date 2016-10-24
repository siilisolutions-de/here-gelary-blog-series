'use strict';

function HERERoutesPanel (element, options) {
  this.element = element;
  this.selectedRoute = null;
  this.selectedRouteElement = null;
  this.onRouteSelection = options.onRouteSelection || null;
}

HERERoutesPanel.prototype.setRoutes = function(routes) {
  var newRouteElements = this.render(routes);

  while (this.element.hasChildNodes()) {
    this.element.removeChild(this.element.firstChild);
  }

  this.element.appendChild(newRouteElements);
};

HERERoutesPanel.prototype.render = function(routes) {
  var _this = this;
  var routeList = document.createElement('ul');

  while (routeList.hasChildNodes()) {
    routeList.removeChild(routeList.firstChild);
  }

  routes.forEach(function(route, i) {
    routeList.appendChild(_this.renderRouteElement(route, i));
  });
  
  return routeList;
};

HERERoutesPanel.prototype.renderRouteElement = function(route, i) {
  var element = document.createElement('li');

  // Render the title and format distance and duration
  var routeSummary = route.route.summary;
  element.innerHTML = this.renderRouteTitle(routeSummary, i);

  // We don't expect more than one leg as we don't have
  // defined any waypoints along the route
  var maneuvers = route.route.leg[0].maneuver;
  element.innerHTML += this.renderManeuvers(maneuvers);

  // Upon route selection highlight the selected element,
  // highlight the selected route on the map and trigger the
  // onRouteSelection callback if defined.
  element.addEventListener('click', this.onClickElement.bind(this, element, route), false);

  return element;
};

HERERoutesPanel.prototype.renderRouteTitle = function(routeSummary, i) {
  return `
    <strong>Route ${i + 1}</strong>
    ${Utils.formatDistance(routeSummary.distance)} in 
    (${Utils.formatDuration(routeSummary.travelTime)})
  `; // achtung!
};

HERERoutesPanel.prototype.renderManeuvers = function(maneuvers) {
  return `
    <ol class="directions">
      ${maneuvers.map(this.renderInstruction).join('')}
    </ol>
  `;
};

HERERoutesPanel.prototype.renderInstruction = function(maneuver) {
  return `
    <li>${maneuver.instruction}</li>
  `;
};

HERERoutesPanel.prototype.onClickElement = function(element, route) {
  if (this.selectedRoute) {
    this.selectedRouteElement.classList.remove('selected');
  }

  element.classList.add('selected');

  this.selectedRoute = route;
  this.selectedRouteElement = element;

  if (this.onRouteSelection) {
    this.onRouteSelection(this.selectedRoute);
  }
};
