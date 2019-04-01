import React, { Component } from 'react';
import {
  Form, Select,
  Button, Checkbox,
  Input, message, Icon,
  Cascader
} from 'antd';
import { Link } from 'react-scroll';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeCDRData, addCDRData, selectedVerb, selectedCDRItem, mtmh, saveLog } from '../../../Constant/ActionType';
import './1.css';
import axios from 'axios';
import { getCurrTime } from '../../../utils/Time';

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
// const level_verb_data = [{
//   value: 'Knowledge',
//   label: 'Knowledge',
//   children: [
//     {
//       value: '1',
//       label: '1',
//       children: [
//           {
//             value: 'Đạt được',
//             label: 'Đạt được',
//           },
//           {
//             value: 'Phân biệt',
//             label: 'Phân biệt',
//           },
//           {
//             value: 'Biết được',
//             label: 'Biết được',
//           }
//         ]
//     },
//     {
//       value: '2',
//       label: '2',
//       children: [
//           {
//             value: 'Áp dụng',
//             label: 'Áp dụng',
//           },
//           {
//             value: 'Phân tích',
//             label: 'Phân tích',
//           },
//           {
//             value: '  ',
//             label: 'Tổng hợp',
//           }
//         ]
//     },
//     {
//       value: '3',
//       label: '3',
//       children: [
//           {
//             value: 'Có thể tự định nghĩa',
//             label: 'Có thể tự định nghĩa',
//           },
//           {
//             value: 'Hiểu được',
//             label: 'Hiểu được',
//           },
//           {
//             value: 'Phát biểu',
//             label: 'Phát biểu',
//           }
//         ]
//     },
//     {
//       value: '4',
//       label: '4',
//       children: [
//           {
//             value: 'Cấu hình',
//             label: 'Cấu hình',
//           },
//           {
//             value: 'Thiết lập',
//             label: 'Thiết lập',
//           },
//           {
//             value: 'Xây dựng',
//             label: 'Xây dựng',
//           }
//         ]
//     },
//     {
//       value: '5',
//       label: '5',
//       children: [
//           {
//             value: 'Sử dụng',
//             label: 'Sử dụng',
//           },
//           {
//             value: 'Viết được',
//             label: 'Viết được',
//           },
//           {
//             value: 'Có khả năng suy luận',
//             label: 'Có khả năng suy luận',
//           }
//         ]
//     }
//   ],
// }, {
//   value: 'Skill',
//   label: 'Skill',
//   children: [
//       {
//         value: '1',
//         label: '1',
//         children: [
//             {
//               value: 'Thành lập',
//               label: 'Thành lập',
//             },
//             {
//               value: 'Tổ chức',
//               label: 'Tổ chức',
//             },
//             {
//               value: 'Vận hành',
//               label: 'Vận hành',
//             }
//           ]
//       },
//       {
//         value: '2',
//         label: '2',
//         children: [
//           {
//             value: 'Giao tiếp',
//             label: 'Giao tiếp',
//           },
//           {
//             value: 'Quản lí',
//             label: 'Quản lí',
//           },
//           {
//             value: 'Giải quyết',
//             label: 'Giải quyết',
//           }
//         ]
//       },
//       {
//         value: '3',
//         label: '3',
//         children: [
//           {
//             value: 'Có khả năng nói',
//             label: 'Có khả năng nói',
//           },
//           {
//             value: 'Có khả năng thuyết trình',
//             label: 'Có khả năng thuyết trình',
//           },
//           {
//             value: 'Có thể đưa ra quyết định',
//             label: 'Có thể đưa ra quyết định',
//           }
//         ]
//       },
//       {
//         value: '4',
//         label: '4',
//         children: [
//           {
//             value: 'Xem xét',
//             label: 'Xem xét',
//           },
//           {
//             value: 'Xác định',
//             label: 'Xác định',
//           },
//           {
//             value: 'Tiến hành',
//             label: 'Tiến hành',
//           }
//         ]
//       },
//       {
//         value: '5',
//         label: '5',
//         children: [
//           {
//             value: 'Sắp xếp',
//             label: 'Sắp xếp',
//           },
//           {
//             value: 'Hợp tác',
//             label: 'Hợp tác',
//           },
//           {
//             value: 'Định lượng',
//             label: 'Định lượng',
//           }
//         ]
//       }
//     ],
// }, {
//   value: 'Attitude',
//   label: 'Attitude',
//   children: [
//       {
//         value: '1',
//         label: '1',
//         children: [
//             {
//               value: 'Có chừng mực',
//               label: 'Có chừng mực',
//             },
//             {
//               value: 'Hiểu biết',
//               label: 'Hiểu biết',
//             },
//             {
//               value: 'Hăng hái',
//               label: 'Hăng hái',
//             }
//           ]
//       },
//       {
//         value: '2',
//         label: '2',
//         children: [
//           {
//             value: 'Nhiệt tình',
//             label: 'Nhiệt tình',
//           },
//           {
//             value: 'Khéo léo',
//             label: 'Khéo léo',
//           },
//           {
//             value: 'Nhẹ nhàng',
//             label: 'Nhẹ nhàng',
//           }
//         ]
//       },
//       {
//         value: '3',
//         label: '3',
//         children: [
//           {
//             value: 'Trung thực',
//             label: 'Trung thực',
//           },
//           {
//             value: 'Kiên nhẫn',
//             label: 'Kiên nhẫn',
//           },
//           {
//             value: 'Khoáng đạt',
//             label: 'Khoáng đạt',
//           }
//         ]
//       },
//       {
//         value: '4',
//         label: '4',
//         children: [
//           {
//             value: 'Nghiêm túc',
//             label: 'Nghiêm túc',
//           },
//           {
//             value: 'Lạc quan',
//             label: 'Lạc quan',
//           },
//           {
//             value: 'Kỷ luật',
//             label: 'Kỷ luật',
//           }
//         ]
//       },
//       {
//         value: '5',
//         label: '5',
//         children: [
//           {
//             value: 'Tập trung',
//             label: 'Tập trung',
//           },
//           {
//             value: 'Nhất quán',
//             label: 'Nhất quán',
//           },
//           {
//             value: 'Tích cực',
//             label: 'Tích cực',
//           }
//         ]
//       }
//     ],
// }];


class CDRFormItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.subjectId,
      isLoaded: false
    }
  }

  displayRender = (label) => {
  if(this.props.cdrdata.level_verb[1] !== "" && this.props.cdrdata.level_verb[1] !== undefined){
    return this.props.cdrdata.level_verb[0] + " - Level " + this.props.cdrdata.level_verb[1];
  }
    return this.props.cdrdata.level_verb[0];
  }

  onChange = (value) => {
      const data = {
        level: value[0],
        childLevel: value[1],
        verb: value[value.length - 1]
      }    
      if(this.props.cdrdata.description === "" || this.props.cdrdata.description === undefined) {
        this.props.form.setFieldsValue({
          description: data.verb,
        });
      }
      
      this.props.onUpdateVerb(data);
      this.props.onChangeCDRData(
        {
          cdr: this.props.cdrdata.cdr,
          level_verb: [data.level, data.childLevel],
          description: this.props.cdrdata.description,
          levels: this.props.cdrdata.levels
        }
      )
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
        level_verb: this.props.cdrdata.level_verb,
        description: this.props.cdrdata.description,
        levels: this.props.cdrdata.levels
      }
    )
  }

  onDescriptionChange = (e) => {
    let a = e.target.value;

    if(a === "" || a === undefined) {
      const data = {
        level: "",
        childLevel: "",
        verb: ""
      }  
      this.props.onUpdateVerb(data);
      this.props.onChangeCDRData(
        {
          cdr: this.props.cdrdata.cdr,
          level_verb: [],
          description: a,
          levels: this.props.cdrdata.levels
        }
      )
    } else {
      this.props.onChangeCDRData(
        {
          cdr: this.props.cdrdata.cdr,
          level_verb: this.props.cdrdata.level_verb,
          description: a,
          levels: this.props.cdrdata.levels
        }
      )
    }
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
        level_verb: this.props.cdrdata.level_verb,
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
            for (let i = 0; i < this.props.cdrtable.previewInfo.length; i++) {
              if (this.props.cdrtable.previewInfo[i].cdr.split(".")[0] === this.props.cdrdata.cdr) {
                index = this.props.cdrtable.previewInfo[i].cdr.split(".")[1];
              }
            }
            index++;
            let uniqueKey = this.props.cdrtable.previewInfo.length + 1;
            let description = this.props.cdrdata.description;
            let level_verb = [this.props.cdrverb.level, this.props.cdrverb.childLevel.toString(), this.props.cdrverb.verb];
            var data = {
              key: `${uniqueKey}`,
              cdr: `${this.props.cdrdata.cdr}.${index}`,
              level_verb: level_verb,
              description: description,
              levels: this.props.cdrdata.levels
            }
            this.props.saveLog("Nguyen Van A", getCurrTime(), `Thêm chuẩn đầu ra môn học: ${data.cdr}, ${data.level_verb}, ${data.description}, ${data.levels}`, this.props.logReducer.contentTab, this.props.subjectId)
            var newData = this.props.cdrtable;            
            var previewInfo = this.props.cdrtable.previewInfo;
            newData.previewInfo = previewInfo.concat(data);
            
            this.props.onAddCDRData(newData);
            message.info("Thêm thành công!");
            this.props.onChangeCDRData({
              cdr: "",
              level_verb: [],
              description: "",
              levels: []
            });
            this.props.onUpdateVerb({level: "",childLevel: "", verb: ""});
            this.props.onSelectCDRItem([]);
            this.props.form.resetFields();
          }
        }
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({id: nextProps.subjectId})
    if(this.state.isLoaded === false && this.state.id !== null && this.state.id !== undefined && this.state.id !== ""){
      this.setState({isLoaded: true});
      var self = this;
      if(this.state.id !== "" && this.state.id !== undefined) {
        axios.post('/collect-mtmh', { data: {thong_tin_chung_id: this.state.id}})
        .then(function (response) {
            self.props.updateMtmh(response.data);
            
          })
         .catch(function (error) {
            console.log(error);
         });  
      }
    }
  }
  componentDidMount() {
    if(this.props.subjectId !== null && this.props.subjectId !== undefined && this.props.subjectId !== ""){
      var self = this;
      if(this.state.id !== "" && this.state.id !== undefined) {
        axios.post('/collect-mtmh', { data: {thong_tin_chung_id: this.props.subjectId}})
        .then(function (response) {
            self.props.updateMtmh(response.data);
            
          })
         .catch(function (error) {
            console.log(error);
         });  
      }
    }
  }

  render() {
    console.log(this.props.cdrmdhd);
    const { getFieldDecorator } = this.props.form;
    const CDROption = this.props.mtmh.map((key) => {
      return <Option key={key.id} value={key.muc_tieu}>{key.muc_tieu}</Option>
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
              initialValue: this.props.cdrdata.cdr
            })(
              <Select onChange={this.onCDRChange} placeholder="Chọn chuẩn đầu ra" >
                {CDROption}
              </Select>
            )}
          </Form.Item>

              <Form.Item {...formItemLayout} label="Chọn mức độ: ">
              {getFieldDecorator('cascader', {
              rules: [
                { required: true, message: 'Chọn mức độ' },
              ],
              initialValue: this.props.cdrdata.level_verb
            })(
              <Cascader
                  options={this.props.cdrmdhd}
                  expandTrigger="hover"
                  displayRender={this.displayRender}
                  onChange={this.onChange}
                  style={{width: "30%"}}
                />
            )}
                
              </Form.Item>
           

          <Form.Item {...formItemLayout} label="Mô tả (Mức chi tiết - hành động)">
            {getFieldDecorator('description',
            
              {
                rules: [{
                  required: true,
                  message: 'Mô tả không được rỗng',

                }],
                initialValue: this.props.cdrdata.description !== "" && this.props.cdrdata.description !== undefined ?
                this.props.cdrdata.description : this.props.cdrverb.verb
              })(
                <TextArea disabled={this.props.cdrverb.level === "" || this.props.cdrverb.level === undefined ? true : false} onChange={this.onDescriptionChange} rows={4} placeholder="Mô tả" />
              )}
          </Form.Item>

          <Form.Item {...formItemLayout} label="Mức độ (I/T/U)"
          >
            {getFieldDecorator("checkbox-group", {
              rules: [{
                required: true,
                message: 'Chọn ít nhất một',
              }],
              initialValue: this.props.cdrdata.levels
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
    cdrtable: state.itemLayout4Reducer,
    cdrverb: state.cdrverb,
    subjectId: state.subjectid,
    mtmh: state.mtmh,
    cdrmdhd: state.cdrmdhd,
    logReducer: state.logReducer
  };
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    onAddCDRData: addCDRData,
    onChangeCDRData: changeCDRData,
    onUpdateVerb: selectedVerb,
    onSelectCDRItem: selectedCDRItem,
    updateMtmh: mtmh,
    saveLog: saveLog
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(CDRFormItem);