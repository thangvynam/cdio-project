import React, { Component } from 'react';
import { Tag, List, Avatar, Row, Col, Icon } from 'antd';
import { Link } from "react-router-dom";
import $ from "./../../helpers/services";
import {convertTime} from "./../../utils/Time";
import _ from 'lodash';

export default class ListSurvey extends Component {
    constructor(props){
        super(props);

        this.state = {
            survey:[],
            surveyList:{}
        }

    }
    componentDidMount(){

        let currentDate = new Date();
        currentDate.setHours(0,0,0,0);
        $.updateStatusSurvey({data : parseInt(currentDate.getTime())}).then(res=>{
            let data = {
                id_ctdt:this.props.ctdt,
                id_user: JSON.parse(localStorage.getItem("user")).data.Id,
            }
            $.getListSurvey(data).then(res=>{
                this.setState({survey:res.data.survey,
                    surveyList:res.data.surveyList});
            })
        })
    }


    render() {
        let type = this.props.type;
        let ctdt = this.props.ctdt;
        let parent = this.props.parent;
        let startDate = convertTime(this.state.surveyList.start_date).split(',');
        let endDate = convertTime(this.state.surveyList.end_date).split(',');

        return (
            <div className="section-layout">
                <div className="time-itu">
                    {!_.isEmpty(this.state.surveyList)? 
                <Tag color="#f50">{startDate[0]} - {endDate[0]}</Tag>:null
                }
                </div>
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.survey}
                    pagination={{
                        onChange: page => {

                        },
                        pageSize: 10,
                    }}
                    renderItem={(item, id) => (
                        <Row>
                            <div style={{ height: "10px" }}></div>
                            <Col span={22} offset={1} className="col-left">
                                <div className="list-border" className="wrapper-subject" style={{ borderRadius: "12px" }}>
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={<Avatar src="https://cdn2.vectorstock.com/i/1000x1000/99/96/book-icon-isolated-on-white-background-vector-19349996.jpg" />}
                                            title={
                                                <Link className="title-subbject" to={`/${parent}/${ctdt}/${type}/dosurvey/view/${item.id_mon}/itusurvey?id=${item.id}`}><span className="list-item" onClick={() => this.props.onClick(item.id)}>{`${item.nameSubject}`}</span></Link>
                                            }
    
                                        />
                                        <div><Icon type={item.status===1?"form":"file-done"} style={{ fontSize: '20px', color: 'white' }} /></div>
                                    </List.Item>
                                </div>
                            </Col>
                        </Row>
                    )}
                />
            </div>
        )
    }
}