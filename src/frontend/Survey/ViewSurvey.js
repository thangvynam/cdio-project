import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Select, Form, DatePicker, Button, Icon, message
} from 'antd';
import ItemVIewSurvey from './ItemVIewSurvey';
import Title from 'antd/lib/skeleton/Title';
import $ from './../helpers/services';
import { getTimeFromString } from "./../utils/Time"
import { updateListSurvey } from '../Constant/ActionType';
import { bindActionCreators } from 'redux';

const Option = Select.Option;
const { RangePicker } = DatePicker;

let nameTitle = '';
let idTitle = '';
let rangeTime = '';

function handleChange(value) {
    idTitle = value;
}

function onChange(date, dateString) {
    rangeTime = dateString;
}

class ItemSurvey {
    constructor(id, rangeTime, subjectList) {
        this.id = id;
        this.rangeTime = rangeTime;
        this.subjectList = subjectList;
    }
}

class ViewSurvey extends Component {

    state = {
        listSurvey: [],
        idCTDT: '',

    }

    genForm() {
        let htmlDom = []

        this.state.listSurvey.forEach((survey, index) => {
            let title = this.props.ctdt.find(item => item.id = survey.id).EduName;
            htmlDom.push(
                <ItemVIewSurvey
                    key={index}
                    id={survey.id}
                    subjectList={survey.subjectList}
                    title={title}
                    dateFrom={survey.rangeTime[0]}
                    dateTo={survey.rangeTime[1]}
                />
            );
        });

        return htmlDom;
    }

    create = () => {
        if (!idTitle) {
            message.error("Chưa chọn chương trình đào tạo");
        } else {
            if (!rangeTime) {
                message.error("Chưa chọn thời gian")
            } else {
                let obj = {
                    id_ctdt: idTitle,
                    start_date: parseInt(new Date(rangeTime[0]).getTime()),
                    end_date: parseInt(new Date(rangeTime[1]).getTime())
                }
                $.getSurveyCTDTTime(obj).then(res => {
                    if (res !== null && res.data !== null && res.data.length > 0) {
                        message.error("Trong khoảng thời gian này dã tồn tại cuộc survey")
                    } else {
                        $.addSurveyList(obj).then(res => {
                            $.getSurveyCTDTTime2(obj).then(res => {
                                if (res.data) {
                                    let idSurveyList = res.data[0].id;
                                    $.getBlockSubject(idTitle).then(res => {
                                        let resData = res.data.data;
                                        let dataSubject = [];
                                        let dataCtdt = [];
                                        if (resData !== undefined && resData !== null) {
                                            for (let i = 0; i < resData.length; i++) {
                                                dataCtdt = dataCtdt.concat(resData[i].block);
                                                for (let j = 0; j < resData[i].block.length; j++) {
                                                    dataSubject = dataSubject.concat(resData[i].block[j].subjects);
                                                }
                                            }
                                            dataSubject.sort((a, b) => a.IdSubject - b.IdSubject);
                                            let subjectList = [];
                                            dataSubject.map(item => {
                                                $.getSubjectTeacher(item.IdSubject).then(res => {
                                                    if (res && res.data && res.data.length > 0) {
                                                        let listIdUser = [];
                                                        res.data.forEach(item => {
                                                            listIdUser.push(item.IdUser);
                                                        })

                                                        let obj1 = {
                                                            id_mon: item.IdSubject,
                                                            id_giaovien: listIdUser,
                                                            idSurveyList: idSurveyList
                                                        }

                                                        $.addSurveyData(obj1).then(res => {

                                                        })




                                                    }

                                                })
                                            })


                                            let obj1 = new ItemSurvey(idTitle, rangeTime, dataSubject);

                                            this.setState({
                                                listSurvey: [...this.state.listSurvey, obj1],
                                            });
                                        }
                                    })
                                }
                            })

                        })
                    }
                })

            }
        }


    }

    render() {

        const formItemLayout = {
            labelCol: {
                xs: { span: 12 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        return (
            <div className="section-layout">
                <Form.Item
                    {...formItemLayout}
                    label="Chương trình đào tạo"
                >
                    <Select style={{ width: 370 }} onChange={handleChange}>
                        {this.props.ctdt ? this.props.ctdt.map(item => {
                            return <Option value={item.Id}>{item.EduName}</Option>
                        }) : <Option></Option>}
                    </Select>
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="Khoảng thời gian"
                >
                    <RangePicker onChange={onChange} />
                </Form.Item>
                <Form.Item
                    {...formItemLayout} >
                    <center>
                        <Button
                            type="primary"
                            style={{ marginLeft: "2em" }}
                            onClick={this.create}
                        >
                            Tạo <Icon type="plus" />
                        </Button>
                        <br />
                    </center>
                </Form.Item>
                <br />
                {/* <ItemVIewSurvey 
                                    title = "Nam"
                                /> */}
                {this.genForm()}
            </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ctdt: state.eduPrograms,
        surveyReducer: state.surveyReducer,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({
        onUpdateListSurvey: updateListSurvey,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewSurvey);