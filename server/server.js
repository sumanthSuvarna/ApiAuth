var express = require("express");
var app = express();
var api = require("./api/api");
var err = require("./middleware/err");

var config = require("./config/config");
var logger = require("./util/logger");
var auth = require("./auth/routes");

// db.url is different depending on NODE_ENV
require("mongoose").connect(config.db.url, { useNewUrlParser: true });

if (config.seed) {
  require("./util/seed");
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// setup the app middlware
require("./middleware/appMiddlware")(app);

// setup the api
app.use("/api", api);
app.use("/auth", auth);

// set up global error handling
app.use(function(err, req, res, next) {
  // if error thrown from jwt validation check
  console.log(err.name);
  if (err.name === "UnauthorizedError") {
    res.status(401).send("Invalid token");
    return;
  }

  logger.error(err.stack);
  res.status(500).send("Oops");
});

// '/lion' we want to use this router
//app.use('/lions', lionRouter);
//app.use('/tigers', tigerRouter);

module.exports = app;
