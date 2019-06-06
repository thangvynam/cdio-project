import React, { Component } from 'react';
import {
    Collapse,Button
} from 'antd';
import {Label} from 'reactstrap'

const Panel = Collapse.Panel;

function callback(key) {
    console.log(key);
}

const statusValues = [
    {
        id : -1,
        value : "Not active"
    },
    {
        id: 0,
        value : "Done"
    },
    {
        id : 1,
        value : "In process "
    }
]

class ItemVIewSurvey extends Component {
    genTitle = () => {
        const date = this.props.dateFrom + " <-> " + this.props.dateTo;
        let status = statusValues.filter(item => item.id === this.props.status);
        
        return (
            <div>
                <b>{this.props.title}</b>
                <b
                    style={{paddingLeft : "20em"}}
                >
                    {date}
                </b>
                <Label>Trạng thái : {status[0].value}</Label>{' '}
                <Button onClick={(e) => console.log("CLICK CLICK CLICK")}>View Matrix Survey</Button>
                <Button onClick={(e) => console.log("BAM BAM BAM")}>Đóng cuộc Survey</Button>
            </div>
        );
    }
    render() {
        console.log(this.props.subjectList)
        return (
            <div>
                <Collapse onChange={callback}>
                    <Panel header={this.genTitle()}>
                        {this.props.subjectList ? this.props.subjectList.map(item => {
                            return <p>{item.SubjectName}<br/></p>
                        }) : <p></p>}
                        
                    </Panel>
                    
                </Collapse>
            </div>
        );
    }
}

export default ItemVIewSurvey;