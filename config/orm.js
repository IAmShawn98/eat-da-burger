// Require SQL connection.
const connection = require("./connection");

// Creates a data placeholder for our orm insert.
function createQmarks(num) {
    // Create an empty array.
    var arr = [];
    // Loop through our hum arg.
    for (var i = 0; i < num; i++) {
        // Push "?" into our ary.
        arr.push("?");
    }
    // Return our "arr" in a "string" format.
    return arr.toString();
}

// Translates our true/false BOOL value from an object to a string.
function objToStringVal(obj) {
    // Create an ary.
    var arr = [];
    // Loop through it.
    for (var key in obj) {
        // Create var that will contain object keys of the array.
        var value = obj[key];
        // Push key values to the array.
        arr.push(key + "=" + value);
    }
    // Return the converted value from the populated array into a string.
    return arr.toString();
}

// create our orm object.
var orm = {
    // Select everything currently in the database and display it.
    // All items are sorted by their bool value "true" or "false" (1; 0).
    // True values are in the "Eat-Dem-Burgers" table, while false is in
    // the "Current Burger Orders" table waiting go be devoured (removed).
    selectAll: function (table, cb) {
        // Select Database Table.
        var dbQuery = "SELECT * FROM " + table + ";";

        // Pass our select into a connection query.
        connection.query(dbQuery, function (err, res) {
            // If any error throws, handle it.
            if (err) {
                throw err;
            }
            cb(res);
        });
    },
    // Using our orm method, use "insertOne" to insert one record into the database.
    insertOne: function (table, cols, vals, cb) {
        // SQL statement saying "insert into 'burgers_db' with the value of (?)".
        var dbQuery =
            "INSERT INTO " +
            table +
            " (" +
            cols.toString() +
            ") " +
            "VALUES (" +
            createQmarks(vals.length) +
            ") ";

        // Log the user entered data into the console.
        console.log(dbQuery);

        // Put this data through a connetion query.
        connection.query(dbQuery, vals, function (err, res) {
            // If there are errors, handle it.
            if (err) {
                throw err;
            }
            // Execute response callback.
            cb(res);
        });
    },
    // Move items to the "Burgers Eaten" side if the burger has been devoured.
    updateOne: function (table, objColVals, condition, cb) {
        // SQL statement which updates the value of false to true (from not being in an eaten state, to being in one).
        var dbQuery =
            "UPDATE " +
            table +
            " SET " +
            objToStringVal(objColVals) +
            " WHERE " +
            condition;

        // Log out the SQL statement for debugging.
        console.log(dbQuery);

        // Put the data through a connection query.
        connection.query(dbQuery, function (err, res) {
            // If there are errors, handle them.
            if (err) {
                throw err;
            }
            // Execute Response Callback.
            cb(res);
        });
    },
}

// * Export the ORM object in `module.exports`.
module.exports = orm;