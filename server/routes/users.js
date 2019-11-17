const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const passport = require("passport");
const bodyParser = require("body-parser");
const User = require("../models/Users");

// роут входа
router.post("/login", passport.authenticate("local"), function(req, res) {
  const user = { email: req.body.email };
  res.json({ message: "ok ты вошел на сайт", user });
});

// роут выхода
router.get("/logout", function(req, res) {
  req.logout(); // убивает req.user
  res.json({ message: "ok ты вышел" });
});

// роут регистрации
router.post("/registration", (req, res) => {
  const { name, email, password, password2 } = req.body;

  User.findOne({ email }).then(user => {
    if (user) {
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
