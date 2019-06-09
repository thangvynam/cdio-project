import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    Collapse, Button, Tag, Row, Col
} from 'antd';
import { Label } from 'reactstrap'
import { Link } from "react-router-dom";


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
            offsetTop:0
        }
    }

    callback = async () => {
        const tesNode = await ReactDOM.findDOMNode(this.myRef.current);
        this.setState({
            offsetTop: tesNode.offsetTop
        })
        // window.scrollTo(0, tesNode.offsetTop);
        console.log(tesNode.offsetTop)
    }

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
                        <Link to={hrefSurveyMatrix + `${this.props.id}`} className="view-survey-matrix btn btn-outline-secondary" >View Matrix Survey</Link>
                        <Button className="view-survey-matrix btn btn-outline-warning" onClick={(e) => console.log("BAM BAM BAM")}>Đóng cuộc Survey</Button>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
    render() {
        return (
            <div>
                <Collapse ref={this.myRef} onChange={this.callback}>
                    <Panel header={this.genTitle()}>
                        {this.props.subjectList ? this.props.subjectList.map(item => {
                            return <p>{item.SubjectName}<br /></p>
                        }) : <p></p>}

                    </Panel>

                </Collapse>
            </div>
        );
    }
}

export default ItemVIewSurvey;