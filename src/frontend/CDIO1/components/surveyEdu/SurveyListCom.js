import React, { Component } from "react";

import { Row, Col, Button, FormInput } from "shards-react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Link } from "react-router-dom";

import * as logic from "../../business";

export default class SurveyListCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      globalFilter: "",
      name: ""
    };
  }

  onCloseAdd = () => {
    this.setState({
      visible: false
    });
  };

  onOpenAdd = () => {
    this.setState({
      visible: true
    });
  };

  handleName = event => {
    this.setState({ name: event.target.value });
  };

  onAddSurvey = () => {
    const iduser = JSON.parse(localStorage.getItem("user")).data.Id;
    const date = new Date().toISOString();
    const idoutcome = +this.props.detailEduProgram.IdOutcome;
    const name = this.state.name;
    const data = {
      iduser,
      date,
      idoutcome,
      name
    };
    this.props.onAddSurvey(data);
    this.setState({
      visible: false,
      name: ""
    });
  };

  actionTemplate = (data, column) => {
    return (
      <div>
        <Link to={`/ctdt/15/khao-sat-chuan-dau-ra?id=${data.IdSurvey}`}>
          <Button
            title="Xem khảo sát"
            theme="success"
            style={{ marginRight: ".3em", padding: "8px" }}
          >
            <i className="material-icons">assignment</i>
          </Button>
        </Link>
      </div>
    );
  };

  render() {
    const dialog = (
      <Dialog
        header="Thêm khảo sát"
        visible={this.state.visible}
        style={{ width: "50vw" }}
        onHide={this.onCloseAdd}
        footer={
          <div>
            <Button
              type="button"
              className="btn btn-primary"
              key="save"
              onClick={this.onAddSurvey}
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
            Tên khảo sát:
          </Col>
          <Col lg="8" md="8" sm="8">
            <FormInput
              type="text"
              value={this.state.name}
              onChange={this.handleName}
              placeholder="Tên..."
              className="mb-2"
            />
          </Col>
        </Row>
      </Dialog>
    );

    const header = (
      <Row style={{ margin: "0" }}>
        <Col lg="6" md="6" sm="6">
          <p align="left">
            <Button onClick={this.onOpenAdd} theme="success">
              <i className="material-icons">add</i> Thêm Khảo sát
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
              value={this.props.surveys.map(survey => {
                const date = logic.formatDate(survey.CreatedDate);
                survey.date = date;
                return survey;
              })}
            >
              <Column field="Name" header="Tên" style={{ width: "4em" }} />
              <Column
                field="OutcomeName"
                header="Thuộc chuẩn đầu ra"
                style={{ width: "4em" }}
              />
              <Column
                field="UserName"
                header="Người tạo"
                style={{ width: "3em" }}
              />
              <Column field="date" header="Ngày tạo" style={{ width: "3em" }} />
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
