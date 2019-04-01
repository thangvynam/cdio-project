var mysql = require('mysql')

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'hoangphupy',
  database : 'syllabusdb'
});
connection.connect();
module.exports = connection;