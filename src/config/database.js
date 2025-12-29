const mysql = require("mysql2/promise");
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123456a@",
    database: "todo",
    waitForConnections: true,
    connectionLimit: 10, // số lượng kết nối tối đa
    queueLimit: 0,
});
module.exports = pool;
