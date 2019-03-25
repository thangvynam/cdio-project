import React, { Component } from 'react';
import {
    Form, Input, Icon, Select, Button, message
} from 'antd';
import { Link } from 'react-scroll';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { ADD_DATA_LAYOUT_3, SAVE_TEMP_DATA_LAYOUT_3, SAVE_LOG } from '../../../Constant/ActionType';
import TextArea from 'antd/lib/input/TextArea';
import { getCurrTime } from '../../../utils/Time';

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
    '2.4',
    '4.1',
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
        let tempInfo = this.props.itemLayout3Reducer.tempInfo 
        tempInfo["objectName"] = objectName
        this.props.saveTemp(tempInfo)
    }
    handleDesInputChange = (e) => {
        description = e.target.value;
        let tempInfo = this.props.itemLayout3Reducer.tempInfo 
        tempInfo["description"] = description
        this.props.saveTemp(tempInfo)
    }
    handleChangeStandActs = (value) => {
        temp = value
        let tempInfo = this.props.itemLayout3Reducer.tempInfo     
        tempInfo["standActs"] = temp
        this.props.saveTemp(tempInfo)
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
                            initialValue: this.props.itemLayout3Reducer.tempInfo.objectName
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
                            initialValue: this.props.itemLayout3Reducer.tempInfo.description
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
                            initialValue: this.props.itemLayout3Reducer.tempInfo.standActs
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
                            <Button type="primary" onClick={() => { 
                                this.props.itemLayout3Reducer.tempInfo.objectName =""
                                this.props.itemLayout3Reducer.tempInfo.description =""
                                this.props.itemLayout3Reducer.tempInfo.standActs = []
                                this.props.saveLog("Nguyen Van A", getCurrTime(), `Thêm mục tiêu môn học: ${objectName.toUpperCase()}, ${description}, ${temp}`, this.props.logReducer.contentTab, this.props.subjectid)
                                this.props.saveAndContinue() 
                                }} style={{ marginLeft: "2em" }}>
                                Thêm<Icon type="right" />
                            </Button>
                            <br/>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
      itemLayout3Reducer: state.itemLayout3Reducer,
      subjectid: state.subjectid,
      logReducer: state.logReducer
    }
  }

const mapDispatchToProps = (dispatch, ownProps) => {

    return {
        saveAndContinue: () => {
            myObj.objectName = objectName.toUpperCase();
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
        saveTemp: (tempInfo) => {
            dispatch({type: SAVE_TEMP_DATA_LAYOUT_3, tempInfo})
        },
        saveLog: (ten, timestamp, noi_dung, muc_de_cuong, thong_tin_chung_id) => {
            dispatch({type: SAVE_LOG, ten, timestamp, noi_dung, muc_de_cuong, thong_tin_chung_id})
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MenuMucTieu);