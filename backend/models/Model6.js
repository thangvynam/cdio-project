var sql = require('../db');

var Model6 = (data) => {
    this.data = data;
}
Model6.add = (body, result) => {

  sql.query(`UPDATE ke_hoach_thuc_hanh SET del_flag = 1 WHERE thong_tin_chung_id = ${body.thong_tin_chung_id}`,(err,res)=>{
    if(err){
      console.log("err: ",err);
      return result(err,null);
    }
  })


    body.data.forEach((item,index)=> {

        sql.query(`insert into ke_hoach_thuc_hanh(tuan,chu_de,thong_tin_chung_id) values ('${item.week}','${item.titleName}',${body.thong_tin_chung_id})`, 
        (err, res) => {
          if (err) {
              console.log("error:", err);
              return result(err,null);
          } else {
              let id = res.insertId;

              item.teachingActs.forEach((item,index)=>{
                sql.query(`insert into khth_has_hdd(ke_hoach_thuc_hanh_id,hoat_dong_day_id) values (${id},${item})`, 
                (err, res) => {
                  if (err) {
                      console.log("error:", err);
                      return result(err,null);

                  }
                  })
                
              })

              item.standardOutput.forEach((item,index)=>{
              sql.query(`insert into khth_has_cdrmh(ke_hoach_thuc_hanh_id,chuan_dau_ra_mon_hoc_id) values (${id},${item})`, 
              (err, res) => {
                if (err) {
                    console.log("error:", err);
                    return result(err,null);
                }
                })
              
            })

            item.evalActs.forEach((item,index)=>{
              sql.query(`insert into khth_has_dg(ke_hoach_thuc_hanh_id,danh_gia_id) values (${id},${item})`, 
              (err, res) => {
                if (err) {
                    console.log("error:", err);
                    return result(err,null);
                }
                })
              
            })

            return result(null,res);
            
          }
      })
           
    });
    
}


Model6.getTeachingActs = (result)=>{
  sql.query(`select * from hoat_dong_day where danh_muc = 1`,(err,res)=>{
    if(err){
      console.log("err: ",err);
      return result(err,null);
    }
    else
    //console.log("result: ",res);
    return result(null,res);
  })
}

Model6.getEvalActs = (idSubject,result)=>{
    sql.query(`SELECT id,ma FROM danh_gia WHERE thong_tin_chung_id = ${idSubject} AND del_flag = 0`,(err,res)=>{
      if(err){
        console.log("err: ",err);
        return result(err,null);
      }
      else
      return result(null,res);
    });
  }
  
  Model6.getStandardOutput = (idSubject,result)=>{
    sql.query(`SELECT id,muc_tieu FROM muc_tieu_mon_hoc WHERE thong_tin_chung_id = ${idSubject} AND del_flag = 0`,(err,listMT)=>{
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





module.exports = Model6;