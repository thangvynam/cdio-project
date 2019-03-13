import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Form, Input, Card, Button, notification, Icon, Tooltip

} from 'antd';
import TableTTC from './table/tableTTC';
import './thong-tin-chung.css'
import { themThongTinChung, xoaThongTinChung, suaThongTinChung, addDataTemp } from './../Constant/thong-tin-chung/actions';
class ThongTinChung extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isHasData: false,
      isBtnEdit: false
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.props.dataTTC.length === 0) {
          this.props.themThongTinChung(values);
        } else {
          this.props.suaThongTinChung(values);
        }
        notification.open({
          message: "Success",
          icon: <Icon type="check-circle" style={{ color: 'green' }} />,
        })
      }
    });
  }

  handleButtonEdit = () => {
    if (this.state.isBtnEdit) {
      return (
        <Button type="primary" disabled htmlType="submit" className="submit_TTC form-signin-button">
          Continue
        </Button>
      );
    }
    return (
      <Button type="primary" htmlType="submit" className="submit_TTC form-signin-button">
        Continue
        </Button>
    );
  }

  toggleButton = () => {
    this.setState({
      isBtnEdit: !this.state.isBtnEdit
    })
  }

  toggleButtonDelete = () => {
    this.setState({
      isBtnEdit: false
    })
  }

  handleOnChange = (e)=>{
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

    const { isBtnEdit } = this.state;
    const { dataTTC, tempData } = this.props;
    console.log(tempData[0]['tenMonHocTV'])
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-1" ></div>
          <div className="col-sm-11" >
            <h1 style={{ textAlign: "center" }}>THÔNG TIN CHUNG</h1>
            <div className="card_TTC" >
              <Form  onChange={this.handleOnChange} onSubmit={this.handleSubmit}>
                <Form.Item
                  {...formItemLayout}
                  label="Tên Môn Học (Tiếng Việt):">
                  {getFieldDecorator('tenMonHocTV', {
                    rules: [
                      {
                        type: 'string', message: 'The input is not valid ',
                      }, {
                        required: true, message: 'Please input VietNamese name!',
                      }],
                    initialValue: tempData[0]['tenMonHocTV'] !== '' ? tempData[0]['tenMonHocTV'] : '',
                  })(
                    <Input name="tenMonHocTV" type="text" />
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="Tên Môn Học (Tiếng Anh):">
                  {getFieldDecorator('tenMonHocTA', {
                    rules: [
                      {
                        type: 'string', message: 'The input is not valid ',
                      }, {
                        required: true, message: 'Please input your English Name!',
                      }],
                    initialValue: tempData[0]['tenMonHocTA'] !== '' ? tempData[0]['tenMonHocTA'] : '',
                  })(
                    <Input   name="tenMonHocTA" type="text" />
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="Mã Số Môn Học:">
                  {getFieldDecorator('maMonHoc', {
                    rules: [
                      {
                        type: 'string', message: 'The input is not valid ',
                      }, {
                        required: true, message: 'Please input your Course Code!',
                      }],
                    initialValue: tempData[0]['maMonHoc'] !== '' ? tempData[0]['maMonHoc'] : '',
                  })(
                    <Input   name="maMonHoc" type="text" />
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="Thuộc Tính Kiến Thức:">
                  {getFieldDecorator('khoiKienThuc', {
                    rules: [
                      {
                        type: 'string', message: 'The input is not valid ',
                      }, {
                        required: true, message: 'Please input your Knowledge Attributes!',
                      }],
                    initialValue: tempData[0]['khoiKienThuc'] !== '' ? tempData[0]['khoiKienThuc'] : '',
                  })(
                    <Input   name="khoiKienThuc" type="text" />
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="Số Tín Chỉ: ">
                  {getFieldDecorator('soTinChi', {
                    rules: [
                      {
                        required: true, message: 'Please input your Number Of Credits!',
                      }],
                    initialValue: tempData[0]['soTinChi'] !== -1 ? tempData[0]['soTinChi'] : '',
                  })(
                    <Input   className="inputNumber" name="soTinChi" type="number" />
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="Số Tiết Lý Thuyết: ">
                  {getFieldDecorator('tietLyThuyet', {
                    rules: [
                      {
                        required: true, message: 'Please input your Number Of Theoretical Lessons!',
                      }],
                    initialValue: tempData[0]['tietLyThuyet'] !== -1 ? tempData[0]['tietLyThuyet'] : '',
                  })(
                    <Input   className="inputNumber" name="tietLyThuyet" type="number" />
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="Số Tiết Thực Hành: ">
                  {getFieldDecorator('tietThucHanh', {
                    rules: [
                      {
                        required: true, message: 'Please input your Number Of Practice Lessons!',
                      }],
                    initialValue:tempData[0]['tietThucHanh'] !== -1 ? tempData[0]['tietThucHanh'] : '',
                  })(
                    <Input   className="inputNumber" name="tietThucHanh" type="number" />
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="Số Tiết Tự Học: ">
                  {getFieldDecorator('tietTuHoc', {
                    rules: [
                      {
                        required: true, message: 'Please input your Number Of Self-Study Periods!',
                      }],
                    initialValue: tempData[0]['tietTuHoc'] !== -1 ? tempData[0]['tietTuHoc'] : '',
                  })(
                    <Input   className="inputNumber" name="tietTuHoc" type="number" />
                  )}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="Các Môn Tiên Quyết:">
                  {getFieldDecorator('monTienQuyet', {
                    rules: [
                      {
                        type: 'string', message: 'The input is not valid ',
                      }, {
                        required: true, message: 'Please input Prerequisite Subjects!',
                      }],
                    initialValue:tempData[0]['monTienQuyet'] !== '' ? tempData[0]['monTienQuyet'] : '',
                  })(
                    <Input   name="monTienQuyet" type="text" />
                  )}
                </Form.Item>
                <Form.Item>
                  {this.handleButtonEdit()}
                </Form.Item>
              </Form>
            </div>
            <br />
            <Tooltip placement="topLeft" >
              <Button style={{ color: "red", margin: "auto", width: "100%" }}>(Hướng dẫn: mô tả các thông tin cơ bản của môn học )</Button>
            </Tooltip>
            <TableTTC
              {...this.props}
              toggleButton={this.toggleButton}
              toggleButtonDelete={this.toggleButtonDelete}
            />
            <Button type="primary" className="submit_All">
              Save All
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dataTTC: state.itemLayout1Reducer.previewInfo,
    tempData: state.itemLayout1Reducer.tempData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    themThongTinChung: (newTTC) => dispatch(themThongTinChung(newTTC)),
    addDataTemp: (tempTTC) => dispatch(addDataTemp(tempTTC)),
    suaThongTinChung: (newTTC) => dispatch(suaThongTinChung(newTTC)),
    xoaThongTinChung: () => dispatch(xoaThongTinChung())
  }
}


const Layout1 = Form.create()(ThongTinChung);
export default connect(mapStateToProps, mapDispatchToProps)(Layout1);