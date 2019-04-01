var sql = require('../db');

var Model9 = (data) => {
    this.data = data;
}
Model9.add = (body, result) => {

    // delete all rules of id monhoc
    sql.query(`update quy_dinh_chung set del_flag = 1 where thong_tin_chung_id = ${body.thong_tin_chung_id}`,(err,res)=>{
        if(err){
            console.log("err: ",err);
            return result(err,null);
        }
        if(body.data.length===0) return result(null,"1");

        body.data.forEach((item,_)=>{

            sql.query(`insert into quy_dinh_chung(noi_dung,thong_tin_chung_id) values ('${item.content}',${body.thong_tin_chung_id})`, 
            (err, res) => {
              if (err) {
                  console.log("error:", err);
                  return result(err,null)
              }
          })

        })

        return result(null,res);
    })

       
}

Model9.get = (idSubject,result)=>{
    sql.query(`select noi_dung from quy_dinh_chung where del_flag = 0 AND thong_tin_chung_id = ${idSubject}`, 
    (err, res) => {
      if (err) {
          console.log("error:", err);
          result(err,null)
      } else {
          result(null, res);
      }
  })
}


module.exports = Model9;