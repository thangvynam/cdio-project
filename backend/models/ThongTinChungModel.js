var sql = require('../db');

const collect = (id, result) => {
    sql.query(
        `select * from thong_tin_chung where id = ${id.id} and del_flag = 0`,
        (err, res) => {
            if (err) {
                result(err);
            }
            else {
                sql.query(
                    `select * from subject where id = ${id.id}`,
                    (err, res1) => {
                        if (err) {
                            result(err);
                        } else {
                            result(res1[0])
                        }
                    }
                )
            }
        })
}

const add = (id, desc, result) => {
    const idUpdate = parseInt(id.id); 
    let sql1 = `UPDATE subject SET SubjectName=?, SubjectEngName=?, SubjectCode=?, Credit=?, TheoryPeriod=?, PracticePeriod=?, ExercisePeriod=?, DateEdited=? WHERE Id=${idUpdate}`;
    let data = [desc.SubjectName, desc.SubjectEngName, desc.SubjectCode, desc.Credit, desc.TheoryPeriod, desc.PracticePeriod, desc.ExercisePeriod, desc.DateEdited];
    sql.query(sql1, data, (err, res) => {
        if (err) {
            console.log(err)
        } else {
            result(null, res);
        }
    })
}

module.exports = {
    collect,
    add
};