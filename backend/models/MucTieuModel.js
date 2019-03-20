var sql = require('../db');

var MucTieuModel = (muc_tieu, mo_ta, cdr) => {
    this.muc_tieu = muc_tieu;
    this.mo_ta = mo_ta;
    this.cdr = cdr;
}

MucTieuModel.save = (data, result) => {
    sql.query(`insert into muc_tieu_mon_hoc(muc_tieu, mo_ta, thong_tin_chung_id) values ('${data.objectName}', '${data.description}', 1)`, 
      (err, res) => {
        if (err) {
            console.log("error:", err);
            result(err)
        } else {
            result(res);
        }
    })
    
}

MucTieuModel.get = (result) => {
    sql.query("select * from muc_tieu_mon_hoc",
      (err, res) => {
        if(err) {
            result(err);
        }
        else{          
         result(res[0]);
        }
      })
}

module.exports = MucTieuModel;