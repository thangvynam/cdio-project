import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    Collapse, Button, Tag, Row, Col , notification, Modal
} from 'antd';
import { Label } from 'reactstrap'
import { Link } from "react-router-dom";
import $ from './../helpers/services'


const Panel = Collapse.Panel;
const hrefSurveyMatrix = "/view-survey/survey-matrix?id=";

const statusValues = [
    {
        id: -1,
        value: "CHƯA BẮT ĐẦU"
    },
    {
        id: 0,
        value: "ĐÃ KẾT THÚC"
    },
    {
        id: 1,
        value: "ĐANG THỰC HIỆN"
    }
]

class ItemVIewSurvey extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            offsetTop:0,
            visible : false,
        }

        this.closeSurvey = this.closeSurvey.bind(this)
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

    closeSurvey() {
        $.closeSurvey({id : this.props.idSurveyList}).then(res => {
            if (res.data === 1) {
                notification["success"]({
                  message: "Đóng cuộc survey thành công",
                  duration: 1
                });
              }
              else {
                notification["error"]({
                  message: "Đóng cuộc thất bại",
                  duration: 1
                });
              }
        })
        this.props.getData();
    }

    showModal = () => {
        this.setState({
          visible: true,
        });
      };

    hideModal = () => {
        this.setState({
          visible: false,
        });
      };

    componentDidUpdate(){
        window.scrollTo(0, this.state.offsetTop-100);
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
                        <Tag color="green">Trạng thái: {status[0].value}</Tag>
                    </Col>
                    <Col className="custom-survey-item-button" span={10}>
                        <Link to={hrefSurveyMatrix + `${this.props.idSurveyList}&idCtdt=${this.props.id}`} className="view-survey-matrix btn btn-outline-secondary" >View Survey Matrix</Link>
                        <Button className="view-survey-matrix btn btn-outline-warning" onClick={this.showModal} disabled={this.props.status === 0 ? true : false}>Đóng cuộc Survey</Button>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
    render() {
        const date = this.props.dateFrom + " <-> " + this.props.dateTo;

        return (
            <div>
                <Collapse ref={this.myRef} onChange={this.callback}>
                    <Panel header={this.genTitle()}>
                        {this.props.subjectList ? this.props.subjectList.map(item => {
                            return <p>{item.SubjectName}<br /></p>
                        }) : <p></p>}

                    </Panel>

                </Collapse>
                <Modal
                title = "Bạn có muốn đóng cuộc Survey này không?" 
                visible = {this.state.visible}
                    onOk={this.closeSurvey}
                    onCancel={this.hideModal}
                    okText = "Đồng ý"
                    cancelText = "Không"
                >
                    {this.props.title}
                    <br/>
                    {date}
                    </Modal>
            </div>
        );
    }
}

export default ItemVIewSurvey;