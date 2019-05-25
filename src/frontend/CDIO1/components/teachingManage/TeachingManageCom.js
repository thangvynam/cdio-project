import React, { Component } from "react";

import { Row, Col, Button, FormSelect, FormInput } from "shards-react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

export default class TeachingManageCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      eduId: 0,
      globalFilter: ""
    };
  }

  actionTemplate = (data, column) => {
    return (
      <div>
        <Button
          title="Phân công"
          onClick={() => console.log("Phân công")}
          theme="success"
          style={{ marginRight: ".3em", padding: "8px" }}
        >
          <i className="material-icons">assignment</i>
        </Button>
      </div>
    );
  };

  render() {
    const dialog = (
      <Dialog
        header="Thêm Chương trình đào tạo"
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
              value={this.state.nameEduPrograme}
              onChange={this.handleNameEduProgramChange}
              placeholder="Tên..."
              className="mb-2"
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="3" md="3" sm="3">
            Trình độ:
          </Col>
          <Col lg="9" md="9" sm="9">
            <FormSelect onChange={e => this.handleLevelChange(e)}>
              <option defaultValue key={0} value={0}>
                Chọn...
              </option>
              {Array.isArray(this.props.levels)
                ? this.props.levels.map((item, i) => {
                    return (
                      <option key={item.Id} value={item.Id}>
                        {item.LevelName}
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
            Mã ngành:
          </Col>
          <Col lg="9" md="9" sm="9">
            <FormSelect onChange={e => this.handleMajorCodeChange(e)}>
              <option defaultValue key={0} value={0}>
                Chọn...
              </option>
              {Array.isArray(this.props.majors)
                ? this.props.majors
                    .filter(
                      row =>
                        this.state.facultyId !== 0
                          ? row.IdFaculty === this.state.facultyId
                          : row
                    )
                    .map((item, i) => {
                      return (
                        <option
                          selected={
                            item.Id === parseInt(this.state.major.Id, 10)
                          }
                          key={item.Id}
                          value={item.Id}
                        >
                          {item.MajorCode}
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
            Ngành:
          </Col>
          <Col lg="9" md="9" sm="9">
            <FormSelect onChange={e => this.handleMajorNameChange(e)}>
              <option defaultValue key={0} value={0}>
                Chọn...
              </option>
              {Array.isArray(this.props.majors)
                ? this.props.majors
                    .filter(
                      row =>
                        this.state.facultyId !== 0
                          ? row.IdFaculty === this.state.facultyId
                          : row
                    )
                    .map((item, i) => {
                      return (
                        <option
                          selected={
                            item.Id === parseInt(this.state.major.Id, 10)
                          }
                          key={item.Id}
                          value={item.Id}
                        >
                          {item.MajorName}
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
        <br />
        <Row>
          <Col lg="3" md="3" sm="3">
            Khóa tuyển:
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
      </Dialog>
    );

    const header = (
      <Row style={{ margin: "0" }}>
        <i className="material-icons" style={{ margin: "4px 4px 0 0" }}>
          search
        </i>
        <InputText
          type="search"
          onInput={e => this.setState({ globalFilter: e.target.value })}
          placeholder="Tìm kiếm"
          size="50"
        />
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
              value={this.props.eduPrograms}
            >
              <Column field="EduName" header="Tên" style={{ width: "5em" }} />
              <Column
                field="LevelName"
                header="Trình độ"
                style={{ width: "2em" }}
              />
              <Column
                field="MajorCode"
                header="Mã ngành"
                style={{ width: "2em" }}
              />
              <Column
                field="MajorName"
                header="Ngành"
                style={{ width: "3em" }}
              />
              <Column
                field="NameProgram"
                header="Hệ (Loại hình)"
                style={{ width: "2em" }}
              />
              <Column
                field="SchoolYear"
                header="Khóa tuyển"
                style={{ width: "1em" }}
              />
              <Column
                body={this.actionTemplate}
                style={{ textAlign: "center", width: "1em" }}
              />
            </DataTable>
          </Col>
        </Row>
        {dialog}
      </div>
    );
  }
}
