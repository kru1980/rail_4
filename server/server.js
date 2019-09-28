const express = require("express");
const next = require("next");
const routes = require("../routes");
const passport = require("passport");
const bodyParser = require("body-parser");

const session = require("express-session");
const FileStore = require("session-file-store")(session);
const mongoose = require("mongoose");

// passport config
require("./services/passport")(passport);

const port = parseInt(process.env.PORT, 10) || 3000;

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = routes.getRequestHandler(app);

mongoose
  .connect("mongodb://localhost/next-dev", {
    // useMongoClient: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("db connected..");
  })
  .catch(err => console.log(err));

mongoose.Promise = global.Promise;

app.prepare().then(() => {
  const server = express();
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());
  server.use(
    session({
      secret: "keyboard cat",
      resave: true,
      saveUninitialized: true
    })
  );

  server.use(passport.initialize());
  server.use(passport.session());
  server.use("/users", require("./routs/users")); // подкл роут юзера

  server.get("/v1/secret", (req, res) => {
    return res.send("ok secret rout");
  });
  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.use(handle).listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
