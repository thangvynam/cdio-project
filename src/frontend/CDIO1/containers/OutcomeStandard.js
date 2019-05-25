import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";

import "bootstrap/dist/css/bootstrap.min.css";

import OutcomeStandardCom from "../components/outcomeStandard/OutcomeStandardCom";
import AlertCom from "../components/AlertCom";
import PageTitle from "../components/PageTitle";

import * as facultiesAction from "../actions/facultiesAction";
import * as programsAction from "../actions/programsAction";
import * as outcomeStandardsAction from "../actions/outcomeStandardsAction";
import * as detailOutcomeStandardAction from "../actions/detailOutcomeStandardAction";

import { connect } from "react-redux";

class OutcomeStandardTemp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.props.onLoadOutcomeStandards();
  };

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <Col lg="8" md="8" sm="8">
            <PageTitle
              sm="12"
              title="CHUẨN ĐẦU RA"
              subtitle="quản lý"
              className="text-sm-left"
            />
          </Col>
          <Col lg="4" md="4" sm="4">
            <AlertCom message={this.props.message} />
          </Col>
        </Row>

        <Row>
          <Col lg="12" md="12">
            <OutcomeStandardCom
              history={this.props.history}
              faculties={this.props.faculties}
              programs={this.props.programs}
              outcomeStandards={this.props.outcomeStandards}
              detailOutcomeStandard={this.props.detailOutcomeStandard}
              onLoadFaculties={this.props.onLoadFaculties}
              onLoadPrograms={this.props.onLoadPrograms}
              onAddOutcomeStandard={this.props.onAddOutcomeStandard}
              onDeleteOutcomeStandard={this.props.onDeleteOutcomeStandard}
              onLoadDetailOutcomeStandard={
                this.props.onLoadDetailOutcomeStandard
              }
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  message: state.message,
  faculties: state.faculties,
  programs: state.programs,
  outcomeStandards: state.outcomeStandards,
  detailOutcomeStandard: state.detailOutcomeStandard
});

export default connect(mapStateToProps, {
  onLoadFaculties: facultiesAction.onLoadFaculties,
  onLoadPrograms: programsAction.onLoadPrograms,
  onLoadOutcomeStandards: outcomeStandardsAction.onLoadOutcomeStandards,
  onAddOutcomeStandard: outcomeStandardsAction.onAddOutcomeStandard,
  onDeleteOutcomeStandard: outcomeStandardsAction.onDeleteOutcomeStandard,
  onLoadDetailOutcomeStandard:
    detailOutcomeStandardAction.onLoadDetailOutcomeStandard
})(OutcomeStandardTemp);
