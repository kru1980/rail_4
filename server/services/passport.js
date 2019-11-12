const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const User = require("../models/Users");

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email }).then(user => {
        if (!user) {
          console.log("юзер не найден в базе");

          return done(null, false, { message: "Юзер не найден" });
        }

        // return done(null, user);
        // если юзер есть то необходимо сравнить его посоленый пароль с паролем из поля ввода

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: "Пароль не правильные" });
          }
        });
      });
    })
  );
  passport.serializeUser(function(user, done) {
    console.log("сработал  passport.serializeUser");
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    console.log("сработал  passport.deserializeUser");
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
