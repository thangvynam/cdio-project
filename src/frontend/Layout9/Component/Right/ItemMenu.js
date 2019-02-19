import React, { Component } from "react";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Button,
  message
} from "antd";
import { Link } from "react-scroll";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { AddItemRule } from "../../../Constant/ActionType";
import { bindActionCreators } from "redux";
import TextArea from 'antd/lib/input/TextArea';


class ItemMenu extends Component {

    constructor(props){
      super(props);
      this.state = {
        index: 3,
        content: '',
      
      }
    }
  
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
    let content = this.state.content;
    if(content.length===0){
      message.error("Vui lòng điền nội dung quy định", 0.75);
      return;
    }
    let rule = {
      index: this.state.index,
      content: content,
    }
    this.state.index = this.state.index + 1;

    this.props.onAddItemRule(JSON.stringify(rule));
    this.props.nextStep();
    this.props.form.resetFields();
  }
  handleContentChange = e => {
    this.state.content = e.target.value;
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
        <Form onSubmit={this.handleSubmit}>
          <Form.Item {...formItemLayout} label="Nội dung">
            {getFieldDecorator("name", {
              rules: [
                {
                  required: true,
                  message: "Vui lòng nhập nội dung"
                }
              ]
            })(<TextArea onChange={this.handleContentChange} />)}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <div>
              {this.renderBackButton()}
              <Button
                type="primary"
                onClick={() => {
                  this.handleSubmit();
                }}
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

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      onAddItemRule: AddItemRule
    },
    dispatch
  );
};
export default connect(
  null,
  mapDispatchToProps
)(ItemMenu);
