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

                if (index === listSubject.length - 1) resolve(resultRes);
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
    let query = `SELECT cdrmh.muc_do FROM chuan_dau_ra_mon_hoc cdrmh,
        muc_tieu_mon_hoc mt, mtmh_has_cdrcdio has
        WHERE cdrmh.muc_tieu_mon_hoc_id = mt.id AND mt.thong_tin_chung_id = ${subject_id} 
        AND has.chuan_dau_ra_cdio_id = ${cdrCDIO_id} AND mt.id = has.muc_tieu_mon_hoc_id`;

    sql.query(query, (err, listITU) => {
      if (err) {
        console.log("err: ", err);
        return reject(err);
      }

      listITU.forEach((itemITU, _) => {
        let arrITU = itemITU.muc_do.split(",");
        arrITU.forEach((itu, _) => {
          if (!mapUIT.has(itu)) {
            mapUIT.set(itu, "true");
          }
        });
      });

      let strITU = "";
      for (const k of mapUIT.keys()) {
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
        sql.query(`select * from chuan_dau_ra_cdio`, (err, listCdrCDIO) => {
            if (err) {
              console.log("error:", err);
               return reject(err);
            }
            resolve(listCdrCDIO);
                
        })
    })
}


module.exports = MatrixModel;
