import React, { Component } from "react";

import { Row, Col, Button } from "shards-react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

import * as commonLogic from "../../business/commonEducation";

export default class TeachingManageCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      globalFilter: "",
      subject: {}
    };
  }

  onOpenAssignment = data => {
    this.setState({
      visible: true,
      subject: data
    });
  };

  onCloseAdd = () => {
    this.setState({
      visible: false,
      subject: {}
    });
  };

  onAddTeacher = data => {
    const iduser = data.id;
    const idsubject = this.state.subject.IdSubject;
    const idsubjectblock = this.state.subject.IdSubjectBlock;
    const iddetail = this.props.detailEduProgram.Id;
    const block = {
      iduser,
      idsubject,
      idsubjectblock,
      iddetail
    };
    this.props.onAddTeacher(block);
    this.setState({
      visible: false,
      subject: {}
    });
  };

  actionTemplate = (data, column) => {
    return (
      <div>
        <Button
          title="Phân công"
          onClick={() => this.onOpenAssignment(data)}
          theme="success"
          style={{ marginRight: ".3em", padding: "8px" }}
        >
          <i className="material-icons">assignment</i>
        </Button>
      </div>
    );
  };

  actionTemplateDial = (data, column) => {
    return (
      <div>
        <Button
          title="Phân công"
          onClick={() => this.onAddTeacher(data)}
          theme="success"
          style={{ marginRight: ".3em", padding: "8px" }}
        >
          <i className="material-icons">add</i>
        </Button>
      </div>
    );
  };

  render() {
    const dialog = (
      <Dialog
        header="Phân công giảng viên"
        visible={this.state.visible}
        style={{ width: "50vw" }}
        onHide={this.onCloseAdd}
        footer={
          <div>
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
          <Col
            lg="12"
            md="12"
            sm="12"
            style={{ overflowY: "scroll", height: "320px" }}
          >
            <DataTable
              value={this.props.users.filter(user =>
                user.role.includes("TEACHER")
              )}
            >
              <Column
                field="name"
                header="Giảng viên"
                style={{ width: "5em" }}
              />
              <Column field="email" header="Email" style={{ width: "5em" }} />
              <Column
                body={this.actionTemplateDial}
                style={{ textAlign: "center", width: "1em" }}
              />
            </DataTable>
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
              value={commonLogic.mapUserToSubject(
                this.props.subjects,
                this.props.users
              )}
            >
              <Column
                field="SubjectCode"
                header="Mã học phần"
                style={{ width: "2em" }}
              />
              <Column
                field="SubjectName"
                header="Tên học phần"
                style={{ width: "5em" }}
              />
              <Column
                field="username"
                header="Giảng viên phụ trách"
                style={{ width: "5em" }}
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
