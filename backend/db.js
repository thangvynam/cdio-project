var mysql = require('mysql')

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'mug3nnsx',
  database : 'syllabusdb'
});
connection.connect();
module.exports = connection;