import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Select, Form, DatePicker, Button, Icon,message
} from 'antd';
import ItemVIewSurvey from './ItemVIewSurvey';
import Title from 'antd/lib/skeleton/Title';
import $ from './../helpers/services';
import {getTimeFromString} from "./../utils/Time"

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
    constructor(data, rangeTime) {
        this.id = data;
        this.rangeTime = rangeTime;
    }
}

class ViewSurvey extends Component {

    state = {
        listSurvey: [],
        idCTDT : '',

    }

    genForm() {
        let htmlDom = []

        this.state.listSurvey.forEach(survey => {
            let title = this.props.ctdt.find(item => item.id = survey.id).EduName;
            htmlDom.push(
                <ItemVIewSurvey
                    key ={survey.id}
                    id = {survey.id}
                    // title={title}
                    title = {survey.id}
                    dateFrom={survey.rangeTime[0]}
                    dateTo={survey.rangeTime[1]}
                />
            );
        });

        return htmlDom;
    }

    create = () => {
        if(!idTitle){
            message.error("Chưa chọn chương trình đào tạo");
        }else {
           
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
                            if(res && res.data && res.data.length > 0){
                                // console.log(res.data)
                                let listIdUser = [];
                                res.data.forEach(item => {
                                    listIdUser.push(item.IdUser);
                                })
                                    let startDate = new Date(rangeTime[0]);
                                    startDate.setHours(0, 0, 0, 0);
                                    let endDate = new Date(rangeTime[1]);
                                    endDate.setHours(23, 59, 59, 999);

                                    let obj = {
                                        id_ctdt : idTitle,
                                        id_mon : item.IdSubject,
                                        id_giaovien : listIdUser,
                                        start_date : parseInt(startDate.getTime()),
                                        end_date : parseInt(endDate.getTime()),
                                    }
                                    $.addSurveyData(obj).then(res => {
                                    
                                    })
                              
                            }
                          
                        })
                    })
                
                    
                    //   $.getTeacherSubject({idUser: JSON.parse(localStorage.getItem('user')).data.Id})
                    //   .then(res => { 
                    //     if(res.data !== undefined && res.data !== null){
                    //       this.props.updateTeacherSubject(res.data);
                    //     }
                    //     $.getTeacherReviewSubject({idUser: JSON.parse(localStorage.getItem('user')).data.Id})
                    //     .then(res => {
                    //       if(res.data !== undefined && res.data !== null){
                    //         this.props.updateTeacherReviewSubject(res.data);
                    //       }
                    //       if(this.checkChuNhiem(JSON.parse(localStorage.getItem('user')).data.Role)) {
              
                    //         dataSubject = dataSubject.filter(item => 
                    //             item.del_flat != 1
                    //         );
                            
                    //       }
                    //       else {
                    //         dataSubject = dataSubject.filter(item => 
                    //               item.del_flat != 1
                    //               && (this.checkInTeacherSubject(this.props.teacherSubject, item.IdSubject)
                    //               || (this.checkInTeacherReviewSubject(this.props.teacherReviewSubject, item.IdSubject)))
                    //           );
                    //           this.props.updateSubjectList(dataSubject);
                    //       }
                    //     });
                    //   });
                      
                    }})
                console.log(rangeTime)
                let obj = new ItemSurvey(idTitle, rangeTime);
                
                this.setState({
                    listSurvey: [...this.state.listSurvey, obj],
                });
            }
           
        
        
    }

    render() {
        
        if(rangeTime){
            console.log()
            let startDate = new Date(rangeTime[0]);
            startDate.setHours(0,0,0,0); 
            let endDate = new Date(rangeTime[1]);
            endDate.setHours(23,59,59,999)
            console.log(startDate)
            console.log(endDate)
    
        }
        
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
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewSurvey);