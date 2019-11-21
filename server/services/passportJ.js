const passport = require("passport");

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../models/Users");

module.exports = function(passport) {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "jwtsecret"
  };

  const strategy = new JwtStrategy(jwtOptions, function(payload, done) {
    // поиск в базе по ид
    User.findById({ id: payload.id }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  });
  passport.use(strategy);
};
