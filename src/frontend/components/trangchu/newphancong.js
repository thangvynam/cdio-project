import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Collapse, Form, Input, Menu, Icon,
  Button, Dropdown, message, Row, Col,
  Select, Modal, Table, Tag, Popconfirm,
  Divider, notification, DatePicker, Tooltip
} from 'antd';
import $ from "./../../helpers/services";
import { phancong } from '../../Constant/ActionType';
import FormPhanCong from './formPhanCong';
import TablePhanCong from './TablePhanCong';

const PhanCongForm = Form.create({ name: 'phancong' })(FormPhanCong);
const formItemLayout = {
  labelCol: {
    xs: { span: 12 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

const { RangePicker } = DatePicker;
const Option = Select.Option;


class NewPhanCong extends Component {

  constructor(props) {
    super(props);
    this.state = {
      subjectList: [],
      teacherList: [],
      subjectSelect: "",
      teacherSelect: [],
      dateString: [],
      isLoadForm: false
    }

  }
  loadForm = async (subjectList) => {
    let subjectAvaiable = subjectList.filter(item => !this.props.phancongTable.find(element => element.subjectId === item.Id));
    console.log(subjectAvaiable);
    this.setState({ subjectList: subjectAvaiable });
    let teacherList = await $.getTeacherList();
    this.setState({ teacherList: teacherList.data });
  }

  subjectInArray = (subjectId, dataSource) => {
    for (let i in dataSource) {
      if (dataSource[i].subjectId == subjectId)
        return true;
    }
    return false;
  }

  loadTable = async () => {
    $.getReviewList({ idCtdt: this.props.idCtdt }).then(
      res => {
        let dataSource = [];
        res.data && res.data.forEach(element => {
          if (this.subjectInArray(element.idTTC, dataSource)) {
            dataSource[dataSource.findIndex(item => item.subjectId == element.idTTC)].list.push(element.name);
          }
          else {
            dataSource.push({
              key: element.idTTC,
              subjectId: element.idTTC,
              subject: element.SubjectName,
              teacherId: element.idTeacher,
              list: [element.name],
              time: [element.start_Date, element.end_Date]
            })
          }

        });
        this.props.updatePhanCongTable(dataSource);
        this.loadForm(this.props.subjectList);
      }
    )
  }

  componentDidMount() {
    this.loadTable();
  }


  componentWillReceiveProps(nextProps) {
    if (this.state.isLoadForm === false && nextProps.subjectList && nextProps.subjectList.length > 0) {
      this.loadForm(nextProps.subjectList);
      this.setState({ isLoadForm: true })
    }
  }

  render() {

    return (
      <div>

        <div style={{ marginBottom: 16, marginTop: 16 }}>
          <PhanCongForm idCtdt={this.props.idCtdt}
            subjectList={this.state.subjectList}
            teacherList={this.state.teacherList}
            loadTable={this.loadTable} />
        </div>
        <TablePhanCong idCtdt={this.props.idCtdt}
          phancongTable={this.props.phancongTable}
          teacherList={this.state.teacherList}
          loadTable={this.loadTable} />

      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    phancongTable: state.phancongReducer.phancongTable,
    subjectList: state.subjectlist
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    updatePhanCongTable: phancong
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(NewPhanCong);