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
module.exports = ModelSurvey;