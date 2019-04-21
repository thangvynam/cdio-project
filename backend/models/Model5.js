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

loopCollectData = (res, data, sl) => {
    return new Promise((resolve, reject) => {
        for (const ele of res) {
            let objResult = {
                key: '',
                titleName: '',
                teachingActs: [],
                standardOutput: [],
                evalActs: [],
                subjectId : ''
            }
            objResult.key = ele.id;
            objResult.titleName = ele.ten_chu_de;
            objResult.subjectId = ele.thong_tin_chung_id;

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

Model5.collect = (dataID, respone) => {
    let id = dataID;
    let data = [];

    query(`SELECT count(*) as sl FROM ke_hoach_ly_thuyet where del_flag = 0 and thong_tin_chung_id = '${id}'`).
        then(res => {
            let sl = res[0].sl
            query(`SELECT * FROM ke_hoach_ly_thuyet where del_flag = 0 and thong_tin_chung_id = '${id}'`)
                .then(res => {
                    if (res.length != 0) {

                        let finalResult = loopCollectData(res, data, sl);
                        finalResult.then((result) => {
                            respone(null, result)
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
        .then(res => {
            result(res);
        })
}

Model5.collectDG = (dataID, result) => {
    const id = dataID;
    query(`SELECT ma FROM danh_gia WHERE del_flag = 0 and thong_tin_chung_id = ${id} `)
        .then(res => {
            result(res);
        })
}

Model5.collectCDR = (idSubject, result) => {

    sql.query(`SELECT id,muc_tieu FROM muc_tieu_mon_hoc WHERE thong_tin_chung_id = ${idSubject} AND del_flag = 0`, (err, listMT) => {
        if (err) {
            console.log("err: ", err);
            return result(err, null);
        } else {
            let standardOutput = [];

            listMT.forEach((muctieu, index) => {
                sql.query(`SELECT id,chuan_dau_ra FROM chuan_dau_ra_mon_hoc
                    WHERE muc_tieu_mon_hoc_id = ${muctieu.id} AND del_flag = 0`,
                    (err, listCdr) => {

                        if (err) {
                            console.log("err: ", err);
                            return result(err, null);
                        }

                        let temp = {
                            "muc_tieu": muctieu.muc_tieu,
                            "cdr": listCdr,
                        }

                        standardOutput.push(temp);

                        if (index === listMT.length - 1) {
                            return result(standardOutput, null);
                        }

                    });
            })
        }

    });
}

Model5.add = (data, result) => {
   
    data.forEach(function (value, index) {
        let id = value.key;
        let stt = '1'; // hardcode
        let titleName = value.titleName;
        let teachingActs = value.teachingActs;
        let standardOutput = value.standardOutput;
        let evalActs = value.evalActs;
        let thong_tin_chung_id = value.subjectId;
        let del_flag = value.del_flag;

        if (id === -1) {
            if (del_flag === 1) {
                return;
            }
            
            query(`insert into ke_hoach_ly_thuyet(stt, ten_chu_de, thong_tin_chung_id, del_flag) 
                values ('${stt}', '${titleName}', '${thong_tin_chung_id}', '${del_flag}')`)
                .then((res) => {
                    const ke_hoach_ly_thuyet_id = res.insertId;
                    // // BUS 1
                    for (const elemenet of standardOutput) {
                        query(`SELECT id FROM chuan_dau_ra_mon_hoc WHERE chuan_dau_ra = '${elemenet}' AND del_flag = 0 AND thong_tin_chung_id = '${thong_tin_chung_id}' `)
                        .then(res => {
                            const index = res[0].id;

                            sql.query(`insert into khlt_has_cdrmh(ke_hoach_ly_thuyet_id,chuan_dau_ra_mon_hoc_id) 
                                values ('${ke_hoach_ly_thuyet_id}', '${index}')`,
                                    (err, res) => {
                                        if (err) {
                                            console.log("error:", err);
                                            result(null, err)
                                        }
                                    });
                        });
                    }
                    
                    // BUS 2
                    for (const element of evalActs) {
                        query(`SELECT id FROM danh_gia WHERE ma = '${element}' AND del_flag = 0 AND thong_tin_chung_id = '${thong_tin_chung_id}'`)
                        .then(res => {
                            const index = res[0].id;

                            sql.query(`insert into khlt_has_dg(ke_hoach_ly_thuyet_id,danh_gia_id) 
                            values ('${ke_hoach_ly_thuyet_id}', '${index}')`,
                                (err, res) => {
                                    if (err) {
                                        console.log("error:", err);
                                        result(null, err)
                                    } else {
                                        result(null, res);
                                    }
                                });
                        });
                    }
                    
                    // BUS 3
                    for (const element of teachingActs) {
                        query(`SELECT id FROM hoat_dong_day WHERE hoat_dong = '${element}' AND loai_hoat_dong = 'LT' `)
                        .then(res => {
                            const index = res[0].id;
                            
                            sql.query(`insert into khlt_has_hdd(ke_hoach_ly_thuyet_id,hoat_dong_day_id) 
                                values ('${ke_hoach_ly_thuyet_id}', '${index}')`,
                                    (err, res) => {
                                        if (err) {
                                            console.log("error:", err);
                                            result(null, err)
                                        }
                                    })
                        });
                    }      
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    console.log("Finish");
                });

        } else { // update 
            
            query(`UPDATE ke_hoach_ly_thuyet SET ten_chu_de = '${titleName}' WHERE id = '${id}'`)
            .catch(err =>{
                console.log(err);
            })
            .finally(() => {
                console.log("Finish");
            })

            // BUS 1 
            for (const elemenet of standardOutput) {
               
                query(`SELECT id FROM chuan_dau_ra_mon_hoc WHERE chuan_dau_ra = '${elemenet}' AND del_flag = 0 AND thong_tin_chung_id = '${thong_tin_chung_id}' `)
                .then(res => {
                    const index = res[0].id;
                   
                    query(`DELETE FROM  khlt_has_cdrmh WHERE ke_hoach_ly_thuyet_id = '${id}'`)
                    .then(() =>{
                        query(`INSERT INTO khlt_has_cdrmh VALUES ('${id}','${index}')`)
                    });
                   
                });
            }

            //BUS 2 
            for (const element of evalActs) {
                query(`SELECT id FROM danh_gia WHERE ma = '${element}' AND del_flag = 0 AND thong_tin_chung_id = '${thong_tin_chung_id}'`)
                .then(res => {
                    const index = res[0].id;

                    query(`DELETE FROM  khlt_has_dg WHERE ke_hoach_ly_thuyet_id = '${id}'`)
                    .then(() =>{
                        query(`INSERT INTO khlt_has_dg VALUES ('${id}','${index}')`)
                    });
                });
            }

            // BUS 3
            for (const element of teachingActs) {
                query(`SELECT id FROM hoat_dong_day WHERE hoat_dong = '${element}' AND loai_hoat_dong = 'LT' `)
                .then(res => {
                    const index = res[0].id;
                    
                    query(`DELETE FROM  khlt_has_hdd WHERE ke_hoach_ly_thuyet_id = '${id}'`)
                    .then(() =>{
                        query(`INSERT INTO khlt_has_hdd VALUES ('${id}','${index}')`)
                    });
                });
            }
        }
    });
}

module.exports = Model5;