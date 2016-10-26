'use strict';

function HEREPlaces (map, platform, onClickPlace) {
  this.map = map;
  this.onClickPlace = onClickPlace;
  this.placeSearch = new H.places.Search(platform.getPlacesService());

  this.searchResults = [];
}

// "External API" for POI search for a given query
HEREPlaces.prototype.searchPlaces = function(query) {
  this.getPlaces(query, function(places) {
    this.updatePlaces(places);
  }.bind(this));
};

// Actually retrieve places via the Places API,
// prepare reponse object and handle errors
HEREPlaces.prototype.getPlaces = function(query, onSuccessCallback) {
  var onSuccess,
      onError;

  onSuccess = function(data) {
    if (data.results && data.results.items) {
      var places = data.results.items.map(function(place) {
        place.coordinates = { lat: place.position[0], lng: place.position[1] };

        return place;
      });

      onSuccessCallback(data.results.items)
    } else {
      onError(data);
    }
  };

  onError = function(error) {
    console.error('Error happened when fetching places!', error);
  };

  this.placeSearch.request(query, {}, onSuccess, onError);
};

// Reset the search
HEREPlaces.prototype.clearSearch = function() {
  this.searchResults.forEach(function(marker) {
    this.map.removeObject(marker);
  }.bind(this));

  this.searchResults = [];
};

HEREPlaces.prototype.updatePlaces = function(places) {
  var markerOptions = {
    icon: new H.map.Icon(Utils.icons.iceCream.url, Utils.icons.iceCream.options)
  };

  this.clearSearch();

  this.searchResults = places.map(function(place) {
    var marker = new H.map.Marker(place.coordinates, markerOptions);
    this.map.addObject(marker);

    marker.addEventListener('tap', this.onClickPlace);

    return marker;
  }.bind(this));
};
