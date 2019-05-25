import React, { Component } from 'react';
import {
  Form, Input, Tooltip, Icon, Cascader, Select, Button, message
} from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeDGData, addDGData, saveTempDGData, updateChudeDanhGia, updateCDRDanhGia,saveLog,saveLogObject } from '../../../Constant/ActionType';
import { getCurrTime } from '../../../utils/Time';

var temp = '';

class DGFormItem extends Component {

  handleMathanhphanChange = (e) => {
    let a = e.target.value;

    let tempInfo = this.props.itemLayout7Reducer.tempInfo;
    tempInfo["mathanhphan"] = a;

    this.props.onSaveTempDGData(tempInfo);
  }
  handleTenthanhphanChange = (e) => {
    let a = e.target.value;

    let tempInfo = this.props.itemLayout7Reducer.tempInfo;
    tempInfo["tenthanhphan"] = a;

    this.props.onSaveTempDGData(tempInfo);
  }
  handleMotaChange = (e) => {
    let a = e.target.value;

    let tempInfo = this.props.itemLayout7Reducer.tempInfo;
    tempInfo["mota"] = a;

    this.props.onSaveTempDGData(tempInfo);
  }

  handleTileChange = (e) => {
    if (e.target.value < 0) e.target.value = 1;
    if (e.target.value > 100) e.target.value = 100;
    let a = e.target.value;

    let tempInfo = this.props.itemLayout7Reducer.tempInfo;
    tempInfo["tile"] = a;

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


  getStringFromCDR(CDR){
    let temp = CDR.substring(0,CDR.length-3);
    return temp;
  }

  displayRender = label => {
    if (this.isSubmit) {
      this.isSubmit = false;
      return null;
    }
    if (label.length > 0) return label[0] + label[1];
  };

  onChange = (value) => {
    if (value.length === 0) return;
    let tempInfo = this.props.itemLayout7Reducer.tempInfo;

    let newArray = tempInfo.standardOutput.slice();
    newArray.push(value[0] + value[1]);
    temp = newArray;
    let a = temp.slice();

    this.props.onChangeDGData({
      standardOutput: a,
      mathanhphan: this.props.itemLayout7Reducer.tempInfo.mathanhphan,
      tenthanhphan: this.props.itemLayout7Reducer.tempInfo.tenthanhphan,
      mota: this.props.itemLayout7Reducer.tempInfo.mota,
      tile: this.props.itemLayout7Reducer.tempInfo.tile
    })

    tempInfo["standardOutput"] = a;
    this.props.onSaveTempDGData(tempInfo);
  }

  onChange1 = (value) => {
    let tempInfo = this.props.itemLayout7Reducer.tempInfo;
    let a = [];
    a[0] = value[0];
    tempInfo["chude"] = a;
    this.props.onSaveTempDGData(tempInfo);
  }

  getIdfromNameChude(name) {
    for (let i = 0; i < this.props.itemLayout7Reducer.chudeDanhGia.length; i++) {
      if (name === this.props.itemLayout7Reducer.chudeDanhGia[i].ma_chu_de)
        return this.props.itemLayout7Reducer.chudeDanhGia[i].id
    }
  }

  addDGData = () => {
    if (this.props.itemLayout7Reducer.tempInfo.chude[0] === "" || this.props.itemLayout7Reducer.tempInfo.chude[0] === undefined) {
      message.error("Chọn tên chủ đề")
    }
    else {
      if (this.props.itemLayout7Reducer.tempInfo.mathanhphan === "" || this.props.itemLayout7Reducer.tempInfo.mathanhphan === undefined) {
        message.error("Chưa nhập mã thành phần!")
      }
      else {
        if (this.props.itemLayout7Reducer.tempInfo.tenthanhphan === "" || this.props.itemLayout7Reducer.tempInfo.tenthanhphan === undefined) {
          message.error("Chưa nhập tên thành phần!")
        }
        else {
          if (this.props.itemLayout7Reducer.tempInfo.mota === "" || this.props.itemLayout7Reducer.tempInfo.mota === undefined) {
            message.error("Chưa nhập mô tả")
          } else {
            if (this.props.itemLayout7Reducer.tempInfo.standardOutput === "" || this.props.itemLayout7Reducer.tempInfo.standardOutput === undefined) {
              message.error("Chưa chọn chuẩn đầu ra")
            } else {
              {
                {
                  let previewInfo = this.props.itemLayout7Reducer.previewInfo;
                  let newData = '';
                  let isAdd2Rows = false;
                  let iserror = false;
                  let mathanhphan = this.props.itemLayout7Reducer.tempInfo.mathanhphan;
                  let chude = this.props.itemLayout7Reducer.tempInfo.chude[0];
                  let standardOutput = this.props.itemLayout7Reducer.tempInfo.standardOutput;
                  let tenthanhphan = this.props.itemLayout7Reducer.tempInfo.tenthanhphan;
                  let mota = this.props.itemLayout7Reducer.tempInfo.mota;
                  let tile = this.props.itemLayout7Reducer.tempInfo.tile;
                  let chudeDanhGia = this.props.itemLayout7Reducer.chudeDanhGia;
                  for(let m = 0 ;m< chudeDanhGia.length;m++){
                    if(chude === chudeDanhGia[m].ma_chu_de){
                      let flag = true;
                      mathanhphan = chudeDanhGia[m].ma_chu_de + '#' + mathanhphan;
                      for(let i=0;i<previewInfo.length;i++){
                        if(chudeDanhGia[m].ma_chu_de===previewInfo[i].mathanhphan){
                          flag = false;
                        }
                      }
                      if (flag === true) {

                        let dataFather = {
                          key: chudeDanhGia[m].ma_chu_de,
                          chude: this.getIdfromNameChude(chude),
                          standardOutput: [],
                          mathanhphan: chudeDanhGia[m].ma_chu_de,
                          tenthanhphan: chudeDanhGia[m].ten_chu_de,
                          mota: '',
                          tile: '',
                          del_flag : -1,
                        };
                        newData = previewInfo.concat(dataFather);
                        isAdd2Rows = true;
                      }
                    }
                  }
                 
                  for (let i = 0; i < previewInfo.length; i++) {

                    if (mathanhphan === previewInfo[i].key) {
                      iserror = true;
                    }
                  }
                  if (iserror === true) {
                    message.error("Mã thành phần đã tồn tại!")
                  } else {

                    let data = {
                      key: `${mathanhphan}`,
                      chude: this.getIdfromNameChude(chude),
                      standardOutput: standardOutput,
                      mathanhphan: mathanhphan,
                      tenthanhphan: tenthanhphan,
                      mota: mota,
                      tile: tile + '%',
                      id : -1,
                      del_flag : 0,
                    }
                    let dataReturn = {};
                   
                    if (isAdd2Rows === true) {
                      dataReturn = newData.concat(data);
                    } else {
                      dataReturn = previewInfo.concat(data);
                    }
                    this.props.onSaveLog("Nguyen Van A", getCurrTime(), `Thêm đánh giá: Mã : ${data.mathanhphan}, Tên : ${data.tenthanhphan}, Mô tả (gợi ý) : ${data.mota} , Các chuẩn đầu ra được đánh giá : ${this.getStringFromCDR(this.toString())}, Tỉ lệ : ${data.tile}`, this.props.logReducer.contentTab, this.props.subjectId)
                    this.props.onSaveReducer("Nguyen Van A", getCurrTime(), `Thêm đánh giá: Mã : ${data.mathanhphan}, Tên : ${data.tenthanhphan}, Mô tả (gợi ý) : ${data.mota} , Các chuẩn đầu ra được đánh giá : ${this.getStringFromCDR(this.toString())}, Tỉ lệ : ${data.tile}`, this.props.logReducer.contentTab, this.props.subjectId)
                    
                    this.props.onAddDGData(dataReturn);
                    message.info("Thêm thành công!");
                    isAdd2Rows = false;
                    if (temp !== null && temp !== "" && temp !== undefined) {
                      temp.splice(0, temp.length)
                    }
                    let tempInfo = this.props.itemLayout7Reducer.tempInfo;
                    tempInfo["chude"] = [];
                    tempInfo["mathanhphan"] = "";
                    tempInfo["tenthanhphan"] = "";
                    tempInfo["mota"] = "";
                    tempInfo["tile"] = "";
                    tempInfo["standardOutput"] = [];
                    this.props.onSaveTempDGData(tempInfo);
                    this.props.form.resetFields();
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
    // console.log(this.props.itemLayout7Reducer.isLoaded)
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
              return { value: item.ma_chu_de, label: item.ma_chu_de }
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
          >{getFieldDecorator('chuandaura', {
            rules: [
              { required: true, message: 'Chọn chuẩn đầu ra' },
            ],
            initialValue: this.props.itemLayout7Reducer.tempInfo.chuandaura
          })
            (<Cascader
              options={this.props.itemLayout7Reducer.chuandaura.map(item => {
                let children = item.cdr.map(children => {
                  let temp = children.chuan_dau_ra.substr(children.chuan_dau_ra.indexOf('.'), children.chuan_dau_ra.length)
                  return { value: temp, label: temp }
                })
                return { value: item.muc_tieu, label: item.muc_tieu, children: children }
              })}
              onChange={this.onChange}
              placeholder="Chọn chuẩn đầu ra"
              displayRender={this.displayRender} />)}
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
    logReducer: state.logReducer
  };
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onAddDGData: addDGData,
    onChangeDGData: changeDGData,
    onSaveTempDGData: saveTempDGData,
    onGetChude: updateChudeDanhGia,
    onGetCDR: updateCDRDanhGia,
    onSaveLog : saveLog,
    onSaveReducer : saveLogObject
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(DGFormItem);