var sql = require('../db');
var DanhMucModel = () => {

}
DanhMucModel.add = (body, result) => {
    console.log(body)
    let keyItem = parseInt(body.keyItem);
    let value = body.value;

    if (value === '') {
        return;
    }
    switch (keyItem) {
        // LT
        case 1: {
            sql.query(`insert into hoat_dong_day(hoat_dong,loai_hoat_dong,danh_muc)
            values ( '${value}','LT',1) `,
                (err, res) => {
                    if (err) {
                        console.log(err);
                        result(err)
                    }
                    result(res)
                })
        }
        //TH 
        case 2:
        default: return;
    }

}

module.exports = DanhMucModel;