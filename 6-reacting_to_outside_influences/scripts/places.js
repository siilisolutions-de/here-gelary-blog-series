'use strict';

function HEREPlaces (map, platform) {
  this.map = map;
  this.placeSearch = new H.places.Search(platform.getPlacesService());

  this.searchResults = [];
}

HEREPlaces.prototype.searchPlaces = function(query) {
  var _this = this;

  _this.getPlaces(query).then(function(places) {
    _this.updatePlaces(places);
  }).catch(function(error) {
    console.error(error);
  });
};

HEREPlaces.prototype.getPlaces = function(query) {
  var _this = this;

  return new Promise(function(resolve, reject) {
    var onSuccess = function(data) {
      if (data.results && data.results.items) {
        var places = data.results.items.map(function(place) {
          place.coordinates = { lat: place.position[0], lng: place.position[1] };

          return place;
        });

        resolve(data.results.items);
      } else {
        reject(data);
      }
    }

    var onError = function(error) {
      reject(error);
    }

    _this.placeSearch.request(query, {}, onSuccess, onError);
  });
};

HEREPlaces.prototype.updatePlaces = function(places) {
  var _this = this;
  var markerOptions = {
    icon: new H.map.Icon(Utils.icons.iceCream.url, Utils.icons.iceCream.options)
  };

  _this.searchResults.forEach(function(marker) {
    _this.map.removeObject(marker);
  });

  _this.searchResults = places.map(function(place) {
    var marker = new H.map.Marker(place.coordinates, markerOptions);
    _this.map.addObject(marker);

    return marker;
  });
};
