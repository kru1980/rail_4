const passport = require("passport");

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const User = require("../models/Users");

const cookieExtractor = function(req) {
  var token = null;
  if (req && req.cookie) {
    token = req.cookie["jwt"].split("=")[1];
  }
  console.log("extractor cookie from header", token);

  return token;
};

module.exports = function(passport) {
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "jwtsecret",
    jsonWebTokenOptions: { maxAge: 1000 * 60 }
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
