/**
 * PhotometaController
 *
 * @description :: Server-side logic for managing photometas
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


module.exports = {


  /**
   * `PhotometaController.getMetadata()`
   */
  getMetadata: function (req, res) {
    var panoid = req.query.panoid || undefined;
    /*
    if (mapInfo.hasOwnProperty(panoid)) {
      res.send(mapInfo[panoid]);
    } else {
      res.status(404).send({error: 'PanoId not found'});
    }
    */
    if (!panoid) {
      return res.status(400).send({error: 'Please specify the panoid you want to query'});
    }
    PhotoMeta.findOne({
      panoid: panoid
    }, function(err, metadata) {
      if (err) {
        return res.status(500).send({error: 'Internal error'});
      }
      res.send(JSON.stringify(metadata));
    })
  },

  getMetadataList: function (req, res) {
    var userid = req.param('userid');
    PhotoMeta.find({
      userid: userid,
      isEntry: true
    }, function(err, list) {
      if (err || !list) {
        sails.log.error('Error: '+err);
        return res.status(500).send({error: 'Internal error'});
      }
      res.send(JSON.stringify(list));
    });
  },

  postMetadata: function (req, res) {
    var metadata = req.body || undefined;
    if (!metadata) {
      return res.status(400).send({error: 'No metadata found'});
    }
    PhotoMeta.create(metadata, function(err) {
      if (err) {
        sails.log.error('Error: '+err);
        return res.status(500).send({error: 'Internal error'});
      }
      res.send('Ok');
    });
  }

};

