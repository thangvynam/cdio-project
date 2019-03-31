var mysql = require('mysql')

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
<<<<<<< HEAD
  password : 'hoangphupy',
=======
  password : 'mug3nnsx',
>>>>>>> cab1a0e280588a745e977973ca4ab4fb24746974
  database : 'syllabusdb'
});
connection.connect();
module.exports = connection;