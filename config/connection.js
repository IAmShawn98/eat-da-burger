var mysql = require("mysql");

connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "burgers_db",
    socketPath: '/var/run/mysqld/mysqld.sock'
});

connection.connect(function(err) {
    if (err) {
        console.error("Error connecting " + err.stack);
        return;
    }
    console.log("Connected as id " + connection.threadId)
})

module.exports = connection;