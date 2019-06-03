import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";

import "bootstrap/dist/css/bootstrap.min.css";

import SurveyListCom from "../components/surveyEdu/SurveyListCom";
import AlertCom from "../components/AlertCom";
import PageTitle from "../components/PageTitle";

import * as surveysAction from "../actions/_surveysAction";

import { connect } from "react-redux";

class SurveyTemp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.props.onLoadSurveys(+this.props.detailEduProgram.IdOutcome);
  };

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <Col lg="8" md="8" sm="8">
            <PageTitle
              sm="12"
              title="KHẢO SÁT"
              subtitle="danh sách"
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
            <SurveyListCom
              surveys={this.props.surveys}
              onAddSurvey={this.props.onAddSurvey}
              detailEduProgram={this.props.detailEduProgram}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  message: state.message,
  detailEduProgram: state.detailEduProgram,
  surveys: state.surveys
});

export default connect(mapStateToProps, {
  onLoadSurveys: surveysAction.onLoadSurveys,
  onAddSurvey: surveysAction.onAddSurvey
})(SurveyTemp);
