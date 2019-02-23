import React, { Component } from 'react'

import {
  Form, Input, Card, Button, notification, Icon
} from 'antd';

import './thong-tin-chung.css'


class ThongTinChung extends Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.props.messageSuccess);
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.actAddSuccess();
      }else{
        this.props.actAddFail();
      }
    });
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
    const { messageError, messageSuccess } = this.props;
    return (
      <div className="container">
        <div className="col-sm-10" >
          {messageError ?
            notification.open({
              message: messageError,
              icon: <Icon type="warning" style={{ color: 'red' }} />,
            }) : null}

          {messageSuccess ?
            notification.open({
              message: messageSuccess,
              icon: <Icon type="check-circle" style={{ color: 'green' }} />,
            }) : null}

          {messageSuccess || messageError ? this.props.resetStore() : null}
          <Form onSubmit={this.handleSubmit}>
            <Card
              title="Thông Tin Chung"
              className="card_TTC"
            >
              <Form.Item
                {...formItemLayout}
                label="Tên Môn Học (Tiếng Việt):">
                {getFieldDecorator('tenTiengViet', {
                  rules: [
                    {
                      type: 'string', message: 'The input is not valid ',
                    }, {
                      required: true, message: 'Please input VietNamese name!',
                    }],
                })(
                  <Input name="tenTV" type="text" />
                )}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Tên Môn Học (Tiếng Anh):">
                {getFieldDecorator('tenTiengAnh', {
                  rules: [
                    {
                      type: 'string', message: 'The input is not valid ',
                    }, {
                      required: true, message: 'Please input your English Name!',
                    }],
                })(
                  <Input name="tenTA" type="text" />
                )}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Mã Số Môn Học:">
                {getFieldDecorator('msMonHoc', {
                  rules: [
                    {
                      type: 'string', message: 'The input is not valid ',
                    }, {
                      required: true, message: 'Please input your Course Code!',
                    }],
                })(
                  <Input name="msMonHoc" type="text" />
                )}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Thuộc Tính Kiến Thức:">
                {getFieldDecorator('thuocTinhKienThuc', {
                  rules: [
                    {
                      type: 'string', message: 'The input is not valid ',
                    }, {
                      required: true, message: 'Please input your Knowledge Attributes!',
                    }],
                })(
                  <Input name="thuocTinhKienThuc" type="text" />
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
                })(
                  <Input className="inputNumber" name="soTinChi" type="number" />
                )}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Số Tiết Lý Thuyết: ">
                {getFieldDecorator('soTietLyThuyet', {
                  rules: [
                    {
                      required: true, message: 'Please input your Number Of Theoretical Lessons!',
                    }],
                })(
                  <Input className="inputNumber" name="soTietLyThuyet" type="number" />
                )}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Số Tiết Thực Hành: ">
                {getFieldDecorator('soTietThucHanh', {
                  rules: [
                    {
                      required: true, message: 'Please input your Number Of Practice Lessons!',
                    }],
                })(
                  <Input className="inputNumber" name="soTietThucHanh" type="number" />
                )}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Số Tiết Tự Học: ">
                {getFieldDecorator('soTietTuHoc', {
                  rules: [
                    {
                      required: true, message: 'Please input your Number Of Self-Study Periods!',
                    }],
                })(
                  <Input className="inputNumber" name="soTietTuHoc" type="number" />
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
                })(
                  <Input name="monTienQuyet" type="text" />
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="submit_TTC form-signin-button">
                  Submit
                </Button>
              </Form.Item>
            </Card>
          </Form>
        </div>
      </div>
    )
  }
}

const Layout1 = Form.create()(ThongTinChung);
export default Layout1;