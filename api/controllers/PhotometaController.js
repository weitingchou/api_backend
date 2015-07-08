/**
 * PhotometaController
 *
 * @description :: Server-side logic for managing photometas
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


  /**
   * `PhotometaController.get()`
   */
  get: function (req, res) {
    var ll = req.query.ll || undefined,
        panoid = req.query.panoid || undefined;
    if (ll) {
      PhotoMeta.find()
    }
    else if (panoid) {

    }
  }
};

