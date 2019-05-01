import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Select, Form, DatePicker, Button, Icon,notification
} from 'antd';
import ItemVIewSurvey from './ItemVIewSurvey';
import axios from 'axios';

const Option = Select.Option;
const { RangePicker } = DatePicker;

let nameTitle = '';
let rangeTime = '';

function handleChange(value) {
    nameTitle = value;
}

function onChange(date,dateString) {
    rangeTime = dateString;
}

class ItemSurvey {
    constructor(data,rangeTime) {
        this.title = data;
        this.rangeTime = rangeTime;
    }
}


class ViewSurvey extends Component {

    state = {
        listSurvey : [],
        optionsSubject : [],
    }

    componentDidMount() {
        let obj = [];
        axios.get("/collect-subjectlist").then(res => {
            
            res.data.forEach(item => {
                obj.push(item);
            })
            this.setState ({
                optionsSubject : obj,
            }, () => console.log(this.state.optionsSubject))
        })
    }

    genForm() {
        let htmlDom = []

        this.state.listSurvey.forEach(survey => {
            console.log(survey);
            htmlDom.push(
                <ItemVIewSurvey
                    key = {survey.title}
                    subjectId = {survey.subjectId}
                    title = {survey.title}
                    dateFrom = {survey.rangeTime[0]}
                    dateTo = {survey.rangeTime[1]}
                />
            );
        });
        
        return htmlDom;
    }

    isExistNameTitle = () => {
      
        for(let i=0;i<this.state.listSurvey.length;i++){
            if(nameTitle === this.state.listSurvey[i].title) return true;
        }
        
        return false;
    }



    create = () => {
        if(this.isExistNameTitle()===true){
                notification["error"]({
                  message: "Đã tồn tại survey cho môn học đó",
                  duration: 1
                });
               
        }else{
            let obj = new ItemSurvey(nameTitle,rangeTime);
            obj.subjectId = this.state.optionsSubject.find(item => item.SubjectName === nameTitle).Id;
            this.setState({
                listSurvey: [...this.state.listSurvey,obj]
            }, () => console.log(this.state.listSurvey));
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
            <div className="container1">
                <div className="center-col">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12" >
                                <br />
                                <h1 style={{ textAlign: "center" }}>Quản lý cuộc survey</h1>
                                <Form.Item
                                    {...formItemLayout}
                                    label="Môn học"
                                >
                                    <Select style={{ width: 370 }} onChange={handleChange}>
                                        {this.state.optionsSubject.map(item => {
                                            return <Option value = {item.SubjectName} key = {item.SubjectCode}>{item.SubjectName}</Option>
                                        })}
                                        {/* <Option value="Những nguyên lý cơ bản của chủ nghĩa Mác - Lê Nin">Những nguyên lý cơ bản của chủ nghĩa Mác - Lê Nin</Option>
                                        <Option value="Đường lối cách mạng của ĐCSVN">Đường lối cách mạng của ĐCSVN</Option>
                                        <Option value="Tư tưởng HCM">Tư tưởng HCM</Option>
                                        <Option value="Pháp luật đại cương">Pháp luật đại cương</Option>
                                        <Option value="Kinh tế đại cương">Kinh tế đại cương</Option> */}
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
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {

    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewSurvey);