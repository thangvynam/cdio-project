import React, { Component } from 'react';
import {
    Form, Input, Icon, Select, Button, message
} from 'antd';
import { Link } from 'react-scroll';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { ADD_DATA_LAYOUT_3 } from '../../../Constant/ActionType';
import TextArea from 'antd/lib/input/TextArea';

const { Option } = Select;

let temp = [];

const myObj = {
    objectName: '',
    description: '',
    standActs: []
}
let objectName = '';
let description = '';

const staActs = [
    '1.1',
    '2.2',
    '2.3',
]
class MenuMucTieu extends Component {
    state = {
        standItems: [],
    }
    renderBackButton() {
        if (this.props.step !== 0) {
            return (
                <Link activeClass="active" className="test1" to="test1" spy={true} smooth={true} duration={500} ><Button type="danger">Finish</Button></Link>
            )
        }
        return null;
    }
    handleObjectInputChange = (e) => {
        objectName = e.target.value;
    }
    handleDesInputChange = (e) => {
        description = e.target.value;
    }
    handleChangeStandActs = (value) => {
        temp = value
    }
    render() {
        const { getFieldDecorator } = this.props.form;

        const cdioStandard = [];
        function init() {
            for (let i = 0; i < staActs.length; i++) {
                cdioStandard.push(<Option key={staActs[i]}>{staActs[i]}</Option>)
            }
        }
        init();
        const formItemLayout = {
            labelCol: {
                xs: { span: 12 },
                sm: { span: 5 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        return (
            <div style={{ border: "2px solid", borderRadius: "12px" }}>
                <div style={{ marginTop: "10px" }}></div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item
                        {...formItemLayout}
                        label="Mục tiêu"
                    >
                        {getFieldDecorator('object', {
                            rules: [ {
                                required: true, message: 'Vui lòng nhập mục tiêu',
                            }],
                        })(
                            <Input onChange={this.handleObjectInputChange} />
                        )}
                        
                    </Form.Item>

                    <Form.Item
                        {...formItemLayout}
                        label="Mô tả"
                    >
                        {getFieldDecorator('description', {
                            rules: [ {
                                required: true, message: 'Vui lòng nhập mô tả',
                            }],
                        })(
                            <TextArea onChange={this.handleDesInputChange} />
                        )}
                        
                    </Form.Item>

                    <Form.Item
                        {...formItemLayout}
                        label="CĐR CDIO chương trình"
                    >
                        {getFieldDecorator('cdioStandard', {
                            rules: [{
                                required: true, message: 'Vui lòng nhập CĐR CDIO của chương trình',
                            }],
                        })(
                            <Select
                                mode="tags"
                                style={{ width: '100%' }}
                                placeholder="Please select or type here"
                                onChange={this.handleChangeStandActs}
                            >
                                {cdioStandard}
                            </Select>
                        )}

                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <div>
                            {this.renderBackButton()}
                            <Button type="primary" onClick={() => { this.props.saveAndContinue() }} style={{ marginLeft: "2em" }}>
                                Continue<Icon type="right" />
                            </Button>
                            <br/>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {

    return {
        saveAndContinue: () => {
            myObj.key = ownProps.step;
            myObj.objectName = objectName;
            myObj.description = description;
            myObj.standActs = temp;
            if (objectName === '' || description === '' || temp.length === 0) {
                message.error("Vui lòng điền đầy đủ thông tin");
            }
            else {
                ownProps.form.resetFields()
                const myObjStr = JSON.stringify(myObj);
                //reset
                temp = [];
                objectName = '';
                description = '';
                dispatch({ type: ADD_DATA_LAYOUT_3, item: myObjStr });
                ownProps.nextStep();      
            }
        },
    }
}
export default connect(null, mapDispatchToProps)(MenuMucTieu);