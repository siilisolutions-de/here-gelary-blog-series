'use strict';

(() => {
  var mapContainer = document.getElementById('map-container');

  var platform = new H.service.Platform({
    app_id: '7Q1QgK0Y65j8bM2YgAoz', // // <-- ENTER YOUR APP ID HERE
    app_code: 'dUV5s5t6uWc_uarSg7zooA', // <-- ENTER YOUR APP CODE HERE
    // Only necessary if served over HTTPS:
    useHTTPS: false
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

  var map = new HEREMap(mapContainer, platform, mapOptions);
})();
