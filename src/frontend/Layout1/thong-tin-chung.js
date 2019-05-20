import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import axios from 'axios';
import {
  Form, Input, Card, Button, notification, Icon, Tooltip

} from 'antd';

import './thong-tin-chung.css'
import { updateTTCRequest, collectDataRequest} from './../Constant/thong-tin-chung/actions';

class ThongTinChung extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isHasData: false,
      isBtnEdit: false,
      isLoading: false
    }
  }

  componentDidMount() {
    this.props.collectDataRequest(this.props.idMH);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = {
          ...values,
          DateEdited: new Date().toISOString().slice(0, 19).replace('T', ' ')
        }
        this.props.updateTTCRequest(this.props.idMH, data);
        notification.open({
          message: "Success",
          icon: <Icon type="check-circle" style={{ color: 'green' }} />,
        })
      }
    });
  }

  handleOnChange = (e) => {
    const tempData = {
      [e.target.name]: e.target.value
    }
    this.props.addDataTemp(tempData)
  }


  render() {
    const { getFieldDecorator } = this.props.form;
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

    const { dataTTC, tempData } = this.props;

    return (
      (!_.isEmpty(dataTTC) && <div className="container">
        <div className="row">
          <div className="col-sm-1" ></div>
          <div className="col-sm-11" >
            <h1 style={{ textAlign: "center" }}>THÔNG TIN CHUNG</h1>
            <div className="card_TTC" >
              <Form  onSubmit={this.handleSubmit}>
                <Form.Item
                  {...formItemLayout}
                  label="Tên Môn Học (Tiếng Việt):">
                  {getFieldDecorator('SubjectName', {
                    rules: [
                      {
                        type: 'string', message: 'The input is not valid ',
                      }, {
                        required: true, message: 'Please input VietNamese name!',
                      }],
                    initialValue: dataTTC['SubjectName'],
                  })(
                    <Input disabled={this.props.isReview === true ? true : false} name="tenMonHocTV" type="text" />
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="Tên Môn Học (Tiếng Anh):">
                  {getFieldDecorator('SubjectEngName', {
                    rules: [
                      {
                        type: 'string', message: 'The input is not valid ',
                      }, {
                        required: true, message: 'Please input your English Name!',
                      }],
                    initialValue: dataTTC['SubjectEngName'],
                  })(
                    <Input disabled={this.props.isReview === true ? true : false} name="tenMonHocTA" type="text" />
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="Mã Số Môn Học:">
                  {getFieldDecorator('SubjectCode', {
                    rules: [
                      {
                        type: 'string', message: 'The input is not valid ',
                      }, {
                        required: true, message: 'Please input your Course Code!',
                      }],
                    initialValue: dataTTC['SubjectCode'],
                  })(
                    <Input disabled={this.props.isReview === true ? true : false} name="maMonHoc" type="text" />
                  )}
                </Form.Item>
                {/* <Form.Item
                  {...formItemLayout}
                  label="Thuộc Tính Kiến Thức:">
                  {getFieldDecorator('khoiKienThuc', {
                    rules: [
                      {
                        type: 'string', message: 'The input is not valid ',
                      }, {
                        required: true, message: 'Please input your Knowledge Attributes!',
                      }],
                    initialValue: dataTTC['khoiKienThuc'],
                  })(
                    <Input name="khoiKienThuc" type="text" />
                  )}
                </Form.Item> */}
                <Form.Item
                  {...formItemLayout}
                  label="Số Tín Chỉ: ">
                  {getFieldDecorator('Credit', {
                    rules: [
                      {
                        required: true, message: 'Please input your Number Of Credits!',
                      }],
                    initialValue: dataTTC['Credit'],
                  })(
                    <Input disabled={this.props.isReview === true ? true : false} className="inputNumber" name="soTinChi" type="number" />
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="Số Tiết Lý Thuyết: ">
                  {getFieldDecorator('TheoryPeriod', {
                    rules: [
                      {
                        required: true, message: 'Please input your Number Of Theoretical Lessons!',
                      }],
                    initialValue: dataTTC['TheoryPeriod'],
                  })(
                    <Input disabled={this.props.isReview === true ? true : false} className="inputNumber" name="tietLyThuyet" type="number" />
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="Số Tiết Thực Hành: ">
                  {getFieldDecorator('PracticePeriod', {
                    rules: [
                      {
                        required: true, message: 'Please input your Number Of Practice Lessons!',
                      }],
                    initialValue: dataTTC['PracticePeriod'],
                  })(
                    <Input disabled={this.props.isReview === true ? true : false} className="inputNumber" name="tietThucHanh" type="number" />
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="Số Tiết Tự Học: ">
                  {getFieldDecorator('ExercisePeriod', {
                    rules: [
                      {
                        required: true, message: 'Please input your Number Of Self-Study Periods!',
                      }],
                    initialValue: dataTTC['ExercisePeriod'],
                  })(
                    <Input disabled={this.props.isReview === true ? true : false} className="inputNumber" name="tietTuHoc" type="number" />
                  )}
                </Form.Item>
                {/* <Form.Item
                  {...formItemLayout}
                  label="Các Môn Tiên Quyết:">
                  {getFieldDecorator('monTienQuyet', {
                    rules: [
                      {
                        type: 'string', message: 'The input is not valid ',
                      }, {
                        required: true, message: 'Please input Prerequisite Subjects!',
                      }],
                    initialValue: dataTTC['monTienQuyet'],
                  })(
                    <Input name="monTienQuyet" type="text" />
                  )}
                </Form.Item> */}
                <Form.Item>
                  {this.props.isReview === true ? null : <Button type="primary" htmlType="submit" className="submit_TTC form-signin-button">
                    Update
                 </Button>}
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>)
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataTTC: state.itemLayout1Reducer.previewInfo,
    tempData: state.itemLayout1Reducer.tempData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    collectDataRequest: (id) => dispatch(collectDataRequest(id)),
    updateTTCRequest: (id, data) => dispatch(updateTTCRequest(id, data))
  }
}


const Layout1 = Form.create()(ThongTinChung);
export default connect(mapStateToProps, mapDispatchToProps)(Layout1);