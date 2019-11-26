const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const User = require("../models/Users");

router.get("/logout", function(req, res) {
  console.log(" сущ или нет req.logout() =", typeof req.logout());

  req.logout(); // убивает req.user которого не было и ф-ю Authenticated
  res.json({ message: "ok ты вышел" });
});

router.post("/login", function(req, res) {
  const { email, password } = req.body;
  console.log("req.body=", req.body);

  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        // обработать ошибку, а то херню пишет
        TODO: res.status(401).json({ message: "юзер не найден в базе" });
      }
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          const payload = {
            id: user._id,
            displayName: user.name,
            email: user.email
          };
          const token = jwt.sign(
            payload,

            "jwtsecret"
          );
          res.json({ message: "credentials =true, высылаю токен", token });
        } else {
          res.json({ message: "Пароль не правильные" });
        }
      });
    })
    .catch(err => console.log(err));
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
