import React, { Component } from 'react';
import {
    Form, Input, Tooltip, Icon, Cascader, Select, Button, message
} from 'antd';
import { Link } from 'react-scroll';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { ADD_DATA } from '../../../Constant/ActionType';

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
const myObj = {
    titleName: '',
    teachingActs: '',
    standardOutput: '',
    evalActs: ''
};
let temp = [];
let titleName = '';
class ItemMenu extends Component {
    state = {
        standardSelectedItem: [],
        previewInfo: []
    }
    onChange = (value) => {
        var newArray = this.state.standardSelectedItem.slice();
        newArray.push(value[0] + value[1]);
        this.setState({ standardSelectedItem: newArray });
        temp = newArray;
    }
    toString = () => {
        let temp = '';
        for (let i = 0; i < this.state.standardSelectedItem.length; i++) {
                temp += this.state.standardSelectedItem[i] + ' , ';
        }
        return temp.replace('NaN','');
    }
    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }
    renderBackButton() {
        if (this.props.step !== 0) {
            return (
                <Link activeClass="active" className="test1" to="test1" spy={true} smooth={true} duration={500} ><Button type="danger">Finish</Button></Link>
            )
        }
        return null;
    }
    handleInputChange = (e) => {
        titleName = e.target.value;
    }
    render() {
        const { getFieldDecorator } = this.props.form;

        const childrenTeachingActs = [];
        const childrenEvalActs = [];
        function init() {
            for (let i = 0; i < teachingActs.length; i++) {
                childrenTeachingActs.push(<Option key={teachingActs[i]}>{teachingActs[i]}</Option>)
            }
            for (let i = 0; i < evalActs.length; i++) {
                childrenEvalActs.push(<Option key={evalActs[i]}>{evalActs[i]}</Option>)
            }
        }

        init();
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
            <div style={{ border: "2px solid", borderRadius: "12px" }}>
                <div style={{ marginTop: "10px" }}></div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item
                        {...formItemLayout}
                        label="Tên chủ đề"
                    >
                        {getFieldDecorator('name', {
                            rules: [ {
                                required: true, message: 'Vui lòng nhập tên chủ đề',
                            }],
                        })(
                            <Input onChange={this.handleInputChange} />
                        )}
                        
                    </Form.Item>

                    <Form.Item
                        {...formItemLayout}
                        label="Hoạt động dạy"
                    >
                        <Select
                            mode="tags"
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            defaultValue={['Thuyết giảng', 'Thảo luận và thể hiện trên bảng']}
                            onChange={(value) => this.props.handleChangeTeachingAct(value)}
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
                        <Cascader options={standard_item} onChange={this.onChange} placeholder="Chọn chuẩn đầu ra" />
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
                            mode="tags"
                            style={{ width: '100%' }}
                            placeholder="Please select"
                            defaultValue={['BTVN', 'DAMH']}
                            onChange={(value) => this.props.handleChangeEvalActs(value)}
                        >
                            {childrenEvalActs}
                        </Select>
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <div>
                            {this.renderBackButton()}
                            <Button type="primary" onClick={() => { this.props.saveAndContinue() }} style={{ marginLeft: "2em" }}>
                                Continue<Icon type="right" />
                            </Button>
                            <br/>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    
    let teachingActs = ['Thuyết giảng', 'Thảo luận và thể hiện trên bảng'];
    let evalActs = ['BTVN', 'DAMH'];
    return {
        handleChangeTeachingAct: (value) => {
            teachingActs = value;
            
        },
        handleChangeEvalActs: (value) => {
            evalActs = value;
        },
        saveAndContinue: () => {
            myObj.titleName = titleName;
            myObj.teachingActs = teachingActs;
            myObj.evalActs = evalActs;
            myObj.standardOutput = temp;

            if (titleName === '' || temp.length === 0) {
                message.error("Vui lòng điền đầy đủ thông tin");
            }
            else {
                const myObjStr = JSON.stringify(myObj);
                //reset
                teachingActs = ['Thuyết giảng', 'Thảo luận và thể hiện trên bảng'];
                evalActs = ['BTVN', 'DAMH'];
                titleName = '';
                dispatch({ type: ADD_DATA, item: myObjStr });
                ownProps.form.resetFields();
                ownProps.nextStep();      
            }
            temp.splice(0, temp.length);
        },
    }
}
export default connect(null, mapDispatchToProps)(ItemMenu);