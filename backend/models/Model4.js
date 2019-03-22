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

Model4.collectdata = (result) => {
    sql.query("SELECT * FROM chuan_dau_ra_mon_hoc", (err, res) => {
        if (err) {
            console.log("error:", err);
            result(null, err)
        } else {
            result(null, res);
        }
    })
}

Model4.collectcdrmdhd = (result) => {
    sql.query("SELECT * FROM cdrmh_muc_do_hanh_dong", (err, res) => {
        if (err) {
            console.log("error:", err);
            result(null, err)
        } else {
            result(null, res);
        }
    })
}

Model4.collectsubjectlist = (result) => {
    sql.query("SELECT ma_so, ten_mon_hoc_tv FROM thong_tin_chung where del_flag = 0", (err, res) => {
        if (err) {
            console.log("error:", err);
            result(null, err)
        } else {
            result(null, res);
        }
    })
}

Model4.addsubject = (data, result) => {
    sql.query(`insert into thong_tin_chung(ten_mon_hoc_tv, ten_mon_hoc_ta, ma_so, khoi_kien_thuc, so_tin_chi, so_tiet_ly_thuyet, 
        so_tiet_thuc_hanh, so_tiet_tu_hoc, cac_mon_hoc_tien_quyet) values ('${data.ten_mon_hoc_tv}', '', 
        '${data.ma_so}', '', 0, 0, 0, 0, '')`,
      (err, res) => {
        if (err) {
            console.log("error:", err);
            result(null, err)
        } else {
            result(null, res);
        }
    })
}

Model4.deletesubject = (data, result) => {
    sql.query(`update thong_tin_chung set del_flag = 1 where ma_so = ${data.ma_so}`,
      (err, res) => {
        if (err) {
            console.log("error:", err);
            result(null, err)
        } else {
            result(null, res);
        }
    })
}

Model4.editsubject = (data, result) => {
    sql.query(`update thong_tin_chung set ma_so = ${data.ma_so_editted}, ten_mon_hoc_tv = '${data.ten_mon_hoc_tv}' where ma_so = ${data.ma_so}`,
      (err, res) => {
        if (err) {
            console.log("error:", err);
            result(null, err)
        } else {
            result(null, res);
        }
    })
}

Model4.collectsubjectid = (data, result) => {
    sql.query(`select id from thong_tin_chung where ma_so = ${data.ma_so}`,
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