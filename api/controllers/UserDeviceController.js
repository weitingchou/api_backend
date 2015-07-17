/**
 * DeviceController
 *
 * @description :: Server-side logic for managing devices
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var uuid = require('node-uuid');

module.exports = {

  register: function (req, res) {
    var accessKey = uuid.p4(),
        accessSecretKey = uuid.p4();

    Device.create({
      accessKey: accessKey,
      accessSecretKey: accessSecretKey
    }, function(err, device) {
      if (err) {
        sails.log.error(err);
        return res.status(500).send({error: 'Internal error'});
      }
      res.send({message: {
        accessKey: device.accessKey,
        accessSecretKey: device.accessSecretKey
      }});
    });
  }
};

