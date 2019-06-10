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
      nationalFilter: "",
      subject: {}
    };
  }

  onOpenAssignment = data => {
    console.log(data)
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
    const iduser = [...this.state.subject.arrayIDUser, data.id];
    const idmainteacher =
      data.id === this.state.subject.idMainTeacher
        ? null
        : this.state.subject.idMainTeacher;
    const idsubject = this.state.subject.IdSubject;
    const idsubjectblock = this.state.subject.IdSubjectBlock;
    const iddetail = this.props.detailEduProgram.Id;
    const block = {
      iduser,
      idmainteacher,
      idsubject,
      idsubjectblock,
      iddetail
    };
    const thisData=[block];
    this.props.onAddTeacher(thisData);
    this.setState({
      subject: {}
    });
  };

  onAddMainTeacher = data => {
    const idmainteacher = data.id;
    const iduser = [...this.state.subject.arrayIDUser].filter(
      id => id !== data.id
    );
    const idsubject = this.state.subject.IdSubject;
    const idsubjectblock = this.state.subject.IdSubjectBlock;
    const iddetail = this.props.detailEduProgram.Id;
    const block = {
      iduser,
      idmainteacher,
      idsubject,
      idsubjectblock,
      iddetail
    };
    const thisData=[block];
    this.props.onAddTeacher(thisData);
    this.setState({
      subject: {}
    });
  };

  onDeleteTeacher = data => {
    const idmainteacher =
      data.id === this.state.subject.idMainTeacher
        ? null
        : this.state.subject.idMainTeacher;
    const iduser = [...this.state.subject.arrayIDUser].filter(
      id => id !== data.id
    );
    const idsubject = this.state.subject.IdSubject;
    const idsubjectblock = this.state.subject.IdSubjectBlock;
    const iddetail = this.props.detailEduProgram.Id;
    const block = {
      iduser,
      idmainteacher,
      idsubject,
      idsubjectblock,
      iddetail
    };
    const thisData=[block];
    this.props.onAddTeacher(thisData);
    this.setState({
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
        {!commonLogic.isMainTeacher(data, this.state.subject) && (
          <Button
            title="Thêm giảng viên"
            onClick={() => this.onAddMainTeacher(data)}
            theme="info"
            style={{ marginRight: ".3em", padding: "8px" }}
          >
            <i className="material-icons">person_add</i>
          </Button>
        )}
        {!commonLogic.isTeacher(data, this.state.subject) && (
          <Button
            title="Thêm trợ giảng"
            onClick={() => this.onAddTeacher(data)}
            theme="success"
            style={{ marginRight: ".3em", padding: "8px" }}
          >
            <i className="material-icons">group_add</i>
          </Button>
        )}
        {(commonLogic.isTeacher(data, this.state.subject) ||
          commonLogic.isMainTeacher(data, this.state.subject)) && (
          <Button
            title="Hủy phân công"
            onClick={() => this.onDeleteTeacher(data)}
            theme="secondary"
            style={{ marginRight: ".3em", padding: "8px" }}
          >
            <i className="material-icons">person_add_disabled</i>
          </Button>
        )}
      </div>
    );
  };

  render() {
    // console.log(this.props.users)
    // console.log(this.props.subjects)
    const nationHeader = (
      <Row style={{ margin: "0" }}>
        <i className="material-icons" style={{ margin: "4px 4px 0 0" }}>
          search
        </i>
        <InputText
          type="search"
          onInput={e => this.setState({ nationalFilter: e.target.value })}
          placeholder="Tìm kiếm"
          size="50"
        />
      </Row>
    );

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
              Đóng
            </Button>
          </div>
        }
      >
        <Row>
          <Col lg="12" md="12" sm="12" style={{ height: "380px" }}>
            <DataTable
              paginator={true}
              rows={6}
              header={nationHeader}
              ref={el => (this.dt = el)}
              globalFilter={this.state.nationalFilter}
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
                style={{ textAlign: "center", width: "3em" }}
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
                field="mainTeacher"
                header="Giảng viên"
                style={{ width: "5em" }}
              />
              <Column
                field="usernames"
                header="Trợ giảng"
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
