const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Set up options for JWT Strat
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// Create JWT strat (payload = id and timestamp)
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  // see if the user ID in the payload exists in our DB

  // if user does exist, call done

  // it is doesnt, call done w/o user object
  User.findById(payload.sub, function(err, user) {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Tell passport to use this strat
