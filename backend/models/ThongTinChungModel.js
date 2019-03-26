var sql = require('../db');

const collect = (id, result) => {
    console.log(id.id)
    sql.query(`select * from thong_tin_chung where id = ${id.id} and del_flag = 0`,
        (err, res) => {
            if (err) {
                result(err);
            }
            else {
                result(res[0]);
            }
        })
}

const add = (id, desc, result) => {
    console.log(id.id);
    let sql1 = `UPDATE thong_tin_chung SET ten_mon_hoc_tv=?, ten_mon_hoc_ta=?, ma_so=?, khoi_kien_thuc=?, so_tin_chi=?, so_tiet_ly_thuyet=?, so_tiet_thuc_hanh=?, so_tiet_tu_hoc=?, cac_mon_hoc_tien_quyet = ? WHERE id = ? and del_flag = 0`;
    let data = [desc.tenMonHocTV, desc.tenMonHocTA, desc.maMonHoc, desc.khoiKienThuc, desc.soTinChi, desc.tietLyThuyet, desc.tietThucHanh, desc.tietTuHoc, desc.monTienQuyet, id.id];
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