var sql = require('../db');

var Model4 = (data) => {
    this.data = data;
}

Model4.add = (data, result) => {
    // sql.query(`delete from chuan_dau_ra_mon_hoc where chuan_dau_ra = ${data.cdr}`);

    sql.query(`insert into chuan_dau_ra_mon_hoc(chuan_dau_ra, mo_ta, muc_do, muc_tieu_mon_hoc_id, cdrmh_muc_do_hanh_dong_id, thong_tin_chung_id) values ('${data.cdr}', '${data.description}', '${data.levels.toString()}', 1, 1, 1)`,
      (err, res) => {
        if (err) {
            console.log("error:", err);
            result(null, err)
        } else {
            result(null, res);
        }
    })
}

module.exports = Model4;