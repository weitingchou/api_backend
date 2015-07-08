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
      var device = devices[0];
      apikey = device.accessKey;
      secret = device.accessSecretKey;
      done();
    });
  });

  function genAuth(apikey, secret, method, contentType, date, reqUri) {
    var stringToSign = method+"\n"+contentType+"\n"+date+"\n"+reqUri,
      signature = new Buffer(crypto.createHmac('sha256', secret).update(stringToSign.toString('utf8')).digest('hex')).toString('base64');
    return 'TopPano'+' '+apikey+':'+signature;
  }

  describe('register with a valid Authorization header', function() {

    it('should return success', function(done) {
      var contentType = 'application/json',
          date = new Date();

      request(sails.hooks.http.app)
        .post('/device/register')
        .set('Date', date)
        .set('Content-Type', contentType)
        .set('Authorization', genAuth(apikey, secret, 'POST', contentType, date, '/device/register'))
        .send({serialNum: '12345', firmwareVersion: '0.0.1'})
        .expect(200, done);
    });
  });

  describe('register with an invalid Authorization header', function() {
    it('should return 401 "Authentication failed"', function(done) {
      request(sails.hooks.http.app)
        .post('/device/register')
        .set('Content-Type', 'application/json')
        .set('Authorization', 'ald;kfjadfjoiadjf')
        .send({serialNum: '12345', firmwareVersion: '0.0.1'})
        .expect(401, done);
    });
  });

  describe('register with no Authorization header', function() {
    it('should return 401 "Authentication failed"', function(done) {
      request(sails.hooks.http.app)
        .post('/device/register')
        .set('Content-Type', 'application/json')
        .send({serialNum: '12345', firmwareVersion: '0.0.1'})
        .expect(401, done);
    });
  });

  describe('register with an already registered access key', function() {
    it('should return 409 error code for conflicting registration', function(done) {
      Device.find()
      .where({state: 'active'})
      .limit(10)
      .exec(function(err, devices) {
        if (err) return done(err);
        else if (devices.length === 0) return done('No device record found');
        var device = devices[0],
            contentType = 'application/json',
            date = new Date();
        request(sails.hooks.http.app)
          .post('/device/register')
          .set('Content-Type', contentType)
          .set('Date', date)
          .set('Authorization', genAuth(device.accessKey, device.accessSecretKey, 'POST', contentType, date, '/device/register'))
          .send({serialNum: '12345', firmwareVersion: '0.0.1'})
          .expect(409, done);
      });
    });
  });
});
