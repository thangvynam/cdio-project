import React, { Component } from 'react';
import {
  Row, Col,
  Form, Select,
  Button, Checkbox,
  Input, message, Icon,
  Cascader
} from 'antd';
import { Link } from 'react-scroll';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeCDRData, addCDRData, selectedVerb, changeLevelData, selectedTempVerb } from '../../../Constant/ActionType';
import './1.css';
const formItemLayout = {
  labelCol: {
    xs: { span: 12 },
    sm: { span: 6 },
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

  displayRender = (label) => {
  if(label[1] !== "" && label[1] !== undefined){
    return label[0] + " - " + label[1];
  }
    return label[0];
  }

  onChange = (value) => {
    
      const data = {
        level: value[0],
        childLevel: value[1],
        verb: value[value.length - 1]
      }
      if(value[value.length - 1] !== undefined) {
        this.props.onUpdateTempVerb(value[value.length - 1]);
      }
      
      this.props.onUpdateVerb(data);
      
  }


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

  changeLevelData = (e) => {
    let a = e.target.value;
    const data = this.props.cdrverb;
    data.verb = a;
    this.props.onUpdateVerb(data);

  }

  onDescriptionChange = (e) => {
    let a = e.target.value;
    this.props.onChangeCDRData(
      {
        cdr: this.props.cdrdata.cdr,
        description: a,
        levels: this.props.cdrdata.levels
      }
    )
  }

  onLevelsChange = (checkedValues) => {
    for (let i = 0; i < checkedValues.length - 1; i++) {
      for (let j = i + 1; j < checkedValues.length; j++) {
        if (checkedValues[j] < checkedValues[i]) {
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
    if (this.props.cdrdata.cdr === "" || this.props.cdrdata.cdr === undefined) {
      message.info("Chọn một chuẩn đầu ra!")
    }
    else {
      if(this.props.cdrverb.level === "" || this.props.cdrverb.level === undefined || 
      this.props.cdrverb.verb === "" || this.props.cdrverb.verb === undefined){
        message.info("Chọn mức độ và động từ!")
      }
      else {
        if (this.props.cdrdata.description === "" || this.props.cdrdata.description === undefined) {
          message.info("Chưa nhập mô tả!")
        }
        else {
          if (this.props.cdrdata.levels.length === 0 || this.props.cdrdata.levels === undefined) {
            message.info("Chọn ít nhất một mức độ(I/T/U)!")
          }
          else {
            let index = 0;
            for (let i = 0; i < this.props.cdrtable.length; i++) {
              if (this.props.cdrtable[i].cdr.split(".")[0] === this.props.cdrdata.cdr) {
                index = this.props.cdrtable[i].cdr.split(".")[1];
              }
            }
            index++;
            let uniqueKey = this.props.cdrtable.length + 1;
            let description = this.props.cdrverb.verb + " " + this.props.cdrdata.description;
            var data = {
              key: `${uniqueKey}`,
              cdr: `${this.props.cdrdata.cdr}.${index}`,
              description: description,
              levels: this.props.cdrdata.levels
            }
            var newData = this.props.cdrtable.concat(data);
            this.props.onAddCDRData(newData);
            
            const leveldata = this.props.cdrleveldata;
            for(let i = 0;i < leveldata.length;i++) {
              if(leveldata[i].value === this.props.cdrverb.level) {
                for(let j = 0;j < leveldata[i].children.length;j++) {
                  if(leveldata[i].children[j].value === this.props.cdrverb.childLevel) {
                    for(let k = 0;k < leveldata[i].children[j].children.length;k++) {
                      if(leveldata[i].children[j].children[k].value === this.props.cdrtempverb){
                        leveldata[i].children[j].children[k].value = this.props.cdrverb.verb;
                        leveldata[i].children[j].children[k].label = this.props.cdrverb.verb;
                        this.props.onChangeLevelData(leveldata);
                      }
                    }
                  }
                }
              }
            }
            
            message.info("Thêm thành công!");
            this.props.onChangeCDRData({
              cdr: "",
              description: "",
              levels: []
            });
            this.props.onUpdateVerb({level: "", verb: ""});
            this.props.form.resetFields();
          }
        }
      }
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const CDROption = Object.keys(CDRData).map((id, key) => {
      return <Option key={key} value={CDRData[key]}>{CDRData[key]}</Option>
    });
    return (
      <div style={{ border: "2px solid", borderRadius: "12px" }}>
        <div style={{ marginTop: "10px" }}></div>
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

              <Form.Item {...formItemLayout} label="Chọn mức độ: ">
                <Cascader
                  options={this.props.cdrleveldata}
                  expandTrigger="hover"
                  displayRender={this.displayRender}
                  onChange={this.onChange}
                  style={{width: "30%"}}
                />
                {getFieldDecorator('input', {
            initialValue: this.props.cdrverb.verb
          })(<Input disabled={this.props.cdrverb.level === "" || this.props.cdrverb.level === undefined ? true : false} placeholder={'Chọn một động từ'} onChange={this.changeLevelData} style={{width: "30%"}} />)}
              </Form.Item>
           

          <Form.Item {...formItemLayout} label="Mô tả (Mức chi tiết - hành động)">
            {getFieldDecorator('username',
              {
                rules: [{
                  required: true,
                  message: 'Mô tả không được rỗng',

                }],
              })(
                <TextArea onChange={this.onDescriptionChange} rows={4} placeholder="Mô tả" />
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
              {this.props.cdrtable.length > 0 ? <Link activeClass="active" className="test1" to="test1" spy={true} smooth={true} duration={500} ><Button type="danger">Finish</Button></Link> : null}
              <Button type="primary" style={{ marginLeft: "2em" }} onClick={this.addCDRData}>
                Continue<Icon type="right" />
              </Button>
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
    cdrleveldata: state.cdrleveldata,
    cdrverb: state.cdrverb,
    cdrtempverb: state.cdrtempverb,
  };
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onAddCDRData: addCDRData,
    onChangeCDRData: changeCDRData,
    onChangeLevelData: changeLevelData,
    onUpdateVerb: selectedVerb,
    onUpdateTempVerb: selectedTempVerb,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(CDRFormItem);