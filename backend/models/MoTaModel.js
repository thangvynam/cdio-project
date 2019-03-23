var sql = require('../db');

var MoTaModel = (desc) => {
    this.description = desc;
}

MoTaModel.save = (data, result) => {
    sql.query(`update mo_ta_mon_hoc set del_flag = 1 where thong_tin_chung_id = ${data.id}`);
    sql.query(`insert into mo_ta_mon_hoc(noi_dung, thong_tin_chung_id) values ('${data.description}', ${data.id})`, 
      (err, res) => {
        if (err) {
            console.log("error:", err);
            result(null, err)
        } else {
            result(null, res);
        }
    })
}

MoTaModel.get = (id, result) => {
    sql.query(`select * from mo_ta_mon_hoc where thong_tin_chung_id = ${id.id} and del_flag = 0`,
      (err, res) => {
        if(err) {
            result(err);
        }
        else{   
         result(res[0]);
        }
      })
}

module.exports = MoTaModel;