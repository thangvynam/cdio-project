var sql = require('../db');

var MoTaModel = (desc) => {
    this.description = desc;
}

MoTaModel.save = (desc, result) => {
    sql.query("delete from mo_ta_mon_hoc");
    sql.query(`insert into mo_ta_mon_hoc(noi_dung, thong_tin_chung_id) values ('${desc}', 1)`, 
      (err, res) => {
        if (err) {
            console.log("error:", err);
            result(null, err)
        } else {
            result(null, res);
        }
    })
}

MoTaModel.get = (result) => {
    sql.query("select * from mo_ta_mon_hoc",
      (err, res) => {
        if(err) {
            result(err);
        }
        else{          
         result(res[0]);
        }
      })
}

// MoTaModel.save = (desc, result) => {
//   sql.query(`update mo_ta_mon_hoc set noi_dung = '${desc}'`, 
//     (err, res) => {
//       if (err) {
//           console.log("error:", err);
//           result(null, err)
//       } else {
//           result(null, res);
//       }
//   })
// }

module.exports = MoTaModel;