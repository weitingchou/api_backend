var crypto = require('crypto');

function decodeBase64 (str) {
  return new Buffer(str, 'base64').toString();
}

module.exports = function (req, res, next) {

  sails.log.info('Authenticating');
  /**
   * Authorization = "TopPano" + " " + DeviceAccessKeyID + ":" + Signature;
   *
   * Signature = Base64( HMAC-SHA1( DeviceSecretAccessKeyID, UTF-8-Encoding-Of( StringToSign ) ) );
   *
   * StringToSign = HTTP-Verb + "\n" +
   *                Content-Type + "\n" +
   *                Date + "\n" +
   *                HTTP-Request-URI;
   *
   **/

  /**
   * RegExp for auth credentials
   *
   * credentials = auth-scheme 1*SP token68
   * auth-scheme = "TopPano" ; case sensitive
   * token68     = 1*( ALPHA / DIGIT / "-" / "." / "_" / "~" / "+" / "/"  ) *"="
   * @private
   **/
  var credentialsRegExp = /^ *(?:TopPano) +([A-Za-z0-9\-\.:_~\+\/]+=*) *$/;

  /**
   * RegExp for auth device key and signature
   *
   * key-sign = device access key ":" signature
   * key      = *<TEXT excluding ":">
   * sign     = *TEXT
   * @private
   **/
  var keySignRegExp = /^([^:]*):(.*)$/;

  var header = req.get('authorization'),
      match = credentialsRegExp.exec(header || '');

  if (!match) {
    sails.log.error('Unrecognized credential: '+header);
    return res.status(401).send({error: 'Authentication failed'});
  }

  var keySign = keySignRegExp.exec(match[1]);

  if (!keySign) {
    sails.log.error('Invalid key-signature pair');
    return res.status(401).send({error: 'Authentication failed'});
  }

  var key = keySign[1],
      signature = decodeBase64(keySign[2]);

  Device.findOne({accessKey: key}, function(err, device) {
    if (err) {
      sails.log.error(err);
      return res.status(500).send({error: 'Interal error'});
    }
    if (!device) {
      sails.log.error('Invalid device access key');
      return res.status(401).send({error: 'Authentication failed'});
    }

    req.deviceState = device.state;
    req.accessKey = device.accesskey;
    var stringToSign = req.method + "\n" +
                       req.get('content-type') + "\n" +
                       req.get('date') + "\n" +
                       req.originalUrl;

    var hmac = crypto.createHmac('sha256', device.accessSecretKey).update(stringToSign.toString('utf8'));
    if (hmac.digest('hex') !== signature) {
      sails.log.error('Invalid signature');
      return res.status(401).send({error: 'Authentication failed'});
    }

    next();
  });
};

