var sql = require('../db');

var Model4 = (data) => {
    this.data = data;
}

Model4.save = (data, result) => {
    sql.query(`update chuan_dau_ra_mon_hoc set del_flag = 1 where thong_tin_chung_id = ${data.thong_tin_chung_id}`);
    for(let i = 0;i < data.data.length;i++) {
        
        if(data.data[i].muc_tieu_mon_hoc_id !== -1 && data.data[i].cdrmh_muc_do_hanh_dong_id !== -1) {
            sql.query(`insert into chuan_dau_ra_mon_hoc(chuan_dau_ra, mo_ta, muc_do, muc_tieu_mon_hoc_id, cdrmh_muc_do_hanh_dong_id, thong_tin_chung_id) values ('${data.data[i].cdr}', '${data.data[i].description}', '${data.data[i].levels.toString()}',
            ${data.data[i].muc_tieu_mon_hoc_id}, ${data.data[i].cdrmh_muc_do_hanh_dong_id}, ${data.thong_tin_chung_id})`,
             (err, res) => {
               if (err) {
                   console.log("error:", err);
                   result(null, err)
               } else {
                   result(null, res);
               }
           })
        }
    }
    
}

Model4.collectdata = (data, result) => {
    sql.query(`SELECT * FROM chuan_dau_ra_mon_hoc where del_flag = 0 && thong_tin_chung_id = ${data.thong_tin_chung_id}`, (err, res) => {
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
    sql.query("SELECT id, ma_so, ten_mon_hoc_tv FROM thong_tin_chung where del_flag = 0", (err, res) => {
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
    sql.query(`select id from thong_tin_chung where ma_so = ${data.ma_so} && del_flag = 0`,
      (err, res) => {
        if (err) {
            console.log("error:", err);
            result(null, err)
        } else {
            result(null, res);
        }
    })
}

Model4.collectmtmh = (data, result) => {
    sql.query(`select id, muc_tieu from muc_tieu_mon_hoc where del_flag = 0 && thong_tin_chung_id = ${data.thong_tin_chung_id}`,
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