var mysql = require("mysql");
var pool = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Yash@123",
  database: "movies",
  multipleStatements: true,
});
module.exports = pool;