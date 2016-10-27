'use strict';

function HERETrafficPanel (element, map, options) {
  this.element = element;
  this.map = map;
  this.trafficLayer = options.trafficLayer;
  this.incidentsLayer = options.incidentsLayer;

  this.state = {
    showTraffic: false,
    showIncidents: false
  };
  
  this.updatePanel();
}

HERETrafficPanel.prototype.updatePanel = function() {
  var newTrafficPanel = this.render();

  while (this.element.hasChildNodes()) {
    this.element.removeChild(this.element.firstChild);
  }

  this.element.appendChild(newTrafficPanel);
};

HERETrafficPanel.prototype.render = function() {
  var _this = this;

  var newPanel = document.createElement('div');
  var trafficButton = this.renderButton('traffic', this.state.showTraffic, this.toggleTrafficData.bind(this));
  var incidentsButton = this.renderButton('incidents', this.state.showIncidents, this.toggleIncidentsData.bind(this));

  newPanel.appendChild(trafficButton);
  newPanel.appendChild(incidentsButton);

  return newPanel;
};

HERETrafficPanel.prototype.toggleTrafficData = function() {
  if (this.state.showTraffic) {
    this.map.removeLayer(this.trafficLayer);
  } else {
    this.map.addLayer(this.trafficLayer);
  }

  this.state.showTraffic = !this.state.showTraffic;
  this.updatePanel();
};

HERETrafficPanel.prototype.toggleIncidentsData = function() {
  if (this.state.showIncidents) {
    this.map.removeLayer(this.incidentsLayer);
  } else {
    this.map.addLayer(this.incidentsLayer);
  }

  this.state.showIncidents = !this.state.showIncidents;
  this.updatePanel();
};

HERETrafficPanel.prototype.renderButton = function(label, active, onClick) {
  var button = document.createElement('button');
  var btnStatus = active ? 'Hide' : 'Show';

  button.addEventListener('click', onClick);
  button.textContent = btnStatus + ' ' + label;

  if (active) {
    button.classList.add('active');
  }

  return button;
};
