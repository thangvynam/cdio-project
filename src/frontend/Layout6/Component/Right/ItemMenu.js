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
import { addItemKHGDTH, changeTempKHGDTH, changeMapKHGDTH } from "../../../Constant/ActionType";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import axios from "axios";


const { Option } = Select;
// const standard_item = [
//   {
//     value: "G1",
//     label: "G1",
//     children: [
//       {
//         value: ".1",
//         label: ".1"
//       },
//       {
//         value: ".2",
//         label: ".2"
//       },
//       {
//         value: ".3",
//         label: ".3"
//       }
//     ]
//   },
//   {
//     value: "G2",
//     label: "G2",
//     children: [
//       {
//         value: ".1",
//         label: ".1"
//       },
//       {
//         value: ".2",
//         label: ".2"
//       }
//     ]
//   }
// ];

//const evalActs = ["BTVN#1", "BTTL#1", "DAMH#1"];

class ItemMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //teachingActs: new Map(),
      //evalActs: new Map(),
     // standardOutput: new Map(),
      isRedirectTab7: false,
      standard_item: [],

    };

    this.isSubmit = false;
  }

  componentWillMount(){ 

    this.onGetItemMenu();

  }


  onGetItemMenu = ()=>{

    let mapId = {
      teachingActs: new Map(),
      standardOutput: new Map(),
      evalActs: new Map(),
    }

    axios.get("/get-teachingacts-6").then(response=>{
      const data= response.data;
      let map = new Map();
      data.forEach((item,index)=>{
        map.set(item.hoat_dong,item.id);
      })

      //this.setState({teachingActs:map});
      mapId.teachingActs = map;

    });

    axios.get("/get-eval-acts-6/1").then(response=>{
      const data= response.data;
      let map = new Map();
      data.forEach((item,index)=>{
        map.set(item.ma,item.id);
      })

      //this.setState({evalActs:map});
      mapId.evalActs = map;
    });

    axios.get("/get-standard-output-6/1").then(response=>{
      const data= response.data;
      let array = [];
      let map = new Map();
      data.forEach((item,index)=>{
        let temp = {
          value: item.muc_tieu,
          label: item.muc_tieu,
          children: [],
        }
        item.cdr.forEach((itemCdr,_)=>{
          let tempCdr = {
            value: itemCdr.chuan_dau_ra,
            label: itemCdr.chuan_dau_ra
          }
          temp.children.push(tempCdr);
          map.set(itemCdr.chuan_dau_ra,itemCdr.id);
        })
        array.push(temp);
      })

     // this.setState({standard_item:array,standardOutput:map});
     mapId.standardOutput = map;
     this.setState({standard_item:array});
    });


    
    this.props.onChangeMapKHGDTH(mapId);

  }






  onChangeStandar = (value) => {
    if (value.length === 0) return;

    let tempInfo = this.props.itemKHGDTH.tempInfo;

    var newArray = tempInfo.standardOutput.slice();
    let temp = value[1];
    let flag = true;

    for (let i = 0; i < newArray.length; i++) {
      if (newArray[i] === temp) {
        newArray.splice(i, 1);
        flag = false;
      }
    }

    if (flag) newArray.push(temp);

    //this.setState({ standardOutput: newArray });
    tempInfo["standardOutput"] = newArray;
    this.props.onChangeTempKHGDTH(tempInfo);
  };
  showStandard = () => {
    let temp = "";
    let tempInfo = this.props.itemKHGDTH.tempInfo;
    for (let i = 0; i < tempInfo.standardOutput.length; i++) {
      temp += tempInfo.standardOutput[i] + " , ";
    }
    return temp;
  };

  handleSubmit = () => {

    let tempInfo = this.props.itemKHGDTH.tempInfo;

    if (
      tempInfo.titleName === "" ||
      tempInfo.teachingActs.length === 0 ||
      tempInfo.standardOutput.length === 0 ||
      tempInfo.evalActs.length === 0
    ) {
      message.error("Vui lòng điền đầy đủ thông tin", 0.75);
      return;
    }
    let previewData = {};
    previewData.key = this.props.itemKHGDTH.previewInfo.length + 1;
    previewData.titleName = tempInfo.titleName;
    previewData.teachingActs = tempInfo.teachingActs;
    previewData.standardOutput = tempInfo.standardOutput;
    previewData.evalActs = tempInfo.evalActs;

    this.props.onAddItemKHGDTH(JSON.stringify(previewData));
    this.props.nextStep();
    this.props.form.resetFields();
    this.isSubmit = true;

    let resetTemp  = {
      titleName : '',
      teachingActs : [],
      standardOutput : [],
      evalActs : [],
  }
  this.props.onChangeTempKHGDTH(resetTemp);

  };

  handleTitleChange = e => {
    let tempInfo = this.props.itemKHGDTH.tempInfo;
    tempInfo["titleName"] = e.target.value;
    this.props.onChangeTempKHGDTH(tempInfo);

    //this.setState({ titleName: e.target.value });
  };

  handleChangeTeachingAct(value) {
    let tempInfo = this.props.itemKHGDTH.tempInfo;
    tempInfo["teachingActs"] = value;
    this.props.onChangeTempKHGDTH(tempInfo);
    //this.setState({ teachingActs: value });
  }
  handleChangeEvalActs(value) {
    let tempInfo = this.props.itemKHGDTH.tempInfo;
    tempInfo["evalActs"] = value;
    this.props.onChangeTempKHGDTH(tempInfo);
    //this.setState({ evalActs: value });
  }


  // renderBackButton() {
  //   if (this.props.step !== 0) {
  //     return (
  //       <Link
  //         activeClass="active"
  //         className="test1"
  //         to="test1"
  //         spy={true}
  //         smooth={true}
  //         duration={500}
  //       >
  //         <Button type="danger">Finish</Button>
  //       </Link>
  //     );
  //   }
  //   return null;
  // }

  moveLayout7 = () => {
    this.setState({ isRedirectTab7: true });
  };

  checkRedirect = () => {
    if (this.state.isRedirectTab7)
      return <Redirect to="danh-gia" />;
  };

  displayRender = label => {
    if (this.isSubmit) {
      this.isSubmit = false;
      return null;
    }
    if (label.length > 0) return label[label.length -1];
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    var teachingActs = [];
    var evalActs = [];
    
    for(const acts of this.props.itemKHGDTH.mapIdForValue.teachingActs.keys()){
      teachingActs.push(acts);
    }
    for(const acts of this.props.itemKHGDTH.mapIdForValue.evalActs.keys()){
      evalActs.push(acts);
    }
    

    const childrenTeachingActs = [];
    const childrenEvalActs = [];
    function init() {
      for (let i = 0; i < teachingActs.length; i++) {
        childrenTeachingActs.push(
          <Option key={teachingActs[i]}>{teachingActs[i]}</Option>
        );
      }
      for (let i = 0; i < evalActs.length; i++) {
        childrenEvalActs.push(<Option key={evalActs[i]}>{evalActs[i]}</Option>);
      }
    }
    
    init();
    
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
    const formDynamicItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 3 }
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
        {this.checkRedirect()}

        <div style={{ border: "2px solid", borderRadius: "12px" }}>
          <div style={{ marginTop: "10px" }} />
          <Form onSubmit={this.handleSubmit}>
            <Form.Item {...formItemLayout} label="Tên chủ đề">
              {getFieldDecorator("name", {
                rules: [
                  {
                    required: true,
                    message: "Vui lòng nhập tên chủ đề"
                  }
                ],
                initialValue: this.props.itemKHGDTH.tempInfo.titleName
              })(<Input onChange={this.handleTitleChange} />)}
            </Form.Item>

            <Form.Item
              {...formDynamicItemLayout}
              label={
                <span>
                  Chọn chuẩn đầu ra&nbsp;
                  <Tooltip title="Tham khảo mục chuẩn đầu ra để chọn">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              <Cascader
                options={this.state.standard_item}
                onChange={this.onChangeStandar}
                placeholder="Chọn chuẩn đầu ra"
                displayRender={this.displayRender}
              />
            </Form.Item>

            <Form.Item {...formItemLayout} label="Kết quả chuẩn đầu ra">
              <Input disabled value={this.showStandard()} />
            </Form.Item>

            <Form.Item {...formItemLayout} label="Hoạt động dạy">
              {getFieldDecorator("teachingActs", {
                initialValue: this.props.itemKHGDTH.tempInfo.teachingActs
              })(
                <Select
                  id="select-teaching"
                  mode="tags"
                  style={{ width: "100%" }}
                  placeholder="Chọn hoạt động"
                  onChange={value => this.handleChangeTeachingAct(value)}
                >
                  {childrenTeachingActs}
                </Select>
              )}
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              label={
                <span>
                  Hoạt động đánh giá&nbsp;
                  <Tooltip title="Có thể nhập thêm hoạt động đánh giá ">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
              }
            >
              <div style={{ float: "left", width: "74%" }}>
              {getFieldDecorator("evalActs", {
                initialValue: this.props.itemKHGDTH.tempInfo.evalActs
              })(
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Chọn hoạt động"
                  onChange={value => this.handleChangeEvalActs(value)}
                >
                  {childrenEvalActs}
                </Select>
                )}
              </div>
              <div style={{ float: "left" }}>
                <Button type="primary" onClick={this.moveLayout7}>
                  Nhập đánh giá <Icon type="right" />
                </Button>
              </div>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <div>
                {/* {this.renderBackButton()} */}
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    itemKHGDTH: state.itemLayout6Reducer
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      onAddItemKHGDTH: addItemKHGDTH,
      onChangeTempKHGDTH: changeTempKHGDTH,
      onChangeMapKHGDTH:changeMapKHGDTH,
    },
    dispatch
  );
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemMenu);
