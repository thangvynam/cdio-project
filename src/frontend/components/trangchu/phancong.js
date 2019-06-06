import React, { Component } from "react";
import { Table, Divider, Tag, Row, Col, Button, Icon, Popconfirm, Modal, message } from 'antd';
import { connect } from'react-redux';
import { bindActionCreators } from 'redux';
import $ from "./../../helpers/services";


class PhanCong extends Component {


    state = {
      visible: false,
      selecteditem1: [],
      selecteditem2: [],
      teacherList: [],
      teacherListReview: []
    };

    columns1 = [{
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      width: 500,
      editable: true,
      render: text => <p>{text}</p>,
    }];


        columns2 = [{
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            width: 500,
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
      
      

      handleDelete = (key) => {
        this.setState({selecteditem2: []});
        $.deleteTeacherReview([key])
        .then(res => {
          $.getTeacherList({thong_tin_chung_id: this.props.monhoc, idCurrentUser: JSON.parse(localStorage.getItem('user')).data.Id})
        .then(res => {
          let resdata = res.data;
          let data = [];
          if(resdata.length > 0) {
            data = resdata.map(item => {
              return {key: item.id,
              ...item}
            })
            
          }
          this.setState({teacherList: data})
        })

        $.getTeacherListReview({thong_tin_chung_id: this.props.monhoc})
        .then(res => {
          let resdata = res.data;
          let data = [];
          if(resdata.length > 0) {
            data = resdata.map(item => {
              return {key: item.id,
              ...item}
            })
            
          }
          this.setState({teacherListReview: data})
        })
        //this.setState({selecteditem1: [], selecteditem2: []});
        })
      }

      delete = () => {
        let selectedItem = this.state.selecteditem2;
        this.setState({selecteditem2: []});
        $.deleteTeacherReview(selectedItem)
        .then(res => {
          
          $.getTeacherList({thong_tin_chung_id: this.props.monhoc, idCurrentUser: JSON.parse(localStorage.getItem('user')).data.Id})
        .then(res => {
          let resdata = res.data;
          let data = [];
          if(resdata.length > 0) {
            data = resdata.map(item => {
              return {key: item.id,
              ...item}
            })
            
          }
          this.setState({teacherList: data})
        })

        $.getTeacherListReview({thong_tin_chung_id: this.props.monhoc})
        .then(res => {
          let resdata = res.data;
          let data = [];
          if(resdata.length > 0) {
            data = resdata.map(item => {
              return {key: item.id,
              ...item}
            })
            
          }
          this.setState({teacherListReview: data})
        })
        //this.setState({selecteditem1: [], selecteditem2: []});
        })
      }
  onSelectChange1 = (selectedRowKeys) => {
    //this.setState({ selecteditem1 })
    this.setState({ selecteditem1: selectedRowKeys });
  }

  onSelectChange2 = (selectedRowKeys) => {
    this.setState({ selecteditem2: selectedRowKeys });
  }

  isExist(subjectId, subjects) {
    for (let i = 0; i < subjects.length; i++) {
      if (subjects[i].toString() === subjectId) {
        return true;
      }
    }
    return false;
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    this.delete();
    this.setState({
      visible: false,
    });
    
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  phanCong = () => {
    let selectedItem = this.state.selecteditem1;
   
    this.setState({ selecteditem1: [] })


    if(selectedItem.length > 0) {
      this.setState({selecteditem1: []});
      $.addTeacherReview({idTeacher: selectedItem, idTTC: this.props.monhoc})
      .then(res => {
        
        $.getTeacherList({thong_tin_chung_id: this.props.monhoc, idCurrentUser: JSON.parse(localStorage.getItem('user')).data.Id})
        .then(res => {
          let resdata = res.data;
          let data = [];
          if(resdata.length > 0) {
            data = resdata.map(item => {
              return {
                key: item.id,
              ...item}
            })
          }
          this.setState({teacherList: data})
          
        })

        $.getTeacherListReview({thong_tin_chung_id: this.props.monhoc})
        .then(res => {
          let resdata = res.data;
          let data = [];
          if(resdata.length > 0) {
            data = resdata.map(item => {
              return {key: item.id,
              ...item}
            })
            
          }
          this.setState({teacherListReview: data})
        })
      })
    }
    else {
      message.info("Chọn ít nhất một giáo viên!");
    }
    //this.setState({selecteditem1: [], selecteditem2: []});
  }
      componentDidMount() {
       // axios.get('localhost:3001/get-teacher-list')
       $.getTeacherList({thong_tin_chung_id: this.props.monhoc, idCurrentUser: JSON.parse(localStorage.getItem('user')).data.Id})
        .then(res => {
          let resdata = res.data;
          let data = [];
          if(resdata.length > 0) {
            data = resdata.map(item => {
              return {key: item.id,
              ...item}
            })
            
          }
          this.setState({teacherList: data})
        })

        $.getTeacherListReview({thong_tin_chung_id: this.props.monhoc})
        .then(res => {
          let resdata = res.data;
          let data = [];
          if(resdata.length > 0) {
            data = resdata.map(item => {
              return {key: item.id,
              ...item}
            })
            
          }
          this.setState({teacherListReview: data})
        })
      }

  render() {
    

    const selectedRowKeys1  = this.state.selecteditem1;
    const selectedRowKeys2  = this.state.selecteditem2;

    const rowSelection1 = {
      selectedRowKeys: selectedRowKeys1,
      width: "20",
      onChange: this.onSelectChange1,
    };
    const rowSelection2 = {
      selectedRowKeys: selectedRowKeys2,
      width: "20",
      onChange: this.onSelectChange2,
    };

    const hasSelected = selectedRowKeys2.length > 0;
    return (
      <div className="section-layout">
        <div className="wrapper-flex">
          <div className="col-flex-left">
            <h2 style={{ textAlign: "center", fontSize: "11pt", color: "#03a9f4d4" }}>Danh sách giáo viên</h2>
            <div style={{height: "30px"}}/>
            <Table
              pagination = {{ position: 'none' }}
              rowSelection={rowSelection1}
              columns={this.columns1}
              dataSource={this.state.teacherList}
              style={{ wordWrap: "break-word", whiteSpace: 'pre-line' }}
            />
          </div>
          <div className="col-flex-center">
            <Button  onClick={this.phanCong} className="button-phancong" style={{ backgroundColor:"#03a9f4d4", color: "white" }}>
              Phân công <span className="phancong-icon"><Icon type="double-right" /></span>
            </Button>
          </div>
          <div className="col-flex-right">
            <h3 style={{ textAlign: "center", fontSize: "11pt",  color: "#03a9f4d4" }}>Danh sách giáo viên đã được phân công</h3>
            <div>
          <Button
            type="danger"
            onClick={this.showModal}
            disabled={!hasSelected}
            style={{height: "30px"}}
          >
            Delete
          </Button>
          <Modal
          title="Cảnh báo"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Xóa những mục đã chọn?</p>
          
        </Modal>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Đã chọn ${this.state.selecteditem2.length} mục` : ''}
          </span>
          </div>
            <Table 
              pagination = {{ position: 'none' }}
              rowSelection={rowSelection2}
              columns={this.columns2}
              dataSource={this.state.teacherListReview}
              style={{ wordWrap: "break-word", whiteSpace: 'pre-line' }}
            />
          </div>
        </div>
      </div>)
  }
}
const mapStateToProps = (state) => {
  return {
    subjectId: state.subjectid
  }
}
const mapDispatchToProps = (dispatch) => {

    return bindActionCreators({
    }, dispatch);
  }

export default connect(mapStateToProps, mapDispatchToProps)(PhanCong);


