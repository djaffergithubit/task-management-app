const mysql = require('mysql2')

// Create MySQL connection
exports.connection = mysql.createConnection({
    host: 'localhost', // or your MySQL host
    user: 'root', // your MySQL username
    password: 'dkloa123', // your MySQL password
    database: 'tasks_db' // your MySQL database name
});