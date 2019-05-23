import React, { Component } from "react";
import XLSX from "xlsx";

import { Row, Col, Button, FormInput, FormTextarea } from "shards-react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

import "../../assets/common.css";

import * as logic from "../../business";

import DataInputCom from "./DataInputCom";

export default class SubjectManageCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      reviewVisible: false,
      detailVisible: false,
      subjectCode: "",
      subjectName: "",
      credits: "",
      theory: "",
      practice: "",
      exercise: "",
      description: "",
      tmpSubjects: [],
      deleteVisible: false,
      id: 0,
      globalFilter: ""
    };
  }

  onOpenAdd = () => {
    this.setState({ visible: true });
  };

  handleSubjectCode = event => {
    this.setState({ subjectCode: event.target.value });
  };

  handleSubjectName = event => {
    this.setState({ subjectName: event.target.value });
  };

  handleCredits = event => {
    if (event.target.value.length > 2)
      this.setState({ credits: event.target.value.substr(0, 2) });
    else if (
      event.target.value.length === 0 ||
      !isNaN(event.target.value[event.target.value.length - 1])
    )
      this.setState({ credits: event.target.value });
  };

  handleTheory = event => {
    if (event.target.value.length > 3)
      this.setState({ theory: event.target.value.substr(0, 3) });
    else if (
      event.target.value.length === 0 ||
      !isNaN(event.target.value[event.target.value.length - 1])
    )
      this.setState({ theory: event.target.value });
  };

  handlePractice = event => {
    if (event.target.value.length > 3)
      this.setState({ practice: event.target.value.substr(0, 3) });
    else if (
      event.target.value.length === 0 ||
      !isNaN(event.target.value[event.target.value.length - 1])
    )
      this.setState({ practice: event.target.value });
  };

  handleExercise = event => {
    if (event.target.value.length > 3)
      this.setState({ exercise: event.target.value.substr(0, 3) });
    else if (
      event.target.value.length === 0 ||
      !isNaN(event.target.value[event.target.value.length - 1])
    )
      this.setState({ exercise: event.target.value });
  };

  handleDescription = event => {
    this.setState({ description: event.target.value });
  };

  onCloseAdd = () => {
    this.setState({
      visible: false
    });
  };

  onCloseAndCreate = () => {
    if (
      !isNaN(parseInt(this.state.credits, 10)) &&
      !isNaN(parseInt(this.state.theory, 10)) &&
      !isNaN(parseInt(this.state.practice, 10)) &&
      !isNaN(parseInt(this.state.exercise, 10)) &&
      this.state.subjectCode !== "" &&
      this.state.subjectName !== "" &&
      this.state.description !== ""
    ) {
      let subjectcode = this.state.subjectCode;
      let subjectname = this.state.subjectName;
      let credit = parseInt(this.state.credits, 10);
      let theoryperiod = parseInt(this.state.theory, 10);
      let practiceperiod = parseInt(this.state.practice, 10);
      let exerciseperiod = parseInt(this.state.exercise, 10);
      let description = this.state.description;
      let datecreated = new Date().toISOString();
      let dateedited = new Date().toISOString();
      let data = {
        subjectcode,
        subjectname,
        subjectengname: "",
        credit,
        theoryperiod,
        practiceperiod,
        exerciseperiod,
        description,
        datecreated,
        dateedited
      };
      this.props.onAddSubject(data);
      this.setState({
        visible: false
      });
    }
  };

  onClose = () => {
    this.setState({
      reviewVisible: false
    });
  };
  onCloseDetail = () => {
    this.setState({
      detailVisible: false
    });
  };

  onCloseAndAddSubjects = () => {
    this.props.onAddSubjectBulk(this.state.tmpSubjects);
    this.setState({
      reviewVisible: false,
      tmpSubjects: []
    });
  };

  onExport = () => {
    const data = logic.createExportSubject(this.props.subjects);
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Subject List");
    XLSX.writeFile(wb, `dsmonhoc.xlsx`);
  };

  importFile = file => {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = e => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const subjects = logic.convertToSubjects(data);
      this.setState({
        reviewVisible: true,
        tmpSubjects: subjects
      });
    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  };

  onShowDetail = IdSubject => {
    this.props.onLoadUsingEduPro(IdSubject);

    const row = this.props.subjects.filter(row => row.Id === IdSubject)[0];
    const description = row.Description
      ? "Mô tả môn học: " + row.Description
      : "Chưa có mô tả môn học!!";

    this.setState({
      showDescription: description,
      detailVisible: true
    });
  };

  onDeleteShow = id => {
    this.setState({
      deleteVisible: true,
      id: id
    });
  };

  onDelete = () => {
    this.props.onDeleteSubject(this.state.id);
    this.setState({
      deleteVisible: false,
      id: 0
    });
  };

  onHideDeleteVisible = () => {
    this.setState({
      deleteVisible: false,
      id: 0
    });
  };

  actionTemplate = (data, column) => {
    return (
      <div>
        <Button
          title="Xem chi tiết"
          onClick={() => this.onShowDetail(data.Id)}
          theme="success"
          style={{ marginRight: ".3em", padding: "8px" }}
        >
          <i className="material-icons">search</i>
        </Button>
        <Button
          title="Xóa"
          onClick={() => this.onDeleteShow(data.Id)}
          theme="secondary"
          style={{ marginRight: ".3em", padding: "8px" }}
        >
          <i className="material-icons">delete</i>
        </Button>
      </div>
    );
  };

  render() {
    const dialog = (
      <Dialog
        header="Thêm Học phần"
        visible={this.state.visible}
        style={{ width: "60vw" }}
        onHide={this.onCloseAdd}
        footer={
          <div>
            <Button
              type="button"
              className="btn btn-primary"
              key="save"
              onClick={this.onCloseAndCreate}
              theme="success"
            >
              Tạo
            </Button>
            <Button
              type="button"
              className="btn btn-default"
              key="close"
              onClick={this.onCloseAdd}
              theme="secondary"
            >
              Hủy
            </Button>
          </div>
        }
      >
        <Row>
          <Col lg="2" md="2" sm="2">
            Mã học phần:
          </Col>
          <Col lg="4" md="4" sm="4">
            <FormInput
              type="text"
              value={this.state.subjectCode}
              onChange={this.handleSubjectCode}
              placeholder="MTH003"
              className="mb-2"
            />
          </Col>
          <Col lg="2" md="2" sm="2">
            Tên học phần:
          </Col>
          <Col lg="4" md="4" sm="4">
            <FormInput
              type="text"
              value={this.state.subjectName}
              onChange={this.handleSubjectName}
              placeholder="Tên..."
              className="mb-2"
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="2" md="2" sm="2">
            Số tín chỉ:
          </Col>
          <Col lg="4" md="4" sm="4">
            <FormInput
              type="text"
              value={this.state.credits}
              onChange={this.handleCredits}
              placeholder="4"
              className="mb-2"
            />
          </Col>
          <Col lg="2" md="2" sm="2">
            Số tiết lý thuyết:
          </Col>
          <Col lg="4" md="4" sm="4">
            <FormInput
              type="text"
              value={this.state.theory}
              onChange={this.handleTheory}
              placeholder="20"
              className="mb-2"
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="2" md="2" sm="2">
            Số tiết thực hành:
          </Col>
          <Col lg="4" md="4" sm="4">
            <FormInput
              type="text"
              value={this.state.practice}
              onChange={this.handlePractice}
              placeholder="30"
              className="mb-2"
            />
          </Col>
          <Col lg="2" md="2" sm="2">
            Số tiết bài tập:
          </Col>
          <Col lg="4" md="4" sm="4">
            <FormInput
              type="text"
              value={this.state.exercise}
              onChange={this.handleExercise}
              placeholder="40"
              className="mb-2"
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="2" md="2" sm="2">
            Mô tả môn học:
          </Col>
          <Col lg="10" md="10" sm="10">
            <FormTextarea
              value={this.state.description}
              onChange={this.handleDescription}
              className="mb-2"
            />
          </Col>
        </Row>
      </Dialog>
    );

    const alertDialog = (
      <div>
        <Dialog
          header="Thông báo"
          visible={this.state.deleteVisible}
          style={{ width: "50vw" }}
          footer={
            <div>
              <Button onClick={this.onDelete} theme="success">
                Xóa
              </Button>
              <Button onClick={this.onHideDeleteVisible} theme="secondary">
                Hủy
              </Button>
            </div>
          }
          onHide={this.onHideDeleteVisible}
        >
          {`Bạn thực sự muốn xóa môn học ${
            this.state.id !== 0
              ? this.props.subjects.filter(row => row.Id === this.state.id)[0]
                  .SubjectName
              : ""
          }`}
        </Dialog>
      </div>
    );

    const reviewDialog = (
      <Dialog
        header="Danh sách môn từ file:"
        visible={this.state.reviewVisible}
        style={{ width: "50vw" }}
        onHide={this.onClose}
        footer={
          <div>
            <Button
              type="button"
              className="btn btn-primary"
              key="save"
              onClick={this.onCloseAndAddSubjects}
              theme="success"
            >
              Tạo
            </Button>
            <Button
              type="button"
              className="btn btn-default"
              key="close"
              onClick={this.onClose}
              theme="secondary"
            >
              Hủy
            </Button>
          </div>
        }
      >
        <Col lg="12" md="12" sm="12">
          <DataTable
            value={this.state.tmpSubjects}
            style={{ height: "30vw", overflowY: "scroll" }}
          >
            <Column field="subjectcode" header="Mã học phần" style={{ width: "2em" }} />
            <Column field="subjectname" header="Tên học phần" style={{ width: "5em" }} />
            <Column field="credit" header="Tín chỉ" style={{ width: "1em" }} />
            <Column field="theoryperiod" header="Tiết lý thuyết" style={{ width: "1em" }} />
            <Column field="practiceperiod" header="Tiết thực hành" style={{ width: "1em" }} />
            <Column field="exerciseperiod" header="Tiết bài tập" style={{ width: "1em" }} />
          </DataTable>
        </Col>
      </Dialog>
    );

    const detailDialog = (
      <Dialog
        header="Mô tả môn học:"
        visible={this.state.detailVisible}
        style={{ width: "50vw" }}
        onHide={this.onCloseDetail}
        footer={
          <Button
            type="button"
            className="btn btn-default"
            key="close"
            onClick={this.onCloseDetail}
            theme="success"
          >
            Đóng
          </Button>
        }
      >
        <Row>
          <Col lg="12" md="12" sm="12">
            <div>{this.state.showDescription}</div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="12" md="12" sm="12">
            <div>Danh sách các CTĐT sử dụng môn học:</div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="12" md="12" sm="12">
            <DataTable
              value={logic.filterToArrays(
                this.props.eduPrograms,
                this.props.usingEduPro
              )}
              style={{ height: "20vw", overflowY: "scroll" }}
            >
              <Column field="EduName" header="Tên Chương trình đào tạo" />
            </DataTable>
          </Col>
        </Row>
      </Dialog>
    );

    const header = (
      <Row>
        <Col lg="2" md="2" sm="2">
          <p align="left">
            <Button onClick={this.onOpenAdd} theme="success">
              <i className="material-icons">playlist_add</i> Thêm HP
            </Button>
          </p>
        </Col>
        <Col lg="2" md="2" sm="2">
          <DataInputCom importFile={this.importFile} />
        </Col>
        <Col lg="2" md="2" sm="2">
          <label onClick={this.onExport} className="export">
            <i className="material-icons">save_alt</i> Tạo file Excel
          </label>
        </Col>
        <Col lg="6" md="6" sm="6">
          <p align="right">
            <i className="material-icons" style={{ margin: "4px 4px 0 0" }}>
              search
            </i>
            <InputText
              type="search"
              onInput={e => this.setState({ globalFilter: e.target.value })}
              placeholder="Tìm kiếm"
              size="50"
            />
          </p>
        </Col>
      </Row>
    );

    return (
      <div>
        <Row>
          <Col lg="12" md="12" sm="12">
            <DataTable
              header={header}
              paginator={true}
              rows={6}
              ref={el => (this.dt = el)}
              globalFilter={this.state.globalFilter}
              emptyMessage="No records found"
              value={this.props.subjects}
            >
              <Column
                sortable={true}
                field="SubjectCode"
                header="Mã học phần"
                 style={{ width: "2em" }}
              />
              <Column
                sortable={true}
                field="SubjectName"
                header="Tên học phần"
                 style={{ width: "4em" }}
              />
              <Column sortable={true} field="Credit" header="Tín chỉ"  style={{ width: "1em" }}/>
              <Column
                sortable={true}
                field="TheoryPeriod"
                header="Tiết lý thuyết"
                 style={{ width: "1em" }}
              />
              <Column
                sortable={true}
                field="PracticePeriod"
                header="Tiết thực hành"
                 style={{ width: "1em" }}
              />
              <Column
                sortable={true}
                field="ExercisePeriod"
                header="Tiết bài tập"
                 style={{ width: "1em" }}
              />
              <Column
                body={this.actionTemplate}
                style={{ textAlign: "center", width: "2em" }}
              />
            </DataTable>
          </Col>
        </Row>
        {dialog}
        {reviewDialog}
        {detailDialog}
        {alertDialog}
      </div>
    );
  }
}
