/**
 * Device Model
 */
var device = {
  schema: true,
  connection: '',
  attributes: {
    accessKey: { type: 'alphanumericdashed', require: true, unique: true },
    accessSecretKey: { type: 'alphanumericdashed', require: true },
    state: { type: 'string', enum: ['pending', 'active'], defaultsTo: 'pending' },
    serialNum: { type: 'string' },
    firmwareVersoin: { type: 'string' }
  }
};

module.exports = device;
