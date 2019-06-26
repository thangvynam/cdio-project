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
import { changeCDRData, addCDRData, selectedVerb, selectedCDRItem, mtmh, saveLog, cdrmdhd, cdrmdhddb, saveLogObject } from '../../../Constant/ActionType';
import './1.css';
import { getCurrTime } from '../../../utils/Time';
import $ from "../../../helpers/services";

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

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      loadcdrmdhd: false
    }
  }

  displayRender = (label) => {
    if (this.props.cdrdata.level_verb[1] !== "" && this.props.cdrdata.level_verb[1] !== undefined) {
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
    if (this.props.cdrdata.description === "" || this.props.cdrdata.description === undefined) {
      this.props.form.setFieldsValue({
        description: data.verb,
      });
      this.props.onUpdateVerb(data);
      this.props.onChangeCDRData(
        {
          cdr: this.props.cdrdata.cdr,
          level_verb: [data.level, data.childLevel],
          description: data.verb,
          levels: this.props.cdrdata.levels
        }
      )
    }
    else {
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
    console.log("a");
    let a = e.target.value;

    if (a === "" || a === undefined) {
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
      if (this.props.cdrverb.level === "" || this.props.cdrverb.level === undefined ||
        this.props.cdrverb.verb === "" || this.props.cdrverb.verb === undefined) {
        message.info("Chọn mức độ và động từ!")
      }
      else {
        console.log("mo ta" + this.props.cdrdata.description)
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
              levels: this.props.cdrdata.levels,
              id: -1,
              del_flag: 0
            }
            var newData = this.props.cdrtable;
            var previewInfo = this.props.cdrtable.previewInfo;
            newData.previewInfo = previewInfo.concat(data);

            this.props.onSaveLog(`${JSON.parse(localStorage.getItem('user')).data.Name}`, getCurrTime(), `Thêm chuẩn đầu ra môn học: Chuẩn đầu ra : ${data.cdr}, Mức độ đạt được : ${data.level_verb}, Mô tả : ${data.description}, Mức độ (I/T/U) : ${data.levels}`, this.props.logReducer.contentTab, this.props.monhoc, this.props.ctdt)
            this.props.onSaveReducer(`${JSON.parse(localStorage.getItem('user')).data.Name}`, getCurrTime(), `Thêm chuẩn đầu ra môn học: Chuẩn đầu ra : ${data.cdr}, Mức độ đạt được : ${data.level_verb}, Mô tả : ${data.description}, Mức độ (I/T/U) : ${data.levels}`, this.props.logReducer.contentTab, this.props.monhoc)

            this.props.onAddCDRData(newData);
            message.info("Thêm thành công!");
            this.props.onChangeCDRData({
              cdr: "",
              level_verb: [],
              description: "",
              levels: []
            });
            this.props.onUpdateVerb({ level: "", childLevel: "", verb: "" });
            this.props.onSelectCDRItem([]);
            this.props.form.resetFields();
          }
        }
      }
    }
  }

  getCdrmdhd = (self) => {
    $.collectCdrmdhd4()
      .then(function (response) {
        let cdrmdhd = [];
        for (let i = 0; i < response.data.length; i++) {
          let index_1 = self.checkLevel_1_Exist(response.data[i].muc_do_1, cdrmdhd);
          if (index_1 != -1) {
            let index_2 = self.checkLevel_2_Exist(response.data[i].muc_do_2, cdrmdhd[index_1].children);
            if (index_2 != -1) {
              cdrmdhd[index_1].children[index_2].children.push({
                value: response.data[i].muc_do_3,
                label: response.data[i].muc_do_3
              })
            }
            else {
              cdrmdhd[index_1].children.push({
                value: response.data[i].muc_do_2,
                label: response.data[i].muc_do_2,
                children: [{
                  value: response.data[i].muc_do_3,
                  label: response.data[i].muc_do_3
                }]
              })
            }
          }
          else {
            cdrmdhd.push({
              value: response.data[i].muc_do_1,
              label: response.data[i].muc_do_1,
              children: [{
                value: response.data[i].muc_do_2,
                label: response.data[i].muc_do_2,
                children: [{
                  value: response.data[i].muc_do_3,
                  label: response.data[i].muc_do_3
                }]
              }]
            })
          }
        }
        self.props.updateCdrmdhdDB(response.data);
        self.props.updateCdrmdhd(cdrmdhd);

      })
      .catch(function (error) {
        console.log(error);
      });
  }
  componentWillReceiveProps(nextProps) {

    if (this.state.isLoaded === false) {
      this.setState({ isLoaded: true });
      var self = this;
      $.collectMtmh({ data: { thong_tin_chung_id: this.props.monhoc, idCtdt: this.props.ctdt } })
        .then(function (response) {
          console.log(response.data)
          self.props.updateMtmh(response.data);

        })
        .catch(function (error) {
          console.log(error);
        });
      self.getCdrmdhd(self);
        
    }
  }

  checkLevel_1_Exist = (level_1, cdrmdhd) => {
    for (let i = 0; i < cdrmdhd.length; i++) {
      if (cdrmdhd[i].value === level_1) {
        return i;
      }
    }
    return -1;
  }

  checkLevel_2_Exist = (level_2, level_1_children) => {
    for (let i = 0; i < level_1_children.length; i++) {
      if (level_1_children[i].value === level_2) {
        return i;
      }
    }
    return -1;
  }

  componentDidMount() {
    var self = this;
    $.collectMtmh({ data: { thong_tin_chung_id: this.props.monhoc, idCtdt: this.props.ctdt } })
      .then(function (response) {
        console.log(response.data)
        self.props.updateMtmh(response.data);

      })
      .catch(function (error) {
        console.log(error);
      });
      self.getCdrmdhd(self);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    let CDROption = [];
    if (this.props.mtmh.length > 0) {
      CDROption = this.props.mtmh.map((key) => {
        return <Option key={key.id} value={key.muc_tieu}>{key.muc_tieu}</Option>
      });
    }
    return (
      <div >
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
                style={{ width: "30%" }}
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
                <TextArea disabled={this.props.cdrverb.level === "" || this.props.cdrverb.level === undefined ? true : false}
                  onChange={this.onDescriptionChange} rows={4} placeholder="Mô tả" />
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
              <Button type="primary" style={{ marginLeft: "15%" }} onClick={this.addCDRData}>
              Thêm<Icon type="right" />
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
    updateCdrmdhd: cdrmdhd,
    updateCdrmdhdDB: cdrmdhddb,
    onSaveLog: saveLog,
    onSaveReducer: saveLogObject
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(CDRFormItem);