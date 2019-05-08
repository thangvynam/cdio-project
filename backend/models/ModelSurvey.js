var sql = require('../db');

var ModelSurvey = () => { }

class Survey {
    constructor(mon, giaovien, itu) {
        this.mon = mon;
        this.giaovien = giaovien;
        this.itu = itu;
    }
}

class Data {
    constructor(cdr, id) { 
        this.cdr = cdr;
        this.id = id;
    }
}

class itu {
    constructor(id, data) { 
        this.id = id;
        this.data = data;
    }
}
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

ModelSurvey.getDataMatixSurvey = (result) => {

    try {
        
        query(`SELECT subject.Id, subject.SubjectCode, subject.SubjectName
            FROM subject
            JOIN thong_tin_chung ON subject.Id = thong_tin_chung.id
            WHERE thong_tin_chung.del_flag = 0`)
        .then(res => {
            let survey = []; 

            res.forEach(subject => {
                let id = subject.Id;
                let subjectName =  subject.SubjectName;

                query(`SELECT survey.id, survey.value, survey.id_qa 
                    FROM survey 
                    WHERE '${id}' = id_mon`)
                .then(res1 => {

                    let myMap = new Map();

                    res1.forEach(record => {
                        const level3 = getLevel3(record.id);
                        const value = getValueITU(record.value);
                        const id_qa = record.id_qa;

                        const data = convertData(value,id_qa);
                       
                        if (myMap.has(level3)) { // same key , update value 
                            let oldData = myMap.get(level3);
                            let newData = appendData(oldData,data);

                            myMap.set(level3,newData)
                        } else {
                            myMap.set(level3,data);
                        }
                        
                    });
                    
                    let data = [];
                    
                    myMap.forEach( (value, key) => {
                        let temp = new Data(
                            value.cdr,
                            value.id
                        );
                        //console.log(temp)
                        data.push(new itu(key,temp));
                    });
                   
                    const object = new Survey(
                        subjectName,
                        'Nam',
                        data
                    );

                    survey.push(object);
                })
                .then(() => {
                    console.log(survey);
                });
            });
            
        });

    } catch (e) {
        console.log(e);
    }
}

getLevel3 = (id) => {
    return id.substring(0,5);
}

getValueITU = (value) => {
    const newValue = value.split(',').filter(value => value !== '');
    return newValue;
}

convertData = (value, id_qa) => {
    let newValue = '';
    let newID = '';
    
    value.forEach(element => {
        newValue += element + '*';
        newID += id_qa + '*';
    });

    return new Data(newValue,newID);
}

appendData = (oldData,fildata) => {
    let newValue = oldData.cdr + fildata.cdr;
    let newID = oldData.id + fildata.id;

    return new Data(newValue,newID);
    
}
module.exports = ModelSurvey;