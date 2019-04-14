var sql = require('../db');
var Model5 = (data) => {
    this.data = data;
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

loopCollectData = (res, data,sl) => {
    return new Promise((resolve, reject) => {
        for (const ele of res) {
            let objResult = {
                key: '',
                titleName: '',
                teachingActs: [],
                standardOutput: [],
                evalActs: []
            }
            objResult.key = ele.id;
            objResult.titleName = ele.ten_chu_de;
            let element = collectData(objResult);
            element.then(async (result) => {
                await data.push(result);
            }).finally(() => {
                if (data.length == sl)
                    resolve(data);
            })
        }

    });
}

collectData = (objResult) => {
    return new Promise((resolve, reject) => {
        let buzCollect = collectDataPromise(objResult);
        buzCollect
            .then((result) => {
                resolve(result);
            })
    })
}

collectDataPromise = (objResult) => {
    return new Promise((resolve, reject) => {
        query(`SELECT hoat_dong FROM khlt_has_hdd JOIN hoat_dong_day on hoat_dong_day_id = id WHERE ke_hoach_ly_thuyet_id = '${objResult.key}' `)
            .then(res => {
                res.map(async value => {
                    await objResult.teachingActs.push(value.hoat_dong);
                })

            }, err => {
                console.log(err);
            })
            .then(() => {
                query(`SELECT chuan_dau_ra FROM khlt_has_cdrmh JOIN chuan_dau_ra_mon_hoc on chuan_dau_ra_mon_hoc_id = id WHERE ke_hoach_ly_thuyet_id = '${objResult.key}' `)
                    .then(res => {
                        res.map(async value => {
                            await objResult.standardOutput.push(value.chuan_dau_ra);
                        })

                    }, err => {
                        console.log(err);
                    })
            })
            .then(() => {
                query(`SELECT ma FROM khlt_has_dg JOIN danh_gia on danh_gia_id = id  WHERE ke_hoach_ly_thuyet_id = '${objResult.key}'`)
                    .then(res => {
                        
                        res.map(async value => {
                            await objResult.evalActs.push(value.ma);
                        })
                        resolve(objResult)
                    }, err => {
                        console.log(err);
                    })

            })
    })
}

Model5.collect = (dataID,respone) => {
    let id = dataID;
    let data = [];

    query(`SELECT count(*) as sl FROM ke_hoach_ly_thuyet where del_flag = 0 and thong_tin_chung_id = '${id}'`).
        then(res => {
            let sl = res[0].sl
            query(`SELECT * FROM ke_hoach_ly_thuyet where del_flag = 0 and thong_tin_chung_id = '${id}'`)
                .then(res => {
                    if (res.length != 0) {
                       
                        let finalResult = loopCollectData(res, data,sl);
                        finalResult.then((result) => {
                            respone(null,result)
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        })



    // sql.query("SELECT * FROM ke_hoach_ly_thuyet where del_flag = 0", (err, res) => {
    //     if (err) {
    //         console.log("error:", err);
    //         result(null, err)
    //     } else {
    //         let data = [];
    //         if(res.length != 0){
    //             for(const ele of res){
    //                 let objResult = {
    //                     key : '',
    //                     titleName : '',
    //                     teachingActs: ['sadad'],
    //                     standardOutput:[],
    //                     evalActs:[]
    //                 }
    //                 objResult.key = ele.id;
    //                 objResult.titleName = ele.ten_chu_de;

    //                 // select hdd
    //                 sql.query(`SELECT * FROM khlt_has_hdd JOIN mydb.hoat_dong_day on hoat_dong_day_id = id WHERE ke_hoach_ly_thuyet_id = '${objResult.key}' `, (err, res) => {
    //                     console.log("=====");
    //                     if(err){

    //                     }else{
    //                         for(const ele of res){
    //                             objResult.teachingActs.push(ele.hoat_dong);
    //                         }
    //                         console.log(objResult.teachingActs);
    //                     }
    //                 })
    //                 console.log(objResult)
    //                 //data.push(objResult);
    //             }
    //         }
    //         //console.log(data);
    //         result(null, data);
    //     }
    //})
}

Model5.collectHDD = (result) => {
    query("SELECT `hoat_dong` FROM `hoat_dong_day` WHERE `loai_hoat_dong` = 'LT' and `danh_muc` =1")
        .then(res =>{
            result(res);
        })
}

Model5.collectDG = (dataID,result) => {
    const id = dataID;
    query(`SELECT ma FROM danh_gia WHERE del_flag = 0 and thong_tin_chung_id = ${id} `)
        .then(res =>{
            result(res);
        })
}

Model5.collectCDR = (idSubject,result) => {
    
    sql.query(`SELECT id,muc_tieu FROM muc_tieu_mon_hoc WHERE thong_tin_chung_id = ${idSubject} AND del_flag = 0`,(err,listMT) => {
        if (err) {
          console.log("err: ",err);
          return result(err,null);
        } else {
            let standardOutput = [];

            listMT.forEach((muctieu,index) => {
                sql.query(`SELECT id,chuan_dau_ra FROM chuan_dau_ra_mon_hoc
                    WHERE muc_tieu_mon_hoc_id = ${muctieu.id} AND del_flag = 0`, 
                    (err,listCdr) => { 
                    
                        if (err) {
                            console.log("err: ",err);
                            return result(err,null);
                        }

                        let temp = {
                            "muc_tieu": muctieu.muc_tieu,
                            "cdr":listCdr,
                        }
                        
                        standardOutput.push(temp);
                        
                        if (index === listMT.length - 1) {
                            return result(standardOutput,null);
                        } 
            
                    });
          })
        }
           
    });
}

Model5.add = (data, result) => {
    data.forEach(function (value, index) {
        let id = value.key;
        let stt = value.key;  // hardcode 
        let titleName = value.titleName;
        let teachingActs = value.teachingActs;
        let standardOutput = value.standardOutput;
        let thong_tin_chund_id = 0 // hardcode

        sql.query(`insert into ke_hoach_ly_thuyet(id, stt,ten_chu_de,hoat_dong,thong_tin_chung_id) 
        values ('${id}', '${stt}','${value.titleName}',
        '${teachingActs}','${thong_tin_chund_id}')`,
            (err, res) => {
                if (err) {
                    console.log("error:", err);
                }
            })

        sql.query(`insert into khlt_has_cdrmh(ke_hoach_ly_thuyet_id,chuan_dau_ra_mon_hoc_id) 
        values ('${id}', '${index}')`,
            (err, res) => {
                if (err) {
                    console.log("error:", err);
                    result(null, err)
                }
            })

        sql.query(`insert into khlt_has_dg(ke_hoach_ly_thuyet_id,danh_gia_id) 
        values ('${id}', '${index}')`,
            (err, res) => {
                if (err) {
                    console.log("error:", err);
                    result(null, err)
                } else {
                    result(null, res);
                }
            })

        sql.query(`insert into khlt_has_hdd(ke_hoach_ly_thuyet_id,hoat_dong_day_id) 
        values ('${id}', '${index}')`,
            (err, res) => {
                if (err) {
                    console.log("error:", err);
                    result(null, err)
                }
            })
    });
}

module.exports = Model5;