import React, { Component } from 'react';
import {
  Form, Input, Tooltip, Icon, Cascader, Select, Button, message
} from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeDGData, addDGData } from '../../../Constant/ActionType';

const standard_item = [{
  value: 'G1',
  label: 'G1',
  children: [{
    value: '.1',
    label: '.1',
  },
  {
    value: '.2',
    label: '.2',
  },
  {
    value: '.3',
    label: '.3',
  }],
},
{
  value: 'G2',
  label: 'G2',
  children: [{
    value: '.1',
    label: '.1',
  },
  {
    value: '.2',
    label: '.2',
  }],
},
{
  value: 'G3',
  label: 'G3',
  children: [{
    value: '.1',
    label: '.1',
  },
  {
    value: '.2',
    label: '.2',
  },
  {
    value: '.3',
    label: '.3',
  },
  {
    value: '.4',
    label: '.4',
  }],
},
{
  value: 'G4',
  label: 'G4',
  children: [{
    value: '.1',
    label: '.1',
  }]
},
{
  value: 'G5',
  label: 'G5',
  children: [{
    value: '.1',
    label: '.1',
  },
  {
    value: '.2',
    label: '.2',
  },
  {
    value: '.3',
    label: '.3',
  },
  {
    value: '.4',
    label: '.4',
  },
  {
    value: '.5',
    label: '.5',
  }],
},
{
  value: 'G6',
  label: 'G6',
  children: [{
    value: '.1',
    label: '.1',
  }]
},
{
  value: 'G7',
  label: 'G7',
  children: [{
    value: '.1',
    label: '.1',
  }]
},
];
const tenchude_item = [{
  value: 'Bài tập về nhà',
  label: 'Bài tập về nhà'
}, {
  value: 'Bài tập tại lớp',
  label: 'Bài tập tại lớp'
}, {
  value: 'Đồ án môn học',
  label: 'Đồ án môn học'
}, {
  value: 'Thi lý thuyết cuối kì',
  label: 'Thi lý thuyết cuối kì'
}
]

var temp = '';
var temp1 = [];

class DGFormItem extends Component {
  state = {
    standardSelectedItem: [],
  }
  handleMathanhphanChange = (e) => {
    let a = e.target.value;
    this.props.onChangeDGData({
      standardOutput: this.props.dgdata.standardOutput,
      mathanhphan: a,
      tenthanhphan: this.props.dgdata.tenthanhphan,
      mota: this.props.dgdata.mota,
      tile: this.props.dgdata.tile
    })
  }
  handleTenthanhphanChange = (e) => {
    let a = e.target.value;
    this.props.onChangeDGData({
      standardOutput: this.props.dgdata.standardOutput,
      mathanhphan: this.props.dgdata.mathanhphan,
      tenthanhphan: a,
      mota: this.props.dgdata.mota,
      tile: this.props.dgdata.tile
    })
  }
  handleMotaChange = (e) => {
    let a = e.target.value;
    this.props.onChangeDGData({
      standardOutput: this.props.dgdata.standardOutput,
      mathanhphan: this.props.dgdata.mathanhphan,
      tenthanhphan: this.props.dgdata.tenthanhphan,
      mota: a,
      tile: this.props.dgdata.tile
    })
  }
  handleTileChange = (e) => {
    let a = e.target.value;
    this.props.onChangeDGData({
      standardOutput: this.props.dgdata.standardOutput,
      mathanhphan: this.props.dgdata.mathanhphan,
      tenthanhphan: this.props.dgdata.tenthanhphan,
      mota: this.props.dgdata.mota,
      tile: a
    })
  }
  toString = () => {
    let temp2 = '';
    for (let i = 0; i < this.state.standardSelectedItem.length; i++) {
      temp2 += this.state.standardSelectedItem[i] + ' , ';
    }
    return temp2.replace('NaN', '');
  }
  onChange = (value) => {
    let newArray = this.state.standardSelectedItem.slice();
    newArray.push(value[0] + value[1]);
    this.setState({ standardSelectedItem: newArray });
    temp = newArray;
    const standardoutput1 = temp.slice();
    this.props.onChangeDGData({
      standardOutput: standardoutput1,
      mathanhphan: this.props.dgdata.mathanhphan,
      tenthanhphan: this.props.dgdata.tenthanhphan,
      mota: this.props.dgdata.mota,
      tile: this.props.dgdata.tile
    })
  }
  onChange1 = (value) => {
    temp1 = value;
  }

  addDGData = () => {
    console.log(temp1);
    if (temp1.length === 0 || temp1 === undefined) {
      message.error("Chọn tên chủ đề")
    }
    else {
      if (this.props.dgdata.mathanhphan === "" || this.props.dgdata.mathanhphan === undefined) {
        message.error("Chưa nhập mã thành phần!")
      }
      else {
        if (this.props.dgdata.tenthanhphan === "" || this.props.dgdata.tenthanhphan === undefined) {
          message.error("Chưa nhập tên thành phần!")
        }
        else {
          if (this.props.dgdata.mota === "" || this.props.dgdata.mota === undefined) {
            message.error("Chưa nhập mô tả")
          } else {
            if (this.props.dgdata.standardOutput === "" || this.props.dgdata.standardOutput === undefined) {
              message.error("Chưa chọn chuẩn đầu ra")
            } else {
              {
                {
                  let newData = '';
                  let isAdd2Rows = false;
                  let iserror = false;
                  if (temp1 === 'Bài tập tại lớp') {
                    let flag = true;
                    this.props.dgdata.mathanhphan = 'BTTL#' + this.props.dgdata.mathanhphan;
                    for (let i = 0; i < this.props.dgtable.length; i++) {
                      if ('BTTL' === this.props.dgtable[i].mathanhphan) {
                        flag = false;
                      }
                    }
                    if (flag === true) {
                      
                      let dataFather = {
                        key: 'BTTL',
                        standardOutput: [],
                        mathanhphan: 'BTTL',
                        tenthanhphan: 'Bài tập tại lớp',
                        mota: '',
                        tile: '',
                      };
                      newData = this.props.dgtable.concat(dataFather);
                      isAdd2Rows = true;
                    }
                  } else if (temp1 === 'Bài tập về nhà') {
                    let flag = true;
                    this.props.dgdata.mathanhphan = 'BTVN#' + this.props.dgdata.mathanhphan;
                    for (let i = 0; i < this.props.dgtable.length; i++) {
                      if ('BTVN' === this.props.dgtable[i].mathanhphan) {
                        flag = false;
                      }
                    }
                    if (flag === true) {
                      let dataFather = {
                        key: 'BTVN',
                        standardOutput: [],
                        mathanhphan: 'BTVN',
                        tenthanhphan: 'Bài tập về nhà',
                        mota: '',
                        tile: '',
                      };
                      newData = this.props.dgtable.concat(dataFather);
                      isAdd2Rows = true;
                    }
                  } else if (temp1 === 'Đồ án môn học') {
                    let flag = true;
                    this.props.dgdata.mathanhphan = 'DAMH#' + this.props.dgdata.mathanhphan;
                    for (let i = 0; i < this.props.dgtable.length; i++) {
                      if ('DAMH' === this.props.dgtable[i].mathanhphan) {
                        flag = false;
                      }
                    }
                    if (flag === true) {
                       
                      let dataFather = {
                        key: 'DAMH',
                        standardOutput: [],
                        mathanhphan: 'DAMH',
                        tenthanhphan: 'Đồ án môn học',
                        mota: '',
                        tile: '',
                      };
                      newData = this.props.dgtable.concat(dataFather);
                      isAdd2Rows = true;
                    }
                  } else if (temp1 === 'Thi lý thuyết cuối kỳ') {
                    let flag = true;
                    this.props.dgdata.mathanhphan = 'LTCK#' + this.props.dgdata.mathanhphan;
                    for (let i = 0; i < this.props.dgtable.length; i++) {
                      if ('LTCK' === this.props.dgtable[i].mathanhphan) {
                        flag = false;
                      }
                     
                    }
                    if (flag === true) {
                      let dataFather = {
                        key: 'LTCK',
                        standardOutput: [],
                        mathanhphan: 'LTCK',
                        tenthanhphan: 'Thi lý thuyết cuối kỳ',
                        mota: '',
                        tile: '',
                      };
                      newData = this.props.dgtable.concat(dataFather);
                      isAdd2Rows = true;
                    }
                  }
                  for (let i = 0; i < this.props.dgtable.length; i++) {
                    
                    if (this.props.dgdata.mathanhphan === this.props.dgtable[i].key) {
                      iserror = true;
                    }
                  }
                  if (iserror === true) {
                    message.error("Mã thành phần đã tồn tại!")
                  } else {
                    let data = {
                      key: `${this.props.dgdata.mathanhphan}`,
                      standardOutput: this.props.dgdata.standardOutput,
                      mathanhphan: this.props.dgdata.mathanhphan,
                      tenthanhphan: this.props.dgdata.tenthanhphan,
                      mota: this.props.dgdata.mota,
                      tile: this.props.dgdata.tile + '%',
                    }
                    
                    let dataReturn = '';
                    if (isAdd2Rows === true) {
                      dataReturn = newData.concat(data);
                    } else {
                      dataReturn = this.props.dgtable.concat(data);
                    }

                    console.log(dataReturn);
                    this.props.onAddDGData(dataReturn);
                    message.info("Thêm thành công!");
                    this.props.form.resetFields();
                    isAdd2Rows=false;
                    temp.splice(0,temp.length)
                  }

                }
              }
            }
          }

        }
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
                Tên chủ đề
                            </span>
            )}
          >
            <Cascader options={tenchude_item} onChange={this.onChange1} placeholder="Tên chủ đề" />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Mã thành phần"
          >
            {getFieldDecorator('mathanhphan', {
              rules: [{
                required: true, message: 'Vui lòng nhập mã thành phần',
              }],
            })(
              <Input onChange={this.handleMathanhphanChange} />
            )}

          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="Tên thành phần"
          >
            {getFieldDecorator('tenthanhphan', {
              rules: [{
                required: true, message: 'Vui lòng nhập tên mô tả thành phần',
              }],
            })(
              <Input onChange={this.handleTenthanhphanChange} />
            )}

          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="Mô tả(gợi ý)"
          >
            {getFieldDecorator('mota', {
              rules: [{
                required: true, message: 'Vui lòng nhập tên mô tả thành phần',
              }],
            })(
              <Input onChange={this.handleMotaChange} />
            )}

          </Form.Item>
          <Form.Item
            {...formDynamicItemLayout}
            label={(
              <span>
                Chọn chuẩn đầu ra&nbsp;
                        <Tooltip title="Tham khảo mục chuẩn đầu ra để chọn">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            )}
          >
            <Cascader options={standard_item} onChange={this.onChange} placeholder="Chọn chuẩn đầu ra" />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Kết quả chuẩn đầu ra"
          >
            <Input disabled value={this.toString()} />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Tỉ lệ(%)"
          >
            {getFieldDecorator('tile', {
              rules: [{
                required: true, message: 'Vui lòng nhập tỉ lệ(%)',
              }],
            })(
              <Input onChange={this.handleTileChange} />
            )}

          </Form.Item>

          <Form.Item wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
          }}>
            <div>
              <Button type="primary" size="large" icon="plus" onClick={this.addDGData}>Thêm</Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dgdata: state.dgdata,
    dgtable: state.dgtable,
  };
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onAddDGData: addDGData,
    onChangeDGData: changeDGData,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(DGFormItem);