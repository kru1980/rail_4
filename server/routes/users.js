const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const passport = require("passport");

const User = require("../models/Users");

// страница дщпшт будет на стороне сервера некст и с помощью аксиос будет отправлять пост запрос, а здесь сервер будет получать credentials
// если вход удачен по идет перерендер на страницу secret, ее рендерит сервер некст

// 1 вариант
// router.post(
//   // path="/users/login" on server
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/secret",
//     failureRedirect: "/login",
//     failureFlash: false
//   })
// );
// 2 вариант входа

router.post("/login", passport.authenticate("local"), function(req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  // res.redirect('/users/' + req.user.username);
  // console.log("req.sesion server user/login", req.session);
  // console.log("req.user from server user/login", req.user);

  res.json({ message: "ok ты вошел на сайт" });
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
