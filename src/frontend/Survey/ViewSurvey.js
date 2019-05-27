import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Select, Form, DatePicker, Button, Icon,
} from 'antd';
import ItemVIewSurvey from './ItemVIewSurvey';

const Option = Select.Option;
const { RangePicker } = DatePicker;

let nameTitle = '';
let rangeTime = '';

function handleChange(value) {
    nameTitle = value;
}

function onChange(date, dateString) {
    rangeTime = dateString;
}

class ItemSurvey {
    constructor(data, rangeTime) {
        this.title = data;
        this.rangeTime = rangeTime;
    }
}

class ViewSurvey extends Component {

    state = {
        listSurvey: []
    }

    genForm() {
        let htmlDom = []

        this.state.listSurvey.forEach(survey => {
            console.log(survey);
            htmlDom.push(
                <ItemVIewSurvey
                    title={survey.title}
                    dateFrom={survey.rangeTime[0]}
                    dateTo={survey.rangeTime[1]}
                />
            );
        });

        return htmlDom;
    }

    create = () => {
        let obj = new ItemSurvey(nameTitle, rangeTime);

        this.setState({
            listSurvey: [...this.state.listSurvey, obj]
        });
    }

    render() {

        const formItemLayout = {
            labelCol: {
                xs: { span: 12 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        return (
            <div className="section-layout">
                <Form.Item
                    {...formItemLayout}
                    label="Chương trình đào tạo"
                >
                    <Select style={{ width: 370 }} onChange={handleChange}>
                        <Option value="Chính quy">Chính quy</Option>
                        <Option value="Cao đẳng">Cao đẳng</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    {...formItemLayout}
                    label="Khoảng thời gian"
                >
                    <RangePicker onChange={onChange} />
                </Form.Item>
                <Form.Item
                    {...formItemLayout} >
                    <center>
                        <Button
                            type="primary"
                            style={{ marginLeft: "2em" }}
                            onClick={this.create}
                        >
                            Tạo <Icon type="plus" />
                        </Button>
                        <br />
                    </center>
                </Form.Item>
                <br />
                {/* <ItemVIewSurvey 
                                    title = "Nam"
                                /> */}
                {this.genForm()}
            </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {

    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewSurvey);