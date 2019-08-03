// Node Packages.
var express = require('express')
const burgerJS = require("../models/burger.js");

// Use our express app function from our 'server.js' file.
module.exports = function (app) {
    // Define our index route root.
    app.get('/', function (req, res) {
        res.render('./index.handlebars');
    });
}