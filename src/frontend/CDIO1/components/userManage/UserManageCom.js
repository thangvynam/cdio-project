import React, { Component } from "react";

import { Row, Col, Button, FormInput } from "shards-react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";

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
      email: ""
    };
  }

  actionTemplate = (data, column) => {
    return (
      <div>
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
    console.log(this.state.roles)
    this.props.onRegisterUser({
      username: this.state.username,
      name: this.state.name,
      email: this.state.email,
      role: this.state.roles
    });
    this.setState({ visible: false });
  };

  onDeleteShow = id => {
    this.setState({
      deleteVisible: true,
      id: id
    });
  };

  onDelete = () => {
    this.props.onDelete(this.state.id);
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
      username: e.target.value,
    });
  }

  onChangeName = e => {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeEmail = e => {
    this.setState({
      email: e.target.value,
    });
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
            Tên người dùng:
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
              type="text"
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
              BIEN SOAN
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
          {`Bạn thực sự muốn xóa người dùng ${
            this.state.id !== 0
              ? this.props.users.filter(row => row.Id === this.state.id)[0]
                  .Username
              : ""
          }`}
        </Dialog>
      </div>
    );

    const header = (
      <Row style={{ margin: "0" }}>
        <Col lg="6" md="6" sm="6">
          <p align="left">
            <Button onClick={this.onOpenAdd} theme="success">
              <i className="material-icons">add</i> Thêm Người dùng
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
              value={this.props.users}
            >
              <Column sortable={true} field="name" header="Tên" />
              <Column sortable={true} field="mail" header="Mail" />
              <Column
                body={this.actionTemplate}
                style={{ textAlign: "center", width: "4em" }}
              />
            </DataTable>
          </Col>
          {dialog}
          {alertDialog}
        </Row>
      </div>
    );
  }
}
