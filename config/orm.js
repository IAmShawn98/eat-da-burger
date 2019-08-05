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

// create our orm object.
var orm = {
    // * `selectAll()`.
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
}
// * `updateOne()`.
// 'delete()'.

// * Export the ORM object in `module.exports`.
module.exports = orm;