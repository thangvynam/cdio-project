import React, { Component } from 'react';
import {
    Collapse,Button
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
                <Button style ={{paddingRight : "20em"}}onClick={(e) => console.log("BAm BAM BAM")}>Đóng</Button>
            </div>
        );
    }
    render() {
        return (
            <div>
                <Collapse onChange={callback}>
                    <Panel header={this.genTitle()}>
                        {this.props.subjectList ? this.props.subjectList.map(item => {
                            return item.SubjectName
                        }) : <p></p>}
                        {/* <p>Show ra cac phieu</p> */}
                    </Panel>
                    
                </Collapse>
            </div>
        );
    }
}

export default ItemVIewSurvey;