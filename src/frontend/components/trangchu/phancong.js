import React, { Component } from "react";
import { Table, Divider, Tag, Row, Col, Button, Icon, Popconfirm } from 'antd';
import { connect } from'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import $ from "./../../helpers/services";
import { teacherList } from "../../Constant/ActionType";

class PhanCong extends Component {
    constructor(props){
        super(props);
        this.state = {
            selecteditem1: [],
            selecteditem2: []
        };
        this.columns1 = [{
          title: 'Tên',
          dataIndex: 'name',
          key: 'name',
          width: 100,
          editable: true,
          render: text => <p>{text}</p>,
        }];

        this.columns2 = [{
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            width: 100,
            editable: true,
            render: text => <p>{text}</p>,
          }, {
            title: 'Action',
            key: 'action',
            render: (text, record) => {
              return(
              <div>
                  <Popconfirm title="Xác nhận xóa?" onConfirm={() => this.handleDelete(record.key)}>
                        <a href="#a">Xóa</a>
                      </Popconfirm>
                    
              </div>
            )},
          }];
      }
      
      onSelectChange1 = (selectedRowKeys) => {
        this.setState({selecteditem1: selectedRowKeys})
      }

      onSelectChange2 = (selectedRowKeys) => {
        this.setState({selecteditem2: selectedRowKeys})
      }

      isExist(subjectId, subjects) {
          for(let i = 0;i < subjects.length;i++) {
              if(subjects[i].toString() === subjectId) {
                  return true;
              }
          }
          return false;
      }

      componentDidMount() {
       // axios.get('localhost:3001/get-teacher-list')
       $.getTeacherList()
        .then(res => {
          console.log(res.data);
          this.props.updateTeacherList(res.data);
        })
      }
      render() {
        
        const selectedRowKeys1 = this.state.selecteditem1;
        const selectedRowKeys2 = this.state.selecteditem2;
        const rowSelection1 = {
            selectedRowKeys1,
            onChange: this.onSelectChange1,
          };
        const rowSelection2 = {
        selectedRowKeys2,
        onChange: this.onSelectChange2,
        };
          return(
              <div>
            <h1 style={{textAlign: "center"}}>PHÂN CÔNG GIÁO VIÊN</h1>
              <Row>
                  <Col span={2}>
                  </Col>
             <Col span={6}>
             <h2 style={{textAlign: "center", fontSize: "10pt"}}>Danh sách giáo viên</h2>
          <Table bordered 
            rowSelection={rowSelection1} 
            columns={this.columns1} 
            dataSource={this.props.teacherlist.previewInfo}
            style={{ wordWrap: "break-word", whiteSpace: 'pre-line'}}
             />
             </Col>
             <Col span={6}>
                <Button style={{margin: "30px"}} >Phân công<Icon type="double-right"/></Button>
             </Col>
             <Col span={6}>
             <h3 style={{textAlign: "center", fontSize: "10pt"}}>Danh sách giáo viên đã được phân công</h3>
          <Table bordered 
            rowSelection={rowSelection2} 
            columns={this.columns2} 
            dataSource={[]}
            style={{ wordWrap: "break-word", whiteSpace: 'pre-line'}}
             />
             </Col>
             </Row>
             </div>)
      }
}
const mapStateToProps = (state) => {
    return {
        teacherlist: state.teacherlist,
        subjectId: state.subjectid
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        updateTeacherList: teacherList
    }, dispatch);
  }
export default connect(mapStateToProps, mapDispatchToProps)(PhanCong);

