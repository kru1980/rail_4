const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const passport = require("passport");

const User = require("../models/Users");

router.post("/login", passport.authenticate("local"), function(req, res) {
  console.log("req.user=", req.user);
  console.log("req.session=", req.session);
  const user = req.user;
  const payload = {
    id: user._id,
    displayName: user.name,
    email: user.email
  };
  const token = jwt.sign(payload, "jwtsecret");

  // jwt.sign(payload, "jwtsecret", { algorithm: "RS256" }, function(err, token) {
  //   if (err) {
  //     res.status(403);
  //   }
  //   console.log("token=", token);
  //   res.json({ message: "ok", token });
  // });
  res.json({ message: "ok", token });
});

// роут регистрации
router.post("/registration", (req, res) => {
  const { name, email, password, password2 } = req.body;
  //  Делаем проверку естьли юзер, создаем или отпр на клиента сообщ что юзер зареган или ошибка сервера

  User.findOne({ email }).then(user => {
    if (user) {
      // res.redirect("/login");
      //Forbidden
      res.status(403).json({ message: "Такой емайл зарегистрирован" });
    } else {
      const newUser = new User({
        name,
        email,
        password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              const { name, email } = user;
              res.json(JSON.stringify({ name, email }));
            })
            .catch(err => {
              res.status(449).send("повторить с");
            });
        });
      });
    }
  });
});

module.exports = router;
