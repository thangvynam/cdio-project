var sql = require('../db');

var Model5 = (data) => {
    this.data = data;
}
Model5.add = (data, result) => {
    data.forEach(function (value, index) {
        let teachingActs =  value.teachingActs;
        //let standardOutput =  value.standardOutput;
        sql.query(`insert into ke_hoach_ly_thuyet(id, stt,ten_chu_de,hoat_dong,thong_tin_chung_id) 
        values ('${value.key}', '${value.key}','${value.titleName}',
        '${teachingActs}',
        '0')`,
            (err, res) => {
                if (err) {
                    console.log("error:", err);
                    result(null, err)
                } else {
                    result(null, res);
                }
            })
        
    });
    console.log(result);
}

module.exports = Model5;