var sql = require('../db');

var Model6 = (data) => {
    this.data = data;
}
Model6.add = (data, result) => {
    data.forEach((item,index)=> {

        sql.query(`insert into ke_hoach_thuc_hanh(tuan,chu_de,thong_tin_chung_id) values ('${item.week}','${item.titleName}',${item.thong_tin_chung_id})`, 
        (err, res) => {
          if (err) {
              console.log("error:", err);
              return result(err,null);
          } else {
              let id = res.insertId;

              item.teachingActs.forEach((item,index)=>{
                  console.log("item: ", item);
                sql.query(`insert into khth_has_hdd(ke_hoach_thuc_hanh_id,hoat_dong_day_id) values (${id},${item})`, 
                (err, res) => {
                  if (err) {
                      console.log("error:", err);
                      return result(err,null);

                  }
                  })
                
              })

              item.standardOutput.forEach((item,index)=>{
                console.log("item: ", item);
              sql.query(`insert into khth_has_cdrmh(ke_hoach_thuc_hanh_id,chuan_dau_ra_mon_hoc_id) values (${id},${item})`, 
              (err, res) => {
                if (err) {
                    console.log("error:", err);
                    return result(err,null);
                }
                })
              
            })

            item.evalActs.forEach((item,index)=>{
                console.log("item: ", item);
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


Model6.getTeachingArts = (result)=>{
  sql.query(`select * from hoat_dong_day`,(err,res)=>{
    if(err){
      console.log("err: ",err);
      return result(err,null);
    }
    else
    //console.log("result: ",res);
    return result(null,res);
  });



}

module.exports = Model6;