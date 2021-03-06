import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Select, Form, DatePicker, Button, Icon
} from 'antd';
import ItemVIewSurvey from './ItemVIewSurvey';
import $ from './../helpers/services';
import { updateListSurvey } from '../Constant/ActionType';
import { bindActionCreators } from 'redux';
import { formatDate } from "../utils/Time";
import NotificationHelper from "../helpers/NotificationHelper"

const Option = Select.Option;
const { RangePicker } = DatePicker;

let idTitle = '';
let rangeTime = '';

function handleChange(value) {
    idTitle = value;
}

function onChange(date, dateString) {
    rangeTime = dateString;
}

class ItemSurvey {
    constructor(id, rangeTime, subjectList, status, idSurveyList) {
        this.idSurveyList = idSurveyList;
        this.id = id;
        this.rangeTime = rangeTime;
        this.subjectList = subjectList;
        this.status = status;
    }
}

class ViewSurvey extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listSurvey: [],
            idCTDT: '',

        }
        this.getData = this.getData.bind(this);
    }


    componentWillMount() {
        let currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        $.updateStatusSurvey({ data: parseInt(currentDate.getTime()) }).then(res => {
            this.getData();
        })
    }

    getData() {
        this.setState({
            listSurvey: []
        })

        $.getSurveyList().then(res => {
            if (res && res.data) {
                res.data.forEach(item => {
                    let idSurveyList = item.id;
                    let rangeTimeTemp = [];
                    rangeTimeTemp.push(formatDate(item.start_date));
                    rangeTimeTemp.push(formatDate(item.end_date));
                    let id_ctdt = item.id_ctdt;
                    let status = item.status;
                    $.getSurveyId({ data: item.id }).then(res => {
                        if (res.data) {
                            let subjectListId = [];
                            let subjectList = [];
                            res.data.forEach(element => {
                                if (!subjectListId.includes(element.id_mon)) {
                                    subjectListId.push(element.id_mon);
                                }
                            })
                            $.getSubjectWithId(subjectListId).then(res => {
                                if (res.data) {
                                    subjectList = res.data;
                                    let obj = new ItemSurvey(id_ctdt, rangeTimeTemp, subjectList, status, idSurveyList);
                                    this.setState({
                                        listSurvey: [...this.state.listSurvey, obj],
                                    });
                                }
                            })
                        }

                    })
                })
            }


        })
    }



    genForm() {
        const {listSurvey} = this.state;
        let htmlDom = []
        listSurvey.sort((a, b) => parseInt(b.status) - parseInt(a.status));
        // console.log(listSurvey[0] ? listSurvey[0].rangeTime[0].replace(/-/g,"") : null)
        listSurvey.sort((a,b) => parseInt(a.rangeTime[0].replace(/-/g,"")) - parseInt(b.rangeTime[0].replace(/-/g,"")))
        listSurvey.forEach((survey, index) => {
            let title = this.props.ctdt.find(item => item.Id === survey.id);
            htmlDom.push(
                <ItemVIewSurvey
                    key={index}
                    id={survey.id}
                    subjectList={survey.subjectList}
                    title={title ? title.EduName : "ERROR SUBJECT NAME"}
                    dateFrom={survey.rangeTime[0]}
                    dateTo={survey.rangeTime[1]}
                    status={survey.status}
                    idSurveyList={survey.idSurveyList}
                    //
                    getData={this.getData}
                />
            );
        });

        return htmlDom;
    }

    check = (dataSubject) => {
        const promiseSubject = dataSubject.map(item => {
            return new Promise((resolve, reject) => {
                $.getSubjectTeacher(item.IdSubject).then(res => {
                    if (res && res.data && res.data.length > 0) {
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                })
            })
        })
        return promiseSubject;
    }

    create = () => {
        if (!idTitle) {
            NotificationHelper.openNotificationError("Chưa chọn chương trình đào tạo")
        } else {
            if (!rangeTime) {
                NotificationHelper.openNotificationError("Chưa chọn thời gian")
            } else {
                let status;

                let dateFrom = new Date(rangeTime[0]).setHours(0, 0, 0, 0);
                let dateTo = new Date(rangeTime[1]).setHours(23, 59, 59, 59);
                let today = new Date().setHours(0, 0, 0, 0);
                if (dateFrom < today) {
                    NotificationHelper.openNotificationError("Không chọn ngày bắt đầu nhỏ hơn ngày hiện tại")
                } else {
                    if (dateFrom === today) {
                        status = 1;
                    } else {
                        status = -1;
                    }

                    let obj = {
                        id_ctdt: idTitle,
                        start_date: dateFrom,
                        end_date: dateTo,
                        status: status,
                    }

                    $.getSurveyCTDTTime(obj).then(res => {
                        if (res !== null && res.data !== null && res.data.length > 0) {
                            NotificationHelper.openNotificationError("Trong khoảng thời gian này dã tồn tại cuộc survey")
                        } else {
                            $.getBlockSubject(idTitle).then(res => {
                                let resData = res.data.data;
                                let dataSubject = [];
                                let dataCtdt = [];
                                if (resData) {
                                    for (let i = 0; i < resData.length; i++) {
                                        dataCtdt = dataCtdt.concat(resData[i].block);
                                        for (let j = 0; j < resData[i].block.length; j++) {
                                            dataSubject = dataSubject.concat(resData[i].block[j].subjects);
                                        }
                                    }
                                }

                                dataSubject.sort((a, b) => a.IdSubject - b.IdSubject);

                                if (!resData || dataSubject.length === 0) {
                                    NotificationHelper.openNotificationError("Chương trình đào tạo không có môn học để thực hiện cuộc survey")
                                } else {
                                    Promise.all(this.check(dataSubject)).then(res => {
                                        if (res.includes(true)) {
                                            $.addSurveyList(obj).then(res => {
                                                if (res.data) {

                                                    let idSurveyList = res.data;
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
                                                                    idSurveyList: idSurveyList,
                                                                    status: status,
                                                                }

                                                                $.addSurveyData(obj1).then(res => {
                                                                })
                                                            }

                                                        })
                                                    })

                                                    let obj1 = new ItemSurvey(idTitle, rangeTime, dataSubject, status, idSurveyList);
                                                    this.setState({
                                                        listSurvey: [...this.state.listSurvey, obj1],
                                                    });
                                                    NotificationHelper.openNotificationSuccess("Tạo cuộc Survey thành công")
                                                }
                                            })
                                        } else {
                                            NotificationHelper.openNotificationError("Không có giảng viên nào trực tiếp giảng dạy các môn học trong chương trình đào tạo này")
                                        }
                                    })

                                }
                            })

                        }
                    })
                }

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
                            return <Option key={item.Id} value={item.Id}>{item.EduName}</Option>
                        }) : <Option></Option>}
                    </Select>
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="Khoảng thời gian"
                >
                    <RangePicker style={{ width: 370 }} onChange={onChange} />
                </Form.Item>
                <Form.Item>
                    <Button className="create-survey-btn"
                        type="primary"
                        onClick={this.create}
                    >
                        Tạo <Icon className="icon-create-survey" type="plus" />
                    </Button>
                </Form.Item>
                <br />

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