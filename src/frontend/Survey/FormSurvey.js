import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Form, Icon, Button, Input
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import './FormSurvey.css'
import { SAVE_SURVEY } from '../Constant/ActionType';


class FormSurvey extends Component {
  constructor(props) {
    super(props)
    this.state = {
        nguoiDuocKS: "",
        nguoiKS: "",
        q1: "",
        q2: "",
        q3: "",
        q4: "",
        q5: "",
        q6: "",
        q7: "",
        q8: "",
        q9: "",
        q10: "",
        q11: "",
    }
  }

  handleInput = (e, stateKey) => {
      switch (stateKey) {
              case "nguoiDuocKS":
              this.setState({nguoiDuocKS: e.target.value})
              break;
              case "nguoiKS":
              this.setState({nguoiKS: e.target.value})
              break;
              case "q1":
              this.setState({q1: e.target.value})
              break;
              case "q2":
              this.setState({q2: e.target.value})
              break;
              case "q3":
              this.setState({q3: e.target.value})
              break;
              case "q4":
              this.setState({q4: e.target.value})
              break;
              case "q5":
              this.setState({q5: e.target.value})
              break;
              case "q6":
              this.setState({q6: e.target.value})
              break;
              case "q7":
              this.setState({q7: e.target.value})
              break;
              case "q8":
              this.setState({q8: e.target.value})
              break;
              case "q9":
              this.setState({q9: e.target.value})
              break;
              case "q10":
              this.setState({q10: e.target.value})
              break;
              case "q11":
              this.setState({q11: e.target.value})
              break;
          default:
              break;
      }
      
  }


  render() {
      

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

    const tailFormItemLayout = {
        wrapperCol: {
            xs: {
                span: 24,
                offset: 1,
            },
            sm: {
                span: 16,
                offset: 9,
            },
        },
    };

    return (
        <div>
                <div style={{ marginTop: "10px" }}></div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item
                        {...formItemLayout}
                        label="Tên môn học"
                    >
                    <Input disabled value={this.props.subjectName}/>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Người được khảo sát"
                    >
                    <Input onChange={(e) => this.handleInput(e, "nguoiDuocKS")} />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Người khảo sát"
                    >
                    <Input onChange={(e) => this.handleInput(e, "nguoiKS")} />
                    </Form.Item>                   
                    <label class="col-sm-12"><strong>Thầy cô đã dạy môn này bao nhiêu lần</strong></label>
                    <Form.Item
                        {...formItemLayout}
                        label="Câu trả lời"
                    >
                    <TextArea onChange={(e) => this.handleInput(e, "q1")} rows={10}/>
                    </Form.Item>                   
                    <label class="col-sm-12"><strong>Thầy/Cô đã từng viết chuẩn đầu ra cho môn học này chưa ? Nếu có, xin cung cấp cho cán bộ
                        khảo sát (viết lại hoặc email)</strong></label>
                    <Form.Item
                        {...formItemLayout}
                        label="Câu trả lời"
                    >
                    <TextArea onChange={(e) => this.handleInput(e, "q2")} rows={10}/>
                    </Form.Item>
                    <label class="col-sm-12"><strong>Điều gì Thầy/Cô muốn cải tiến nhất khi muốn nâng cao chất lượng học tập của môn học này</strong></label>
                    <Form.Item
                        {...formItemLayout}
                        label="Câu trả lời"
                    >
                    <TextArea onChange={(e) => this.handleInput(e, "q3")} rows={10}/>
                    </Form.Item>
                    <label class="col-sm-12"><strong>Trình bày những kiến thức, kỹ năng, thái độ mà sinh viên có được sau khi học xong môn học
                        này</strong></label>
                    <Form.Item
                        {...formItemLayout}
                        label="Câu trả lời"
                    >
                    <TextArea onChange={(e) => this.handleInput(e, "q4")} rows={10}/>
                    </Form.Item>
                    <label class="col-sm-12"><strong>Theo kinh nghiệm giảng dạy của các Thầy/Cô, những kiến thức, kỹ năng, thai độ nào sinh
                        viên cần được cải thiện trước khi bắt đầu môn học này (cải thiện so với trước đây, không phải
                        kiến thức tiên quyết)</strong></label>
                    <Form.Item
                        {...formItemLayout}
                        label="Câu trả lời"
                    >
                    <TextArea onChange={(e) => this.handleInput(e, "q5")} rows={10}/>
                    </Form.Item>
                    <label class="col-sm-12"><strong>Sinh viên có được nhận thông tin phản hồi (của các bài tập, bài kiểm tra) trong suốt khoa học
                        không ? Khi nào sinh viên nhận lại phản hồi (1 tuần sau khi nộp bài, sau khi thi, cuối kỳ…)
                        Sinh viên có sử dụng các thông tin phản hồi này hay không</strong></label>
                    <Form.Item
                        {...formItemLayout}
                        label="Câu trả lời"
                    >
                    <TextArea onChange={(e) => this.handleInput(e, "q6")} rows={10}/>
                    </Form.Item>
                    <label class="col-sm-12"><strong>Điều gì giúp sinh viên hứng thú nhất, có động lực nhất khi học môn học này</strong></label>
                    <Form.Item
                        {...formItemLayout}
                        label="Câu trả lời"
                    >
                    <TextArea onChange={(e) => this.handleInput(e, "q7")} rows={10}/>
                    </Form.Item>
                    <label class="col-sm-12"><strong>Điều gì làm sinh viên ít hứng thú nhất, mất động lực nhất khi học môn học này</strong></label>
                    <Form.Item
                        {...formItemLayout}
                        label="Câu trả lời"
                    >
                    <TextArea onChange={(e) => this.handleInput(e, "q8")} rows={10}/>
                    </Form.Item>
                    <label class="col-sm-12"><strong>Nêu vai trò và trách nhiệm chính của giảng viên/trợ giảng trong môn học này</strong></label>
                    <Form.Item
                        {...formItemLayout}
                        label="Câu trả lời"
                    >
                    <TextArea onChange={(e) => this.handleInput(e, "q9")} rows={10}/>
                    </Form.Item>
                    <label class="col-sm-12"><strong>Các tài nguyên cần thiết cho môn học này là gì (tài liệu, sách, cơ sở vật chất….) ? Tài nguyên
                        nào có sẵn cần cải thiện ? Tài nguyên nào cần trang bị mới</strong></label>
                    <Form.Item
                        {...formItemLayout}
                        label="Câu trả lời"
                    >
                    <TextArea onChange={(e) => this.handleInput(e, "q10")} rows={10}/>
                    </Form.Item>
                    <label class="col-sm-12"><strong>Những đóng góp ý kiến của các Thầy/Cô để môn học được tốt hơn</strong></label>
                    <Form.Item
                        {...formItemLayout}
                        label="Câu trả lời"
                    >
                    <TextArea onChange={(e) => this.handleInput(e, "q11")} rows={10}/>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label=""
                    >
                    </Form.Item>
                    <label class="col-sm-12"><strong>Các Thầy/Cô vui lòng điền thông tin I/T/U vào ô Hoạt động giảng dạy và đánh giá tương
                        ứng với chuẩn đầu ra mà môn học mình phụ trách bên trên (xét trên hiện trạng đang dạy)</strong></label>

                    <Form.Item {...tailFormItemLayout}>
                        <div>
                            <Button type="primary" onClick={() => {
                                    let survey = {
                                        tenMH: this.props.tenMH,
                                        nguoiDuocKS: this.state.nguoiDuocKS,
                                        nguoiKS: this.state.nguoiKS,
                                        q1: this.state.q1,
                                        q2: this.state.q2,
                                        q3: this.state.q3,
                                        q4: this.state.q4,
                                        q5: this.state.q5,
                                        q6: this.state.q6,
                                        q7: this.state.q7,
                                        q8: this.state.q8,
                                        q9: this.state.q9,
                                        q10: this.state.q10,
                                        q11: this.state.q11,
                                    } 
                                    this.props.saveAll(survey)
                                }} style={{ marginLeft: "2em" }}>
                                Gửi<Icon type="right" />
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

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveAll: (survey) => {
        dispatch({type: SAVE_SURVEY, survey})
    }
  }
}


const FormSurveyLayout = Form.create()(FormSurvey);
export default connect(mapStateToProps, mapDispatchToProps)(FormSurveyLayout);