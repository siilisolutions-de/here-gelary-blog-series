'use strict';

var Utils = {
  locationToString: function(coordinates) {
    return coordinates.lat + "," + coordinates.lng;
  },

  locationToWaypointString: function(coordinates) {
    return 'geo!' + Utils.locationToString(coordinates);
  },

  formatDistance: function(distanceInMeters) {
    if (distanceInMeters < 1000) {
      return distanceInMeters + 'm';
    } else {
      return (distanceInMeters / 1000).toFixed(1) + 'km';
    }
  },

  formatDuration: function(durationInSeconds) {
    var hours = Math.floor(durationInSeconds / 3600);
    var minutes = Math.floor(durationInSeconds % 3600 / 60);

    if (hours > 0) {
      return hours + 'h ' + minutes + 'min';
    } else {
      return minutes + 'min';
    }
  },

  // Dictonary for icon data
  icons: {
    iceCream: {
      url: './images/marker-gelato.svg',
      options: {
        size: new H.math.Size(26, 34),
        anchor: new H.math.Point(14, 34)
      }
    },
    origin: {
      url: './images/origin.svg',
      options: {
        size: new H.math.Size(30, 36),
        anchor: new H.math.Point(12, 36)
      }
    },
    destination: {
      url: './images/destination.svg',
      options: {
        size: new H.math.Size(30, 36),
        anchor: new H.math.Point(12, 36)
      }
    }
  }
};
