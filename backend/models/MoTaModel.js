var sql = require('../db');

var MoTaModel = (desc) => {
    this.description = desc;
}

MoTaModel.add = (desc, result) => {
    sql.query("delete from mo_ta_mon_hoc");
    sql.query(`insert into mo_ta_mon_hoc(id, noi_dung, thong_tin_chung_id) values (1, '${desc}', 1)`, 
      (err, res) => {
        if (err) {
            console.log("error:", err);
            result(null, err)
        } else {
            result(null, res);
        }
    })
}

module.exports = MoTaModel;