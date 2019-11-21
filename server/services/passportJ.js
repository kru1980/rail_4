const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../models/Users");

module.exports = function(passport) {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "jwtsecret"
  };
  passport.use(
    new JwtStrategy(jwtOptions, function(payload, done) {
      User.findById(payload.id, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      });
    })
  );
};
