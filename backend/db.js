var mysql = require('mysql')

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'hoangphupy',
  database : 'syllabusDB'
});
connection.connect();
module.exports = connection;