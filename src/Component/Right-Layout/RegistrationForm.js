import React, { Component } from 'react';
import {
  Form, Input, Tooltip, Icon, Cascader, Select, Button
} from 'antd';
import 'antd/dist/antd.css';

const { Option } = Select;
const standard_item = [{
  value: 'G1',
  label: 'G1',
  children: [{
    value: '.1',
    label: '.1',
  },
  {
    value: '.2',
    label: '.2',
  },
  {
    value: '.3',
    label: '.3',
  }],
},
{
  value: 'G2',
  label: 'G2',
  children: [{
    value: '.1',
    label: '.1',
  },
  {
    value: '.2',
    label: '.2',
  }],
},
{
  value: 'G3',
  label: 'G3',
  children: [{
    value: '.1',
    label: '.1',
  },
  {
    value: '.2',
    label: '.2',
  },
  {
    value: '.3',
    label: '.3',
  },
  {
    value: '.4',
    label: '.4',
  }],
},
{
  value: 'G4',
  label: 'G4',
  children: [{
    value: '.1',
    label: '.1',
  }]
},
{
  value: 'G5',
  label: 'G5',
  children: [{
    value: '.1',
    label: '.1',
  },
  {
    value: '.2',
    label: '.2',
  },
  {
    value: '.3',
    label: '.3',
  },
  {
    value: '.4',
    label: '.4',
  },
  {
    value: '.5',
    label: '.5',
  }],
},
{
  value: 'G6',
  label: 'G6',
  children: [{
    value: '.1',
    label: '.1',
  }]
},
{
  value: 'G7',
  label: 'G7',
  children: [{
    value: '.1',
    label: '.1',
  }]
},
];
const teachingActs = [
  'Thuyết giảng',
  'Phân nhóm & chơi trò chơi',
  'Thảo luận nhóm',
  'Phân nhóm đồ án',
  'Thảo luận và thể hiện trên bảng',
  'Trò chơi nhập vai',
  'Nhóm thảo luận & thiết kế 1 màn hình',
  'Làm bài tập tạo test case',
  'Trò chơi',
];
const evalActs = [
  'BTVN',
  'BTTL',
  'DAMH',
  'Bài đọc thêm và viết báo cáo',
]
class RegistrationForm extends Component {
  state = {
    standardSelectedItem : [],
   
  }
  
  onChange = (value) => {
    var newArray = this.state.standardSelectedItem.slice();    
    newArray.push(value[0]+value[1]);   
    this.setState({standardSelectedItem:newArray}); 
  }
  toString = () => {
    let temp = '';
    for(let i = 0 ; i < this.state.standardSelectedItem.length ; i++){
      temp += this.state.standardSelectedItem[i] + ' , ';
    }
    console.log(temp);
    return temp ;
  }

  render() {
    const childrenTeachingActs = [];
    const childrenEvalActs = [];

    function handleChange(value) {
      console.log(`selected ${value}`);
    }

    function init() {
      for (let i = 0; i < teachingActs.length; i++) {
        childrenTeachingActs.push(<Option key={teachingActs[i]}>{teachingActs[i]}</Option>)
      }
      for (let i = 0; i < evalActs.length; i++) {
        childrenEvalActs.push(<Option key={evalActs[i]}>{evalActs[i]}</Option>)
      }
    }

    init();
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const formDynamicItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 3  },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item
            {...formItemLayout}
            label="Tên chủ đề"
          >
            {getFieldDecorator('topic_name', {
              rules: [{ required: true, message: 'Vui lòng nhập tên chủ đề', whitespace: true }],
            })(
              <Input />
            )}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Hoạt động dạy"
          >
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Please select"
              defaultValue={['Thuyết giảng', 'Thảo luận và thể hiện trên bảng']}
              onChange={handleChange}
            >
              {childrenTeachingActs}
            </Select>
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
          >
            {getFieldDecorator('standard_output', {
              initialValue: ['G1', '.1'],
              rules: [{ type: 'array', required: true, message: 'Vui lòng chọn ít nhất 1 chuẩn đầu ra' }],
            })(
             
                <Cascader options={standard_item} onChange={this.onChange} />
            )}
             
          </Form.Item>

          <Form.Item
             {...formItemLayout}
             label="Kết quả chuẩn đầu ra"
             >
             <Input disabled value={this.toString()} />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Hoạt động đánh giá"
          >
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Please select"
              defaultValue={['BTVN', 'DAMH']}
              onChange={handleChange}
            >
              {childrenEvalActs}
            </Select>
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">Register</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default RegistrationForm;