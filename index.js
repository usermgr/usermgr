"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const Controller = require('./lib/controller');
const app = express();

// Add Body Parser
app.use(bodyParser.urlencoded({extended: true}));

// Remove the X-Powered-By header
app.disable('x-powered-by');

// Enable Compression
app.use(require('compression')());

// Set Access-Control
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//   res.header("Access-Control-Allow-Headers", "*");
//   next();
// });

// We only support json
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.set('Content-Type', 'application/json; charset=utf-8');
  next();
});

// Now let's make some routes
app.post("/login", Controller.login);
app.get("/verifyLoginCode", Controller.verifyLoginCode);
app.get("/auth", Controller.authentication)
app.delete("/session", Controller.removeSession)

app.get("/user", Controller.getUser);

// Ok, that's enough!
app.listen(process.env.PORT);
