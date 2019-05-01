import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Form,  Input
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import './FormSurvey.css'
import axios from 'axios';

class SurveyDetailForm extends Component{
    constructor(props){
        super(props);

        this.state  = { 
            dataQA : '',
        }
    }

    componentDidMount() {
        axios.get(`/get-surveyqa/${this.props.subjectId}`).then(res => {
            this.setState ({ 
                dataQA : res.data[0]
            },() => console.log(this.state.dataQA))
        })
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
    
        return (
            <div>
                    <div style={{ marginTop: "10px" }}></div>
                    <Form >
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
                        <Input disabled value={this.state.dataQA.nguoiDuocKS}/>
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label="Người khảo sát"
                        >
                         <Input disabled value={this.state.dataQA.nguoiKS}/>
                        </Form.Item>                   
                        <label class="col-sm-12"><strong>Thầy cô đã dạy môn này bao nhiêu lần</strong></label>
                        <Form.Item
                            {...formItemLayout}
                            label="Câu trả lời"
                        >
                        <TextArea disabled value={this.state.dataQA.q1} rows={1}/>
                        </Form.Item>                   
                        <label class="col-sm-12"><strong>Thầy/Cô đã từng viết chuẩn đầu ra cho môn học này chưa ? Nếu có, xin cung cấp cho cán bộ
                            khảo sát (viết lại hoặc email)</strong></label>
                        <Form.Item
                            {...formItemLayout}
                            label="Câu trả lời"
                        >
                        <TextArea disabled value={this.state.dataQA.q2} rows={1}/>
                        </Form.Item>
                        <label class="col-sm-12"><strong>Điều gì Thầy/Cô muốn cải tiến nhất khi muốn nâng cao chất lượng học tập của môn học này</strong></label>
                        <Form.Item
                            {...formItemLayout}
                            label="Câu trả lời"
                        >
                       <TextArea disabled value={this.state.dataQA.q3} rows={1}/>
                        </Form.Item>
                        <label class="col-sm-12"><strong>Trình bày những kiến thức, kỹ năng, thái độ mà sinh viên có được sau khi học xong môn học
                            này</strong></label>
                        <Form.Item
                            {...formItemLayout}
                            label="Câu trả lời"
                        >
                        <TextArea disabled value={this.state.dataQA.q4} rows={1}/>
                        </Form.Item>
                        <label class="col-sm-12"><strong>Theo kinh nghiệm giảng dạy của các Thầy/Cô, những kiến thức, kỹ năng, thai độ nào sinh
                            viên cần được cải thiện trước khi bắt đầu môn học này (cải thiện so với trước đây, không phải
                            kiến thức tiên quyết)</strong></label>
                        <Form.Item
                            {...formItemLayout}
                            label="Câu trả lời"
                        >
                        <TextArea disabled value={this.state.dataQA.q5} rows={1}/>
                        </Form.Item>
                        <label class="col-sm-12"><strong>Sinh viên có được nhận thông tin phản hồi (của các bài tập, bài kiểm tra) trong suốt khoa học
                            không ? Khi nào sinh viên nhận lại phản hồi (1 tuần sau khi nộp bài, sau khi thi, cuối kỳ…)
                            Sinh viên có sử dụng các thông tin phản hồi này hay không</strong></label>
                        <Form.Item
                            {...formItemLayout}
                            label="Câu trả lời"
                        >
                        <TextArea disabled value={this.state.dataQA.q6} rows={1}/>
                        </Form.Item>
                        <label class="col-sm-12"><strong>Điều gì giúp sinh viên hứng thú nhất, có động lực nhất khi học môn học này</strong></label>
                        <Form.Item
                            {...formItemLayout}
                            label="Câu trả lời"
                        >
                        <TextArea disabled value={this.state.dataQA.q7} rows={1}/>
                        </Form.Item>
                        <label class="col-sm-12"><strong>Điều gì làm sinh viên ít hứng thú nhất, mất động lực nhất khi học môn học này</strong></label>
                        <Form.Item
                            {...formItemLayout}
                            label="Câu trả lời"
                        >
                       <TextArea disabled value={this.state.dataQA.q8} rows={1}/>
                        </Form.Item>
                        <label class="col-sm-12"><strong>Nêu vai trò và trách nhiệm chính của giảng viên/trợ giảng trong môn học này</strong></label>
                        <Form.Item
                            {...formItemLayout}
                            label="Câu trả lời"
                        >
                        <TextArea disabled value={this.state.dataQA.q9} rows={1}/>
                        </Form.Item>
                        <label class="col-sm-12"><strong>Các tài nguyên cần thiết cho môn học này là gì (tài liệu, sách, cơ sở vật chất….) ? Tài nguyên
                            nào có sẵn cần cải thiện ? Tài nguyên nào cần trang bị mới</strong></label>
                        <Form.Item
                            {...formItemLayout}
                            label="Câu trả lời"
                        >
                        <TextArea disabled value={this.state.dataQA.q10} rows={1}/>
                        </Form.Item>
                        <label class="col-sm-12"><strong>Những đóng góp ý kiến của các Thầy/Cô để môn học được tốt hơn</strong></label>
                        <Form.Item
                            {...formItemLayout}
                            label="Câu trả lời"
                        >
                        <TextArea disabled value={this.state.dataQA.q11} rows={1}/>
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label=""
                        >
                        </Form.Item>
                        <label class="col-sm-12"><strong>Các Thầy/Cô vui lòng điền thông tin I/T/U vào ô Hoạt động giảng dạy và đánh giá tương
                            ứng với chuẩn đầu ra mà môn học mình phụ trách bên trên (xét trên hiện trạng đang dạy)</strong></label>
    
                    </Form>
                </div>
        )
      }
}


const mapStateToProps = (state, ownProps) => {
    return {

    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurveyDetailForm);