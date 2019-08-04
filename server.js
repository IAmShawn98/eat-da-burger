// Node Packages.
var express = require("express");
var exphbs = require("express-handlebars");

// Define a new express app.
var app = express();

// Define the port we want to access for our server.
var PORT = process.env.PORT || 3000;

// Serve static content from the "public" folder.
app.use(express.static("public"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Start View Engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Bring in our routes.
require("./controllers/burgers_controller.js")(app);

// Start server.
app.listen(PORT, function () {
  // Let us know the server has started successfully.
  console.log("Server listening on: http://localhost:" + PORT);
});