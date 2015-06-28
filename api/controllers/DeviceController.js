/**
 * DeviceController
 *
 * @description :: Server-side logic for managing devices
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  register: function (req, res) {

    Device.update({accessKey: req.accessKey}, {
      state: 'active',
      serialNum: req.body.serialNum,
      firmwareVersion: req.body.firmwareVersion
    }).exec(function(err) {
      if (err) {
        sails.log.error(err);
        return res.status(500).send({error: 'Internal error'});
      }
      res.send({message: 'Success'});
    });
  }
};

