var sql = require('../db');

var MucTieuModel = (muc_tieu, mo_ta, cdr) => {
  this.muc_tieu = muc_tieu;
  this.mo_ta = mo_ta;
  this.cdr = cdr;
}

MucTieuModel.save = (data, result) => {
  sql.query(`update muc_tieu_mon_hoc set del_flag = 1 where thong_tin_chung_id = ${data.id}`);
  data.body.forEach(element => {
    sql.query(`insert into muc_tieu_mon_hoc(muc_tieu, mo_ta, thong_tin_chung_id) values ('${element.objectName}', '${element.description}', ${data.id})`,
      (err, res) => {
        if (err) {
          console.log("error:", err);
          result(err)
        } else {
          let mtmhId = res.insertId;

          element.standActs.forEach(element => {
            sql.query(`insert into chuan_dau_ra_cdio(cdr) values ('${element}')`,
              (err, res) => {
                if (err) {
                  console.log("error:", err);
                  result(err)
                } else {
                  let cdrId = res.insertId
                  sql.query(`insert into mtmh_has_cdrcdio values (${mtmhId}, ${cdrId})`,
                    (err, res) => {
                      if (err) {
                        console.log("error:", err);
                        result(err)
                      }
                    })
                }
              })
          });
          result(res);
        }
      })
  });

}

MucTieuModel.getMucTieu = (id, result) => {
  sql.query(`select * from muc_tieu_mon_hoc where thong_tin_chung_id = ${id.id} and del_flag = 0`,
    (err, res1) => {
      if (err) {
        result(err);
      }
      result(res1)
    })
}

MucTieuModel.getMTMH_HAS_CDR = (data, result) => {
  sql.query(`select * from mtmh_has_cdrcdio where muc_tieu_mon_hoc_id = ${data.id}`,
    (err, res2) => {
      if (err) {
        result(err);
      }
      result(res2);
    })
}

MucTieuModel.getCDR = (data, result) => {
  sql.query(`select * from chuan_dau_ra_cdio where id = ${data.chuan_dau_ra_cdio_id}`,
    (err, res3) => {
      if (err) {
        result(err);
      }
      result(res3);
    })
}

MucTieuModel.get = (data, result) => {
  
  sql.query(`SELECT mt.muc_tieu, mt.mo_ta, chuan_dau_ra_cdio.cdr FROM muc_tieu_mon_hoc as mt
  join mtmh_has_cdrcdio
  on mt.id = mtmh_has_cdrcdio.muc_tieu_mon_hoc_id
  join chuan_dau_ra_cdio
  on mtmh_has_cdrcdio.chuan_dau_ra_cdio_id = chuan_dau_ra_cdio.id
  where mt.thong_tin_chung_id = ${data.id} and mt.del_flag = 0`,
    (err, res) => {
      if (err) {
        result(err)
      }
      
      result(res)
    })
}

module.exports = MucTieuModel;