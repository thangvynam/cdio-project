var sql = require("../db");

var MatrixModel = data => {
  this.data = data;
};

close = () => {
  console.log("close resource");
  sql.end();
};

MatrixModel.getRealityMatrix = () => {
  return new Promise((resolve, reject) => {
    var resultRes = [];
    sql.query(
      `select id,ten_mon_hoc_tv from thong_tin_chung where del_flag = 0`,
      (err, listSubject) => {
        if (err) {
          console.log("error:", err);
          reject(err);
        } else {
          if (listSubject.length === 0) {
            resolve("0");
          }
          listSubject.forEach((subject, index) => {
            var itemRes = {
              idSubject: subject.id,
              subject: subject.ten_mon_hoc_tv,
              itu: []
            };

            selectCDR(subject.id).then(
              res => {
                itemRes.itu = res;
                resultRes.push(itemRes);

                if (index === listSubject.length - 1){
                  
                  insertStandardMatrix(resultRes);
                  resolve(resultRes);
                } 
              },
              err => {
                console.log("err: ", err);
                reject(err);
              }
            );
          });
        }
      }
    );
  });
};

selectCDR = idTTC => {
  return new Promise((resolve, reject) => {
    sql.query(`select * from chuan_dau_ra_cdio`, async (err, listCdrCDIO) => {
      if (err) {
        console.log("error:", err);
        return reject(err);
      }
      var arrITU = [];

      await listCdrCDIO.forEach(async (cdrCDIO, index) => {
        await selectITU(idTTC, cdrCDIO.id).then(
          async res => {
            //return res;
            arrITU.push(res);

            if (index === listCdrCDIO.length - 1) return resolve(arrITU);
          },
          err => { 
            console.log("err:", err);
            return reject(err);
          }
        );
      });
    });
  });
};

selectITU = (subject_id, cdrCDIO_id) => {
  return new Promise((resolve, reject) => {
    var mapUIT = new Map();
    mapUIT.set("I","false");
    mapUIT.set("T","false");
    mapUIT.set("U","false");
    let query = `SELECT cdrmh.muc_do FROM chuan_dau_ra_mon_hoc cdrmh,
        muc_tieu_mon_hoc mt, mtmh_has_cdrcdio has
        WHERE cdrmh.muc_tieu_mon_hoc_id = mt.id AND mt.thong_tin_chung_id = ${subject_id} AND mt.del_flag = 0
        AND has.chuan_dau_ra_cdio_id = ${cdrCDIO_id} AND mt.id = has.muc_tieu_mon_hoc_id AND cdrmh.del_flag = 0`;

    sql.query(query, (err, listITU) => {
      if (err) {
        console.log("err: ", err);
        return reject(err);
      }

      listITU.forEach((itemITU, _) => {
        let arrITU = itemITU.muc_do.split(",");
        arrITU.forEach((itu, _) => {
          if(mapUIT.get(itu)==="false"){
              mapUIT.set(itu,"true");
          }
        });
      });

      let strITU = "";
       for (const k of mapUIT.keys()) {
         if(mapUIT.get(k)==="true") 
            strITU = strITU + k + ",";
      }
      
      if (strITU.length > 0) {
        strITU = strITU.substring(0, strITU.length - 1);
      } else strITU = "-";
       return resolve(strITU);
    });
  });
};


MatrixModel.getCdrCDIO = ()=>{
    return new Promise((resolve,reject)=>{
        sql.query(`SELECT * FROM chuan_dau_ra_cdio`, (err, listCdrCDIO) => {
            if (err) {
              console.log("error:", err);
               return reject(err);
            }
            resolve(listCdrCDIO);
                
        })
    })
}



insertStandardMatrix = (resultRes)=>{
  return new Promise((resolve,reject)=>{
    resultRes.forEach((item,index)=>{
      sql.query(`SELECT * FROM matrix WHERE thong_tin_chung_id = ${item.idSubject}`,(err,result)=>{
        if(err){
          console.log("err: ",err);
          return reject(err);
        }
        else if(result.length===0){
          console.log("inser matrix for idSubject ",item.idSubject);
          sql.query(`SELECT id FROM chuan_dau_ra_cdio`,(err,res)=>{
            if(err){
              console.log("err: ",err);
              return reject(err);
            }
            for(let i=0;i<res.length;i++){
              // console.log("11:",res[i].id);
              // console.log("22:",item.itu[i]);


              sql.query(`INSERT INTO matrix(muc_do,thong_tin_chung_id,chuan_dau_ra_cdio_id) VALUES('${item.itu[i]}',${item.idSubject},${res[i].id})`,(err,res)=>{
                if(err){
                  console.log("err: ",err);
                  return reject(err);
                }
              })
            }
          })

          resolve("1");
        }
      })
    })
  })
}


MatrixModel.getStandardMatrix = ()=>{
  return new Promise((resolve,reject)=>{
    sql.query(`SELECT mt.id,mt.muc_do,mt.thong_tin_chung_id,mt.chuan_dau_ra_cdio_id FROM matrix mt,thong_tin_chung ttc
    WHERE mt.thong_tin_chung_id = ttc.id AND ttc.del_flag = 0`, (err, matrix) => {
        if (err) {
          console.log("error:", err);
           return reject(err);
        }
        resolve(matrix);
            
    })
})
}

MatrixModel.updateStandardMatrix = (body,result)=>{

  body.forEach((item,_)=>{
    sql.query(`UPDATE matrix SET muc_do = '${item.muc_do}' WHERE id = ${item.id}`,(err,res)=>{
      if(err){
        console.log("err: ",err);
        return result(err,null);
      }
      return result(null,res);
    })
  })


}


module.exports = MatrixModel;

