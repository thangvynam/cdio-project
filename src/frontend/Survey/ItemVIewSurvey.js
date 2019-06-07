import React, { Component } from 'react';
import {
    Collapse, Button, Tag, Row, Col
} from 'antd';
import { Label } from 'reactstrap'

const Panel = Collapse.Panel;

function callback(key) {
    console.log(key);
}

const statusValues = [
    {
        id: -1,
        value: "Not active"
    },
    {
        id: 0,
        value: "Done"
    },
    {
        id: 1,
        value: "In process "
    }
]

class ItemVIewSurvey extends Component {
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
                        <Button  className="view-survey-matrix btn btn-outline-secondary" onClick={(e) => console.log("CLICK CLICK CLICK")}>View Matrix Survey</Button>
                        <Button  className="view-survey-matrix btn btn-outline-warning" onClick={(e) => console.log("BAM BAM BAM")}>Đóng cuộc Survey</Button>
                    </Col>
                </Row>
            </React.Fragment>
        );
    }
    render() {
        console.log(this.props.subjectList)
        return (
            <div>
                <Collapse onChange={callback}>
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