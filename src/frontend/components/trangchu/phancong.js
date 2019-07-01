import React, { Component } from "react";
import { Table, Button, Icon, Popconfirm, Modal, message, DatePicker } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import $ from "./../../helpers/services";


const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
class PhanCong extends Component {

  state = {
    visible: false,
    selecteditem1: [],
    selecteditem2: [],
    teacherList: [],
    teacherListReview: [],
    dateString: []
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
    width: 200,
    editable: true,
    render: text => <p>{text}</p>,
  },
  {
    title: 'Ngày bắt đầu',
    dataIndex: 'start_Date',
    key: 'start_Date',
    width: 200,
    editable: true,
    render: text => <p>{text}</p>,
  },
  {
    title: 'Ngày kết thúc',
    dataIndex: 'end_Date',
    key: 'end_Date',
    width: 200,
    editable: true,
    render: text => <p>{text}</p>,
  }, {
    title: 'Action',
    key: 'action',
    render: (text, record) => {
      return (
        <div>
          <Popconfirm title="Xác nhận xóa?" onConfirm={() => this.handleDelete(record.key)}>
            <a href="#a">Xóa</a>
          </Popconfirm>

        </div>
      )
    },
  }];

  get2Table = () => {
    var self = this;
    $.getTeacherList({ thong_tin_chung_id: self.props.monhoc, idCurrentUser: JSON.parse(localStorage.getItem('user')).data.Id })
      .then(res => {
        let resdata = res.data;
        let data = [];
        if (resdata.length > 0) {
          data = resdata.map(item => {
            return {
              key: item.id,
              ...item
            }
          })

        }
        self.setState({ teacherList: data })
      })

    $.getTeacherListReview({ thong_tin_chung_id: self.props.monhoc })
      .then(res => {
        let resdata = res.data;
        let data = [];
        if (resdata.length > 0) {
          data = resdata.map(item => {
            return {
              key: item.id,
              ...item
            }
          })

        }
        self.setState({ teacherListReview: data })
      })
  }

  handleDelete = (key) => {
    this.setState({ selecteditem2: [] });
    $.deleteTeacherReview({ keys: [key], monhoc: this.props.monhoc })
      .then(res => {
        this.get2Table();
      })
  }

  delete = () => {
    let selectedItem = this.state.selecteditem2;
    this.setState({ selecteditem2: [] });
    $.deleteTeacherReview({ keys: selectedItem, monhoc: this.props.monhoc })
      .then(res => {
        this.get2Table();
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
    let dateString = this.state.dateString;

    if (selectedItem.length > 0) {
      if (dateString.length === 2) {
        this.setState({ selecteditem1: [] });
        $.addTeacherReview({ idTeacher: selectedItem, dateRange: dateString, idTTC: this.props.monhoc })
          .then(res => {
            this.get2Table();
          })
      }
      else {
        message.info("Nhập đầy đủ ngày bắt đầu và kết thúc!");
      }
    }
    else {
      message.info("Chọn ít nhất một giáo viên!");
    }
    //this.setState({selecteditem1: [], selecteditem2: []});
  }

  onDateChange = (date, dateString) => {
    console.log(dateString);
    //console.log(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate())

    this.setState({ dateString: dateString })
  }

  componentDidMount() {
    this.get2Table();
  }

  render() {

    const selectedRowKeys1 = this.state.selecteditem1;
    const selectedRowKeys2 = this.state.selecteditem2;

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
            <div style={{ height: "30px" }} />
            <Table
              pagination={{ position: 'none' }}
              rowSelection={rowSelection1}
              columns={this.columns1}
              dataSource={this.state.teacherList}
              style={{ wordWrap: "break-word", whiteSpace: 'pre-line' }}
            />
          </div>
          <div className="col-flex-center">
            <RangePicker
              onChange={this.onDateChange}
              format={dateFormat}

            />
            <div style={{ height: "10px" }} />
            <Button onClick={this.phanCong} className="button-phancong" style={{ backgroundColor: "#03a9f4d4", color: "white" }}>
              Phân công <span className="phancong-icon"><Icon type="double-right" /></span>
            </Button>
          </div>
          <div className="col-flex-right">
            <h3 style={{ textAlign: "center", fontSize: "11pt", color: "#03a9f4d4" }}>Danh sách giáo viên đã được phân công</h3>
            <div>
              <Button
                type="danger"
                onClick={this.showModal}
                disabled={!hasSelected}
                style={{ height: "30px" }}
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
              pagination={{ position: 'none' }}
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


