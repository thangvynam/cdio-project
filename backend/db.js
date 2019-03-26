var mysql = require('mysql')

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
<<<<<<< Updated upstream
  password : 'rootroot',
  database : 'syllabusdb'
=======
  password : 'hoangphupy',
  database : 'syllabusDB'
>>>>>>> Stashed changes
});
connection.connect();
module.exports = connection;