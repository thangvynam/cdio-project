import React, { Component } from "react";

import { Row, Col, Button, FormSelect, FormInput } from "shards-react";
import { DataTable } from "primereact/datatable";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

export default class OutcomeStandardCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameOutcome: "",
      faculty: { id: "0" },
      program: { id: "0" },
      schoolYear: "",
      visible: false,
      facultyDup: { id: "0" },
      programDup: { id: "0" },
      dupVisible: false,
      schoolYearDup: "",
      duplicatedOutcomeId: 0,
      outcomeReview: [],
      deleteVisible: false,
      idOutcome: 0,
      globalFilter: ""
    };
  }

  onOpenAdd = () => {
    this.props.onLoadFaculties();
    this.props.onLoadPrograms();
    this.setState({
      visible: true
    });
  };

  handleNameOutcomeChange = event => {
    this.setState({ nameOutcome: event.target.value });
  };

  handleSchoolYearChange = event => {
    if (event.target.value.length > 4)
      this.setState({ schoolYear: event.target.value.substr(0, 4) });
    else if (
      event.target.value.length === 0 ||
      !isNaN(event.target.value[event.target.value.length - 1])
    )
      this.setState({ schoolYear: event.target.value });
  };

  handleFacultyChange = event => {
    const id = event.currentTarget.value;
    if (id !== 0) {
      const index = event.nativeEvent.target.selectedIndex;
      const name = event.nativeEvent.target[index].text;
      this.setState({ faculty: { id, name } });
    }
  };

  handleProgramChange = event => {
    const id = event.currentTarget.value;
    if (id !== 0) {
      const index = event.nativeEvent.target.selectedIndex;
      const name = event.nativeEvent.target[index].text;
      this.setState({ program: { id, name } });
    }
  };

  onCloseAdd = () => {
    this.setState({
      visible: false
    });
  };

  onCloseAndCreate = () => {
    if (
      this.state.faculty.id !== "0" &&
      this.state.program.id !== "0" &&
      this.state.nameOutcome !== "" &&
      this.state.schoolYear !== ""
    ) {
      let NameOutcomeStandard = this.state.nameOutcome;
      let IdFaculty = parseInt(this.state.faculty.id, 10);
      let IdProgram = parseInt(this.state.program.id, 10);
      let SchoolYear = this.state.schoolYear;
      let data = {
        IdFaculty,
        IdProgram,
        IdUser: 1,
        NameOutcomeStandard,
        DateCreated: new Date().toISOString(),
        DateEdited: new Date(),
        SchoolYear
      };
      this.props.onAddOutcomeStandard(data);
      this.setState({
        nameOutcome: "",
        schoolYear: "",
        visible: false
      });
    }
  };

  onEdit = IdOutcome => {
    this.props.history.push({
      pathname: "/outcome-standard/edit",
      search: `?id=${IdOutcome}`
    });
  };

  handleNameOutcomeDupChange = event => {
    this.setState({ nameOutcomeDup: event.target.value });
  };

  handleSchoolYearDupChange = event => {
    if (event.target.value.length > 4)
      this.setState({ schoolYearDup: event.target.value.substr(0, 4) });
    else if (
      event.target.value.length === 0 ||
      !isNaN(event.target.value[event.target.value.length - 1])
    )
      this.setState({ schoolYearDup: event.target.value });
  };

  handleFacultyDupChange = event => {
    const id = event.currentTarget.value;
    if (id !== 0) {
      const index = event.nativeEvent.target.selectedIndex;
      const name = event.nativeEvent.target[index].text;
      this.setState({ facultyDup: { id, name } });
    }
  };

  handleProgramDupChange = event => {
    const id = event.currentTarget.value;
    if (id !== 0) {
      const index = event.nativeEvent.target.selectedIndex;
      const name = event.nativeEvent.target[index].text;
      this.setState({ programDup: { id, name } });
    }
  };

  onCloseDup = () => {
    this.setState({
      dupVisible: false,
      duplicatedOutcomeId: 0,
      outcomeReview: []
    });
  };

  onCloseDupAndCreate = () => {
    if (
      this.state.facultyDup.id !== "0" &&
      this.state.programDup.id !== "0" &&
      this.state.nameOutcomeDup !== "" &&
      this.state.schoolYearDup !== ""
    ) {
      let NameOutcomeStandard = this.state.nameOutcomeDup;
      let IdFaculty = parseInt(this.state.facultyDup.id, 10);
      let IdProgram = parseInt(this.state.programDup.id, 10);
      let SchoolYear = this.state.schoolYearDup;
      let data = {
        IdFaculty,
        IdProgram,
        IdUser: 1,
        NameOutcomeStandard,
        DateCreated: new Date().toISOString(),
        DateEdited: new Date(),
        SchoolYear,
        DuplicatedOutcomeId: this.state.duplicatedOutcomeId
      };
      this.props.onDupOutcomeStandard(data);
      this.setState({
        visible: false,
        duplicatedOutcomeId: 0,
        outcomeReview: []
      });
    }
  };

  onDuplicate = IdOutcome => {
    this.props.onLoadDetailOutcomeStandard(IdOutcome);
    this.setState({
      dupVisible: true,
      duplicatedOutcomeId: IdOutcome,
      outcomeReview: this.props.detailOutcomeStandard
    });
  };

  onDeleteShow = IdOutcome => {
    this.setState({
      deleteVisible: true,
      idOutcome: IdOutcome
    });
  };

  onDelete = () => {
    this.props.onDeleteOutcomeStandard(this.state.idOutcome);
    this.setState({
      deleteVisible: false,
      idOutcome: 0
    });
  };

  onHideDeleteVisible = () => {
    this.setState({
      deleteVisible: false,
      idOutcome: 0
    });
  };

  actionTemplate = (data, column) => {
    return (
      <div>
        <Button
          title="Chỉnh sửa"
          onClick={() => this.onEdit(data.Id)}
          theme="success"
          style={{ marginRight: ".3em", padding: "8px" }}
        >
          <i className="material-icons">edit</i>
        </Button>
        <Button
          title="Tạo bản sao"
          onClick={() => this.onDuplicate(data.Id)}
          theme="info"
          style={{ marginRight: ".3em", padding: "8px" }}
        >
          <i className="material-icons">file_copy</i>
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
        header="Thêm Chuẩn đầu ra"
        visible={this.state.visible}
        style={{ width: "50vw" }}
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
          <Col lg="3" md="3" sm="3">
            Tên:
          </Col>
          <Col lg="9" md="9" sm="9">
            <FormInput
              type="text"
              value={this.state.nameOutcome}
              onChange={this.handleNameOutcomeChange}
              placeholder="Tên..."
              className="mb-2"
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="3" md="3" sm="3">
            Năm học:
          </Col>
          <Col lg="9" md="9" sm="9">
            <FormInput
              type="text"
              value={this.state.schoolYear}
              onChange={this.handleSchoolYearChange}
              placeholder="2015"
              className="mb-2"
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="3" md="3" sm="3">
            Khoa:
          </Col>
          <Col lg="9" md="9" sm="9">
            <FormSelect onChange={e => this.handleFacultyChange(e)}>
              <option defaultValue key={0} value={0}>
                Chọn...
              </option>
              {Array.isArray(this.props.faculties)
                ? this.props.faculties.map((item, i) => {
                    return (
                      <option key={item.Id} value={item.Id}>
                        {item.NameFaculty}
                      </option>
                    );
                  })
                : null}
            </FormSelect>
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="3" md="3" sm="3">
            Hệ (Loại hình):
          </Col>
          <Col lg="9" md="9" sm="9">
            <FormSelect onChange={e => this.handleProgramChange(e)}>
              <option defaultValue key={0} value={0}>
                Chọn...
              </option>
              {Array.isArray(this.props.programs)
                ? this.props.programs.map((item, i) => {
                    return (
                      <option key={item.Id} value={item.Id}>
                        {item.NameProgram}
                      </option>
                    );
                  })
                : null}
            </FormSelect>
          </Col>
        </Row>
      </Dialog>
    );

    const dupDialog = (
      <Dialog
        header="Sao chép chuẩn đầu ra"
        visible={this.state.dupVisible}
        style={{ width: "50vw" }}
        onHide={this.onCloseDup}
        footer={
          <div>
            <Button
              type="button"
              className="btn btn-primary"
              key="save"
              onClick={this.onCloseDupAndCreate}
              theme="success"
            >
              Tạo bản sao
            </Button>
            <Button
              type="button"
              className="btn btn-default"
              key="close"
              onClick={this.onCloseDup}
              theme="secondary"
            >
              Hủy
            </Button>
          </div>
        }
      >
        <Row>
          <Col lg="1" md="1" sm="1">
            Tên:
          </Col>
          <Col lg="5" md="5" sm="5">
            <FormInput
              type="text"
              value={this.state.nameOutcomeDup}
              onChange={this.handleNameOutcomeDupChange}
              placeholder="Tên..."
              className="mb-2"
            />
          </Col>
          <Col lg="1" md="1" sm="1">
            Năm:
          </Col>
          <Col lg="5" md="5" sm="5">
            <FormInput
              type="text"
              value={this.state.schoolYearDup}
              onChange={this.handleSchoolYearDupChange}
              placeholder="2015"
              className="mb-2"
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="1" md="1" sm="1">
            Khoa:
          </Col>
          <Col lg="5" md="5" sm="5">
            <FormSelect onChange={e => this.handleFacultyDupChange(e)}>
              <option defaultValue key={0} value={0}>
                Chọn...
              </option>
              {Array.isArray(this.props.faculties)
                ? this.props.faculties.map((item, i) => {
                    return (
                      <option key={item.Id} value={item.Id}>
                        {item.NameFaculty}
                      </option>
                    );
                  })
                : null}
            </FormSelect>
          </Col>
          <Col lg="1" md="1" sm="1">
            Hệ:
          </Col>
          <Col lg="5" md="5" sm="5">
            <FormSelect onChange={e => this.handleProgramDupChange(e)}>
              <option defaultValue key={0} value={0}>
                Chọn...
              </option>
              {Array.isArray(this.props.programs)
                ? this.props.programs.map((item, i) => {
                    return (
                      <option key={item.Id} value={item.Id}>
                        {item.NameProgram}
                      </option>
                    );
                  })
                : null}
            </FormSelect>
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="12" md="12" sm="12">
            Chi tiết chuẩn đầu ra:
          </Col>
          <Col
            lg="12"
            md="12"
            sm="12"
            style={{ overflowY: "scroll", height: "240px" }}
          >
            <TreeTable value={this.state.outcomeReview}>
              <Column field="displayName" header="Tên dòng" expander />
            </TreeTable>
          </Col>
        </Row>
      </Dialog>
    );

    const header = (
      <Row style={{ margin: "0" }}>
        <Col lg="6" md="6" sm="6">
          <p align="left">
            <Button onClick={this.onOpenAdd} theme="success">
              <i className="material-icons">playlist_add</i> Thêm CĐR
            </Button>
          </p>
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
              value={this.props.outcomeStandards}
            >
              <Column
                field="NameOutcomeStandard"
                header="Tên"
                style={{ width: "5em" }}
              />
              <Column
                field="NameFaculty"
                header="Khoa"
                style={{ width: "3em" }}
              />
              <Column
                field="NameProgram"
                header="Hệ (Loại hình)"
                style={{ width: "2em" }}
              />
              <Column
                field="NameUser"
                header="Người tạo"
                style={{ width: "2em" }}
              />
              <Column
                field="SchoolYear"
                header="Năm học"
                style={{ width: "1em" }}
              />
              <Column
                body={this.actionTemplate}
                style={{ textAlign: "center", width: "3em" }}
              />
            </DataTable>
          </Col>
        </Row>
        {dialog}
        {dupDialog}
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
            {`Bạn thực sự muốn xóa chuẩn đầu ra ${
              this.state.idOutcome !== 0
                ? this.props.outcomeStandards.filter(
                    row => row.Id === this.state.idOutcome
                  )[0].NameOutcomeStandard
                : ""
            }`}
          </Dialog>
        </div>
      </div>
    );
  }
}
