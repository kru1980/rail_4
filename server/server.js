const express = require("express");
const next = require("next");
const routes = require("../routes"); // next routes
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = require("./config/db");
const config = require("./config/config");

// const MongoStore = require("connect-mongo")(session);
// const session = require("express-session");
// 1 подкл паспорт
const passport = require("passport");

// passport config подключение стратегии
// require("./services/passport")(passport);

// 2 подкл стратегию паспорт
require("./services/passportJ")(passport);
// require("./services/passportJwt")(passportJwt);

const port = parseInt(process.env.PORT, 10) || 3000;

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = routes.getRequestHandler(app);

// подкл базы
mongoose
  .connect(db.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("db connected..");
  })
  .catch(err => console.log(err));

mongoose.Promise = global.Promise;
// mongoose.set("debug", true);

// server next
app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.urlencoded({ extended: false })); // тк через  axios то false
  server.use(bodyParser.json());

  server.use(passport.initialize());
  // server.use(passport.session());

  server.use(function(req, res, next) {
    console.log("req.headers.cookies", req.headers.cookie);
    next();
  });

  server.use("/users", require("./routes").auth); // подкл роут юзера

  // хранилище секретных данных
  server.get("/v1/secret", (req, res) => {
    return res.send("ok secret rout");
  });

  server.get(
    "/secret1",
    passport.authenticate("jwt", { session: false }),
    function(req, res) {
      console.log("/secret route должен паспорт добавить", req.user);

      res.json("ok");
    }
  );

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  // catch 404 and forward to error handler
  server.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
  });

  // error handler
  // eslint-disable-next-line no-unused-vars
  server.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.render("error", {
      message: error.message,
      error: !config.IS_PRODUCTION ? error : {}
    });
  });

  server.use(handle).listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
