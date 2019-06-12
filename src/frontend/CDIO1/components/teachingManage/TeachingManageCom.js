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
    const iduser = [...new Set([...this.state.subject.arrayIDUser, data.id])];
    const idmainteacher =
      data.id === this.state.subject.IdMainTeacher
        ? null
        : this.state.subject.IdMainTeacher;
    const idsubject = this.state.subject.IdSubject;
    const idsubjectblock = this.state.subject.IdSubjectBlock;
    const block = {
      iduser,
      idmainteacher,
      idsubject,
      idsubjectblock
    };
    const thisData = [block];
    this.props.onAddTeacher(thisData, this.props.ctdt);
    const subject = {
      IdSubject: idsubject,
      IdSubjectBlock: idsubjectblock,
      IdMainTeacher: idmainteacher,
      arrayIDUser: iduser,
    }
    this.setState({
      subject: subject
    });
  };

  onAddMainTeacher = data => {
    const idmainteacher = data.id;
    const iduser = [...this.state.subject.arrayIDUser].filter(
      id => id !== data.id
    );
    const idsubject = this.state.subject.IdSubject;
    const idsubjectblock = this.state.subject.IdSubjectBlock;
    const block = {
      iduser,
      idmainteacher,
      idsubject,
      idsubjectblock
    };
    const thisData = [block];
    this.props.onAddTeacher(thisData, this.props.ctdt);
    const subject = {
      IdSubject: idsubject,
      IdSubjectBlock: idsubjectblock,
      IdMainTeacher: idmainteacher,
      arrayIDUser: iduser,
    }
    this.setState({
      subject: subject
    });
  };

  onDeleteTeacher = data => {
    const idmainteacher =
      data.id === this.state.subject.IdMainTeacher
        ? null
        : this.state.subject.IdMainTeacher;
    const iduser = [...this.state.subject.arrayIDUser].filter(
      id => id !== data.id
    );
    const idsubject = this.state.subject.IdSubject;
    const idsubjectblock = this.state.subject.IdSubjectBlock;
    const block = {
      iduser,
      idmainteacher,
      idsubject,
      idsubjectblock
    };
    const thisData = [block];
    this.props.onAddTeacher(thisData, this.props.ctdt);
    const subject = {
      IdSubject: idsubject,
      IdSubjectBlock: idsubjectblock,
      IdMainTeacher: idmainteacher,
      arrayIDUser: iduser,
    }
    this.setState({
      subject: subject
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
          commonLogic.isMainTeacher(data, this.state.subject))?(
          <Button
            title="Hủy phân công"
            onClick={() => this.onDeleteTeacher(data)}
            theme="secondary"
            style={{ marginRight: ".3em", padding: "8px" }}
          >
            <i className="material-icons">person_add_disabled</i>
          </Button>
        ):null}
      </div>
    );
  };

  render() {
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
      <Col lg="6" md="6" sm="6">
        <div style={{ float: "left" }}>
        <i className="material-icons" style={{ margin: "4px 4px 0 0"}}>
          search
        </i>
        <InputText
          type="search"
          onInput={e => this.setState({ globalFilter: e.target.value })}
          placeholder="Tìm kiếm"
          size="50"
        />
        </div>
      </Col>
      <Col lg="6" md="6" sm="6">
        <label onClick={()=>this.props.onExportSubjectFilePDF(this.props.ctdt)} style={{float: "right"}} className="exportPDF">
            <i className="material-icons">save_alt</i> Tạo file PDF
        </label>
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
              value={this.props.tmpsubjects}
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
