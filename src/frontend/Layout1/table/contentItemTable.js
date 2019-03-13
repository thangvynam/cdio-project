import React, { Component } from 'react'

import {
    Row, Col, Form, Input, notification, Icon, InputNumber
} from 'antd';


class ItemTableTTC extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    handleUpdateData = (e) => {
        this.props.handleUpdateData(e)
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        const { isEdit, isSave } = this.props;
        return (
            < Form onChange={this.handleUpdateData}>
                <div className="row contentItem">
                    <div className="left_contentItem">
                        Tên môn học (Tiếng Việt):
                    </div>
                    <div className="right_contentItem">
                        {!isEdit
                            ? this.props.textA.tenMonHocTV
                            : (<Form.Item>
                                {getFieldDecorator('tenMonHocTV', {
                                    rules: [
                                        {
                                            type: 'string', message: 'The input is not valid ',
                                        }, {
                                            required: true, message: 'Please input VietNamese name!',
                                        }],
                                    initialValue: this.props.textA.tenMonHocTV,
                                })(
                                    <Input name="tenMonHocTV" type="text" />
                                )}
                            </Form.Item>)
                        }
                    </div>
                </div>
                <div className="row contentItem">
                    <div className="left_contentItem">
                        Tên môn học (Tiếng Anh):
                    </div>
                    <div className="right_contentItem">
                        {!isEdit
                            ? this.props.textA.tenMonHocTA
                            : (<Form.Item>
                                {getFieldDecorator('tenMonHocTA', {
                                    rules: [
                                        {
                                            type: 'string', message: 'The input is not valid ',
                                        }, {
                                            required: true, message: 'Please input English name!',
                                        }],
                                    initialValue: this.props.textA.tenMonHocTA,
                                })(
                                    <Input name="tenMonHocTA" type="text" />
                                )}
                            </Form.Item>)
                        }
                    </div>
                </div>
                <div className="row contentItem">
                    <div className="left_contentItem">
                        Mã số môn học:
                    </div>
                    <div className="right_contentItem">
                        {!isEdit
                            ? this.props.textA.maMonHoc
                            : (<Form.Item>
                                {getFieldDecorator('maMonHoc', {
                                    rules: [
                                        {
                                            type: 'string', message: 'The input is not valid ',
                                        }, {
                                            required: true, message: 'Please input your Course Code!',
                                        }],
                                    initialValue: this.props.textA.maMonHoc,
                                })(
                                    <Input name="maMonHoc" type="text" />
                                )}
                            </Form.Item>)
                        }
                    </div>
                </div>
                <div className="row contentItem">
                    <div className="left_contentItem">
                        Thuộc khối kiến thức:
                    </div>
                    <div className="right_contentItem">
                        {!isEdit
                            ? this.props.textA.khoiKienThuc
                            : (<Form.Item>
                                {getFieldDecorator('khoiKienThuc', {
                                    rules: [
                                        {
                                            type: 'string', message: 'The input is not valid ',
                                        }, {
                                            required: true, message: 'Please input your Knowledge Attributes!',
                                        }],
                                    initialValue: this.props.textA.khoiKienThuc,
                                })(
                                    <Input name="khoiKienThuc" type="text" />
                                )}
                            </Form.Item>)
                        }
                    </div>
                </div>
                <div className="row contentItem">
                    <div className="left_contentItem">
                        Số tín chỉ:
                    </div>
                    <div className="right_contentItem">
                        {!isEdit
                            ? this.props.textA.soTinChi
                            : (<Form.Item>
                                {getFieldDecorator('soTinChi', {
                                    rules: [
                                        {
                                            required: true, message: 'Please input your Number Of Credits!',
                                        }],
                                    initialValue: this.props.textA.soTinChi,
                                })(
                                    <InputNumber className="inputNumber" name="soTinChi" type="number" />
                                )}
                            </Form.Item>)
                        }
                    </div>
                </div>
                <div className="row contentItem">
                    <div className="left_contentItem">
                        Số tiết lý thuyết:
                    </div>
                    <div className="right_contentItem">
                        {!isEdit
                            ? this.props.textA.tietLyThuyet
                            : <Form.Item>
                                {getFieldDecorator('tietLyThuyet', {
                                    rules: [
                                        {
                                            required: true, message: 'Please input your Number Of Theoretical Lessons!',
                                        }],
                                    initialValue: this.props.textA.tietLyThuyet,
                                })(
                                    <InputNumber className="inputNumber" name="tietLyThuyet" type="number" />
                                )}
                            </Form.Item>
                        }
                    </div>
                </div>
                <div className="row contentItem">
                    <div className="left_contentItem">
                        Số tiết thực hành:
                    </div>
                    <div className="right_contentItem">
                        {!isEdit
                            ? this.props.textA.tietThucHanh
                            : (<Form.Item>
                                {getFieldDecorator('tietThucHanh', {
                                    rules: [
                                        {
                                            required: true, message: 'Please input your Number Of Practice Lessons!',
                                        }],
                                    initialValue: this.props.textA.tietThucHanh,
                                })(
                                    <InputNumber className="inputNumber" name="tietThucHanh" type="number" />
                                )}
                            </Form.Item>)
                        }
                    </div>
                </div>
                <div className="row contentItem">
                    <div className="left_contentItem">
                        Số tiết tự học:
                    </div>
                    <div className="right_contentItem">
                        {!isEdit
                            ? this.props.textA.tietTuHoc
                            : (<Form.Item>
                                {getFieldDecorator('tietTuHoc', {
                                    rules: [
                                        {
                                            required: true, message: 'Please input your Number Of Self-Study Periods!',
                                        }],
                                    initialValue: this.props.textA.tietTuHoc,
                                })(
                                    <InputNumber className="inputNumber" name="tietTuHoc" type="number" />
                                )}
                            </Form.Item>)
                        }
                    </div>
                </div>
                <div className="row contentItem">
                    <div className="left_contentItem">
                        Các môn tiên quyết:
                    </div>
                    <div className="right_contentItem">
                        {!isEdit
                            ? this.props.textA.monTienQuyet
                            : (<Form.Item>
                                {getFieldDecorator('monTienQuyet', {
                                    rules: [
                                        {
                                            type: 'string', message: 'The input is not valid ',
                                        }, {
                                            required: true, message: 'Please input Prerequisite Subjects!',
                                        }],
                                    initialValue: this.props.textA.monTienQuyet,
                                })(
                                    <Input name="monTienQuyet" type="text" />
                                )}
                            </Form.Item>)
                        }
                    </div>
                </div>
            </Form >

        )
    }
}

const ItemTableTTC1 = Form.create()(ItemTableTTC);
export default ItemTableTTC1;