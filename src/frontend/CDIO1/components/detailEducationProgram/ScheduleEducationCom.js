import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Row, Col, Button } from "shards-react";
import { Dialog } from "primereact/dialog";
import { AutoComplete } from "primereact/autocomplete";
import { OrderList } from "primereact/orderlist";
import { Spinner } from "primereact/spinner";
import { ColumnGroup } from "primereact/columngroup";
import { InputText } from "primereact/inputtext";

import * as logic from "../../business/logicScheduleEdu";

export default class ScheduleEducationCom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogTable: false,
      semester: 1,
      filterSubjects: [],
      listSubjects: [],
      optionSubjects: [],
      semesters: [],
      subjectAlertVisible: false,
      row: {},
      groupSubjectsFrom7: [],
      subjectsFrom7: [],
      blockSuggestions: null,
      block: null
    };
  }

  // get targetNodes from redux
  getScheduleNodes = scheduleNodes => {
    this.setState({ semesters: scheduleNodes });
  };
  // end get targetNodes from redux

  suggestBlocks = event => {
    if (this.state.groupSubjectsFrom7) {
      const results = Object.keys(this.state.groupSubjectsFrom7).filter(
        block => {
          return block.toLowerCase().startsWith(event.query.toLowerCase());
        }
      );

      this.setState({ blockSuggestions: results });
    }
  };

  addSemester = () => {
    const data = logic.addSemester(
      this.state.semester,
      this.state.listSubjects,
      this.state.semesters
    );
    let newSemester = this.state.semester;
    this.setState({
      isDialogTable: false,
      listSubjects: [],
      semester: ++newSemester,
      semesters: data
    });
  };

  onHideAddSemester = () => {
    this.setState({
      isDialogTable: false
    });
  };

  onOpenAddSubject = semester => {
    const { groupSubjects, subjects } = this.props.getData();

    this.setState({
      isDialogTable: true,
      semester: !isNaN(semester) ? semester : this.state.semester,
      groupSubjectsFrom7: groupSubjects,
      subjectsFrom7: subjects
    });
  };

  openDeleteSubject = (row, semester) => {
    this.setState({
      subjectAlertVisible: true,
      semester: semester,
      row: row
    });
  };

  hideDeleteSubject = () => {
    this.setState({
      subjectAlertVisible: false,
      semester: 1
    });
  };

  deleteSubject = () => {
    const semesters = logic.deleteSubject(
      this.state.semesters,
      this.state.semester,
      this.state.row
    );
    this.setState({
      subjectAlertVisible: false,
      semesters: semesters,
      semester: 1
    });
  };

  openDeleteSemester = rowData => {
    this.setState({
      semesterAlertVisible: true,
      semester: rowData.semester
    });
  };

  hideDeleteSemester = () => {
    this.setState({
      semesterAlertVisible: false,
      semester: 1
    });
  };

  deleteSemeter = () => {
    const semesters = this.state.semesters.filter(
      ele => ele.semester !== this.state.semester
    );
    this.setState({
      semesterAlertVisible: false,
      semesters: semesters,
      semester: 1
    });
  };

  filterSubjects = e => {
    this.setState({
      filterSubjects: logic.filterSubjects(
        e,
        this.state.block &&
          Object.keys(this.state.groupSubjectsFrom7).includes(this.state.block)
          ? this.state.groupSubjectsFrom7[this.state.block]
          : this.state.subjectsFrom7
      )
    });
  };

  onChangeListSubjects = e => {
    if (typeof e.value === "object") {
      const subject = e.value;
      const subjects = logic.addSubjectInOnchange(
        this.state.listSubjects,
        subject
      );
      this.setState({ listSubjects: subjects });
    }
    this.setState({ optionSubjects: e.value });
  };

  deleteSubjectOnTable = subject => {
    const subjects = this.state.listSubjects.filter(
      ele => ele.Id !== subject.Id
    );
    this.setState({ listSubjects: subjects });
  };

  onRowSubjectReorder = (value, semester) => {
    const subjects = [...value];
    const semesters = logic.onRowSubjectReorder(
      subjects,
      semester,
      this.state.semesters
    );
    this.setState({ semesters: semesters });
  };

  onEditorValueChange(props, value, semester) {
    const semesters = logic.editorValueChange(
      props,
      value,
      semester,
      this.state.semesters
    );
    this.setState({ semesters: semesters });
  }

  inputNoteEditor = (props, value, semester) => {
    return (
      <InputText
        type="text"
        value={props.rowData.Note}
        onChange={e =>
          this.onEditorValueChange(props, e.target.value, semester)
        }
      />
    );
  };

  noteEditor = (props, value, semester) => {
    return this.inputNoteEditor(props, value, semester);
  };

  rowExpansionTemplate = data => {
    const headerGroup = (
      <ColumnGroup>
        <Row>
          <Column header="Mã Học Phần" rowSpan={2} style={{ width: "3em" }} />
          <Column header="Tên Học Phần" rowSpan={2} style={{ width: "7em" }} />
          <Column header="Loại HP" rowSpan={2} style={{ width: "0.5em" }} />
          <Column header="Số TC" rowSpan={2} style={{ width: "0.5em" }} />
          <Column header="Số Tiết" colSpan={3} style={{ width: "5em" }} />
          <Column header="Ghi Chú" rowSpan={2} style={{ width: "4em" }} />
          <Column rowSpan={2} style={{ width: "0.5em" }} />
          <Column
            header={
              <Button
                title={`Thêm môn học`}
                onClick={() => this.onOpenAddSubject(data.semester)}
                theme="success"
                style={{ padding: "0.6em", margin: "0" }}
              >
                <i className="material-icons">add</i>
              </Button>
            }
            rowSpan={2}
            style={{ width: "2em" }}
          />
        </Row>
        <Row>
          <Column header="Lý Thuyết" />
          <Column header="Thực Hành" />
          <Column header="Bài Tập" />
        </Row>
      </ColumnGroup>
    );

    return (
      <DataTable
        headerColumnGroup={headerGroup}
        responsive={true}
        value={data.subjects}
        editable={true}
        reorderableRows={true}
        onRowReorder={e => this.onRowSubjectReorder(e.value, data.semester)}
      >
        <Column field="SubjectCode" />
        <Column field="SubjectName" />
        <Column field="option" style={{ textAlign: "center" }} />
        <Column field="Credit" style={{ textAlign: "center" }} />
        <Column field="TheoryPeriod" style={{ textAlign: "center" }} />
        <Column field="PracticePeriod" style={{ textAlign: "center" }} />
        <Column field="ExercisePeriod" style={{ textAlign: "center" }} />
        <Column
          field="Note"
          editor={(props, value) =>
            this.noteEditor(props, value, data.semester)
          }
        />
        <Column rowReorder={true} style={{ textAlign: "center" }} />
        <Column
          body={(rowData, column) =>
            this.actionTemplateForSubjects(rowData, column, data.semester)
          }
          style={{ textAlign: "center" }}
        />
      </DataTable>
    );
  };

  actionTemplateForSubjects(rowData, column, semester) {
    return (
      <div>
        <Button
          onClick={() => this.openDeleteSubject(rowData, semester)}
          theme="secondary"
          title={`Xóa môn học`}
          style={{ padding: "0.5em", margin: "0" }}
        >
          <i className="material-icons">clear</i>
        </Button>
      </div>
    );
  }

  actionTemplateForSemesters(rowData, column) {
    return (
      <div>
        <Button
          onClick={() => this.openDeleteSemester(rowData)}
          theme="light"
          title={`Xóa học kì`}
          style={{ padding: "0.5em", margin: "0" }}
        >
          <i className="material-icons">clear</i>
        </Button>
      </div>
    );
  }

  subjectTemplate = subject => {
    return (
      <div className="p-clearfix">
        <div
          style={{
            fontSize: "14px",
            float: "left",
            margin: "5px 5px 0 0",
            borderBottom: "ridge"
          }}
        >
          {subject.SubjectName}
        </div>
        <p
          style={{
            fontSize: "14px",
            float: "right",
            margin: "5px 5px 0 0",
            borderBottom: "ridge"
          }}
          onClick={() => this.deleteSubjectOnTable(subject)}
        >
          <i className="material-icons">clear</i>
        </p>
      </div>
    );
  };

  footerDialogTable = (
    <div>
      <Button onClick={this.addSemester} theme="success">
        Thêm
      </Button>
      <Button onClick={this.onHideAddSemester} theme="secondary">
        Hủy
      </Button>
    </div>
  );

  render() {
    let headerGroup = (
      <ColumnGroup>
        <Row>
          <Column
            style={{ width: "5em" }}
            header={
              <Button
                title="Thêm học kì"
                onClick={this.onOpenAddSubject}
                theme="success"
              >
                <i className="material-icons">playlist_add</i>
              </Button>
            }
          />
          <Column style={{ width: "5em" }} />
          <Column header="HỌC KÌ" />
        </Row>
      </ColumnGroup>
    );

    return (
      <div>
        <DataTable
          value={this.state.semesters}
          expandedRows={this.state.expandedRows}
          onRowToggle={e => this.setState({ expandedRows: e.data })}
          rowExpansionTemplate={this.rowExpansionTemplate}
          headerColumnGroup={headerGroup}
        >
          <Column
            field="semester"
            style={{ width: "5em", backgroundColor: "#E2EFD9" }}
            expander={true}
          />
          <Column
            body={(rowData, column) =>
              this.actionTemplateForSemesters(rowData, column)
            }
            style={{
              textAlign: "center",
              backgroundColor: "#E2EFD9"
            }}
          />
          <Column
            field="semester"
            className="text-center font-weight-bold"
            style={{ backgroundColor: "#E2EFD9" }}
          />
        </DataTable>

        <Dialog
          header="Thêm Học Kì - Môn Học"
          visible={this.state.isDialogTable}
          onHide={this.onHideAddSemester}
          style={{ width: "50vw" }}
          footer={this.footerDialogTable}
        >
          <Row>
            <Col lg="3" md="3" sm="3">
              <label>Học kì:</label>
            </Col>
            <Col lg="1" md="1" sm="1">
              <Spinner
                value={this.state.semester}
                onChange={e => {
                  if (e.value > 0 && e.value < 13)
                    this.setState({ semester: e.value });
                }}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg="3" md="3" sm="3">
              <label>Khối kiến thức:</label>
            </Col>
            <Col lg="9" md="9" sm="9">
              <AutoComplete
                value={this.state.block}
                onChange={e => this.setState({ block: e.value })}
                suggestions={this.state.blockSuggestions}
                completeMethod={e => this.suggestBlocks(e)}
                placeholder="BB"
                size={40}
                dropdown={true}
                minLength={1}
              />
            </Col>
          </Row>
          <br />
          <Row>
            <Col lg="3" md="3" sm="3">
              <span>Môn Học thêm vào:</span>
            </Col>
            <Col lg="9" md="9" sm="9">
              <AutoComplete
                field="SubjectName"
                value={this.state.optionSubjects}
                dropdown={true}
                onChange={e => this.onChangeListSubjects(e)}
                size={40}
                placeholder="Toán rời rạc"
                minLength={1}
                suggestions={this.state.filterSubjects}
                completeMethod={e => this.filterSubjects(e)}
              />
            </Col>
          </Row>
          <hr />
          <Row>
            <Col lg="12" md="12" sm="12">
              <OrderList
                header="Danh Sách Môn Học:"
                responsive={true}
                value={this.state.listSubjects}
                itemTemplate={this.subjectTemplate}
              />
            </Col>
          </Row>
        </Dialog>
        <Dialog
          header="Thông báo"
          visible={this.state.subjectAlertVisible}
          style={{ width: "50vw" }}
          footer={
            <div>
              <Button onClick={this.deleteSubject} theme="success">
                Xóa
              </Button>
              <Button onClick={this.hideDeleteSubject} theme="secondary">
                Hủy
              </Button>
            </div>
          }
          onHide={this.hideDeleteSubject}
        >
          {`Bạn thực sự muốn xóa môn ${
            this.state.row.SubjectName
          } trong học kì ${this.state.semester}`}
        </Dialog>
        <Dialog
          header="Thông báo"
          visible={this.state.semesterAlertVisible}
          style={{ width: "50vw" }}
          footer={
            <div>
              <Button onClick={this.deleteSemeter} theme="success">
                Xóa
              </Button>
              <Button onClick={this.hideDeleteSemester} theme="secondary">
                Hủy
              </Button>
            </div>
          }
          onHide={this.hideDeleteSemester}
        >
          {`Bạn thực sự muốn xóa học kì ${this.state.semester}`}
        </Dialog>
      </div>
    );
  }
}
