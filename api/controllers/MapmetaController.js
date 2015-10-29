

module.exports = {

  getMetadataList: function(req, res) {
    var userid = req.params.userid;
    MapMeta.find({
      userid: userid
    }, function(err, list) {
      if (err || !list) {
        sails.log.error('Error: '+err);
        return res.status(500).send({error: 'Internal error'});
      }
      res.send(JSON.stringify(list));
    });
  },

  postMetadata: function(req, res) {
    var metadata = req.body || undefined;
    if (!metadata) {
      return res.status(400).send({error: 'No metadata found'});
    }
    MapMeta.create(metadata, function(err) {
      if (err) {
        sails.log.error('Error: '+err);
        return res.status(500).send({error: 'Internal error'});
      }
      res.send('Ok');
    });
  }
};
