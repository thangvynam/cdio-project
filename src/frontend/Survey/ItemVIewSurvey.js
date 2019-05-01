import React, { Component } from 'react';
import {
    Collapse,
} from 'antd';
import Survey from './Survey';
import SurveyDetail from './SurveyDetail';

const Panel = Collapse.Panel;

function callback(key) {
    console.log(key);
}

class ItemVIewSurvey extends Component {
    genTitle = () => {
        const date = this.props.dateFrom + " <-> " + this.props.dateTo;

        return (
            <div>
                <b>{this.props.title}</b>
                <b
                    style={{paddingLeft : "20em"}}
                >
                    {date}
                </b>
            </div>
        );
    }
    render() {
        console.log(this.props.subjectId)
        return (
            <div>
                <Collapse onChange={callback}>
                    <Panel header={this.genTitle()} key = {this.props.subjectId}>
                        <SurveyDetail 
                        subjectName = {this.props.title}
                        subjectId = {this.props.subjectId}
                        />
                    </Panel>
                </Collapse>
            </div>
        );
    }
}

export default ItemVIewSurvey;