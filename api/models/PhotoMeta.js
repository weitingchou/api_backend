/**
 * PhotoMeta Model
 */
var PhotoMeta = {
  schema: true,
  types: {
    /**
     * {
     *   latlng: { type: 'string' },
     *   address: { type: 'string' }
     * }
    locationValid: function(location) {
      return (typeof location.latlng === 'string') &&
             (typeof location.address === 'string');
    },
    */
    /**
     * {
     *   panoid: { type: 'alphanumericdashed' },
     *   direction: { type: 'string' }
     * }
    neighborValid: function(neighbor) {
      return (typeof neighbor.panoid === 'string') &&
             (typeof neighbor.direction === 'string');
    }
    */
  },
  attributes: {
    userid: { type: 'alphanumericdashed', required: true },
    geoLat: { type: 'string' },
    geoLng: { type: 'string' },
    address: { type: 'string' },
    heading: { type: 'float' },
    panoid: {
      type: 'alphanumericdashed',
      required: true,
      unique: true
    },
    isEntry: { type: 'boolean', required: true },
    //neighbors: { type: 'array', neighborValid: true }
    transition: { type: 'array' }
  }
};

module.exports = PhotoMeta;
