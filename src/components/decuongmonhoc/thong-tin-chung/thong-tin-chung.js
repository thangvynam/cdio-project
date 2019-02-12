import React, { Component } from 'react'
// import { Tooltip } from 'antd';
import {
  Form, Input, Tooltip, Card, Button
} from 'antd';

import './thong-tin-chung.css'
const FormItem = Form.Item;
const Search = Input.Search;


class ThongTinChung extends Component {
  
  render() {
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
            <Card
                title="Thông Tin Chung"
                className="card_TTC"
            >
                <Form.Item  {...formItemLayout}  label="Tên Môn Học (Tiếng Việt):">
                    <Input type='text' />
                </Form.Item>
                <Form.Item  {...formItemLayout} label="Tên Môn Học (Tiếng Anh):">
                    <Input type='text' />
                </Form.Item>
                <Form.Item  {...formItemLayout} label="Mã Số Môn Học: ">
                    <Input type='text' />
                </Form.Item>
                <Form.Item  {...formItemLayout} label="Thuộc Tính Kiến Thức: ">
                    <Input type='text' />
                </Form.Item>
                <Form.Item  {...formItemLayout} label="Số Tín Chỉ: ">
                    <Input className="input_number" type='number' />
                </Form.Item>
                <Form.Item  {...formItemLayout} label="Số Tiết Lý Tuyết: ">
                    <Input className="input_number" type='number' />
                </Form.Item>
                <Form.Item  {...formItemLayout} label="Số Tiết Thực Hành: ">
                    <Input className="input_number" type='number' />
                </Form.Item>
                <Form.Item  {...formItemLayout} label="Số Tiết Tự Học: ">
                    <Input className="input_number" type='number' />
                </Form.Item>
                <Form.Item  {...formItemLayout} label="Các Môn Tiên Quyết: ">
                    <Input type='text' />
                </Form.Item>
                <Button type="primary" htmlType="submit" className="submit_TTC form-signin-button">
                            Submit
                </Button>
            </Card>
          </div>
        </div>
    )
  }
}
export default ThongTinChung;
