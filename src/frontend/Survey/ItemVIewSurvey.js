import React, { Component } from 'react';
import {
    Collapse,
} from 'antd';

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
        return (
            <div>
                <Collapse onChange={callback}>
                    <Panel header={this.genTitle()}>
                        <p>Show ra các phiếu </p>
                    </Panel>
                </Collapse>
            </div>
        );
    }
}

export default ItemVIewSurvey;