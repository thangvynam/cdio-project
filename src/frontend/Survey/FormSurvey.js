import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Form, Icon, Button, Input
} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import './FormSurvey.css'


class FormSurvey extends Component {
  constructor(props) {
    super(props)
    this.state = {

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
        <div style={{ border: "2px solid", borderRadius: "12px", margin: '50px' }}>
                <div style={{ marginTop: "10px" }}></div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item
                        {...formItemLayout}
                        label="Tên môn học"
                    >
                    <Input onChange={this.handleInputTenMH} />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Người được khảo sát"
                    >
                    <Input onChange={this.handleInputNguoiDuocKS} />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Người khảo sát"
                    >
                    <Input onChange={this.handleInputNguoiKS} />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Thầy cô đã dạy môn này bao nhiêu lần:"
                    >
                    <br/>
                    <Input type="number" onChange={this.handleInputQ1} />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Thầy/Cô đã từng viết chuẩn đầu ra cho môn học này chưa ? Nếu có, xin cung cấp cho cán bộ
                        khảo sát (viết lại hoặc email):"
                    >
                    <br/>
                    <TextArea onChange={this.handleInputQ2} rows={3}/>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Điều gì Thầy/Cô muốn cải tiến nhất khi muốn nâng cao chất lượng học tập của môn học này"
                    >
                    <br/>
                    <TextArea onChange={this.handleInputQ3} rows={15}/>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Trình bày những kiến thức, kỹ năng, thái độ mà sinh viên có được sau khi học xong môn học
                        này"
                    >
                    <br/>
                    <TextArea onChange={this.handleInputQ4} rows={20}/>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Theo kinh nghiệm giảng dạy của các Thầy/Cô, những kiến thức, kỹ năng, thai độ nào sinh
                        viên cần được cải thiện trước khi bắt đầu môn học này (cải thiện so với trước đây, không phải
                        kiến thức tiên quyết)"
                    >
                    <br/>
                    <TextArea onChange={this.handleInputQ5} rows={10}/>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Sinh viên có được nhận thông tin phản hồi (của các bài tập, bài kiểm tra) trong suốt khoa học
                        không ? Khi nào sinh viên nhận lại phản hồi (1 tuần sau khi nộp bài, sau khi thi, cuối kỳ…)
                        Sinh viên có sử dụng các thông tin phản hồi này hay không"
                    >
                    <br/>
                    <TextArea onChange={this.handleInputQ6} rows={10}/>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Điều gì giúp sinh viên hứng thú nhất, có động lực nhất khi học môn học này"
                    >
                    <br/>
                    <TextArea onChange={this.handleInputQ7} rows={10}/>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Điều gì làm sinh viên ít hứng thú nhất, mất động lực nhất khi học môn học này"
                    >
                    <br/>
                    <TextArea onChange={this.handleInputQ8} rows={10}/>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Nêu vai trò và trách nhiệm chính của giảng viên/trợ giảng trong môn học này."
                    >
                    <br/>
                    <TextArea onChange={this.handleInputQ9} rows={10}/>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Các tài nguyên cần thiết cho môn học này là gì (tài liệu, sách, cơ sở vật chất….) ? Tài nguyên
                        nào có sẵn cần cải thiện ? Tài nguyên nào cần trang bị mới"
                    >
                    <br/>
                    <TextArea onChange={this.handleInputQ10} rows={10}/>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Những đóng góp ý kiến của các Thầy/Cô để môn học được tốt hơn"
                    >
                    <br/>
                    <TextArea onChange={this.handleInputQ11} rows={10}/>
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Các Thầy/Cô vui lòng điền thông tin I/T/U vào ô Hoạt động giảng dạy và đánh giá tương
                        ứng với chuẩn đầu ra mà môn học mình phụ trách bên trên (xét trên hiện trạng đang dạy)"
                    >
                    <br/>
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <div>
                            <Button type="primary" onClick={() => { 
             
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

  }
}


const FormSurveyLayout = Form.create()(FormSurvey);
export default connect(mapStateToProps, mapDispatchToProps)(FormSurveyLayout);