import React, { Component } from "react";

import { Row, Col, Button, FormInput } from "shards-react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

export default class FacultyManageCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      facultyName: "",
      deleteVisible: false,
      id: 0,
      globalFilter: ""
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

  handleFacultyName = event => {
    this.setState({ facultyName: event.target.value });
  };

  onCloseAndCreate = () => {
    if (this.state.facultyName !== "") {
      const data = { namefaculty: this.state.facultyName };
      this.props.onAddFaculty(data);
      this.setState({ visible: false });
    }
  };

  onDeleteShow = id => {
    this.setState({
      deleteVisible: true,
      id: id
    });
  };

  onDelete = () => {
    this.props.onDeleteFaculty(this.state.id);
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

  render() {
    const dialog = (
      <Dialog
        header="Thêm Khoa"
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
            Tên khoa:
          </Col>
          <Col lg="8" md="8" sm="8">
            <FormInput
              type="text"
              value={this.state.facultyName}
              onChange={this.handleFacultyName}
              placeholder="Tên..."
              className="mb-2"
            />
          </Col>
        </Row>
      </Dialog>
    );

    const alertDialog = (
      <div className="content-section implementation">
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
          {`Bạn thực sự muốn xóa khoa ${
            this.state.id !== 0
              ? this.props.faculties.filter(row => row.Id === this.state.id)[0]
                  .NameFaculty
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
              <i className="material-icons">add</i> Thêm Khoa
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
              value={this.props.faculties}
            >
              <Column sortable={true} field="NameFaculty" header="Tên" />
              <Column
                body={this.actionTemplate}
                style={{ textAlign: "center", width: "4em" }}
              />
            </DataTable>
          </Col>
        </Row>
        {dialog}
        {alertDialog}
      </div>
    );
  }
}
