var sql = require('../db');

const collect = (result) => {
    sql.query("SELECT * FROM thong_tin_chung", (err, res) => {
        if (err) {
            console.log("error:", err);
            result(null, err)
        } else {
            result(null, res);
        }
    })
}

const add = (desc, result) => {
    //sql.query(`update into thong_tin_chung(ten_mon_hoc_tv, ten_mon_hoc_ta, ma_so, khoi_kien_thuc, so_tin_chi, so_tiet_ly_thuyet, so_tiet_thuc_hanh, so_tiet_tu_hoc, cac_mon_hoc_tien_quyet) values ('${desc.ten_mon_hoc_tv}', '${desc.ten_mon_hoc_ta}', '${desc.ma_so}', '${desc.khoi_kien_thuc}', ${desc.so_tin_chi}, ${desc.so_tiet_ly_thuyet}, ${desc.so_tiet_thuc_hanh}, ${desc.so_tiet_tu_hoc}, '${desc.cac_mon_hoc_tien_quyet}')`, 
    //sql.query(`update into thong_tin_chung(ten_mon_hoc_tv, ten_mon_hoc_ta, ma_so, khoi_kien_thuc, so_tin_chi, so_tiet_ly_thuyet, so_tiet_thuc_hanh, so_tiet_tu_hoc, cac_mon_hoc_tien_quyet) values ('${desc.ten_mon_hoc_tv}', '${desc.ten_mon_hoc_ta}', '${desc.ma_so}', '${desc.khoi_kien_thuc}', ${desc.so_tin_chi}, ${desc.so_tiet_ly_thuyet}, ${desc.so_tiet_thuc_hanh}, ${desc.so_tiet_tu_hoc}, '${desc.cac_mon_hoc_tien_quyet}')`, 
    let sql1 = `UPDATE thong_tin_chung SET ten_mon_hoc_tv=?, ten_mon_hoc_ta=?, ma_so=?, khoi_kien_thuc=?, so_tin_chi=?, so_tiet_ly_thuyet=?, so_tiet_thuc_hanh=?, so_tiet_tu_hoc=?, cac_mon_hoc_tien_quyet = ? WHERE id = ?`;
    let data = [desc.ten_mon_hoc_tv, desc.ten_mon_hoc_ta, desc.ma_so, desc.khoi_kien_thuc, desc.so_tin_chi, desc.so_tiet_ly_thuyet, desc.so_tiet_thuc_hanh, desc.so_tiet_tu_hoc, desc.cac_mon_hoc_tien_quyet, 1];
    sql.query(sql1, data, (err, res) => {
        if (err) {
            console.log("error:", err);
            result(null, err)
        } else {
            result(null, res);
        }
    })
}

module.exports = {
    collect,
    add
};