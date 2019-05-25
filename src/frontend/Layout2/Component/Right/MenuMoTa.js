import React, { Component } from 'react';
import {
    Form, Icon, Button, message
} from 'antd';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { ADD_DATA_LAYOUT_2, SAVE_TEMP_DATA_LAYOUT_2, SAVE_LOG, SAVE_LOG_OBJECT } from '../../../Constant/ActionType';
import TextArea from 'antd/lib/input/TextArea';
import { getCurrTime } from '../../../utils/Time';

let description = '';

class MenuMota extends Component {
    handleDesInputChange = (e) => {
        description = e.target.value;
        description.replace('\n', '<br/>')
        this.props.saveTemp(description);
    }

    componentDidMount(){
        console.log(this.props.logReducer)
    }
    render() {
        const { getFieldDecorator } = this.props.form;
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
                        label="Mô tả môn học"
                    >
                        {getFieldDecorator('description', {
                            rules: [ {
                                required: true, message: 'Vui lòng nhập nội dung mô tả',
                            }],
                            initialValue: this.props.itemLayout2Reducer.tempInfo
                        })(<TextArea onChange={this.handleDesInputChange} />)}
                        
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <div>
                            <Button type="primary" onClick={() => { 
                                this.props.itemLayout2Reducer.tempInfo = ''
                                this.props.saveLog("Nguyen Van A", getCurrTime(), `Thêm mô tả môn học: ${description}`, this.props.logReducer.contentTab, this.props.subjectid)
                                this.props.saveReducer("Nguyen Van A", getCurrTime(), `Thêm mô tả môn học: ${description}`, this.props.logReducer.contentTab, this.props.subjectid)
                                this.props.saveAndContinue() ;
                                }} style={{ marginLeft: "2em" }}>
                                Thêm<Icon type="right" />
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
      itemLayout2Reducer: state.itemLayout2Reducer,
      subjectid: state.subjectid,
      logReducer: state.logReducer
    }
  }

const mapDispatchToProps = (dispatch, ownProps) => {

    return {
        saveAndContinue: () => {
            if (description === '') {
                message.error("Vui lòng điền đầy đủ thông tin");
            }
            else {
                dispatch({ type: ADD_DATA_LAYOUT_2, description: description });
                ownProps.form.resetFields()
                ownProps.nextStep();      
            }
        },
        saveTemp: (description) => {
            dispatch({type: SAVE_TEMP_DATA_LAYOUT_2, description})
        },
        saveLog: (ten, timestamp, noi_dung, muc_de_cuong, thong_tin_chung_id) => {
            dispatch({type: SAVE_LOG, ten, timestamp, noi_dung, muc_de_cuong, thong_tin_chung_id})
        },
        saveReducer: (ten, timestamp, noi_dung, muc_de_cuong, thong_tin_chung_id) => {
            dispatch({type: SAVE_LOG_OBJECT, ten, timestamp, noi_dung, muc_de_cuong, thong_tin_chung_id})
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MenuMota);