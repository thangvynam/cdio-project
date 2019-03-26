import React, { Component } from 'react';
import {
  Form, Input, Tooltip, Icon, Cascader, Select, Button, message
} from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeTNData, addTNData, saveTempTNData ,getLoaiTaiNguyen} from '../../../Constant/ActionType';
import axios from 'axios';

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
  constructor(props){
    super(props);
    this.state = {
        isLoad: false,
        loaitainguyen: ''
    }
  }

  handleMotaChange = (value) => {
    let a = value.target.value;
    this.props.onChangeTNData({
      stt: this.props.tndata.stt,
      loai: this.props.tndata.loai,
      mota: a,
      link: this.props.tndata.link,
    })
    
    let tempInfo = this.props.tntable.tempInfo;
    tempInfo["mota"] = a;
   
    this.props.onSaveTempTNData(tempInfo);

  }
  handleLinkChange = (value) => {
    let a = value.target.value;
    this.props.onChangeTNData({
      stt: this.props.tndata.stt,
      loai: this.props.tndata.loai,
      mota: this.props.tndata.mota,
      link: a,
    })
    
    let tempInfo = this.props.tntable.tempInfo;
    tempInfo["link"] = a;
   
    this.props.onSaveTempTNData(tempInfo);
  }

  handleLoaiChange = (value) => {
    this.props.onChangeTNData({
      stt: this.props.tndata.stt,
      loai: value[0],
      mota: this.props.tndata.mota,
      link: this.props.tndata.link,
    })
  }

  componentWillReceiveProps(nextProps) {
    if(this.state.isLoad === false ){
      this.setState= {
        isLoad : true
      }
      var self = this;
      
        console.log("vo duoc roi")
        axios.get('/get-loaitainguyen')
        .then(function (response) {
            self.props.updateLoaitainguyen(response.data);
          })
         .catch(function (error) {
            console.log(error);
         });  
      }
      console.log(this.props.loaitainguyen)
  }

  componentDidMount(){
    if(this.props.subjectId !== null && this.props.subjectId !== undefined && this.props.subjectId !== ""){
      var self = this;
     
        axios.get('/get-loaitainguyen')
        .then(function (response) {
            self.props.updateLoaitainguyen(response.data);
            
          })
         .catch(function (error) {
            console.log(error);
         });  
      
    }
  }

  onGetLoaiTaiNguyen = () => {
    let array = [];
    var x  = this;
    axios.get("/get-loaitainguyen").then(response => {
      const data = response.data;
      data.forEach((item, index) => {
        let temp = item.loai;
        array.push(temp);
      });
      x.setState = {
        loaitainguyen : "Set duoc roi",
      }
    }
    )
  }


  addTNData = () => {

    if (this.props.tndata.loai === "" || this.props.tndata.loai === undefined) {
      message.error("Chưa chọn loại")
    } else {
      if (this.props.tndata.mota === "" || this.props.tndata.mota === undefined) {
        message.error("Chưa nhập mô tả");
      } else {
        let index = this.props.tntable.previewInfo.length + 1;

        let data = {
          key: index,
          stt: index,
          loai: this.props.tndata.loai,
          mota: this.props.tndata.mota,
          link: this.props.tndata.link,
        }
        let newData = {previewInfo : [],tempInfo:{}};
        newData.previewInfo = this.props.tntable.previewInfo.concat(data);
        newData.tempInfo = {
          mota: '',
          link: '',
        }
        this.props.onAddTNData(newData);
        message.info("Thêm thành công!");
        this.props.form.resetFields();
         this.props.tndata.link = '';
         this.props.tndata.mota = '';
        let resetTemp = {
          mota : '',
          link : ''
        }
        this.props.onSaveTempTNData(resetTemp);

      }
    }
  }

  render() {
    // if( this.state.loaitainguyen.length === 0) return false;
    
    console.log(this.props.loaitainguyen);
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
    console.log(this.state.loaitainguyen)

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
              initialValue: this.props.tntable.tempInfo.mota

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
              initialValue: this.props.tntable.tempInfo.link

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
    tntable: state.itemLayout8Reducer,
    subjectId : state.subjectid,
    loaitainguyen: state.loaiTaiNguyenReducer
  };
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onAddTNData: addTNData,
    onChangeTNData: changeTNData,
    onSaveTempTNData : saveTempTNData,
    updateLoaitainguyen: getLoaiTaiNguyen,
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(TNFormItem);