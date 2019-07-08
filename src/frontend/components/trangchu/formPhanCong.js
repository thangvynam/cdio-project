import React, { Component } from 'react';
import {
  Form, Button, message, Row, Col,
  Select,  notification, DatePicker, Tooltip
} from 'antd';
import $ from "./../../helpers/services";

const openNotificationWithIcon = (type) => {
  notification[type]({
    message: 'Thông báo',
    description: 'Đã phân công',
  });
};

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const formItemLayout = {
  labelCol: {
    xs: { span: 12 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 16 },
    sm: { span: 14 },
  },
};
const Option = Select.Option;

class FormPhanCong extends Component {

  state = {
    subjectSelect: "",
    teacherSelect: [],
    dateString: [],
  };


  onDateChange = (date, dateString) => {
    console.log(dateString);
    //console.log(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate())

    this.setState({ dateString: dateString })
  }

  onChange = (key, value) => {
    console.log(value.key)
    this.setState({ subjectSelect: value.key })
  }

  handleChange = (key, value) => {
    let teacherSelect = [];
    for (let i in value) {
      console.log(value[i].key);
      teacherSelect.push(value[i].key)
    }
    this.setState({ teacherSelect: teacherSelect })
  }

  phanCong = () => {
    if (this.props.form.getFieldValue("subject") === ""
      || this.props.form.getFieldValue("subject") === undefined
      || this.props.form.getFieldValue("subject") === null) {
      message.warning("Chưa chọn môn học!");
    }
    else if (!this.props.form.getFieldValue("list")
      || this.props.form.getFieldValue("list").length <= 0) {
      message.warning("Chưa chọn giáo viên!");
    }
    else if (!this.props.form.getFieldValue("time")
      || this.props.form.getFieldValue("time").length !== 2) {
      message.warning("Chưa chọn thời hạn!");
    }
    else {
      let dateString = this.state.dateString;
      let teacherSelect = this.state.teacherSelect;
      let subjectSelect = this.state.subjectSelect;

      $.addTeacherReview({ idCtdt: this.props.idCtdt, idTeacher: teacherSelect, dateRange: dateString, idTTC: subjectSelect })
        .then(res => {
          this.props.loadTable();
          this.setState({ subjectSelect: "" });
          this.setState({ teacherSelect: [] });
          this.setState({ dateString: [] });
          openNotificationWithIcon('success');
          this.props.form.resetFields();
        });

    }

  }

  render() {
    const { getFieldDecorator } = this.props.form;
    let subjectList = this.props.subjectList;
    let teacherList = this.props.teacherList;

    let subjectOptions = [];
    for (let i in subjectList) {
      subjectOptions.push(<Option key={subjectList[i].Id}><Tooltip title={subjectList[i].SubjectName}>{subjectList[i].SubjectName}</Tooltip></Option>)
    }

    let teacherOptions = [];
    for (let i in teacherList) {
      teacherOptions.push(<Option key={teacherList[i].id}><Tooltip title={teacherList[i].name}>{teacherList[i].name}</Tooltip></Option>)
    }

    return (<Row>
      <Col span={6}>
        <Form.Item
          {...formItemLayout}
          label="Môn học"
        >
          {getFieldDecorator('subject', {
            rules: [{ required: true, message: 'Chọn một môn học!' }],
          })(<Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Chọn môn học"
            optionFilterProp="children"
            onChange={this.onChange}
            filterOption={(input, option) =>

              option.props.children.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {subjectOptions}
          </Select>)}

        </Form.Item>
      </Col>
      <Col span={6}>
        <Form.Item
          {...formItemLayout}
          label="Giáo viên"
        >
          {getFieldDecorator('list', {
            rules: [{ required: true, message: 'Chưa chọn giáo viên!' }],
          })(<Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Chọn giáo viên"
            onChange={this.handleChange}
            filterOption={(input, option) =>

              option.props.children.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {teacherOptions}
          </Select>)}

        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          {...formItemLayout}
          label="Thời hạn"
        >
          {getFieldDecorator('time', {
            rules: [{ required: true, message: 'Chưa chọn thời hạn!' }],
          })(<RangePicker
            onChange={this.onDateChange}
            format={dateFormat}
            style={{ width: '100%' }}
          />)}
        </Form.Item>
      </Col>
      <Col span={2}>
        <Form.Item>
          <Button onClick={this.phanCong} type="primary" >Phân công</Button>
        </Form.Item>
      </Col>
    </Row>)
  }
}

export default FormPhanCong;
