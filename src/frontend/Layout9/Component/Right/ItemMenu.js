import React, { Component } from "react";
import { Form, Icon, Button, message } from "antd";
import { Link } from "react-scroll";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { addItemRule, changeTempRules,saveLog,saveLogObject } from "../../../Constant/ActionType";
import { bindActionCreators } from "redux";
import TextArea from "antd/lib/input/TextArea";
import { getCurrTime } from '../../../utils/Time';

class ItemMenu extends Component {
 

 
  handleSubmit = () => {
    let content = this.props.itemRule.tempInfo.content;
    if (content.length === 0) {
      message.error("Vui lòng điền nội dung quy định", 0.75);
      return;
    }
    let rule = {
      id:-1,
      content: content,
      del_flag:0,
    };
    this.props.onSaveLog("Nguyen Van A", getCurrTime(), `Thêm quy định chung: ${rule.content}`, this.props.logReducer.contentTab, this.props.subjectId)
    this.props.onSaveReducer("Nguyen Van A", getCurrTime(), `Thêm quy định chung: ${rule.content}`, this.props.logReducer.contentTab, this.props.subjectId)
    
    this.props.onAddItemRule(JSON.stringify(rule));
    this.props.nextStep();
    this.props.form.resetFields();
    let temp = {
      content: ''
    }
    this.props.onChangeTempRule(temp);
  };
  handleContentChange = e => {
    let temp = {
      content: e.target.value,
    }
    this.props.onChangeTempRule(temp);
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    return (
      <div>
        <div style={{ marginTop: "10px" }} />
        <Form>
          <Form.Item {...formItemLayout} label="Nội dung">
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "Vui lòng nhập nội dung"
                },
              ],
              initialValue: this.props.itemRule.tempInfo.content
            })(<TextArea onChange={this.handleContentChange}/>)}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <div>
              <Button
                type="primary"
                onClick={this.handleSubmit}
                style={{ marginLeft: "15%" }}
              >
                Thêm
                <Icon type="plus" />
              </Button>
              <br />
            </div>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    itemRule: state.itemLayout9Reducer,
    subjectId : state.subjectid,
    logReducer: state.logReducer

  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      onAddItemRule: addItemRule,
      onChangeTempRule: changeTempRules,
      onSaveLog : saveLog,
      onSaveReducer : saveLogObject
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemMenu);
