const mysql = require("mysql");

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

con.connect((err) => {
    if (err) {
        console.log("Error connecting to Db");
        return;
    }
    console.log("Connection established");
});

// con.end((err) => {
//     // The connection is terminated gracefully
//     // Ensures all remaining queries are executed
//     // Then sends a quit packet to the MySQL server.
//   });

module.exports = con;
