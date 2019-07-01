import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    Collapse, Button, Tag, Row, Col, notification, Modal
} from 'antd';
import { Label } from 'reactstrap'
import { Link } from "react-router-dom";

import NotificationHelper from "../helpers/NotificationHelper"

const Panel = Collapse.Panel;
const hrefSurveyMatrix = "/view-survey/survey-matrix?id=";

const statusValues = [
    {
        id: -1,
        value: "NOT ACTIVE"
    },
    {
        id: 0,
        value: "DONE"
    },
    {
        id: 1,
        value: "IN PROCESS"
    }
]

class ItemVIewSurvey extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            offsetTop: 0,
            visible: false,
            visibleDelete: false,
        }

        this.hideModal = this.hideModal.bind(this)
        this.showModal = this.showModal.bind(this)
    }

    callback = async () => {
        const tesNode = await ReactDOM.findDOMNode(this.myRef.current);
        this.setState({
            offsetTop: tesNode.offsetTop
        })
        // window.scrollTo(0, tesNode.offsetTop);
        console.log(tesNode.offsetTop)
    }

    closeSurvey = () => {

        $.closeSurvey({ id: this.props.idSurveyList }).then(res => {
            if (res.data === 1) {
                NotificationHelper.openNotificationSuccess("Đóng cuộc survey thành công")
            }
            else {
                NotificationHelper.openNotificationError("Đóng cuộc thất bại")
            }

        this.props.getData();
        })
    }

    deleteSurvey = () => {
        $.deleteSurvey({ id: this.props.idSurveyList }).then(res => {
            if (res.data === 1) {
                NotificationHelper.openNotificationSuccess("Xóa cuộc survey thành công")
            }
            else {
                NotificationHelper.openNotificationError("Xóa cuộc thất bại")
            }
            
        this.props.getData();        
        })
    }

    showModal = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            visible: true,
        });
    };

    showModalDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.setState({
            visibleDelete: true,
        })
    }

    hideModal = () => {
        this.setState({
            visible: false,
        });
    };

    hideModalDelete = () => {
        this.setState({
            visibleDelete: false,
        })
    }

    componentDidUpdate() {
        window.scrollTo(0, this.state.offsetTop - 100);
    }

    getColor = (statusValue) => {
        switch (statusValue) {
            case -1:
                return "blue";
            case 0:
                return "darkgray";
            case 1:
                return "green";
            default:
                return "green";
        }
    }

    genTitle = () => {
        const date = this.props.dateFrom + " <-> " + this.props.dateTo;
        let status = statusValues.filter(item => item.id === this.props.status);
        return (
            <React.Fragment>
                <Row className="custom-survey-item">
                    {this.props.title}
                </Row>
                <Row >
                    <Col className="status-column-survey" span={14}>
                        <Tag color="#f50"> {date}</Tag>
                        <Tag color={this.getColor(status[0].id)}>Trạng thái: {status[0].value}</Tag>
                    </Col>
                    <Col className="custom-survey-item-button" span={10}>
                        <Link to={hrefSurveyMatrix + `${this.props.idSurveyList}&idCtdt=${this.props.id}`} disabled={status[0].id === -1 ? true : false} className="view-survey-matrix btn btn-outline-secondary" >View Survey Matrix</Link>
                        <Button className="view-survey-matrix btn btn-outline-warning" onClick={(e) => this.showModal(e)} disabled={this.props.status === 0 ? true : false}>Đóng cuộc Survey</Button>
                        <Button className="view-survey-matrix btn btn-outline-danger" onClick={(e) => this.showModalDelete(e)}>Xóa cuộc Survey</Button>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
    render() {
        return (
            <div>
                <Collapse ref={this.myRef} onChange={this.callback}>
                    <Panel header={this.genTitle()} destroyInactivePanel={false}>
                        {this.props.subjectList ? this.props.subjectList.map(item => {
                            return <p key={item.Id}>{item.SubjectName}<br /></p>
                        }) : <p></p>}

                    </Panel>

                </Collapse>
                <Modal
                    title="Bạn có muốn đóng cuộc Survey này không?"
                    visible={this.state.visible}
                    onOk={() => this.closeSurvey()}
                    onCancel={this.hideModal}
                    okText="Đồng ý"
                    cancelText="Không"
                >                    {this.props.title}
                    <br />
                    {date}
                </Modal>
                <Modal
                    title="Bạn có muốn xóa cuộc Survey này không?"
                    visible={this.state.visibleDelete}
                    onOk={() => this.deleteSurvey()}
                    onCancel={() => this.hideModalDelete()}
                    okText="Đồng ý"
                    cancelText="Không"
                >                    {this.props.title}
                    <br />
                    {date}
                </Modal>
            </div>
        );
    }
}

export default ItemVIewSurvey;