import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";

import "bootstrap/dist/css/bootstrap.min.css";

import EducationProgramCom from "../components/educationProgram/EducationProgramCom";
import AlertCom from "../components/AlertCom";
import PageTitle from "../components/PageTitle";

import * as eduProgramsAction from "../actions/eduProgramsAction";
import * as facultiesAction from "../actions/facultiesAction";
import * as programsAction from "../actions/programsAction";
import * as levelsAction from "../actions/levelsAction";
import * as majorsAction from "../actions/majorsAction";

import { connect } from "react-redux";

class EducationProgramTmp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.props.onLoadEduPrograms();
  };

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <Col lg="8" md="8" sm="8">
            <PageTitle
              sm="12"
              title="CHƯƠNG TRÌNH ĐÀO TẠO"
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
            <EducationProgramCom
              history={this.props.history}
              eduPrograms={this.props.eduPrograms}
              faculties={this.props.faculties}
              programs={this.props.programs}
              levels={this.props.levels}
              majors={this.props.majors}
              onLoadFaculties={this.props.onLoadFaculties}
              onLoadPrograms={this.props.onLoadPrograms}
              onLoadLevels={this.props.onLoadLevels}
              onLoadMajors={this.props.onLoadMajors}
              onAddEduProgram={this.props.onAddEduProgram}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  message: state.message,
  eduPrograms: state.eduPrograms,
  faculties: state.faculties,
  programs: state.programs,
  levels: state.levels,
  majors: state.majors
});

export default connect(mapStateToProps, {
  onLoadEduPrograms: eduProgramsAction.onLoadEduPrograms,
  onAddEduProgram: eduProgramsAction.onAddEduProgram,
  onLoadFaculties: facultiesAction.onLoadFaculties,
  onLoadPrograms: programsAction.onLoadPrograms,
  onLoadLevels: levelsAction.onLoadLevels,
  onLoadMajors: majorsAction.onLoadMajors
})(EducationProgramTmp);
