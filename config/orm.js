// Require SQL connection.
const connection = require("./connection");
function createQmarks(num) {
    var arr = [];
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
    return arr.toString();
  }
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
    insertOne: function (table, cols, vals, cb) {
        var dbQuery =
            "INSERT INTO " +
            table +
            " (" +
            cols.toString() +
            ") " +
            "VALUES (" +
            createQmarks(vals.length) +
            ") ";

        console.log(dbQuery);
        connection.query(dbQuery, vals, function (err, res) {
            if (err) {
                throw err;
            }
            cb(res);
        });
    },
}
// * `updateOne()`.
// 'delete()'.

// * Export the ORM object in `module.exports`.
module.exports = orm;