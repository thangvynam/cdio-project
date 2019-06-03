import React, { Component } from 'react';
import { connect } from 'react-redux';

import CheckboxGroup from "./CheckboxGroup/CheckboxGroup";
import Loader from '../components/loader/loader';
import { Checkbox, message } from 'antd';
import $ from './../helpers/services';
import { ADD_DATA_LAYOUT_2, ADD_ARRAY_LAYOUT_3, addCDRData } from '../Constant/ActionType';

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

class ExportFile extends Component {

    state = {
        selectedItem: [],
        loading: -1,
    }

    // tab2
    async getData2() {
        const res = await $.getData2(this.props.monhoc);
        const resp = res.data;
        return resp.Description;
    }
    // tab3
    async getData3() {
        return $.getData3(this.props.monhoc).then(res => {
            return res.data
        }).then(resp => {
            return resp;
        });
    }
    // tab8
    async getData8() {
        try {
            const response = await $.getTaiNguyenMonHoc(this.props.monhoc);
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    }
    // tab7
    getData7() {
        var self = this;
        $.getChuDe()
            .then(function (response) {
                self.props.onGetChude(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        $.getStandardOutput7(this.props.monhoc)
            .then(function (response) {

                self.props.onGetCDR(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

        var listDG = [];
        var listCDRDG = [];
        var listCDR = [];
        var result = [];

        $.getDanhGia(this.props.monhoc).then(response => {
            if (response === null || response.data === null || response.data === undefined || response.data.length === 0) return;
            let listStringId = '';
            listDG = response.data;
            response.data.forEach(item => {
                if (listStringId === '') {
                    listStringId += item.id
                } else {
                    listStringId = listStringId + ',' + item.id;
                }
            })

            $.getCDRDanhgia({ data: listStringId }).then(response2 => {
                if (response2 === null || response2.data === null || response2.data === undefined || response2.data.length === 0) return;
                listCDRDG = response2.data
                let listCDRDGString = '';
                listCDRDG.forEach(item => {
                    if (listCDRDGString === '') {
                        listCDRDGString += item.chuan_dau_ra_mon_hoc_id;
                    } else {
                        listCDRDGString = listCDRDGString + ',' + item.chuan_dau_ra_mon_hoc_id;
                    }
                })
                $.getCDR_7({ data: listCDRDGString }).then(response3 => {
                    if (response3 === null || response3.data === null || response3.data === undefined || response3.data.length === 0) return;
                    listCDR = response3.data;
                    for (let i = 0; i < listDG.length; i++) {

                        let cdrResponse = [];
                        for (let j = 0; j < listCDRDG.length; j++) {

                            if (listDG[i].id === listCDRDG[j].danh_gia_id) {

                                for (let k = 0; k < listCDR.length; k++) {
                                    if (listCDRDG[j].chuan_dau_ra_mon_hoc_id === listCDR[k].id) {

                                        cdrResponse.push(listCDR[k].chuan_dau_ra);
                                    }
                                }
                            }
                        }
                        result.push({ danhgia: listDG[i], chuandaura: cdrResponse });
                    }
                    var chude = this.props.itemLayout7Reducer.chudeDanhGia;
                    var previewInfo = [];
                    for (let i = 0; i < chude.length; i++) {
                        let haveFather = false;
                        for (let j = 0; j < result.length; j++) {
                            let str = result[j].danhgia.ma.substring(0, chude[i].ma_chu_de.length);

                            if (str === chude[i].ma_chu_de) {
                                if (!haveFather) {
                                    haveFather = true;
                                    let dataFather = {
                                        key: chude[i].ma_chu_de,
                                        chude: chude[i].id,
                                        standardOutput: [],
                                        mathanhphan: chude[i].ma_chu_de,
                                        tenthanhphan: chude[i].ten_chu_de,
                                        mota: '',
                                        tile: '',
                                    };
                                    let data = {
                                        key: result[j].danhgia.ma,
                                        chude: chude[i].id,
                                        standardOutput: result[j].chuandaura,
                                        mathanhphan: "\xa0\xa0\xa0" + result[j].danhgia.ma,
                                        tenthanhphan: result[j].danhgia.ten,
                                        mota: result[j].danhgia.mo_ta,
                                        tile: result[j].danhgia.ti_le + "%",
                                    }
                                    previewInfo = previewInfo.concat(dataFather);
                                    previewInfo = previewInfo.concat(data);
                                } else {
                                    let data = {
                                        key: result[j].danhgia.ma,
                                        chude: chude[i].id,
                                        standardOutput: result[j].chuandaura,
                                        mathanhphan: "\xa0\xa0\xa0" + result[j].danhgia.ma,
                                        tenthanhphan: result[j].danhgia.ten,
                                        mota: result[j].danhgia.mo_ta,
                                        tile: result[j].danhgia.ti_le + "%",
                                    }
                                    previewInfo = previewInfo.concat(data);
                                }

                            }
                        }
                    }

                    if (previewInfo.filter(item => item.del_flag !== 1).length > 1) {
                        this.sortValues(previewInfo.filter(item => item.del_flag !== 1));

                    }

                    this.props.onAddDGData(previewInfo);
                })
            })

        })
    }
    // tab 4
    getCdrmdhd = (state, id) => {
        for (let i = 0; i < state.length; i++) {
            if (state[i].id === id) {
                return state[i];
            }
        }
        return { muc_do_1: "", muc_do_2: "", muc_do_3: "" };
    }
    async getData4() {
        var self = this;
        $.collectData4({ data: { thong_tin_chung_id: self.props.monhoc } })
            .then(function (response) {
                const tableData = {
                    previewInfo: []
                };
                for (let i = 0; i < response.data.length; i++) {
                    let cdrmdhd = self.getCdrmdhd(self.props.cdrmdhddb, response.data[i].cdrmh_muc_do_hanh_dong_id);
                    let data = {
                        key: (i + 1).toString(),
                        cdr: response.data[i].chuan_dau_ra,
                        level_verb: [cdrmdhd.muc_do_1, cdrmdhd.muc_do_2.toString(), cdrmdhd.muc_do_3],
                        description: response.data[i].mo_ta,
                        levels: response.data[i].muc_do.split(","),
                        id: response.data[i].id,
                        del_flag: response.data[i].del_flag
                    }
                    tableData.previewInfo.push(data);
                }
                self.props.onAddCDRData(tableData);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getUnique(arr, comp) {
        const unique = arr
            .map(e => e[comp])
            .map((e, i, final) => final.indexOf(e) === i && i)

            .filter(e => arr[e]).map(e => arr[e]);
        return unique;
    }

    async componentDidMount() {
        //tab 2
        let data2 = await this.getData2();
        //this.props.saveAndContinue2(data2);

        //tab 3 
        let temp = await this.getData3();
        let saveData = [];
        let standActs = [];
        if (temp.length > 0) {
            temp.forEach(element => {
                temp.forEach(element2 => {
                    if (element2.muc_tieu === element.muc_tieu) {
                        element2.KeyRow = element2.KeyRow.slice(0, element2.KeyRow.length - 1)
                        element2.KeyRow = element2.KeyRow.replace(/-/g, ".")
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
                saveData.push(newObj);
            });
        }
        saveData = this.getUnique(saveData, "objectName")
        saveData = saveData.filter((item) => item.del_flag === 0)

        //this.props.saveAndContinue3(saveData);

        //tab5
        this.props.saveAndContinue5(this.props.subjectid);

        //tab6
        this.props.saveAndContinue6(this.props.subjectid);

        //tab7
        this.getData7();

        //tab8
        let temp = await this.getData8();
        this.props.saveAndContinue8(temp);
    }

    componentWillMount() {
        //this.props.collectDataRequest(this.props.idMH);
        plainOptions.forEach((v, i) => {
            this.setState({ [v]: false });
        });
    }

    returnReducer = (pos) => {
        switch (pos) {
            case 1: {
                return this.props.itemLayout1Reducer.previewInfo;
            }
            case 2: {
                return this.props.itemLayout2Reducer.previewInfo;
            }
            case 3: {
                return this.props.itemLayout3Reducer.previewInfo;
            }
            case 4: {
                return this.props.itemLayout4Reducer.previewInfo;
            }
            case 5: {
                return this.props.itemLayout5Reducer.previewInfo;
            }
            case 6: {
                return this.props.itemLayout6Reducer.previewInfo;
            }
            case 7: {
                return this.props.itemLayout7Reducer.previewInfo;
            }
            case 8: {
                return this.props.itemLayout8Reducer.previewInfo;
            }
            case 9: {
                return this.props.itemLayout9Reducer.previewInfo;
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
                if (v != "") {
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
            self.setState({ loading: 0 });
            console.log(obj);
            $.exportFile(JSON.stringify(obj)).then(res => {
                if (res.data == 1) {
                    self.setState({ loading: 1 });
                }
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

    uploadDir = (file) => {
        console.log(file)
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
                        <Loader loading={this.state.loading} />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        itemLayout1Reducer: state.itemLayout1Reducer,
        itemLayout2Reducer: state.itemLayout2Reducer,
        itemLayout3Reducer: state.itemLayout3Reducer,
        itemLayout4Reducer: state.itemLayout4Reducer,
        itemLayout5Reducer: state.itemLayout5Reducer,
        itemLayout6Reducer: state.itemLayout6Reducer,
        itemLayout7Reducer: state.itemLayout7Reducer,
        itemLayout8Reducer: state.itemLayout8Reducer,
        itemLayout9Reducer: state.itemLayout9Reducer,
        subjectid: state.subjectid,
        cdrmdhddb: state.cdrmdhddb,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        saveAndContinue2: (description) => {
            dispatch({ type: ADD_DATA_LAYOUT_2, description });
        },
        saveAndContinue3: (item) => {
            dispatch({ type: ADD_ARRAY_LAYOUT_3, item });
        },
        saveAndContinue5: (id) => {
            let newArr = [];
            console.log(id)
            $.collectData5({ data: id })
                .then(function (response) {
                    console.log(response);
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
                        newArr.push(data);
                    }
                    console.log(newArr);
                    dispatch({ type: ADD_DATA, data: newArr })
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {
                    console.log("[Finish] get data by thong_tin_chung_id " + id);
                })
        },
        saveAndContinue6: (id) => {

        },
        onAddCDRData: (newData) => {
            dispatch(addCDRData(newData))
        },
        saveAndContinue8: (temp) => {
            let tempPreview = [];
            if (temp !== null && temp !== undefined && this.props.itemLayout8Reducer.isLoaded === false) {
                temp.map((item, index) => {
                    let data = {
                        id: item.id,
                        key: index,
                        index: index,
                        stt: index + 1,
                        loai: this.loaiDisplayName(item.tnmh_loai_tai_nguyen_id),
                        mota: item.mo_ta,
                        link: item.lien_ket,
                        del_flag: item.del_flag,
                    }
                    tempPreview.push(data);
                })
                this.props.isLoaded(true);
                //this.props.onAddTNData(tempPreview);
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExportFile);