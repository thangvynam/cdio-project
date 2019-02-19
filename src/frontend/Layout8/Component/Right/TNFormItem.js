import React, { Component } from 'react';
import {
  Form, Input, Tooltip, Icon, Cascader, Select, Button, message
} from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeTNData, addTNData } from '../../../Constant/ActionType';

const loai_item = [{
  value: 'URL',
  label: 'URL'
}, {
  value: 'BOOK',
  label: 'BOOK'
}, {
  value: 'ARTICLE',
  label: 'ARTICLE'
}, {
  value: 'VIDEO',
  label: 'VIDEO'
}]

class TNFormItem extends Component {

  handleMotaChange = (value) => {
    let a = value.target.value;
    this.props.onChangeTNData({
      stt: this.props.tndata.stt,
      loai: this.props.tndata.loai,
      mota: a,
      link: this.props.tndata.link,
    })
  }
  handleLinkChange = (value) => {
    let a = value.target.value;
    this.props.onChangeTNData({
      stt: this.props.tndata.stt,
      loai: this.props.tndata.loai,
      mota: this.props.tndata.mota,
      link: a,
    })
  }

  handleLoaiChange = (value) => {
    this.props.onChangeTNData({
      stt: this.props.tndata.stt,
      loai: value,
      mota: this.props.tndata.mota,
      link: this.props.tndata.link,
    })
  }

  addTNData = () => {

    if (this.props.tndata.loai === "" || this.props.tndata.loai === undefined) {
      message.error("Chưa chọn loại")
    } else {
      if (this.props.tndata.mota === "" || this.props.tndata.mota === undefined) {
        message.error("Chưa nhập mô tả");
      } else {
        let index = this.props.tntable.length + 1;

        let data = {
          key: index,
          stt: index,
          loai: this.props.tndata.loai,
          mota: this.props.tndata.mota,
          link: this.props.tndata.link,
        }
        let newData = this.props.tntable.concat(data);
        this.props.onAddTNData(newData);
        message.info("Thêm thành công!");
        this.props.form.resetFields();
      }
    }
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
    const formDynamicItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
    };

    return (
      <div style={{ border: "2px solid", borderRadius: "12px" }}>
        <div style={{ marginTop: "10px" }}></div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
            {...formDynamicItemLayout}
            label={(
              <span>
                Loại tài nguyên
              </span>
            )}
          >
            <Cascader options={loai_item} onChange={this.handleLoaiChange} placeholder="Loại tài nguyên" />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Mô tả"
          >
            {getFieldDecorator('mota', {
              rules: [{
                required: true, message: 'Vui lòng nhập mô tả',
              }],
            })(
              <Input onChange={this.handleMotaChange} />
            )}

          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="Link liên kết(nếu có)"
          >
            {getFieldDecorator('link', {
              rules: [{
                message: 'Vui lòng nhập link liên kết (nếu có)',
              }],
            })(
              <Input onChange={this.handleLinkChange} />
            )}

          </Form.Item>
          <Form.Item wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
          }}>
            <div>
              <Button type="primary" size="large" icon="plus" onClick={this.addTNData}>Thêm</Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tndata: state.tndata,
    tntable: state.tntable,
  };
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onAddTNData: addTNData,
    onChangeTNData: changeTNData,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(TNFormItem);