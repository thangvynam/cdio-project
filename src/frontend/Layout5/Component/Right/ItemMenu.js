import React, { Component } from 'react';
import {
    Form, Input, Tooltip, Icon, Cascader, Select, Button, message
} from 'antd';
import { Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { ADD_DATA, CHANGE_DATA, COLLECT_DATA_HDD,COLLECT_DATA_DG} from '../../../Constant/ActionType';
import axios from 'axios';
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
// const evalActs = [
//     'BTVN',
//     'BTTL',
//     'DAMH',
//     'Bài đọc thêm và viết báo cáo',
// ]
let myObj = {
    titleName: '',
    teachingActs: '',
    standardOutput: '',
    evalActs: ''
};
let titleName = '';
let isSubmit = false;
let teachingActs_data = [];
let standardOutput_data = [];
let evalActs_data = [];
let firstCollect = false;


class ItemMenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            standardSelectedItem: [],
            previewInfo: [],
            redirectTab7: false
        }
       
    }
    componentDidMount() {
        if(!firstCollect){
            firstCollect = true;
            this.props.collectDataRequest();
        }
    }

    componentWillMount(){
        this.getDataHDD();
    }

    getDataHDD = () =>{
        let mapId = {
            teachingActs: new Map(),
            standardOutput: new Map(),
            evalActs: new Map(),
        }
        axios.get("/get-teachingacts-5").then(response=>{
            const data= response.data;
            let map = new Map();
            data.forEach((item,index)=>{
               
                map.set(item.hoat_dong,index);
            })
            //this.setState({teachingActs:map});
            mapId.teachingActs = map;
            this.props.saveDataValue(mapId.teachingActs)
        });

        axios.get("/get-evalact-5").then(response=>{
            const data= response.data;
            let map = new Map();

            data.forEach((item,index)=>{
                map.set(index,item.ma);
            })
            
            mapId.evalActs = map;
            
            this.props.saveDataValueDG(mapId.evalActs)
        })
          
    }
    displayRender = label => {
        
        if (isSubmit) {
          isSubmit = false;
          return null;
        }
        if (label.length > 0) return label[0] + label[1];
      }; 
    onChange = (value) => {

        if (value.length === 0) return;

        var newArray = this.state.standardSelectedItem.slice();
        let item = value[0] + value[1];
        let flag = true;

        for (let i = 0; i < newArray.length; i++) {
            if (newArray[i] === item) {
                newArray.splice(i, 1);
                flag = false;
            }
        }

        if (flag) newArray.push(item);

        this.setState({ standardSelectedItem: newArray });
        
        standardOutput_data = newArray;
        console.log(standardOutput_data);
        this.props.onChangeData(titleName, teachingActs_data, standardOutput_data, evalActs_data);

    }
    toString = () => {
        
        let temp = '';
        for (let i = 0; i < this.props.itemLayout5Reducer.standardOutput.length; i++) {
            temp += this.props.itemLayout5Reducer.standardOutput[i] + " , ";
        }
        return temp;
    }
    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }
    handleInputChange = (e) => {
        titleName = e.target.value;
        this.props.onChangeData(titleName, teachingActs_data, standardOutput_data, evalActs_data);
    }
    moveTab7 = () => {
        this.setState({ redirectTab7: true });
    }
    redirect() {
        if (this.state.redirectTab7) {
            return (
                <Redirect to="/de-cuong-mon-hoc/danh-gia" />
            );
        }
    }

    
    render() {
        let childrenTeachingActs = [];
        let evalActs = []
        if(this.props.itemLayout5Reducer.teachingActsData.length !== 0){
            for (let i = 0; i < this.props.itemLayout5Reducer.teachingActsData.length; i++) {
                childrenTeachingActs.push(this.props.itemLayout5Reducer.teachingActsData[i])
            }

            for (let i = 0 ; i < this.props.itemLayout5Reducer.evalActsData.length ; i++) {
                evalActs.push(this.props.itemLayout5Reducer.evalActsData[i])
            }
            
        }
        const data = [];
        const childrenEvalActs = [];
        function init(){   
            for (let i = 0; i < childrenTeachingActs.length; i++) {
                data.push(<Option key={childrenTeachingActs[i]}>{childrenTeachingActs[i]}</Option>)
            }
            for (let i = 0; i < evalActs.length; i++) {
                childrenEvalActs.push(<Option key={i}>{evalActs[i]}</Option>)
            }
        }
        
        init();
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
                {this.redirect()}
                
                <div style={{ border: "2px solid", borderRadius: "12px" }}>
                    <div style={{ marginTop: "10px" }}></div>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Item
                            {...formItemLayout}
                            label="Tên chủ đề"
                        >
                            {getFieldDecorator('name', {
                                rules: [{
                                    required: true, message: 'Vui lòng nhập tên chủ đề',
                                }],
                                initialValue: this.props.itemLayout5Reducer.titleName
                            })(
                                <Input onChange={this.handleInputChange} />
                            )}

                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            label="Hoạt động dạy"
                        >
                            {getFieldDecorator('teachingActs', {

                                
                            })(
                                <Select
                                    mode="tags"
                                    style={{ width: '100%' }}
                                    placeholder="Please select"
                                    onChange={(value) => this.props.handleChangeTeachingAct(value)}
                                >
                                    {data}
                                </Select>
                            )}

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
                            <Cascader options={standard_item} onChange={this.onChange} 
                                      placeholder="Chọn chuẩn đầu ra" displayRender={this.displayRender}/>

                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            label="Kết quả chuẩn đầu ra"
                        >
                            <Input disabled value={this.toString()} />
                        </Form.Item>

                        <Form.Item
                            {...formItemLayout}
                            label={(
                                <span>
                                    Hoạt động đánh giá&nbsp;
                            <Tooltip title="Có thể nhập thêm hoạt động đánh giá ">
                                        <Icon type="question-circle-o" />
                                    </Tooltip>
                                </span>
                            )}
                        >
                            {getFieldDecorator('evalActs', {

                                
                            })(

                                <Select
                                    mode="tags"
                                    style={{ width: '100%', float: "left", width: '74%' }}
                                    placeholder="Please select"
                                    onChange={(value) => this.props.handleChangeEvalActs(value)}
                                >
                                    {childrenEvalActs}
                                </Select>


                            )}

                            <div style={{ float: "left" }}>
                                <Button type="primary" onClick={this.moveTab7}>
                                    Nhập đánh giá <Icon type="right" />
                                </Button>
                            </div>

                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                            <div>
                               
                                <Button type="primary" onClick={() => { this.props.saveAndContinue() }} style={{ marginLeft: "2em" }}>
                                    Continue<Icon type="right" />
                                </Button>
                                <br />
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        itemLayout5Reducer: state.itemLayout5Reducer
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onChangeData: (titleName, teachingActs_data, standardOutput_data, evalActs_data) => {
            dispatch({
                type: CHANGE_DATA, titleName: titleName, teachingActs: teachingActs_data,
                standardOutput: standardOutput_data, evalActs: evalActs_data
            });
        },
        handleChangeTeachingAct: (value) => {
            teachingActs_data = value;
            dispatch({
                type: CHANGE_DATA, titleName: titleName, teachingActs: teachingActs_data,
                standardOutput: standardOutput_data, evalActs: evalActs_data
            });
        },
        handleChangeEvalActs: (value) => {
            evalActs_data = value;
            dispatch({
                type: CHANGE_DATA, titleName: titleName, teachingActs: teachingActs_data,
                standardOutput: standardOutput_data, evalActs: evalActs_data
            });
        },
        saveAndContinue: () => {
            console.log(standardOutput_data)
            myObj.key = ownProps.step;
            myObj.titleName = titleName;
            myObj.teachingActs = teachingActs_data;
            myObj.evalActs = evalActs_data;
            myObj.standardOutput = standardOutput_data;

            console.log(myObj);
            if (titleName === '' || standardOutput_data.length === 0) {
                message.error("Vui lòng điền đầy đủ thông tin");
            }
            else {
                //const myObjStr = JSON.stringify(myObj);
                //reset
                titleName = '';
                isSubmit = true;
                let arr = [];
                arr.push(myObj)
                dispatch({ type: ADD_DATA, data: arr });
                ownProps.form.resetFields();
                ownProps.nextStep();
            }
            //standardOutput_data.splice(0, standardOutput_data.length);
            dispatch({
                type: CHANGE_DATA, titleName: '', teachingActs: [],
                standardOutput: '', evalActs: []
            });
        },
        saveDataValue:(teachingActs)=>{
            dispatch({type:COLLECT_DATA_HDD,data:teachingActs})
        },
        saveDataValueDG: (evalActs) => {
            dispatch({type:COLLECT_DATA_DG,data:evalActs})
        },
        collectDataRequest: ()=>{
           
            let newArr = [];
            axios.get('/collect-data-5')
            .then(function (response) {
                console.log(response)
                for(let i = 0; i <response.data.length;i++){
                    let data = {
                        key : response.data[i].key,
                        titleName : response.data[i].titleName,
                        teachingActs : response.data[i].teachingActs,
                        standardOutput : response.data[i].standardOutput,
                        evalActs : response.data[i].evalActs
                    }
                    newArr.push(data);   
                }
               
                dispatch({type:ADD_DATA,data:newArr})
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function(){
               
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ItemMenu);