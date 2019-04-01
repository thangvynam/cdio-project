var mysql = require('mysql')

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
<<<<<<< HEAD
  password : 'hoangphupy',
=======
  password : 'rootroot',
>>>>>>> a8b901291f2cc06e6a5a5cc5d06f2ee319a940ee
  database : 'syllabusdb'
});
connection.connect();
module.exports = connection;