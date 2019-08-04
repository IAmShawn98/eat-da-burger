// Require SQL connection.
const connection = require("./connection");

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
    insertOne: function (cols, vals, cb) {
        orm.insertOne("burgers", cols, vals, function (res) {
            cb(res);
        });
    }
}
// * `updateOne()`.
// 'delete()'.

// * Export the ORM object in `module.exports`.
module.exports = orm;