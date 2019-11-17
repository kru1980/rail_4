const express = require("express");
const next = require("next");

const routes = require("../routes"); // next routes

const bodyParser = require("body-parser");

const passport = require("passport");

const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo")(session);

const db = require("./config/db");
const config = require("./config/config");

// passport config подключение стратегии
require("./services/passport")(passport);

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

// server next
app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.urlencoded({ extended: false })); // тк через  axios то false
  server.use(bodyParser.json());

  // session
  server.use(
    session({
      secret: config.SESSION_SECRET,
      resave: true,
      saveUninitialized: true,
      store: new MongoStore({
        mongooseConnection: mongoose.connection
      }),
      expires: 180000000000000000
      // expires: new Date(Date.now() + 60 * 60 * 24 * 30)
    })
  );
  // подкл паспорта
  server.use(passport.initialize());
  server.use(passport.session());

  server.use("/users", require("./routes").auth); // подкл роут юзера

  // хранилище секретных данных
  server.get("/v1/secret", (req, res) => {
    return res.send("ok secret rout");
  });

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
