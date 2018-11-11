// ====================================================
// UnGravity :: A workout checklist web app
// MVC with MySQL, Node, Express, Handlebars and custom ORM.
// ©2018 Richard Trevillian
// University of Richmond (Virginia)
// Full Stack Developer Bootcamp (July 2018)
// ====================================================
// SERVER.JS - Node.js Express Server configuration
// ====================================================

// require the Express server module
var express = require("express");

// set port to run either on Heroku default or 8080 for localhost
var PORT = process.env.PORT || 8080;

// shorthand handle for running Express module, to access its method
var app = express();

// allow static files (css, js, html) to be served from the PUBLIC folder
app.use(express.static("public"));

// allow Express to parse URLs, and include encoded Arrays and Objects
app.use(express.urlencoded({ extended: true }));
// allow Express to parse JSON body data
app.use(express.json());

// require the Express-version of Handlebars HTML templating engine
var exphbs = require("express-handlebars");

// use express().engine method to set Handlebars as HTML template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// use express().set to Handlebars as the View Engine
app.set("view engine", "handlebars");

// import express.Router() method route definitions exported by items_controller.js
var routes = require("./controllers/items_controller.js");

// tell Express (app) to .use the (routes) exported from items_controller.js
app.use(routes);

// start Express server listening on the PORT(s) defined above
app.listen(PORT, function() {
  // log (server console) confirmation when server starts/restarts
  console.log("Server listening on: http://localhost:" + PORT);
});
