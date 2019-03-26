var mysql = require('mysql')

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'hoangphupy',
<<<<<<< HEAD
  database : 'syllabusdb'
=======
  database : 'syllabusDB'
>>>>>>> 2dc88a7a88f8573079e2883d424216e3262ea54f
});
connection.connect();
module.exports = connection;