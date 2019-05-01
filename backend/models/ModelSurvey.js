var sql = require('../db');

var ModelSurvey = () => { }

query = (string_sql, args) => {
    return new Promise((resolve, reject) => {
        sql.query(string_sql, args, (err, rows) => {
            if (err)
                return reject(err);
            resolve(rows);
        })
    });
}

close = () => {
    console.log("close resource");
    sql.end();
}

ModelSurvey.addData = (data,result) => {
    console.log(data);
}

ModelSurvey.collectData = (result) => {
    try {
        let data = [];
        query(`SELECT KeyRow,NameRow FROM detailoutcomestandard where idOutcomeStandard = 5 `)
        .then(res => {
            res.forEach(element => {
                const obj = {
                    keyRow : element.KeyRow,
                    nameRow : element.NameRow
                }
                data.push(obj);
            });
            result(data);
        });
    } catch (e) {
        console.log(e);
    } finally {
        //close();
    }
}

ModelSurvey.getITU = (obj,result) => {
    sql.query(`SELECT * FROM survey where id_ctdt =0 and id_mon =0 and id_giaovien =0`,(err,res)=>{
        if(err){
          console.log("err: ",err);
          return result(null);
        }
        else{
            return result(res);

        }
             });
}

ModelSurvey.getQA = (id,result) => {
    sql.query(`SELECT * from survey_qa where id = 1`,(err,res ) => {
        if(err) {
            console.log("err: " , err);
            return result(err);
        }else
        return result(res);
    })
}

module.exports = ModelSurvey;