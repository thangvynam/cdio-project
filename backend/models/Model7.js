var sql = require('../db');

var Model7 = (data) => {
    this.data = data;
}

Model7.addDanhGia = (data, result) => {
    // sql.query(`delete from chuan_dau_ra_mon_hoc where chuan_dau_ra = ${data.cdr}`);
    sql.query(`INSERT INTO danh_gia (ma, ten, mo_ta, ti_le, thong_tin_chung_id, chu_de_danh_gia_id, del_flag) VALUES ('${data.mathanhphan}', '${data.tenthanhphan}', '${data.mota}', '${data.tile}', '${data.thong_tin_chung_id}', '${data.chu_de_danh_gia_id}', '0')`,
    (err,res) => {
        if(err) {
            console.log("Error model 7 : ", err);
            result(null,err)
        }else{
            result(null,res);
        }
    })
}

Model7.getChude = (result) => {
    sql.query(`select * from chu_de_danh_gia where del_flag = 0`,(err,res)=>{
        if(err){
          console.log("err: ",err);
          return result(err,null);
        }
        else
        //console.log("result: ",res);
        return result(null,res);
      });
}


Model7.getDanhGia = (id,result) => {
    sql.query(`select * from danh_gia where thong_tin_chung_id = ${id.id} and del_flag = 0`,(err,res)=>{
        if(err){
          console.log("err: ",err);
          return result(err,null);
        }
        else
            return result(null,res);
      });
}

Model7.getChuanDaura = (id,result) => {
    sql.query(`select * from cdrmh_has_dg where danh_gia_id = ${id.id} and del_flag =0 `,(err,res) => {
        if(err){
            console.log("err: ",err);
            return result(err,null);
          }
          else
              return result(null,res);
        });
}


Model7.getStandardOutput = (id,result)=>{
    sql.query(`SELECT id,muc_tieu FROM muc_tieu_mon_hoc WHERE thong_tin_chung_id = ${id.id} AND del_flag = 0`,(err,listMT)=>{
      if(err){
        console.log("err: ",err);
        return result(err,null);
      }
      else{
        let standardOutput = [];
        listMT.forEach((muctieu,index)=>{
          sql.query(`SELECT id,chuan_dau_ra FROM chuan_dau_ra_mon_hoc
          WHERE muc_tieu_mon_hoc_id = ${muctieu.id} AND del_flag = 0`,(err,listCdr)=>{
            if(err){
              console.log("err: ",err);
              return result(err,null);
            }
            let temp = {
              "muc_tieu": muctieu.muc_tieu,
              "cdr":listCdr,
            }
            standardOutput.push(temp);
            if (index === listMT.length - 1) return result(null,standardOutput);

          })

        })
      }
         
    });
  }





module.exports = Model7;