
var MapMeta = {
  schema: true,

  attributes: {
    userid: { type: 'string', required: true },
    mapid: { type: 'string', required: true, unique: true },
    entryPanoId: { type: 'string', required: true },
    name: { type: 'string' }
  }
};

module.exports = MapMeta;
