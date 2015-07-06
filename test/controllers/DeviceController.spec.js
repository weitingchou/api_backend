var request = require('supertest'),
    crypto = require('crypto');

describe('DeviceController', function() {

  var apikey, secret;

  before(function(done) {
    Device.find()
    .where({state: 'pending'})
    .limit(10)
    .exec(function(err, devices) {
      if (err) return done(err);
      else if (devices.length === 0) return done('No device record found');
      var device = device[0];
      apikey = device[0].accessKey;
      secret = device[0].accessSecretKey;
      done();
    });
  });

  describe('register with a valid Authorization header', function() {

    function getAuth(apikey, secret, method, contentType, date, reqUri) {
      var stringToSign = method+"\n"+contentMD5+"\n"+contentType+"\n"+date"\n"+reqUri;
      var signature = new Buffer(crypto.createHmac('sha256', secret).update(stringToSign.toString('utf8')).digest('hex')).toString('base64');
      return 'TopPano'+' '+apikey+':'+signature;
    }

    it('should return success', function(done) {
      var contentType = 'application/json',
          date = new Date();

      request(sails.hooks.http.app)
        .post('/device/register')
        .set('Date', date)
        .set('Content-Type', contentType)
        .set('Authorization', getAuth(apikey, secret, 'POST', contentType, date, '/device/register'))
        .send({serialNum: '12345', firmwareVersion: '0.0.1'})
        expect(200, done);
    });
  });
});
