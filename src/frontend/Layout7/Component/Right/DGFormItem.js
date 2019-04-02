import React, { Component } from 'react';
import {
  Form, Input, Tooltip, Icon, Cascader, Select, Button, message
} from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeDGData, addDGData, saveTempDGData ,updateChudeDanhGia, updateCDRDanhGia} from '../../../Constant/ActionType';
import axios from "axios"

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

var temp = '';
var chude = []; 
var mathanhphan = '';
var tenthanhphan ='';
var mota = '';
var tile = '';
var standardOutput = [];
class DGFormItem extends Component {
  
  handleMathanhphanChange = (e) => {
    mathanhphan = e.target.value;

     let tempInfo = this.props.itemLayout7Reducer.tempInfo;
     tempInfo["mathanhphan"] = mathanhphan;
    
    this.props.onSaveTempDGData(tempInfo);
  }
  handleTenthanhphanChange = (e) => {
    tenthanhphan= e.target.value;
   
    let tempInfo = this.props.itemLayout7Reducer.tempInfo;
    tempInfo["tenthanhphan"] = tenthanhphan;
   
   this.props.onSaveTempDGData(tempInfo);
  }
  handleMotaChange = (e) => {
    mota= e.target.value;
  
    let tempInfo = this.props.itemLayout7Reducer.tempInfo;
    tempInfo["mota"] = mota;
   
   this.props.onSaveTempDGData(tempInfo);
  }
  handleTileChange = (e) => {
    tile = e.target.value;
    
    let tempInfo = this.props.itemLayout7Reducer.tempInfo;
    tempInfo["tile"] = tile;
   
   this.props.onSaveTempDGData(tempInfo);
  }

  toString = () => {
    let temp2 = '';
    let tempInfo = this.props.itemLayout7Reducer.tempInfo;
    for (let i = 0; i < tempInfo.standardOutput.length; i++) {
      temp2 += tempInfo.standardOutput[i] + " , ";
    }
    return temp2;
  }
  displayRender = label => {
    if (this.isSubmit) {
      this.isSubmit = false;
      return null;
    }
    if (label.length > 0) return label[0] + label[1];
  };

  onChange = (value) => {
    if(value.length === 0 ) return;
    let tempInfo = this.props.itemLayout7Reducer.tempInfo;

    let newArray = tempInfo.standardOutput.slice();
    newArray.push(value[0] + value[1]);
    temp = newArray;
    standardOutput = temp.slice();
   
    this.props.onChangeDGData({
      standardOutput: standardOutput,
      mathanhphan: mathanhphan,
      tenthanhphan: tenthanhphan,
      mota: mota,
      tile: tile
    })

    tempInfo["standardOutput"] = standardOutput;
    this.props.onSaveTempDGData(tempInfo);
  }
  onChange1 = (value) => {
    let tempInfo = this.props.itemLayout7Reducer.tempInfo;
    chude[0] = value[0];
    tempInfo["chude"] = chude;
    this.props.onSaveTempDGData(tempInfo);
  }

  componentWillMount(){
    if(this.props.subjectId !== null && this.props.subjectId !== undefined && this.props.subjectId !== "" && this.props.itemLayout7Reducer.isLoaded === false){
      var self = this;
        axios.get('/get-chude')
        .then(function (response) {
            self.props.onGetChude(response.data);
          })
         .catch(function (error) {
            console.log(error);
         });  

        axios.get(`/get-standardoutput-7/${this.props.subjectId}`)
        .then(function(response){

          self.props.onGetCDR(response.data);
        })
        .catch(function(error){
          console.log(error);
        });

        
    }
    
  }

  addDGData = () => {
    if (chude.length === 0 || chude === undefined) {
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
                  let previewInfo = this.props.itemLayout7Reducer.previewInfo;
                  let newData = '';
                  let isAdd2Rows = false;
                  let iserror = false;
                  if (chude === 'Bài tập tại lớp') {
                    let flag = true;
                    this.props.dgdata.mathanhphan = 'BTTL#' + this.props.dgdata.mathanhphan;
                    for (let i = 0; i < previewInfo.length; i++) {
                      if ('BTTL' === previewInfo[i].mathanhphan) {
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
                      newData = previewInfo.concat(dataFather);
                      isAdd2Rows = true;
                    }
                  } else if (chude === 'Bài tập về nhà') {
                    let flag = true;

                    this.props.dgdata.mathanhphan = 'BTVN#' + this.props.dgdata.mathanhphan;
                    for (let i = 0; i < previewInfo.length; i++) {
                      if ('BTVN' === previewInfo[i].mathanhphan) {
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
                      newData = previewInfo.concat(dataFather);
                      isAdd2Rows = true;
                    }
                  } else if (chude === 'Đồ án môn học') {
                    let flag = true;
                    this.props.dgdata.mathanhphan = 'DAMH#' + this.props.dgdata.mathanhphan;
                    for (let i = 0; i < previewInfo.length; i++) {
                      if ('DAMH' === previewInfo[i].mathanhphan) {
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
                      newData = previewInfo.concat(dataFather);
                      isAdd2Rows = true;
                    }
                  } else if (chude === 'Thi lý thuyết cuối kì') {
                    console.log("Vo duoc nha")
                    let flag = true;
                    this.props.dgdata.mathanhphan = 'LTCK#' + this.props.dgdata.mathanhphan;
                    for (let i = 0; i < previewInfo.length; i++) {
                      if ('LTCK' === previewInfo[i].mathanhphan) {
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
                      newData = previewInfo.concat(dataFather);
                      isAdd2Rows = true;
                    }
                  }
                  for (let i = 0; i < previewInfo.length; i++) {

                    if (this.props.dgdata.mathanhphan === previewInfo[i].key) {
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

                    let dataReturn = { previewInfo: [],tempInfo : {} };
                    if (isAdd2Rows === true) {
                      dataReturn.previewInfo = newData.concat(data);
                    } else {
                      dataReturn.previewInfo = previewInfo.concat(data);
                    }
                    dataReturn.tempInfo = {
                      mathanhphan: "",
                      tenthanhphan: "",
                      mota : "",
                      tile : "",
                      standardOutput : []
                    }

                    console.log(dataReturn);
                    this.props.onAddDGData(dataReturn);
                    message.info("Thêm thành công!");
                    this.props.form.resetFields();
                    isAdd2Rows = false;
                    temp.splice(0, temp.length)
                    this.props.onSaveTempDGData(dataReturn.tempInfo);
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
    console.log(this.props.itemLayout7Reducer.tempInfo.chude)
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
        <Form onSubmit={this.addDGData}>
          <Form.Item
            {...formDynamicItemLayout}
            label={(
              <span>
                Tên chủ đề
              </span>
            )}
          >{getFieldDecorator('cascader', {
            rules: [
              { required: true, message: 'Chọn chủ đề' },
            ],
            initialValue: this.props.itemLayout7Reducer.tempInfo.chude
          })
            (<Cascader options={this.props.itemLayout7Reducer.chudeDanhGia.map(item => {
              return {value:item.ma_chu_de , label: item.ma_chu_de}
            })} onChange={this.onChange1} placeholder="Tên chủ đề" />)}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Mã thành phần"
          >
            {getFieldDecorator('mathanhphan', {
              rules: [{
                required: true, message: 'Vui lòng nhập mã thành phần',
              }],
              initialValue: this.props.itemLayout7Reducer.tempInfo.mathanhphan
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
              initialValue: this.props.itemLayout7Reducer.tempInfo.tenthanhphan
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
              initialValue: this.props.itemLayout7Reducer.tempInfo.mota
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
            <Cascader 
            options={this.props.itemLayout7Reducer.chuandaura.map(item => {
              let children = item.cdr.map(children => {
                let temp = children.chuan_dau_ra.substr(children.chuan_dau_ra.indexOf('.'),children.chuan_dau_ra.length)
                return {value:temp, label:temp}
              })
              return {value:item.muc_tieu,label:item.muc_tieu,children:children}
            })} 
            onChange={this.onChange} 
            placeholder="Chọn chuẩn đầu ra"
            displayRender={this.displayRender} />
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
              initialValue: this.props.itemLayout7Reducer.tempInfo.tile
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
    itemLayout7Reducer: state.itemLayout7Reducer,
    subjectId: state.subjectid,
  };
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onAddDGData: addDGData,
    onChangeDGData: changeDGData,
    onSaveTempDGData : saveTempDGData,
    onGetChude : updateChudeDanhGia,
    onGetCDR : updateCDRDanhGia,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(DGFormItem);