var mysql = require('mysql')

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'mug3nnsx',
  database : 'syllabusDB'
});
connection.connect();
module.exports = connection;