import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Icon, notification } from 'antd';

import FormSurvey from "./FormSurvey";
import { getLevel, getPos } from '../utils/Tree';
import "./Survey.css";
import TableSurvey from './TableSurvey';
import $ from './../helpers/services'
import { getCurrTime } from '../utils/Time';
import { SAVE_SURVEY } from '../Constant/ActionType';

const  queryString = require('query-string');

const openNotificationWithIcon = (type) => {
    notification[type]({
      message: 'Thông báo',
      description: 'Lưu dữ liệu thành công',
    });
  };

class Node {
    constructor(data) {
        this.data = data;
        this.children = [];
    }
}

class ITUValue{
    constructor(key, value, description) {
        this.key = key;
        this.value = value;
        this.description = description;
    }
}

class Survey extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tree: [],
            resultQA : null,
            resultITU : null,
            isDone: false,
            isOver: false,
            id_survey: 0,
        }
    }

    async componentWillMount() {
        let tree = [];
        const parsed = queryString.parse(window.location.search);
        const id_ctdt = this.props.ctdt;
        console.log(id_ctdt)
        if (parsed.id) {
            const id = parsed.id;
            let response = await $.checkStatus(id)
            let resDate = await $.checkDate(response.data.idSurveyList)     
            let subjectId = response.data.id_mon;
            let resSubjectName = await $.getSubjectName(subjectId)     
            let curTime = getCurrTime()
            let end_date = resDate.data.end_date;
            
            await this.props.saveChange("tenMH", resSubjectName.data.SubjectName)
            
            if (curTime > end_date) {
                $.setStatus(id)
            }
        }

        

        $.getDataSurvey().then((res) => {
            res.data.forEach(element => {
                let level = getLevel(element.keyRow);
                let pos0 = getPos(element.keyRow, 0);
                let pos1 = getPos(element.keyRow, 1);
                let pos2 = getPos(element.keyRow, 2);
                let pos3 = getPos(element.keyRow, 3);

                const NodeData = {
                    key: '',
                    value: ''
                }

                switch (level) {
                    case 1: {
                        NodeData.key = pos0;
                        NodeData.value = element.nameRow;

                        tree.push(new Node(NodeData));
                        break;
                    }
                    case 2: {
                        tree.forEach(node => {
                            // check identity lv1 
                            if (node.data.key === pos0) {
                                NodeData.key = pos0 + "." + pos1;
                                NodeData.value = element.nameRow;

                                node.children.push(new Node(NodeData))
                            }
                        })
                        break;
                    }
                    case 3: {
                        tree.forEach(node => {
                            // check identity lv1 
                            if (node.data.key === pos0) {
                                node.children.forEach(node2 => {
                                    if (pos0 + "." + pos1 === node2.data.key) {
                                        NodeData.key = pos0 + "." + pos1 + "." + pos2;
                                        NodeData.value = element.nameRow;
                                        node2.children.push(new Node(NodeData));
                                    }
                                });
                            }
                        })
                        break;
                    }

                    case 4: {
                        tree.forEach(node => {
                            // check identity lv1 
                            if (node.data.key === pos0) {
                                node.children.forEach(node2 => {
                                    if (pos0 + "." + pos1 === node2.data.key) {
                                        node2.children.forEach(node3 => {
                                            if (pos0 + "." + pos1 + "." + pos2 === node3.data.key) {
                                                NodeData.key = pos0 + "." + pos1 + "." + pos2 + "." + pos3;
                                                NodeData.value = element.nameRow;
                                                node3.children.push(new Node(NodeData));
                                            }
                                        })
                                    }
                                });
                            }
                        })
                    }
                    default:
                        break;
                }
            });
            this.setState({ tree: tree })
        })
    }

    async componentDidMount() {
        const parsed = queryString.parse(window.location.search);
        if (parsed.id) {
            const id = parsed.id;
            this.setState({id_survey: id})
            let response = await $.checkStatus(id)
            let status = response.data.status            
            if (status === 0) {
                notification["error"]({
                    message: "Không thể thực hiện khảo sát",
                    duration: 3
                })
                this.setState({ isDone: true })
            } else if (status === -1) {
                notification["error"]({
                    message: "Chưa đến ngày thực hiện khảo sát",
                    duration: 3
                })
                this.setState({isOver: true});
            }
            $.getSurveyQA(id).then(res => {
                this.setState({
                    resultQA: res.data[0],
                })
            })
            let body = {
                id_survey: id
            }
            $.getSurveyITU(body).then(res => {
                this.setState({
                    resultITU: res.data,
                })
            })
        }
    }

    genForm() {
        let data = this.state.tree;
        let htmlDOM = [];

        for (let i = 0; i < data.length; i++) {
            const elementLv1 = data[i];

            htmlDOM.push(
                <b><h5>{elementLv1.data.key + ". " + elementLv1.data.value}</h5></b>
            )

            for (let j = 0; j < elementLv1.children.length; j++) {
                const elementLv2 = elementLv1.children[j];

                htmlDOM.push(
                    <b><h5 style={{ "paddingLeft": "1em" }}>{elementLv2.data.key + ". " + elementLv2.data.value}</h5></b>
                )

                for (let k = 0; k < elementLv2.children.length; k++) {
                    const elementLv3 = elementLv2.children[k];
                    const dataChildren = [];

                    htmlDOM.push(
                        <b><h5 style={{ "paddingLeft": "2em" }}>{elementLv3.data.key + ". " + elementLv3.data.value}</h5></b>
                    )

                    for (let h = 0; h < elementLv3.children.length; h++) {
                        const elementLv4 = elementLv3.children[h];

                        dataChildren.push(elementLv4.data.key + "_" + elementLv4.data.value);
                    }

                    htmlDOM.push(
                        <TableSurvey
                            isDone={this.state.isDone}
                            data={dataChildren}
                            resultITU={this.state.resultITU}
                        />
                    )
                }
            }
        }
        return htmlDOM;
    }

    convertToObject = (data,dataDescription) => {
        const iteratorData = data[Symbol.iterator]();
        //const iteratorDataDescription = dataDescription[Symbol.iterator]();
    
        let arr = [];

        for (let item of iteratorData) {
            const description = typeof dataDescription.get(item[0]) !== 'undefined' ? dataDescription.get(item[0]) : '';
            const obj = new ITUValue(item[0],item[1],description);
            arr.push(obj);
        }
       
        return arr;
    }

    saveAll = () => {
        const dataDescription = this.props.surveyReducer.dataValueDescription;
        const data = this.props.surveyReducer.dataValueITU;
        const surveyData = this.props.surveyReducer;
        
        const dataConvert = this.convertToObject(data,dataDescription);
        
        const survey = {
            tenMH: surveyData.tenMH,
            nguoiDuocKS: surveyData.nguoiDuocKS,
            nguoiKS: surveyData.nguoiKS,
            q1: surveyData.q1,
            q2: surveyData.q2,
            q3: surveyData.q3,
            q4: surveyData.q4,
            q5: surveyData.q5,
            q6: surveyData.q6,
            q7: surveyData.q7,
            q8: surveyData.q8,
            q9: surveyData.q9,
            q10: surveyData.q10,
            q11: surveyData.q11,
            id_survey: this.state.id_survey,
        }        
        let body = {
            id: this.state.id_survey,
            status: 1
        }
        $.setStatus(body).then(res =>{
            $.saveSurveyQA(survey)
            .then((res) => {
                let user = localStorage.getItem('user');
                let jsonData = JSON.parse(user)
                $.saveSurvey(dataConvert, this.state.id_survey)
                    .then(response => {
                        
                    });
            });  
        })     
    }

    send = () => {
        const dataDescription = this.props.surveyReducer.dataValueDescription;
        const data = this.props.surveyReducer.dataValueITU;
        const surveyData = this.props.surveyReducer;
        
        const dataConvert = this.convertToObject(data,dataDescription);
        
        const survey = {
            tenMH: surveyData.tenMH,
            nguoiDuocKS: surveyData.nguoiDuocKS,
            nguoiKS: surveyData.nguoiKS,
            q1: surveyData.q1,
            q2: surveyData.q2,
            q3: surveyData.q3,
            q4: surveyData.q4,
            q5: surveyData.q5,
            q6: surveyData.q6,
            q7: surveyData.q7,
            q8: surveyData.q8,
            q9: surveyData.q9,
            q10: surveyData.q10,
            q11: surveyData.q11,
            id_survey: this.state.id_survey,
        }        
        let body = {
            id: this.state.id_survey,
            status: 0
        }
        $.setStatus(body).then(res =>{
            $.saveSurveyQA(survey)
            .then((res) => {
                let user = localStorage.getItem('user');
                let jsonData = JSON.parse(user)
                $.saveSurvey(dataConvert, this.state.id_survey)
                    .then(response => {
                        
                    });
            });  
        })         
    }

    render() {
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 1,
                },
                sm: {
                    span: 16,
                    offset: 9,
                },
            },
        };

        let content = 
        <div className="container1">
        <div className="center-col">
            <div className="container">
                <div className="row">
                    <div className="col-sm-12" >
                        <br />
                        <h1 style={{ textAlign: "center" }}>Câu hỏi khảo sát</h1>
                        <FormSurvey subjectName={this.props.subjectName} result={this.state.resultQA} isDone={this.state.isDone}/>
                        <br />
                        <div style={{ paddingLeft: "1em" }}>
                            {this.genForm()}
                        </div>
                        <Form.Item {...tailFormItemLayout}>
                            <div>
                                <Button 
                                    disabled={this.state.isDone ? true : false}
                                    type="primary"
                                    onClick={() => {
                                        this.send()
                                        openNotificationWithIcon('success')
                                    }}
                                    style={{ marginLeft: "2em" }}>
                                    Gửi<Icon type="right" />
                                    
                                </Button>
                                <Button 
                                    disabled={this.state.isDone ? true : false}
                                    type="primary"
                                    onClick={() => {
                                        this.saveAll()
                                        openNotificationWithIcon('success')
                                    }}
                                    style={{ marginLeft: "2em" }}>
                                    Lưu lại<Icon type="right" />
                                    
                                </Button>
                            </div>
                        </Form.Item>
                    </div>
                </div>
            </div>
        </div>
    </div>

        return (
            this.state.isOver ? <div></div> : content
            
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        surveyReducer: state.surveyReducer,
        subjectId: state.subjectid,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      saveChange: (key, data) => {
          dispatch({type: SAVE_SURVEY, key, data})
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Survey);