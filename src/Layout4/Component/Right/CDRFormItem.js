import React, { Component } from 'react';
import {
  Form, Select,
  Button,  Checkbox,
   Input, message
} from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeCDRData, addCDRData } from '../../../Actions/actions';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const { TextArea } = Input;
const { Option } = Select;
const CDRData = ["G1", "G2", "G3", "G4", "G5"];
const levelsOptions = ["I", "T", "U"];

class CDRFormItem extends Component {
   
  swapLevels = (a, b) => {
    let temp = a;
    a = b;
    b = temp;
  }
  onCDRChange = (value) => {
    this.props.onChangeCDRData(
      {
        cdr: value,
        description: this.props.cdrdata.description,
        levels: this.props.cdrdata.levels
      }
    )
  }
  
  onDescriptionChange = (e) => {
    var a = e.target.value;
    this.props.onChangeCDRData(
      {
        cdr: this.props.cdrdata.cdr,
        description: a,
        levels: this.props.cdrdata.levels
      }
    )
  }

  onLevelsChange = (checkedValues) => {
    for(let i = 0;i < checkedValues.length - 1;i++){
      for(let j = i + 1;j < checkedValues.length;j++){
        if(checkedValues[j] < checkedValues[i]){
          let temp = checkedValues[j];
          checkedValues[j] = checkedValues[i];
          checkedValues[i] = temp;
        }
      }
      }
    
    this.props.onChangeCDRData(
      {
        cdr: this.props.cdrdata.cdr,
        description: this.props.cdrdata.description,
        levels: checkedValues
      }
    )
  }
  
  addCDRData = () => {
    if(this.props.cdrdata.cdr === "" || this.props.cdrdata.cdr === undefined){
      message.info("Chọn một chuẩn đầu ra!")
    }
    else {
      if(this.props.cdrdata.description === "" || this.props.cdrdata.description === undefined){
        message.info("Chưa nhập mô tả!")
      }
      else {
        if(this.props.cdrdata.levels.length === 0 || this.props.cdrdata.levels === undefined){
          message.info("Chọn ít nhất một mức độ(I/T/U)!")
        }
        else {
          let index = 0;
          for(let i = 0; i < this.props.cdrtable.length; i++){
              if(this.props.cdrtable[i].cdr.split(".")[0] === this.props.cdrdata.cdr){
                index = this.props.cdrtable[i].cdr.split(".")[1];
              }
          }
          index++;
          var data = {
            cdr: `${this.props.cdrdata.cdr}.${index}`,
            description: this.props.cdrdata.description,
            levels: this.props.cdrdata.levels
          }
          var newData = this.props.cdrtable.concat(data);
          this.props.onAddCDRData(newData);
          message.info("Thêm thành công!")
        }
      }
    }
  }
    render() {
      const { getFieldDecorator } = this.props.form;
      const CDROption = Object.keys(CDRData).map((id, key) => {
        return <Option value={CDRData[key]}>{CDRData[key]}</Option>
      });
        return (
              <div style={{ border: "2px solid", borderRadius: "12px" }}>
                <div style={{ marginTop: "10px"}}></div>
                <Form onSubmit={this.handleSubmit}>
<Form.Item
          {...formItemLayout}
          label="Chuẩn đầu ra"
        >
          {getFieldDecorator('select', {
            rules: [
              { required: true, message: 'Chọn chuẩn đầu ra' },
            ],
          })(
            <Select onChange={this.onCDRChange} placeholder="Chọn chuẩn đầu ra" >
              {CDROption}
            </Select>
          )}
        </Form.Item>
        
<Form.Item {...formItemLayout} label="Mô tả (Mức chi tiết - hành động)">
          {getFieldDecorator('username', {
            rules: [{
              required: true,
              message: 'Mô tả không được rỗng',
            }],
          })(
            <TextArea onChange={this.onDescriptionChange}rows={4} placeholder="Mô tả"/>
          )}
        </Form.Item>
        

<Form.Item {...formItemLayout} label="Mức độ (I/T/U)"
        >
          {getFieldDecorator("checkbox-group", {
            rules: [{
              required: true,
              message: 'Chọn ít nhất một',
            }],
            initialValue: [],
          })(
            <Checkbox.Group options={levelsOptions} onChange={this.onLevelsChange} style={{ width: "100%" }}>
              
            </Checkbox.Group>
          )}
        </Form.Item>
        <Form.Item wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
          }}>
          <div>
          <Button type="primary" size="large" icon="plus" onClick={this.addCDRData}>Thêm</Button>
          </div>
        </Form.Item>
        </Form>
        </div>
        )
        }
    }
  
const mapStateToProps = (state) => {
  return {
    cdrdata: state.cdrdata,
    cdrtable: state.cdrtable,
  };
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onAddCDRData: addCDRData,
    onChangeCDRData: changeCDRData,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(CDRFormItem);