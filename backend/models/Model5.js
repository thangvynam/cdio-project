var sql = require('../db');

var Model5 = (data) => {
    this.data = data;
}
Model5.add = (data, result) => {
    data.forEach(function (value, index) {
        let id = value.key;
        let stt = value.key;  // hardcode 
        let titleName = value.titleName;
        let teachingActs =  value.teachingActs;
        let standardOutput =  value.standardOutput;
        let thong_tin_chund_id = 0 // hardcode

        sql.query(`insert into ke_hoach_ly_thuyet(id, stt,ten_chu_de,hoat_dong,thong_tin_chung_id) 
        values ('${id}', '${stt}','${value.titleName}',
        '${teachingActs}','${thong_tin_chund_id}')`,
            (err, res) => {
                if (err) {
                    console.log("error:", err);
                } 
        })

        sql.query(`insert into khlt_has_cdrmh(ke_hoach_ly_thuyet_id,chuan_dau_ra_mon_hoc_id) 
        values ('${id}', '${index}')`,
            (err, res) => {
                if (err) {
                    console.log("error:", err);
                    result(null, err)
                }
        })

        sql.query(`insert into khlt_has_dg(ke_hoach_ly_thuyet_id,danh_gia_id) 
        values ('${id}', '${index}')`,
            (err, res) => {
                if (err) {
                    console.log("error:", err);
                    result(null, err)
                } else {
                    result(null, res);
                }
        })

        sql.query(`insert into khlt_has_hdd(ke_hoach_ly_thuyet_id,hoat_dong_day_id) 
        values ('${id}', '${index}')`,
            (err, res) => {
                if (err) {
                    console.log("error:", err);
                    result(null, err)
                }
        })
        
    });
}

module.exports = Model5;