import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";
import { Prompt } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";

import DetailOutcomeStandardCom from "../components/detailOutcomeStandard/DetailOutcomeStandardCom";
import AlertCom from "../components/AlertCom";
import PageTitle from "../components/PageTitle";

import * as detailOutcomeStandardAction from "../actions/detailOutcomeStandardAction";
import * as outcomeStandardsAction from "../actions/outcomeStandardsAction";
import * as revisionsAction from "../actions/revisionsAction";
import * as detailRevisionAction from "../actions/detailRevisionAction";

import { connect } from "react-redux";

class EditOutcomeStandardTmp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    this.props.onLoadDetailOutcomeStandard(id);
    this.props.onLoadRevisions(id);
    this.props.onLoadOutcomeStandard(id);
    window.addEventListener("beforeunload", this.onUnload);
  };

  onUnload = event => {
    event.returnValue = "Hello World!!";
  };

  componentWillUnmount = () => {
    window.removeEventListener("beforeunload", this.onUnload);
  };

  render() {
    const infoOutcomeStandard = Array.isArray(this.props.infoOutcomeStandard)
      ? this.props.infoOutcomeStandard[0]
      : null;

    const title = infoOutcomeStandard
      ? `${infoOutcomeStandard.NameOutcomeStandard}`
      : `Chưa tải được`;

    return (
      <Container fluid className="main-content-container px-4">
        <Prompt message="Dữ liệu chưa được lưu, bạn thực sự muốn thoát?" />
        <Row noGutters className="page-header py-4">
          <Col lg="8" md="8" sm="8">
            <PageTitle
              sm="12"
              title={title}
              subtitle="Chỉnh sửa CĐR"
              className="text-sm-left"
            />
          </Col>
          <Col lg="4" md="4" sm="4">
            <AlertCom message={this.props.message} />
          </Col>
        </Row>

        <hr />
        <Row>
          <Col lg="12" md="12">
            <DetailOutcomeStandardCom
              revisions={this.props.revisions}
              infoOutcomeStandard={infoOutcomeStandard}
              detailOutcomeStandard={this.props.detailOutcomeStandard}
              onLoadDetailOutcomeStandard={
                this.props.onLoadDetailOutcomeStandard
              }
              onSaveDetailOutcomeStandard={
                this.props.onSaveDetailOutcomeStandard
              }
              onLoadDetailRevision={this.props.onLoadDetailRevision}
              onAddDetailRevision={this.props.onAddDetailRevision}
              onDeleteRevision={this.props.onDeleteRevision}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  message: state.message,
  revisions: state.revisions,
  infoOutcomeStandard: state.infoOutcomeStandard,
  detailOutcomeStandard: state.detailOutcomeStandard
});

export default connect(mapStateToProps, {
  onLoadOutcomeStandard: outcomeStandardsAction.onLoadOutcomeStandard,
  onLoadDetailOutcomeStandard:
    detailOutcomeStandardAction.onLoadDetailOutcomeStandard,
  onSaveDetailOutcomeStandard:
    detailOutcomeStandardAction.onSaveDetailOutcomeStandard,
  onLoadRevisions: revisionsAction.onLoadRevisions,
  onLoadDetailRevision: detailRevisionAction.onLoadDetailRevision,
  onAddDetailRevision: detailRevisionAction.onAddDetailRevision,
  onDeleteRevision: revisionsAction.onDeleteRevision
})(EditOutcomeStandardTmp);
