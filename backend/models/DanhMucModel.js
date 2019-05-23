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
                    return result(res)
                })
                break;
        }
        //TH 
        case 2:{
            sql.query(`insert into hoat_dong_day(hoat_dong,loai_hoat_dong,danh_muc)
            values ( '${value}','TH',1) `,
                (err, res) => {
                    if (err) {
                        console.log(err);
                        result(err)
                    }
                    return result(res)
                })
                break;
        }
        default: return;
    }

}

DanhMucModel.get = (result) => {
    query("SELECT * FROM `hoat_dong_day` WHERE `danh_muc` = 1")
        .then(res => {
            result(res);
        })
}

DanhMucModel.deleteById = (body,result)=>{

    body.forEach((item,_)=>{
        let table = "";
        if(item.type === "LT") table = "khlt_has_hdd"
        else table = "khth_has_hdd";
    
        query(`DELETE FROM ${table} WHERE hoat_dong_day_id = ${item.id}`).then(res=>{
            query(`DELETE FROM hoat_dong_day WHERE id = ${item.id}`).then(res=>{
            })
        })
    })
    result("1");
   
}

DanhMucModel.update = (body,result)=>{

    query(`UPDATE hoat_dong_day SET hoat_dong = '${body.hoat_dong}' WHERE id = ${body.id}`).then(res=>{
       result("1");
    })
}

module.exports = DanhMucModel;