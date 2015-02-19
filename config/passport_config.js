var passport = require('passport'),
    config = require('config'),
    BasicStrategy = require('passport-http').BasicStrategy,
    User = require('../model/User')

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new BasicStrategy(
  function(username, password, done) {
    User.findOne({username: username}, function(err, user){
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.validPassword(password)) { return done(null, false); }
      return done(null, user);
    })
  }
));

module.exports = function PassportConfig(server) {
  server.use(passport.initialize());

  if (config.passport_session) {
    server.use(passport.session());
    server.use(passport.authenticate('basic', { session: true }));
  } else {
    server.use(passport.authenticate('basic', { session: false }));
  }
}