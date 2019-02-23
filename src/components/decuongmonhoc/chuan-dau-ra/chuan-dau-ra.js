import React, { Component } from 'react'
import ChuanDauRaTable from './../index/table/table-chuan-dau-ra/chuan-dau-ra.table';
import {
    Form, Input, Card, Select, Row, notification, Icon, Cascader, Checkbox, Button
} from 'antd';

import './chuan-dau-ra.css'
const { Option } = Select;
const { TextArea } = Input;

const CDRData = ["G1", "G2", "G3", "G4", "G5"];
const levelsOptions = ["I", "T", "U"];
const options = [{
    value: 'skill',
    label: 'skill',
    children: [
        {
            value: 'Đạt được',
            label: 'Đạt được',
        },
        {
            value: '1.2',
            label: '1.2',
        }
    ],
}, {
    value: 'attitude',
    label: 'attitude',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
    }],
}];

class ChuanDauRa extends Component {
    constructor(props) {
        super(props)
        this.state = {
            typeDes: '',
            contentDes: ''
        }
    }

    /* ----------------Xử lý Tag động mức độ--------------- */
    displayRender = (label) => {
        return label[0];
    }

    onChange = (value) => {
        this.setState({
            typeDes: value[0],
            contentDes: value[value.length - 1]
        })
    }
    /*-----------------------------------------------------*/

    /* -----------------Xử lý Form------------------------- */
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                values['types'] = this.state.typeDes;
                const data = {
                    key: `${this.props.dataCDR.length + 1}`,
                    cdr: values.chuanDauRa,
                    description: values.description,
                    levels: values.mucDo
                }
                this.props.actThemChuanDauRa(data);
                notification.open({
                    message: "Success",
                    icon: <Icon type="check-circle" style={{ color: 'green' }} />,
                })
            } else {

            }
        });
    }
    /* ---------------------------------------------------- */

    render() {
        const { getFieldDecorator } = this.props.form;
        const CDROption = Object.keys(CDRData).map((id, key) => {
            return <Option key={key} value={CDRData[key]}>{CDRData[key]}</Option>
        });
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
        };

        const formItemNumber = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 3 },
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
            <div className="container">
                <div className="col-sm-10" >
                    <Form onSubmit={this.handleSubmit}>
                        <Card
                            title="Chuẩn Đầu Ra"
                            className="card_CDR"
                        >
                            <Form.Item
                                {...formItemLayout}
                                label="Chuẩn đầu ra"
                            >
                                {getFieldDecorator('chuanDauRa', {
                                    rules: [
                                        { required: true, message: 'Chọn chuẩn đầu ra' },
                                    ],
                                })(
                                    <Select className="cdr_Select" onChange={this.onCDRChange}>
                                        {CDROption}
                                    </Select>
                                )}
                            </Form.Item>

                            <Form.Item {...formItemLayout} label="Chọn mức độ: ">
                                <Row>

                                    <Cascader
                                        options={options}
                                        expandTrigger="hover"
                                        displayRender={this.displayRender}
                                        onChange={this.onChange}
                                    />

                                    {getFieldDecorator('verb',
                                        {
                                            initialValue: `${this.state.contentDes}`,
                                            rules: [{
                                                required: true,
                                                message: 'Mô tả không được rỗng',

                                            }],
                                        })(
                                            <Input />
                                        )}
                                </Row>
                            </Form.Item>

                            <Form.Item {...formItemLayout} label="Mô tả (Mức chi tiết - hành động)">
                                {getFieldDecorator('description',
                                    {
                                        rules: [{
                                            required: true,
                                            message: 'Mô tả không được rỗng',

                                        }],
                                    })(
                                        <TextArea rows={4} placeholder="Mô tả" />
                                    )}
                            </Form.Item>
                            <Form.Item {...formItemLayout} label="Mức độ (I/T/U)"
                            >
                                {getFieldDecorator("mucDo", {
                                    rules: [{
                                        required: true,
                                        message: 'Chọn ít nhất một',
                                    }],
                                    initialValue: [],
                                })(
                                    <Checkbox.Group options={levelsOptions} style={{ width: "100%" }}>
                                    </Checkbox.Group>
                                )}
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="submit_TTC form-signin-button">
                                    Add
                                </Button>
                            </Form.Item>
                        </Card>
                    </Form>

                    <Card className="card_CDR">
                        <ChuanDauRaTable {...this.props} />
                    </Card>
                </div>
            </div>
        )
    }
}

const Layout4 = Form.create()(ChuanDauRa);
export default Layout4;