const jwt = require('jwt-simple');
const config = require('../config');
const User = require('../models/user');

function toeknForUser(user) {
  const timestamp = new Date().getTime();
  // sub = subject which refers to specific user
  // iat = issued at time
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide an email and a password' });
  }

  // see if a user w/ given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    // if a user w/ email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // if a user w/ new email, create and save user record
    const user = new User({
      email: email,
      password: password
    });
    user.save(function(err) {
      if (err) { return next(err); }

      // respond to req indicating user was created
      res.json({ token: tokenForUser(user) });
    });
  });
}
