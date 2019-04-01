import React, { Component } from 'react';
import {
  Form, Input, Tooltip, Icon, Cascader, Select, Button, message
} from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeTNData, addTNData, saveTempTNData ,saveLoaiTaiNguyen} from '../../../Constant/ActionType';
import axios from 'axios';

var mota = '';
var link = '';
var loai ='';

class TNFormItem extends Component {
  constructor(props){
    super(props);
  }

  handleMotaChange = (value) => {
    mota = value.target.value;

    let tempInfo = this.props.itemLayout8Reducer.tempInfo;
    tempInfo["mota"] = mota;
    this.props.onSaveTempTNData(tempInfo);

  }
  handleLinkChange = (value) => {
    link = value.target.value;
    
    let tempInfo = this.props.itemLayout8Reducer.tempInfo;
    tempInfo["link"] = link;
   
    this.props.onSaveTempTNData(tempInfo);
  }

  handleLoaiChange = (value) => {
    loai = value[0];
  }

  async componentDidMount(){
    if(this.props.subjectId !== null && this.props.subjectId !== undefined && this.props.subjectId !== "" && this.props.itemLayout8Reducer.isLoaded === false){
      var self = this;
        await axios.get('/get-loaitainguyen')
        .then(function (response) {
            self.props.updateLoaitainguyen(response.data);
          })
         .catch(function (error) {
            console.log(error);
         });  
    }
  }

  addTNData = () => {

    if (loai === "" || loai === undefined) {
      message.error("Chưa chọn loại")
    } else {
      if (mota === "" || mota === undefined) {
        message.error("Chưa nhập mô tả");
      } else {
        let index = this.props.itemLayout8Reducer.previewInfo.length ;

        let data = {
          key: index,
          stt: index+1,
          loai: loai,
          mota: mota,
          link: link,
        }
        let newData = {};
        newData = this.props.itemLayout8Reducer.previewInfo.concat(data);
      
        this.props.onAddTNData(newData);

        message.info("Thêm thành công!");
        this.props.form.resetFields();

        let resetTemp = {
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
      <div style={{ border: "2px solid", borderRadius: "12px" }}>
        <div style={{ marginTop: "10px" }}></div>
        <Form onSubmit={this.addTNData}>
          <Form.Item
            {...formDynamicItemLayout}
            label={(
              <span>
                Loại tài nguyên
              </span>
            )}
          >
            <Cascader options={this.props.itemLayout8Reducer.loaitainguyenState.map(item => {
              return {value :item.loai,label : item.loai}
            })} onChange={this.handleLoaiChange} placeholder="Loại tài nguyên" />
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
    itemLayout8Reducer: state.itemLayout8Reducer,
    subjectId : state.subjectid,
  };
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onAddTNData: addTNData,
    onChangeTNData: changeTNData,
    onSaveTempTNData : saveTempTNData,
    updateLoaitainguyen: saveLoaiTaiNguyen,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(TNFormItem);