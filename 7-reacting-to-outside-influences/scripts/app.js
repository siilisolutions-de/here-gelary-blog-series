'use strict';

var HEREHQcoordinates = {
  // HERE HQ in Berlin, Germany:
  lat: 52.530974,
  lng: 13.384944
};

(() => {
  var mapContainer = document.getElementById('map-container');

  var platform = new H.service.Platform({
    app_id: 'DN1VOtnsEYNI1qJOpHR6', // // <-- ENTER YOUR APP ID HERE
    app_code: 'gsz3tb7hf3JQHWB7CKl8nA', // <-- ENTER YOUR APP CODE HERE
    // Only necessary if served over HTTPS:
    useHTTPS: true
  });

  // Displaying the map
  var mapOptions = {
    center: HEREHQcoordinates,
    zoom: 14
  };

  var map = new HEREMap(mapContainer, platform, mapOptions);
})();
