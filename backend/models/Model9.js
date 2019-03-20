var sql = require('../db');

var Model9 = (data) => {
    this.data = data;
}
Model9.add = (data, result) => {
    sql.query(`insert into quy_dinh_chung(noi_dung,thong_tin_chung_id) values ('${data.content}',${data.thong_tin_chung_id})`, 
      (err, res) => {
        if (err) {
            console.log("error:", err);
            result(err,null)
        } else {
            result(null, res);
        }
    })
        
    
}

module.exports = Model9;