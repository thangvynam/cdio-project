var sql = require('../db');

var Model8 = (data) => {
    this.data = data;
}


Model8.getLoaiTaiNguyen = (result) => {
    sql.query(`select * from tnmh_loai_tai_nguyen where del_flag = 0`, (err, res) => {
        if (err) {
            console.log("err: ", err);
            return result(err, null);
        }
        else
            return result(null, res);
    });
}

Model8.getTaiNguyenMonHoc = (id, result) => {
    sql.query(`select * from tai_nguyen_mon_hoc where thong_tin_chung_id = ${id.id} and del_flag = 0`, (err, res) => {
        if (err) {
            console.log("err: ", err);
            return result(err, null);
        }
        else
            return result(null, res);
    });
}

Model8.save = (data, result) => {
    // console.log(data);
    for (let i = 0; i < data.description.length; i++) {
        for (let j = 0; j < data.loaitainguyen.length; j++) {
            if (data.description[i].loai === data.loaitainguyen[j].loai) {
                data.description[i].loai = data.loaitainguyen[j].id;
                break;
            }
        }
    }

    if (data.description.length === 0) return result(null, "1");
    
    data.description.forEach((item, _) => {
        if (item.id === -1 && item.del_flag === 1) return;
        if (item.id === -1) {
            //insert new item
            sql.query(`insert into tai_nguyen_mon_hoc(mo_ta,lien_ket,tnmh_loai_tai_nguyen_id,thong_tin_chung_id,del_flag) values ('${item.mota}','${item.link}','${item.loai}',${data.id},0)`,
                (err, res) => {
                    if (err) {
                        console.log("Error save data in model 8 : ", err);
                        result(null, err)
                    } else {
                        result(null, res);
                    }
                })
        }else{
            if(item.link === null){
                sql.query(`update tai_nguyen_mon_hoc set mo_ta=${item.mota},tnmh_loai_tai_nguyen_id=${item.loai},del_flag = ${item.del_flag} where thong_tin_chung_id = ${data.id} and id = ${item.id}`, (err, res) => {
                    if (err) {
                        console.log("err: ", err);
                        return result(err, null);
                    }
                });
            }else{
            sql.query(`update tai_nguyen_mon_hoc set mo_ta=${item.mota}, lien_ket='${item.link}',tnmh_loai_tai_nguyen_id=${item.loai},del_flag = ${item.del_flag} where thong_tin_chung_id = ${data.id} and id = ${item.id}`, (err, res) => {
                if (err) {
                    console.log("err: ", err);
                    return result(err, null);
                }
            });
        }
        }
    })


    result(null,"1");
    // sql.query(`update tai_nguyen_mon_hoc set del_flag = 1 where thong_tin_chung_id = ${data.id}`,(err,res) => {
    //     if(err){
    //         console.log("err: ",err);
    //         return result(err,null);
    //       }
    // });
    // for(let i=0;i<data.description.length;i++){
    //     sql.query(`insert into tai_nguyen_mon_hoc(mo_ta,lien_ket,tnmh_loai_tai_nguyen_id,thong_tin_chung_id,del_flag) values ('${data.description[i].mota}','${data.description[i].link}','${data.description[i].loai}',${data.id},0)`,
    //     (err,res) => {
    //         if(err) {
    //             console.log("Error save data in model 8 : ", err);
    //             result(null,err)
    //         }else{
    //             result(null,res);
    //         }
    //     })
    // }

}

Model8.getChude = (result) => {
    sql.query(`select * from chu_de_danh_gia where del_flag = 0`, (err, res) => {
        if (err) {
            console.log("err: ", err);
            return result(err, null);
        }
        else {

            return result(null, res);
        }
    });
}

module.exports = Model8;