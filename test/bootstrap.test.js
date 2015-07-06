var Sails = require('sails');

// Global before hook
before(function(done) {
  // Lift Sails with test database
  Sails.lift({
    log: {
      level: 'error'
    },
    models: {
      connection: 'test',
      migrate: 'drop'
    }
  }, function(err, server) {
    if (err) return done(err);
    done(null, server);
  });
});


// Global after hook
after(function(done) {
  console.log(); // Skip a line before displaying Sails lowering logs
  Sails.lower(done);
});
