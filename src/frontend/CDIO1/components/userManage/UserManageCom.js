import React, { Component } from "react";
import XLSX from "xlsx";

import { Row, Col, Button, FormInput } from "shards-react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import DataInputCom from "./DataInputCom"

import * as logic from "../../business/index";

export default class UserManageCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      roles: [],
      deleteVisible: false,
      id: 0,
      globalFilter: "",
      name: "",
      username: "",
      email: "",
      data: {},
      reviewVisible: false,
      listTeachersImport: []
    };
  }

  actionTemplate = (data, column) => {
    return (
      <div>
        <Button
          title="Xóa"
          onClick={() => this.onDeleteShow(data)}
          theme="secondary"
          style={{ marginRight: ".3em", padding: "8px" }}
        >
          <i className="material-icons">delete</i>
        </Button>
      </div>
    );
  };

  onOpenAdd = () => {
    this.setState({ visible: true });
  };

  onCloseAdd = () => {
    this.setState({ visible: false });
  };

  onRoleChange = e => {
    let selectedRoles = [...this.state.roles];
    if (e.checked) selectedRoles.push(e.value);
    else selectedRoles.splice(selectedRoles.indexOf(e.value), 1);

    this.setState({ roles: selectedRoles });
  };

  onCloseAndCreate = () => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(this.state.email)) {
      alert("Email bạn nhập không đúng!");
      return;
    }
    const user = {
      username: this.state.username,
      name: this.state.name,
      email: this.state.email,
      role: this.state.roles
    };
    this.props.onRegisterUser(user);
    this.setState({ visible: false });
  };

  onDeleteShow = data => {
    this.setState({
      deleteVisible: true,
      id: data.Id,
      data: data
    });
  };

  onDelete = () => {
    this.props.onDeleteUser(this.state.data.username);
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

  onChangeUsername = e => {
    this.setState({
      username: e.target.value
    });
  };

  onChangeName = e => {
    this.setState({
      name: e.target.value
    });
  };

  onChangeEmail = e => {
    this.setState({
      email: e.target.value
    });
  };

  onCloseDialogReview = () => {
    this.setState({
      reviewVisible: false
    });
  }

  handleImportUser = file => {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = e => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const users = logic.convertToUsers(data);
      this.setState({
        listTeachersImport: users,
        reviewVisible: true
      });

    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  }

  render() {
    const dialog = (
      <Dialog
        header="Thêm Người dùng"
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
          <Col lg="4" md="4" sm="4">
            Họ và tên:
          </Col>
          <Col lg="8" md="8" sm="8">
            <FormInput
              type="text"
              value={this.state.name}
              onChange={this.onChangeName}
              placeholder="Họ và tên"
              className="mb-2"
            />
          </Col>
          <Col lg="4" md="4" sm="4">
            Tên tài khoản:
          </Col>
          <Col lg="8" md="8" sm="8">
            <FormInput
              type="text"
              value={this.state.username}
              onChange={this.onChangeUsername}
              placeholder="Tên..."
              className="mb-2"
            />
          </Col>
          <Col lg="4" md="4" sm="4">
            Mail người dùng:
          </Col>
          <Col lg="8" md="8" sm="8">
            <FormInput
              type="email"
              value={this.state.email}
              onChange={this.onChangeEmail}
              placeholder="thienthien@gmail.com"
              className="mb-2"
            />
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg="12" md="12" sm="12">
            Các chức vụ:{" "}
            {/* {this.state.roles.map(ele => (
              <span style={{ color: "#007BFF" }}>{ele} . </span>
            ))}*/}
          </Col>
          <Col lg="12" md="12" sm="12">
            <br />
          </Col>
          <Col lg="4" md="4" sm="4">
            <Checkbox
              inputId="1"
              value={1}
              onChange={this.onRoleChange}
              checked={this.state.roles.includes(1)}
            />
            <label htmlFor="1" className="p-checkbox-label">
              ADMIN
            </label>
          </Col>
          <Col lg="4" md="4" sm="4">
            <Checkbox
              inputId="2"
              value={2}
              onChange={this.onRoleChange}
              checked={this.state.roles.includes(2)}
            />
            <label htmlFor="2" className="p-checkbox-label">
              BIEN_SOAN
            </label>
          </Col>
          <Col lg="4" md="4" sm="4">
            <Checkbox
              inputId="3"
              value={3}
              onChange={this.onRoleChange}
              checked={this.state.roles.includes(3)}
            />
            <label htmlFor="3" className="p-checkbox-label">
              QUAN_LY_SURVEY
            </label>
          </Col>
          <Col lg="4" md="4" sm="4">
            <Checkbox
              inputId="4"
              value={4}
              onChange={this.onRoleChange}
              checked={this.state.roles.includes(4)}
            />
            <label htmlFor="4" className="p-checkbox-label">
              VIEW_SYLLABUS
            </label>
          </Col>
          <Col lg="4" md="4" sm="4">
            <Checkbox
              inputId="5"
              value={5}
              onChange={this.onRoleChange}
              checked={this.state.roles.includes(5)}
            />
            <label htmlFor="5" className="p-checkbox-label">
              TEACHER
            </label>
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
          {`Bạn thực sự muốn xóa người dùng ${this.state.data.username}`}
        </Dialog>
      </div>
    );

    const reviewDialog = (
      <Dialog
        header="Danh sách giảng viên từ file:"
        visible={this.state.reviewVisible}
        style={{ width: "50vw" }}
        onHide={this.onCloseDialogReview}
        footer={
          <div>
            <Button
              type="button"
              className="btn btn-primary"
              key="save"
              //onClick={this.onCloseAndAddSubjects}
              theme="success"
            >
              Tạo
            </Button>
            <Button
              type="button"
              className="btn btn-default"
              key="close"
              onClick={this.onCloseDialogReview}
              theme="secondary"
            >
              Hủy
            </Button>
          </div>
        }
      >
        <Col lg="12" md="12" sm="12">
          <DataTable
            value={this.state.listTeachersImport}
            style={{ height: "30vw", overflowY: "scroll" }}
          >
            <Column field="name" header="Tên" style={{ width: "5em" }} />
            <Column field="username" header="Tên tài khoản" style={{ width: "2em" }} />
            <Column field="email" header="Mail"
              style={{
                width: "1em",
                'word-wrap': 'break-word'
              }} />
            <Column field="roleName" header="Role"
              style={{
                width: "1em",
                'word-wrap': 'break-word'
              }} />
          </DataTable>
        </Col>
      </Dialog>
    );

    const header = (
      <Row style={{ margin: "0" }}>
        <Col lg="3" md="3" sm="3">
          <p align="left">
            <Button onClick={this.onOpenAdd} theme="success">
              <i className="material-icons">add</i> Thêm Người dùng
            </Button>
          </p>
        </Col>
        <Col lg="3" md="3" sm="3">
          <p align="left">
            <DataInputCom
              handleFile={this.handleImportUser}
            />
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
              value={this.props.users.map(user => {
                const roleText = user.role.reduce((cur, rol) => {
                  return (cur += rol + " . ");
                }, "");
                user.roleText = roleText;
                return user;
              })}
            >
              <Column sortable={true} field="name" header="Tên" />
              <Column sortable={true} field="username" header="Tên tài khoản" />
              <Column sortable={true} field="email" header="Mail" />
              <Column sortable={true} field="roleText" header="Role" />
              <Column
                body={this.actionTemplate}
                style={{ textAlign: "center", width: "4em" }}
              />
            </DataTable>
          </Col>
          {dialog}
          {alertDialog}
          {reviewDialog}
        </Row>
      </div>
    );
  }
}
