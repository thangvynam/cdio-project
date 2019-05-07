var mysql = require('mysql')

var connection = mysql.createConnection({


  host     : 'db4free.net',
  user     : 'syllabus_db',
  password : 'Aa123456',
  database : 'syllabus_db'
  // host     : 'localhost',
  // user     : 'root',
  // password : 'hoangphupy',
  // database : 'syllabusdb'

});
connection.connect();
module.exports = connection;