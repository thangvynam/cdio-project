import React, { Component } from 'react';
import { connect } from 'react-redux';

import CheckboxGroup from "./CheckboxGroup/CheckboxGroup";
import { Checkbox, message } from 'antd';
import $ from './../helpers/services';
import { saveAs } from 'file-saver';

const plainOptions = [
    'Thông tin chung',
    'Mô tả môn học',
    'Mục tiêu môn học',
    'Chuẩn đầu ra môn học',
    'Kế hoạch giảng dạy lý thuyết',
    'Kế hoạch giảng dạy thực hành',
    'Đánh giá',
    'Tài nguyên môn học',
    'Các quy định chung'
];
let data1 = [];
let data2 = [];
let data3 = [];
let data4 = [];
let data5 = [];
let data6 = [];
let data7 = [];
let data8 = [];
let data9 = [];

class ExportFile extends Component {

    state = {
        selectedItem: [],
    }

    getCdrmdhd = (state, id) => {
        for (let i = 0; i < state.length; i++) {
            if (state[i].id === id) {
                return state[i];
            }
        }
        return { muc_do_1: "", muc_do_2: "", muc_do_3: "" };
    }

    getData1 = (monhoc) => {
        try {
            $.collectData1(monhoc).then(function (response) {
                data1 = response.data;
            });
        } catch (e) {
            console.log("tab1 error : " + e);
        }
    }

    getData2 = (monhoc) => {
        try {
            $.getData2(monhoc)
                .then(res => {
                    return res.data
                }).then(resp => {
                    data2 = resp.Description;
                });
        } catch (e) {
            console.log("tab2 error : " + e);
        }
    }

    getUnique(arr, comp) {
        const unique = arr
             .map(e => e[comp])
          .map((e, i, final) => final.indexOf(e) === i && i)
      
          .filter(e => arr[e]).map(e => arr[e]);
         return unique;
      }

    getData3 = (monhoc) => {
        try {
            let self = this;
            let saveData = []
            let standActs = [];

            let data = {
                id: monhoc,
                id_ctdt: self.props.id_ctdt
            }

            $.getData3(data).then(res => {
                if (res.data.length > 0) {
                    res.data.forEach(element => {
                        res.data.forEach(element2 => {
                            if (element2.muc_tieu === element.muc_tieu && element2.KeyRow.length === 6) {
                                element2.KeyRow = element2.KeyRow.slice(0, element2.KeyRow.length - 1)
                                standActs.push(element2.KeyRow)
                            }
                        });

                        let newObj = {
                            objectName: element.muc_tieu,
                            description: element.mo_ta,
                            standActs: standActs,
                            del_flag: element.del_flag,
                            id: element.id,
                        }
                        standActs = []
                        saveData.push(newObj);
                    });
                }
                saveData = saveData.filter((item) => item.del_flag === 0);
                data3 = this.getUnique(saveData, "objectName")
            })
        } catch (e) {
            console.log("tab3 error : " + e);
        }
    }

    getData4 = (monhoc, id_ctdt) => {
        
        let self = this;
        try {
            $.collectData4({ data: { thong_tin_chung_id: monhoc, idCtdt: id_ctdt } })
                .then(function (response) {
                    for (let i = 0; i < response.data.length; i++) {
                        let cdrmdhd = self.getCdrmdhd(self.props.cdrmdhddb, response.data[i].cdrmh_muc_do_hanh_dong_id);
                        let data = {
                            key: (i + 1).toString(),
                            cdr: response.data[i].chuan_dau_ra,
                            level_verb :    [cdrmdhd.muc_do_1,"level " + cdrmdhd.muc_do_2],
                            //level_verb: [cdrmdhd.muc_do_1, cdrmdhd.muc_do_2.toString(), cdrmdhd.muc_do_3],
                            description: response.data[i].mo_ta,
                            levels: response.data[i].muc_do.split(","),
                            id: response.data[i].id,
                            del_flag: response.data[i].del_flag
                        }
                        data4.push(data);
                    }
                })
        } catch (e) {
            console.log("tab4 error " + e);
        }
    }

    getData5 = (monhoc, id_ctdt) => {
        try {
            $.collectData5({ data: monhoc, ctdt:id_ctdt })
                .then(function (response) {
                    for (let i = 0; i < response.data.length; i++) {
                        let data = {
                            key: response.data[i].key,
                            titleName: response.data[i].titleName,
                            teachingActs: response.data[i].teachingActs,
                            standardOutput: response.data[i].standardOutput,
                            evalActs: response.data[i].evalActs,
                            subjectId: response.data[i].subjectId,
                            del_flag: 0
                        }
                        data5.push(data);
                    }
                })
        } catch (e) {
            console.log("tab5 error : " + e);
        }
    }

    getData6 = (monhoc, id_ctdt) => {
        try {
            $.getData6(monhoc, id_ctdt)
                .then(response => {
                    data6 = response.data;
                });
        } catch (e) {
            console.log("tab6 error : " + e);
        }
    }

    getData7 = (monhoc, id_ctdt) => {
        try {
            $.getChuDe()
                .then(function (response) {
                    let chude = response.data;

                    $.getData7(monhoc, id_ctdt).then(res => {
                        var result = res.data;
                        
                        var previewInfo = [];
                        for (let i = 0; i < chude.length; i++) {
                          let haveFather = false;
                          for (let j = 0; j < result.length; j++) {
                            let str = result[j].mathanhphan.substring(0, chude[i].ma_chu_de.length);
                  
                            if (str === chude[i].ma_chu_de) {
                              if (!haveFather) {
                                haveFather = true;
                                let dataFather = {
                                  id: 0,
                                  key: chude[i].ma_chu_de,
                                  chude: chude[i].id,
                                  standardOutput: [],
                                  mathanhphan: chude[i].ma_chu_de,
                                  tenthanhphan: chude[i].ten_chu_de,
                                  mota: '',
                                  tile: '',
                                  del_flag: 0,
                                };
                                let data = {
                                  id: result[j].id,
                                  key: result[j].mathanhphan,
                                  chude: chude[i].id,
                                  standardOutput: result[j].standardOutput,
                                  mathanhphan: "\xa0\xa0\xa0" + result[j].mathanhphan,
                                  tenthanhphan: result[j].tenthanhphan,
                                  mota: result[j].mota,
                                  tile: result[j].tile + "%",
                                  del_flag: result[j].del_flag,
                                }
                                previewInfo = previewInfo.concat(dataFather);
                                previewInfo = previewInfo.concat(data);
                              } else {
                                let data = {
                                  id: result[j].id,
                                  key: result[j].mathanhphan,
                                  chude: chude[i].id,
                                  standardOutput: result[j].standardOutput,
                                  mathanhphan: "\xa0\xa0\xa0" + result[j].mathanhphan,
                                  tenthanhphan: result[j].tenthanhphan,
                                  mota: result[j].mota,
                                  tile: result[j].tile + "%",
                                  del_flag: result[j].del_flag,
                                }
                                previewInfo = previewInfo.concat(data);
                              }
                  
                            }
                          }
                        }
                  
                        if (previewInfo === undefined || previewInfo.length === 0) return [];
    
                        // cắt khoảng trắng trước các mã thành phần 
                        for (let i = 0; i < previewInfo.length; i++) {
                            let flag = false;
                            for (let j = 0; j < chude.length; j++) {
                                if (previewInfo[i].mathanhphan === chude[j].ma_chu_de)
                                  flag =  true;
                              }
                          if (!flag && previewInfo[i].mathanhphan[0] === '\xa0') {
                            previewInfo[i].mathanhphan = previewInfo[i].mathanhphan.slice(3, previewInfo[i].mathanhphan.length);
                          }
                        }
                    
                        //sort Value theo thứ tự
                        for (let i = 0; i < previewInfo.length - 1; i++) {
                          for (let j = i + 1; j < previewInfo.length; j++) {
                            if (previewInfo[j].mathanhphan < previewInfo[i].mathanhphan) {
                              let temp = previewInfo[j];
                              previewInfo[j] = previewInfo[i];
                              previewInfo[i] = temp;
                            }
                          }
                        }
                    
                    
                        //find vị trí các parent
                        let index = [];
                        for (let i = 0; i < previewInfo.length; i++) {
                            for (let j = 0; j < chude.length; j++) {
                                if (previewInfo[i].mathanhphan === chude[j].ma_chu_de){
                                    index.push(i);
                                }
                            }
                        }
                    
                        //nếu chỉ có 1 parent
                        if (index.length === 1) {
                    
                          let totalTile = 0;
                          for (let j = 1; j < previewInfo.length; j++) {
                            let newTile = previewInfo[j].tile;
                            totalTile += parseFloat(newTile);
                          }
                    
                          previewInfo[index[0]].tile = totalTile + "%";
                        }
                        //nếu có nhiều parent 
                        else {
                          for (let i = 0; i < index.length - 1; i++) {
                            let totalTile = 0;
                            for (let j = index[i] + 1; j < index[i + 1]; j++) {
                              let newTile = previewInfo[j].tile;
                              totalTile += parseFloat(newTile);
                            }
                            previewInfo[index[i]].tile = totalTile + "%";
                          }
                          let totalTile = 0;
                          for (let i = index[index.length - 1] + 1; i < previewInfo.length; i++) {
                            let newTile = previewInfo[i].tile;
                            totalTile += parseFloat(newTile);
                          }
                    
                          previewInfo[index[index.length - 1]].tile = totalTile + "%";
                        }
                        
                        for (let i = 0; i < previewInfo.length; i++) {
                            let flag = false;
                            for (let j = 0; j < chude.length; j++) {
                                if (previewInfo[i].mathanhphan === chude[j].ma_chu_de)
                                  flag =  true;
                              }
                              if (!flag) {
                                previewInfo[i].mathanhphan = '\xa0\xa0\xa0' + previewInfo[i].mathanhphan;
                              }
                        }
                        

                        data7 = previewInfo;
                      })
                })
        } catch (e) {
            console.log("tab7 error : " + e);
        }
    }

    getData8 = (monhoc) => {
        try {
            $.getLoaiTaiNguyen()
                .then(function (response) {
                    let loaitainguyen = response.data;

                    $.getTaiNguyenMonHoc(monhoc).then(response => {
                        // return response.data
                        let temp = response.data
                        let tempPreview = [];

                        if (temp !== null && temp !== undefined) {
                            temp.map((item, index) => {
                                let loai = "";

                                for (let i = 0; i < loaitainguyen.length; i++) {
                                    if (item.tnmh_loai_tai_nguyen_id === loaitainguyen[i].id) {
                                        loai = loaitainguyen[i].loai;
                                    }
                                }

                                let data = {
                                    id: item.id,
                                    key: index,
                                    index: index,
                                    stt: index + 1,
                                    loai: loai,
                                    mota: item.mo_ta,
                                    link: item.lien_ket,
                                    del_flag: item.del_flag,
                                }

                                tempPreview.push(data);
                            })
                            data8 = tempPreview;
                        }
                    })
                });
        } catch (e) {
            console.log("tab8 error : " + e);
        }
    }

    getData9 = (monhoc) => {
        try {
            $.getData9(monhoc)
                .then(response => {
                    const data = response.data;

                    data.forEach((item, index) => {
                        let temp = {
                            id: item.id,
                            content: item.noi_dung,
                            del_flag: item.del_flag
                        };
                        data9.push(temp);
                    });
                });
        } catch (e) {
            console.log("tab9 error : " + e);
        }
    }

    loadData = (monhoc,id_ctdt) => {
        this.getData1(monhoc);
        this.getData2(monhoc);
        this.getData3(monhoc);
        this.getData4(monhoc, id_ctdt);
        this.getData5(monhoc,id_ctdt);
        this.getData6(monhoc, id_ctdt);
        this.getData7(monhoc, id_ctdt);
        this.getData8(monhoc);
        this.getData9(monhoc);
    }

    clear = () => {
        data1 = [];
        data2 = [];
        data3 = [];
        data4 = [];
        data5 = [];
        data6 = [];
        data7 = [];
        data8 = [];
        data9 = [];
    }

    componentDidMount() {
        this.clear();
        this.loadData(this.props.monhoc,this.props.id_ctdt);
        
        plainOptions.forEach((v, i) => {
            this.setState({ [v]: false });
        });
    }
 
    returnReducer = (pos) => {
        switch (pos) {
            case 1: {
                return data1;
            }
            case 2: {
                return data2;
            }
            case 3: {
                return data3;
            }
            case 4: {
                return data4;
            }
            case 5: {
                return data5;
            }
            case 6: {
                return data6;
            }
            case 7: {
                return data7;
            }
            case 8: {
                return data8;
            }
            case 9: {
                return data9;
            }
            default:
                return null;
        }
    }

    addDataMap = (callback) => {
        if (this.state.selectedItem.length > 0) {
            let data = new Map();

            for (let i = 0; i < plainOptions.length; i++) {
                data.set(plainOptions[i], "");
            }

            for (let j = 0; j < this.state.selectedItem.length; j++) {
                for (let i = 0; i < plainOptions.length; i++) {
                    if (this.state.selectedItem[j] === plainOptions[i]) {
                        let pos = i + 1;
                        data.set(plainOptions[i], JSON.stringify(this.returnReducer(pos)));
                    }
                }
            }

            const obj = {}
            for (let [k, v] of data) {
                if (v !== "") {
                    obj[k] = v
                }
            }

            callback(obj);
        } else {
            message.error("Vui lòng chọn ít nhất 1 mục ");
        }
    }
    export = () => {
        let self = this;

        this.addDataMap(function (obj) {

            let data = {
                content: JSON.stringify(obj),
                nameFile: self.props.tenmonhoc,
            }
            $.exportFile(JSON.stringify(data)).then(res => {
                const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
                saveAs(pdfBlob, data.nameFile + '.pdf')
            })
        })
    }
    handleChange = ({ target: { label, checked } }) => {

        this.setState({ [label]: checked });
        if (checked) { // checked
            this.setState({
                selectedItem: [...this.state.selectedItem, label]
            })
        } else {  // unchecked
            var array = [...this.state.selectedItem]; // make a separate copy of the array
            var index = array.indexOf(label)
            if (index !== -1) {
                array.splice(index, 1);
                this.setState({ selectedItem: array });
            }
        }
    }

    onCheckAllChange = (e) => {
        plainOptions.forEach((v, i) => {
            this.setState({ [v]: e.target.checked });
        });
        if (e.target.checked) {
            this.setState({ selectedItem: plainOptions });
        } else {
            this.setState({ selectedItem: [] });
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="section-layout">
                    <div className="export-css">
                        <Checkbox
                            onChange={(e) => { this.onCheckAllChange(e) }}
                        >
                            Chọn tất cả
                                </Checkbox>
                    </div>
                    <div className="export-css">
                        <CheckboxGroup
                            {...this.state}
                            options={plainOptions}
                            handleChange={this.handleChange} />

                    </div>
                    <br />
                    <div className="export-css">
                        <button onClick={this.export} type="button" class="btn btn-success">Xuất file PDF</button>
                        <br /><br /><br />
                        
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        cdrmdhddb: state.cdrmdhddb,
    }
}

export default connect(mapStateToProps, null)(ExportFile);