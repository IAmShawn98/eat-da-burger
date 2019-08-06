// Node Packages.
var express = require('express')
const burger = require("../models/burger.js");

module.exports = function (app) {
    app.get("/", function (req, res) {
        burger.selectAll(function (data) {
            var barzObject = {
                burgers: data
            };
            console.log(barzObject);
            res.render("index", barzObject);
        });
    });
    app.post("/api/burgers", function (req, res) {
        burger.insertOne(
            ["burger_name", "devoured"],
            [req.body.burger_name, req.body.devoured],
            function (result) {
                // Send back the ID of new burger
                res.json({ id: result.insertId });
            }
        );
    });
    app.put("/api/burgers/:id", function (req, res) {
        var condition = "id = " + req.params.id;

        console.log("condition", condition);

        burger.updateOne({ devoured: req.body.devoured }, condition, function (
            result
        ) {
            if (result.changedRows === 0) {
                return res.status(404).end();
            } else {
                return res.status(200).end();
            }
        });
    });
}