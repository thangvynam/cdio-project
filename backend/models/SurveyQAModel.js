var sql = require('../db');

var SurveyQAModel = (survey) => {
    this.survey = survey;
}

SurveyQAModel.save = (data, result) => {
    sql.query(`insert into survey_qa(tenMH, nguoiDuocKS, nguoiKS, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11) values ('${data.tenMH}', '${data.nguoiDuocKS}', '${data.nguoiKS}', '${data.q1}', '${data.q2}', '${data.q3}', '${data.q4}', '${data.q5}', '${data.q6}', '${data.q7}', '${data.q8}', '${data.q9}', '${data.q10}', '${data.q11}')`,
      (err, res) => {
        if (err) {
            console.log("error:", err);
            result(null, err)
        } else {
            result(null, res.insertId);
        }
    })
}

module.exports = SurveyQAModel;