'use strict';

function HEREPlaces (map, platform, onClickPlace) {
  this.map = map;
  this.onClickPlace = onClickPlace;
  this.placeSearch = new H.places.Search(platform.getPlacesService());

  this.searchResults = [];
}

HEREPlaces.prototype.searchPlaces = function(query) {
  var _this = this;

  _this.getPlaces(query, function(places) {
    _this.updatePlaces(places);
  });
};

HEREPlaces.prototype.getPlaces = function(query, onSuccessCallback) {
  var _this = this;

  var onError = function(error) {
    console.error('Error happened when fetching places!', error);
  }
  var onSuccess = function(data) {
    if (data.results && data.results.items) {
      var places = data.results.items.map(function(place) {
        place.coordinates = { lat: place.position[0], lng: place.position[1] };

        return place;
      });

      onSuccessCallback(data.results.items)
    } else {
      onError(data);
    }
  }

  _this.placeSearch.request(query, {}, onSuccess, onError);
};

HEREPlaces.prototype.clearSearch = function() {
  var _this = this;

  _this.searchResults.forEach(function(marker) {
    _this.map.removeObject(marker);
  });

  _this.searchResults = [];
};

HEREPlaces.prototype.updatePlaces = function(places) {
  var _this = this;
  var markerOptions = {
    icon: new H.map.Icon(Utils.icons.iceCream.url, Utils.icons.iceCream.options)
  };

  _this.clearSearch();

  _this.searchResults = places.map(function(place) {
    var marker = new H.map.Marker(place.coordinates, markerOptions);
    _this.map.addObject(marker);

    marker.addEventListener('tap', _this.onClickPlace);

    return marker;
  });
};
