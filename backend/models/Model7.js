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

Model7.addChuDe = (data, result) => {
  sql.query(`INSERT INTO chu_de_danh_gia (ma_chu_de, ten_chu_de) VALUES ('${data.ma_chu_de}', '${data.ten_chu_de}')`,
  (err,res) => {
      if(err) {
          console.log("Error model 7 : ", err);
          result(null,err)
      }else{
          result(null,res);
      }
  })
}

Model7.updateChuDe = (data, result) => {
  sql.query(`update chu_de_danh_gia
          set ma_chu_de = '${data.ma_chu_de}',
              ten_chu_de = '${data.ten_chu_de}'
          where id = ${data.id}`,
      (err, res) => {
          if (err) {
              console.log("error:", err);
              result(null, err)
          } else {
              result(null, res);
          }
      })
}

Model7.deletechudefromdanhgia = (data, result) => {
  let idString = "(" + data.toString() + ")";
      sql.query(`update danh_gia set chu_de_danh_gia_id = -1 where (chu_de_danh_gia_id) IN ${idString}`,
      (err, res) => {
          if (err) {
              console.log("error:", err);
              result(null, err)
          } else {
              result(null, res);
          }
      })
  
}

Model7.deletedanhgia = (data, result) => {
      sql.query(`update danh_gia set del_flag = 1 where (chu_de_danh_gia_id) = -1`,
      (err, res) => {
          if (err) {
              console.log("error:", err);
              result(null, err)
          } else {
              result(null, res);
          }
      })
  
}

Model7.deleteChuDe = (data, result) => {
  let idString = "(" + data.toString() + ")";
      sql.query(`delete from chu_de_danh_gia where (id) IN ${idString}`,
      (err, res) => {
          if (err) {
              console.log("error:", err);
              result(null, err)
          } else {
              result(null, res);
          }
      })
}

Model7.getChude = (result) => {
    sql.query(`select * from chu_de_danh_gia where id != -1 ORDER by ma_chu_de`,(err,res)=>{
        if(err){
          console.log("err: ",err);
          return result(err,null);
        }
        else
        //console.log("result: ",res);
        return result(null,res);
      });
}


Model7.getChuanDaura = (id,result) => {
    sql.query(`select * from cdrmh_has_dg where danh_gia_id = ${id.id} `,(err,res) => {
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


getCDRDanhGiaFromId= id => {
  return new Promise((resolve,reject) => {
    sql.query(`select chuan_dau_ra_mon_hoc_id from cdrmh_has_dg where danh_gia_id = ${id} `,(err,response) => {
      if(err){
        console.log(err);
        reject(err);
      }
      resolve(response);
    })
  })
}

getCDRFromId = id => {
  return new Promise((resolve,reject) => {
    sql.query(`select chuan_dau_ra from chuan_dau_ra_mon_hoc where id in (${id}) and del_flag = 0`,(err,response) => {
      if(err){
        console.log(err);
        reject(err);
      }
      resolve(response);
    })
  })
}

Model7.getDanhGia = (id, result) => {
    sql.query(`select * from danh_gia where thong_tin_chung_id = ${id.id} and del_flag = 0`,(err,response)=>{
      if(err){
        console.log("err: ",err);
        return result(err,null);
      }
      else
          {
            return result(null,response);
          
        }
    });
}

Model7.getCDRDanhGia = (body , result) => {
  sql.query(`select * from cdrmh_has_dg where danh_gia_id in (${body})`,(err,response) => {
    if(err){
      console.log(err);
      return result(err,null);
    }
    else{
     return result(null,response);
    }
  })
}


Model7.getCDR = (body,result) => {
  console.log("body"  + body)
  sql.query(`select * from chuan_dau_ra_mon_hoc where id in (${body}) and del_flag = 0`,(err,response)=>{
    if(err){
      console.log(err);
      return result(err,null);
    }else{
      return result(null,response);
    }
  })
}

  Model7.save = (data,result) => {
    
  sql.query(`select id from danh_gia where thong_tin_chung_id = ${data.thongtinchungid} and del_flag =0 `,(err,response) => {
        if(err){
          console.log("err: " , err);
          return result(err,null);
        }else{
          let listDanhgiaId = '';
          for( let  k =0 ; k < response.length;k++){
            if(listDanhgiaId === ''){
              listDanhgiaId += response[k].id;
            }else{
              listDanhgiaId = listDanhgiaId + ',' +  (response[k].id);
            }
            }
          sql.query(`update danh_gia set del_flag = 1 where thong_tin_chung_id = ${data.thongtinchungid}`,(err,res) => {
            if(err){
              console.log("err: ",err);
              return result(err,null);
            }
          });
        
          for(let i=0;i<data.description.length;i++){
            if(data.description[i].mathanhphan.search("\xa0") !== -1){
    
              data.description[i].mathanhphan = data.description[i].mathanhphan.replace(/\xa0/g,"")
              data.description[i].tile = data.description[i].tile.replace("%","");
   
              sql.query(`insert into danh_gia(ma,ten,mo_ta,ti_le,thong_tin_chung_id,chu_de_danh_gia_id,del_flag) values ('${data.description[i].mathanhphan}','${data.description[i].tenthanhphan}','${data.description[i].mota}',${data.description[i].tile},${data.thongtinchungid},${data.description[i].chude},0)`,
              (err,res) => {
                if(err) {
                    console.log("Error save data in model 7 : ", err);
                    result(null,err)
                }
              })
      
              sql.query(`select id from danh_gia where ma = '${data.description[i].mathanhphan}' and del_flag=0`,
              (err,response) => {
                if(err){
                  console.log("err: ",err);
                  return result(err,null);
                }
                else{
                  let danhGiaId = response[0].id;
                  if(listDanhgiaId !== ''){
                    sql.query(`delete from cdrmh_has_dg`,(err,res) => {
                      if(err){
                        console.log("err: ",err);
                        return result(err,null);
                      }
                    })
                  }
                  
                  for(let j=0;j<data.description[i].standardOutput.length;j++){
                    sql.query(`select id from chuan_dau_ra_mon_hoc where chuan_dau_ra = '${data.description[i].standardOutput[j]}' and thong_tin_chung_id = ${data.thongtinchungid} and del_flag =0`,(err,res) => {
                      if(err){
                        console.log("err: " ,err);
                        return result(err,null);
                      }else{
                    
                        var chuan_dau_ra_mon_hoc_id = res[0].id;
                        sql.query(`insert cdrmh_has_dg(chuan_dau_ra_mon_hoc_id,danh_gia_id) values (${chuan_dau_ra_mon_hoc_id},${danhGiaId})`,(err,res) => {
                          if(err) {
                            console.log("Error save data in model 8 : ", err);
                            result(null,err)
                          }
                        })
                      }
                    })
                    
                   
                  }
                }
              })
    
            }
    
          }
        }
      })
  }




module.exports = Model7;	