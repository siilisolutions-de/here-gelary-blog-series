'use strict';

var HEREHQcoordinates = {
  // HERE HQ in Berlin, Germany:
  lat: 52.530974,
  lng: 13.384944
};

(() => {
  var mapContainer = document.getElementById('map-container');

  var platform = new H.service.Platform({
    app_id: 'Qxpe0u4bNSyZLiPB6iVH', // // <-- ENTER YOUR APP ID HERE
    app_code: 'Ko6aycWKHRXsqQlTe9KGMw', // <-- ENTER YOUR APP CODE HERE
    // Only necessary if served over HTTPS:
    useHTTPS: false
  });

  // Displaying the map
  var mapOptions = {
    center: HEREHQcoordinates,
    zoom: 14
  };

  var map = new HEREMap(mapContainer, platform, mapOptions);
})();
