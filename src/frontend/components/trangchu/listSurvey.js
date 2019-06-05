import React, { Component } from 'react';
import { Button, Icon, Modal, message, List, Avatar, Row, Col, Popconfirm, Input, Form, notification, Divider } from 'antd';
import { Link } from "react-router-dom";

export default class ListSurvey extends Component {

    render() {
        let type = this.props.type;
        let ctdt = this.props.ctdt;
        let khoi = this.props.khoi;
        let parent = this.props.parent;
        let action = this.props.action;
        return(
            <List
                itemLayout="horizontal"
                dataSource={this.props.subjectList}
                pagination={{
                    onChange: page => {
                    
                    },
                    pageSize: 10,
                }}
                renderItem={(item, id) => (
                    <Row>
                        <div style={{ height: "10px" }}></div>
                        <Col span={1} className="col-left">
                        </Col>
                        <Col span={22} className="col-left">

                            <div className="list-border" style={{ borderRadius: "12px" }}>

                                <List.Item>
                                    <List.Item.Meta

                                        avatar={<Avatar src="https://cdn2.vectorstock.com/i/1000x1000/99/96/book-icon-isolated-on-white-background-vector-19349996.jpg" />}
                                        title={
                                            <Link to={`/${parent}/${ctdt}/${type}/dosurvey/view/${item.Id}/itusurvey`}><span className="list-item" onClick={() => this.props.onClick(item.Id)}>{`${item.SubjectCode} - ${item.SubjectName}`}</span></Link>

                                        }
                                    />

                                </List.Item>
                            </div>

                        </Col>
                    </Row>
                )}
            />
        )
    }
}