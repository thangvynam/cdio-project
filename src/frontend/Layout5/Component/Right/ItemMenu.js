import React, { Component } from 'react';
import {
    Form, Input, Tooltip, Icon, Cascader, Select, Button, message
} from 'antd';
import { Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import $ from './../../../helpers/services';
import { getCurrTime } from '../../../utils/Time';

import {
    ADD_DATA, CHANGE_DATA, COLLECT_DATA_HDD, COLLECT_DATA_DG,
    IS_LOADED_5, COLLECT_DATA_CDR, SAVE_LOG_OBJECT,REFRESH_DATA, SAVE_LOG
} from '../../../Constant/ActionType';

const { Option } = Select;

let titleName = '';
let isSubmit = false;
let teachingActs_data = [];
let standardOutput_data = [];
let evalActs_data = [];

class ItemMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            standardSelectedItem: [],
            previewInfo: [],
            redirectTab7: false,
            standard_item: [],
        }
    }

    componentDidMount() {
        
        if(!this.props.itemLayout5Reducer.isLoaded) {
            this.props.updateIssLoad5(true);
            this.props.refreshData();    
            this.props.collectDataRequest(this.props.monhoc, this.props.ctdt);
        }
    }
    
    componentWillMount() {
        this.getDataHDD();
    }

    getDataHDD = () => {
        let mapId = {
            teachingActs: new Map(),
            standardOutput: new Map(),
            evalActs: new Map(),
        }

        $.getTeachingActs_5().then(response => {
            const data = response.data;
            let map = new Map();
            
            if (data != null) {
                data.forEach((item, index) => {
                    map.set(item.hoat_dong, index);
                });
                mapId.teachingActs = map;

                this.props.saveDataValue(mapId.teachingActs)
            }
            
        });
        $.getEvalActs5({data: this.props.monhoc,  idCtdt: this.props.ctdt})
            .then(response => {
                const data = response.data;
                let map = new Map();

                if (data != null) {
                    data.forEach((item, index) => {
                        map.set(index, item.ma);
                    })
                    mapId.evalActs = map;

                    this.props.saveDataValueDG(mapId.evalActs)
                }
            })
       
        $.getStandardOutput5({data: this.props.monhoc, idCtdt: this.props.ctdt})
            .then(response => {
                const data = response.data;
                let array = [];
                let map = new Map();

                if (data != null) {
                    data.forEach((item) => {
                        let temp = {
                            value: item.muc_tieu,
                            label: item.muc_tieu,
                            children: [],
                        }

                        item.cdr.forEach((itemCdr, _) => {
                            let tempCdr = {
                                value: itemCdr.chuan_dau_ra,
                                label: itemCdr.chuan_dau_ra
                            }
                            temp.children.push(tempCdr);
                            map.set(itemCdr.chuan_dau_ra, itemCdr.id);
                        })

                        array.push(temp);
                    });
                    // this.setState({standard_item:array,standardOutput:map});
                    mapId.standardOutput = map;
                    this.setState({ standard_item: array });    
                    this.props.saveDataValueCDR(array)
                }
            });
    }

    displayRender = (label) => {
        if (isSubmit) {
            isSubmit = false;
            return null;
        }

        if (label.length > 0) {
            return label[0];
        }
    };

    onChange = (value) => {
        if (value.length === 0) {
            return;
        }

        var newArray = this.state.standardSelectedItem.slice();
        let item = value[1];
        let flag = true;

        if (typeof item === 'undefined') {
            return;
        }

        for (let i = 0; i < newArray.length; i++) {
            if (newArray[i] === item) {
                newArray.splice(i, 1);
                flag = false;
            }
        }

        if (flag) {
            newArray.push(item);
        }

        this.setState({ standardSelectedItem: newArray });

        standardOutput_data = newArray;

        this.props.onChangeData(titleName, teachingActs_data, standardOutput_data, evalActs_data);
    }

    toString = () => {
        let temp = '';
        let data = this.props.itemLayout5Reducer.tempInfo.standardOutput;

        for (let i = 0; i < data.length; i++) {
            if (typeof data[i] !== 'undefined') {
                temp += data[i] + " , ";
            }

        }

        return temp;
    }

    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    handleInputChange = (e) => {
       
        titleName = e.target.value;
        this.props.onChangeData(titleName, teachingActs_data, standardOutput_data, evalActs_data);
    }

    moveTab7 = () => {
        this.setState({ redirectTab7: true });
    }

    redirect() {
        if (this.state.redirectTab7) {
            return (
                <Redirect to="danh-gia" />
            );
        }
    }


    render() {
        let childrenTeachingActs = [];
        let evalActs = [];
        let data = [];
        let childrenEvalActs = [];
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 12 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        const formDynamicItemLayout = {
            labelCol: {
                xs: { span: 12 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 3 },
            },
        };

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        if (this.props.itemLayout5Reducer.teachingActsData.length !== 0) {
            for (let i = 0; i < this.props.itemLayout5Reducer.teachingActsData.length; i++) {
                childrenTeachingActs.push(this.props.itemLayout5Reducer.teachingActsData[i])
            }

            for (let i = 0; i < this.props.itemLayout5Reducer.evalActsData.length; i++) {
                evalActs.push(this.props.itemLayout5Reducer.evalActsData[i])
            }

        }

        function init() {
            for (let i = 0; i < childrenTeachingActs.length; i++) {
                data.push(<Option key={childrenTeachingActs[i]}>{childrenTeachingActs[i]}</Option>)
            }
            for (let i = 0; i < evalActs.length; i++) {
                childrenEvalActs.push(<Option key={evalActs[i]}>{evalActs[i]}</Option>)
            }
        }

        init();

        return (
            <div>
                {this.redirect()}
                <div>
                    <div style={{ marginTop: "10px" }}></div>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item
                            {...formItemLayout}
                            label="Tên chủ đề"
                        >
                            {getFieldDecorator('name', {
                                rules: [{
                                    required: true, message: 'Vui lòng nhập tên chủ đề',
                                }],
                                initialValue: this.props.itemLayout5Reducer.tempInfo.titleName
                            })(
                                <Input onChange={this.handleInputChange} />
                            )}

                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            label="Hoạt động dạy"
                        >
                            {getFieldDecorator('teachingActs', {
                                initialValue: this.props.itemLayout5Reducer.tempInfo.teachingActs
                            })(
                                <Select
                                    mode="tags"
                                    style={{ width: '100%' }}
                                    placeholder="Please select"
                                    onChange={(value) => this.props.handleChangeTeachingAct(value)}
                                >
                                    {data}
                                </Select>
                            )}

                        </Form.Item>

                        <Form.Item
                            {...formDynamicItemLayout}
                            label={(
                                <span>
                                    Chọn chuẩn đầu ra&nbsp;
                            <Tooltip title="Tham khảo mục chuẩn đầu ra để chọn">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </span>
                            )}
                        >
                            <Cascader 
                                options={this.state.standard_item}
                                onChange={this.onChange}
                                placeholder="Chọn chuẩn đầu ra" displayRender={this.displayRender} />

                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            label="Kết quả chuẩn đầu ra"
                        >
                            <Input disabled value={this.toString()} />
                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            label={(
                                <span>
                                    Hoạt động đánh giá&nbsp;
                            <Tooltip title="Có thể nhập thêm hoạt động đánh giá ">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </span>
                            )}
                        >
                            {getFieldDecorator('evalActs', {
                                initialValue: this.props.itemLayout5Reducer.tempInfo.evalActs
                            })(

                                <Select
                                    mode="multiple"
                                    style={{ width: '100%', float: "left", width: '74%' }}
                                    placeholder="Please select"
                                    onChange={(value) => this.props.handleChangeEvalActs(value)}
                                >
                                    {childrenEvalActs}
                                </Select>
                            )}

                            <div style={{ float: "left"}}>
                                <Button type="primary" onClick={this.moveTab7}>
                                    Nhập đánh giá
                                </Button>
                            </div>

                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                            <div>

                                <Button type="primary" onClick={() => {
                                    this.props.onSaveLog(`${JSON.parse(localStorage.getItem('user')).data.Name}`, getCurrTime(), `Thêm kế hoạch giảng dạy lý thuyết: Chủ đề : ${this.props.itemLayout5Reducer.titleName} ; Chuẩn đầu ra : ${this.props.itemLayout5Reducer.standardOutput} ; Hoạt động dạy/ Hoạt động học : ${this.props.itemLayout5Reducer.teachingActs} ; Hoạt động đánh giá: ${this.props.itemLayout5Reducer.evalActs}`, this.props.logReducer.contentTab, this.props.monhoc,this.props.ctdt)
                                    this.props.onSaveReducer(`${JSON.parse(localStorage.getItem('user')).data.Name}`, getCurrTime(), `Thêm kế hoạch giảng dạy lý thuyết: Chủ đề : ${this.props.itemLayout5Reducer.titleName} ; Chuẩn đầu ra : ${this.props.itemLayout5Reducer.standardOutput} ; Hoạt động dạy/ Hoạt động học : ${this.props.itemLayout5Reducer.teachingActs} ; Hoạt động đánh giá: ${this.props.itemLayout5Reducer.evalActs}`, this.props.logReducer.contentTab, this.props.monhoc)
                                    this.props.saveAndContinue(this.props.monhoc)
                                }} style={{ marginLeft: "15%" }}>
                                    Thêm
                                </Button>
                                <br />
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        itemLayout5Reducer: state.itemLayout5Reducer,
        logReducer: state.logReducer,
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSaveLog : (ten, timestamp, noi_dung, muc_de_cuong, thong_tin_chung_id,ctdt) => {
            dispatch({
                type:SAVE_LOG,ten: ten,
                timestamp: timestamp,
                noi_dung: noi_dung,
                muc_de_cuong: muc_de_cuong,
                thong_tin_chung_id: thong_tin_chung_id,
                ctdt : ctdt,
            });
        },
        onSaveReducer : (ten,timestamp,noi_dung,muc_de_cuong,thong_tin_chung_id) => {
            dispatch({
                type: SAVE_LOG_OBJECT,
                ten: ten,
                timestamp: timestamp,
                noi_dung: noi_dung,
                muc_de_cuong: muc_de_cuong,
                thong_tin_chung_id: thong_tin_chung_id,
            });
        },
        onChangeData: (titleName, teachingActs_data, standardOutput_data, evalActs_data) => {
            dispatch({
                type: CHANGE_DATA, titleName: titleName, teachingActs: teachingActs_data,
                standardOutput: standardOutput_data, evalActs: evalActs_data
            });
        },

        handleChangeTeachingAct: (value) => {
            teachingActs_data = value;
            dispatch({
                type: CHANGE_DATA, titleName: titleName, teachingActs: teachingActs_data,
                standardOutput: standardOutput_data, evalActs: evalActs_data
            });
        },

        handleChangeEvalActs: (value) => {
            evalActs_data = value;
            dispatch({
                type: CHANGE_DATA, titleName: titleName, teachingActs: teachingActs_data,
                standardOutput: standardOutput_data, evalActs: evalActs_data
            });
        },

        saveAndContinue: (subjectId) => {
            const myObj = {};

            //myObj.key = -1;
            myObj.id = -1;
            myObj.titleName = titleName;
            myObj.teachingActs = teachingActs_data;
            myObj.evalActs = evalActs_data;
            myObj.standardOutput = standardOutput_data;
            myObj.subjectId = subjectId;
            myObj.del_flag = 0;

            if (titleName === '' || standardOutput_data.length === 0) {
                message.error("Vui lòng điền đầy đủ thông tin");
            } else {
                //reset
                titleName = '';
                teachingActs_data = [];
                standardOutput_data = [];
                evalActs_data = [];

                isSubmit = true;
                let arr = [];

                arr.push(myObj);
                
                dispatch({ type: ADD_DATA, data: arr });
                ownProps.form.resetFields();
                ownProps.nextStep();
            }
            
            dispatch({
                type: CHANGE_DATA, titleName: '', teachingActs: [],
                standardOutput: [], evalActs: []
            });
        },

        saveDataValue: (teachingActs) => {
            dispatch({ type: COLLECT_DATA_HDD, data: teachingActs })
        },

        saveDataValueDG: (evalActs) => {
            dispatch({ type: COLLECT_DATA_DG, data: evalActs })
        },

        saveDataValueCDR: (listCDR) => {
            dispatch({ type: COLLECT_DATA_CDR, data: listCDR })
        },

        refreshData: () => {
            dispatch({type: REFRESH_DATA,data: []});
        },

        updateIssLoad5: () => {
            dispatch({type: IS_LOADED_5 , data: true});
        },

        collectDataRequest: (id, ctdt) => {
            let newArr = [];
            $.collectData5({data: id, ctdt: ctdt})
                .then(function (response) {
                    for (let i = 0; i < response.data.length; i++) {
                        let data = {
                            id: response.data[i].id,
                            titleName: response.data[i].titleName,
                            teachingActs: response.data[i].teachingActs,
                            standardOutput: response.data[i].standardOutput,
                            evalActs: response.data[i].evalActs,
                            subjectId: response.data[i].subjectId,
                            del_flag: 0
                        }
                        newArr.push(data);
                    }

                    dispatch({ type: ADD_DATA, data: newArr })
                })
                .catch(function (error) {
                    console.log(error);
                })
                .finally(function () {
                    console.log("[Finish] get data by thong_tin_chung_id " + id);
                })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemMenu);