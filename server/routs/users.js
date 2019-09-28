const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const User = require("../models/Users");

// страница дщпшт будет на стороне сервера некст и с помощью аксиос будет отправлять пост запрос, а здесь сервер будет получать credentials
// если вход удачен по идет перерендер на страницу secret, ее рендерит сервер некст

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/users/login",
    failureFlash: false
  })
);

// роут регистрации

router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;

  User.findOne({ email }).then(user => {
    if (user) {
      // res.redirect("/login");
      //Forbidden
      res.status(403).send({ msg: "Такой емайл зарегестрирован" });
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
              // const { name, email } = user;
              jwt.sign(
                { user: user },
                "privateKey",

                (err, token) => {
                  console.log("token", token);
                  res.json({
                    token
                  });
                }
              );
            })
            .catch(err => {
              console.log(err);
              return;
            });
        });
      });
    }
  });
});

module.exports = router;
