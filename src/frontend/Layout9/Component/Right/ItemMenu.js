import React, { Component } from "react";
import { Form, Icon, Button, message } from "antd";
import { Link } from "react-scroll";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { addItemRule, changeTempRules } from "../../../Constant/ActionType";
import { bindActionCreators } from "redux";
import TextArea from "antd/lib/input/TextArea";

class ItemMenu extends Component {
 

  renderBackButton() {
    if (this.props.step !== 0) {
      return (
        <Link
          activeClass="active"
          className="test1"
          to="test1"
          spy={true}
          smooth={true}
          duration={500}
        >
          <Button type="danger">Finish</Button>
        </Link>
      );
    }
    return null;
  }
  handleSubmit = () => {
    let content = this.props.itemRule.tempInfo.content;
    if (content.length === 0) {
      message.error("Vui lòng điền nội dung quy định", 0.75);
      return;
    }
    let rule = {
      content: content
    };

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
      <div style={{ border: "2px solid", borderRadius: "12px" }}>
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
              {this.renderBackButton()}
              <Button
                type="primary"
                onClick={this.handleSubmit}
                style={{ marginLeft: "2em" }}
              >
                Continue
                <Icon type="right" />
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
    itemRule: state.itemLayout9Reducer
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      onAddItemRule: addItemRule,
      onChangeTempRule: changeTempRules,
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemMenu);
