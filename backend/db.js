var mysql = require('mysql')

var connection = mysql.createConnection({
  // host     : 'db4free.net',
  // user     : 'syllabus_db',
  // password : 'Aa123456',
  // database : 'syllabus_db'

  host     : '172.29.64.132',
  user     : 'namtv',
  password : 'Aa123456',
  database : 'cdio_db'

});
connection.connect();
module.exports = connection;