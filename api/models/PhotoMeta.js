/**
 * PhotoMeta Model
 */
var photometa = {
  schema: true,
  types: {
    locationValid: function(location) {
      /**
       * {
       *   latlng: { type: 'string' },
       *   address: { type: 'string' }
       * }
       */
      return (typeof location.latlng === 'string') &&
             (typeof location.address === 'string');
    },
    neighborValid: function(neighbor) {
      /**
       * {
       *   panoid: { type: 'alphanumericdashed' },
       *   direction: { type: 'string' }
       * }
       */
      return (typeof neighbor.panoid === 'string') &&
             (typeof neighbor.direction === 'string');
    }
  },
  attributes: {
    location: {
      type: 'json',
      locationValid: true
    },
    panoid: {
      type: 'alphanumericdashed',
      required: true,
      unique: true
    },
    isEntry: { type: 'boolean', required: true },
    neighbors: { type: 'array', neighborValid: true }
  }
};
