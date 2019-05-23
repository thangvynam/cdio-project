import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";
import { Prompt } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";

import DetailEducationProgramCom from "../components/detailEducationProgram/DetailEducationProgramCom";
import AlertCom from "../components/AlertCom";
import PageTitle from "../components/PageTitle";

import * as levelsAction from "../actions/levelsAction";
import * as majorsAction from "../actions/majorsAction";
import * as programsAction from "../actions/programsAction";
import * as subjectsAction from "../actions/subjectsAction";
import * as outcomeStandardsAction from "../actions/outcomeStandardsAction";
import * as detailOutcomeStandardAction from "../actions/detailOutcomeStandardAction";

import * as eduProgramsAction from "../actions/eduProgramsAction";
import * as detailEduProgramAction from "../actions/detailEduProgramAction";

import { connect } from "react-redux";

class DetailEducationProgramTmp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    this.props.onLoadEduProgram(id);
    this.props.onLoadDetailEduProgram(id);

    this.props.onLoadLevels();
    this.props.onLoadMajors();
    this.props.onLoadPrograms();
    this.props.onLoadSubjects();
    this.props.onLoadOutcomeStandards();
    window.addEventListener("beforeunload", this.onUnload);
  };

  onUnload = event => {
    event.returnValue = "Hello World!!";
  };

  componentWillUnmount = () => {
    window.removeEventListener("beforeunload", this.onUnload);
  };

  render() {
    const infoEduProgram = Array.isArray(this.props.infoEduProgram)
      ? this.props.infoEduProgram[0]
      : null;

    const title = infoEduProgram
      ? `${infoEduProgram.EduName}`
      : `Chưa tải được`;

    return (
      <Container fluid className="main-content-container px-4">
        <Prompt message="Dữ liệu chưa được lưu, bạn thực sự muốn thoát?" />
        <Row noGutters className="page-header py-4">
          <Col lg="8" md="8" sm="8">
            <PageTitle
              sm="12"
              title={title}
              subtitle="Chỉnh sửa CTĐT"
              className="text-sm-left"
            />
          </Col>{" "}
          <Col lg="4" md="4" sm="4">
            <AlertCom message={this.props.message} />{" "}
          </Col>{" "}
        </Row>
        <hr />
        <Row>
          <Col lg="12" md="12">
            <DetailEducationProgramCom
              levels={this.props.levels}
              majors={this.props.majors}
              programs={this.props.programs}
              subjects={this.props.subjects}
              infoEduProgram={infoEduProgram}
              detailEduProgram={this.props.detailEduProgram}
              outcomeStandards={this.props.outcomeStandards}
              detailOutcomeStandard={this.props.detailOutcomeStandard}
              onLoadDetailOutcomeStandard={
                this.props.onLoadDetailOutcomeStandard
              }
              onSaveEduProgram={this.props.onSaveEduProgram}
              contentNodes={this.props.contentNodes}
              scheduleNodes={this.props.scheduleNodes}
              targetNodes={this.props.targetNodes}
            />{" "}
          </Col>{" "}
        </Row>{" "}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  message: state.message,
  outcomeStandards: state.outcomeStandards,
  detailOutcomeStandard: state.detailOutcomeStandard,
  levels: state.levels,
  majors: state.majors,
  programs: state.programs,
  subjects: state.subjects,
  infoEduProgram: state.infoEduProgram,
  detailEduProgram: state.detailEduProgram,
  contentNodes: state.contentNodes,
  scheduleNodes: state.scheduleNodes,
  targetNodes: state.targetNodes
});

export default connect(
  mapStateToProps,
  {
    onLoadLevels: levelsAction.onLoadLevels,
    onLoadMajors: majorsAction.onLoadMajors,
    onLoadPrograms: programsAction.onLoadPrograms,
    onLoadSubjects: subjectsAction.onLoadSubjects,
    onLoadOutcomeStandards: outcomeStandardsAction.onLoadOutcomeStandards,
    onLoadDetailOutcomeStandard:
      detailOutcomeStandardAction.onLoadDetailOutcomeStandard,
    onSaveEduProgram: eduProgramsAction.onSaveEduProgram,
    onLoadEduProgram: eduProgramsAction.onLoadEduProgram,
    onLoadDetailEduProgram: detailEduProgramAction.onLoadDetailEduProgram
  }
)(DetailEducationProgramTmp);
