import React, { Component } from 'react';
import {
  Form, Input, Tooltip, Icon, Cascader, Select, Button, message
} from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeTNData, addTNData, saveTempTNData ,saveLoaiTaiNguyen, saveLog,saveLogObject} from '../../../Constant/ActionType';
import { getCurrTime } from '../../../utils/Time';
import $ from './../../../helpers/services';


class TNFormItem extends Component {
  constructor(props){
    super(props);
  }

  handleMotaChange = (value) => {
    let a = value.target.value;

    let tempInfo = this.props.itemLayout8Reducer.tempInfo;
    tempInfo["mota"] = a;
    this.props.onSaveTempTNData(tempInfo);

  }
  handleLinkChange = (value) => {
    let a = value.target.value;
    
    let tempInfo = this.props.itemLayout8Reducer.tempInfo;
    tempInfo["link"] = a;
   
    this.props.onSaveTempTNData(tempInfo);
  }

  handleLoaiChange = (value) => {
    let a = [];
    let tempInfo = this.props.itemLayout8Reducer.tempInfo;
    a[0] = value[0];
    tempInfo["loai"] = a;
    this.props.onSaveTempTNData(tempInfo);
  }

  async componentDidMount(){
    if(this.props.monhoc !== null && this.props.monhoc !== undefined && this.props.monhoc !== "" && this.props.itemLayout8Reducer.isLoaded === false){
      var self = this;
        await $.getLoaiTaiNguyen()
        .then(function (response) {
            self.props.updateLoaitainguyen(response.data);
          })
         .catch(function (error) {
            console.log(error);
         });  
    }
  }

  addTNData = () => {

    if (this.props.itemLayout8Reducer.tempInfo.loai === "" || this.props.itemLayout8Reducer.tempInfo.loai === undefined) {
      message.error("Chưa chọn loại")
    } else {
      if (this.props.itemLayout8Reducer.tempInfo.mota === "" || this.props.itemLayout8Reducer.tempInfo.mota === undefined) {
        message.error("Chưa nhập mô tả");
      } else {
        let index = this.props.itemLayout8Reducer.previewInfo.length ;

        let data = {
          key: index,
          stt: index+1,
          loai: this.props.itemLayout8Reducer.tempInfo.loai[0],
          mota: this.props.itemLayout8Reducer.tempInfo.mota,
          link: this.props.itemLayout8Reducer.tempInfo.link,
          id : -1,
          del_flag : 0,
        }
        let newData = {};
        newData = this.props.itemLayout8Reducer.previewInfo.concat(data);

        this.props.onSaveLog(`${JSON.parse(localStorage.getItem('user')).data.Name}`, getCurrTime(), `Thêm tài nguyên môn học: Loại : ${data.loai}, Mô tả : ${data.mota}, Link liên kết : ${data.link}`, this.props.logReducer.contentTab, this.props.monhoc)
        this.props.onSaveReducer(`${JSON.parse(localStorage.getItem('user')).data.Name}`, getCurrTime(), `Thêm tài nguyên môn học: Loại : ${data.loai}, Mô tả : ${data.mota}, Link liên kết : ${data.link}`, this.props.logReducer.contentTab, this.props.monhoc)
        
        this.props.onAddTNData(newData);

        message.info("Thêm thành công!");
        this.props.form.resetFields();

        let resetTemp = {
          loai: '',
          mota : '',
          link : ''
        }
        this.props.onSaveTempTNData(resetTemp);

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
      <div>
        <div style={{ marginTop: "10px" }}></div>
        <Form onSubmit={this.addTNData}>
          <Form.Item
            {...formDynamicItemLayout}
            label={(
              <span>
                Loại tài nguyên
              </span>
            )}
          >{getFieldDecorator('cascader', {
            rules: [
              { required: true, message: 'Chọn chủ đề' },
            ],
            initialValue: this.props.itemLayout8Reducer.tempInfo.loai
          })
            (<Cascader options={this.props.itemLayout8Reducer.loaitainguyen.map(item => {
              return {value :item.loai,label : item.loai}
            })} onChange={this.handleLoaiChange} placeholder="Loại tài nguyên" />)}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Mô tả"
          >
            {getFieldDecorator('mota', {
              rules: [{
                required: true, message: 'Vui lòng nhập mô tả',
              }],
              initialValue: this.props.itemLayout8Reducer.tempInfo.mota

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
              initialValue: this.props.itemLayout8Reducer.tempInfo.link

            })(
              <Input onChange={this.handleLinkChange} />
            )}

          </Form.Item>
          <Form.Item wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
          }}>
            <div style={{marginLeft:"15%"}}>
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
    itemLayout8Reducer: state.itemLayout8Reducer,
    logReducer: state.logReducer

  };
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onAddTNData: addTNData,
    onChangeTNData: changeTNData,
    onSaveTempTNData : saveTempTNData,
    updateLoaitainguyen: saveLoaiTaiNguyen,
    onSaveLog : saveLog,
    onSaveReducer : saveLogObject
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(TNFormItem);