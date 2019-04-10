var sql = require('../db');

var MoTaModel = (desc) => {
    this.description = desc;
}

MoTaModel.save = (data, result) => {
    sql.query(`update subject set Description = '${data.description}' where Id = ${data.id}`, 
      (err, res) => {
        if (err) {
            console.log("error:", err);
            result(null, err)
        } else {
            result(null, res);
        }
    })
}

MoTaModel.get = (id, result) => {
    sql.query(`select subject.Description from subject where Id = ${id.id}`,
      (err, res) => {
        if(err) {
            result(err);
        }
        else{   
         result(res[0]);
        }
      })
}

module.exports = MoTaModel;