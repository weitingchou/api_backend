/**
 * Device Model
 */
var device = {
  schema: true,
  attributes: {
    accessKey: { type: 'alphanumericdashed', required: true, unique: true },
    accessSecretKey: { type: 'alphanumericdashed', required: true },
    state: { type: 'string', enum: ['pending', 'active'], defaultsTo: 'pending' },
    serialNum: { type: 'string' },
    firmwareVersion: { type: 'string' },

    // Associate every device with one, and only one, user.
    //user: { model: 'User', required: true }
  }
};

module.exports = device;
