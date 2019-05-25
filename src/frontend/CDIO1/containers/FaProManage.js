import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";

import "bootstrap/dist/css/bootstrap.min.css";

import FaProManageCom from "../components/faProManage/FaProManageCom";
import AlertCom from "../components/AlertCom";
import PageTitle from "../components/PageTitle";

import * as facultiesAction from "../actions/facultiesAction";
import * as programsAction from "../actions/programsAction";
import * as majorsAction from "../actions/majorsAction";
import * as levelsAction from "../actions/levelsAction";

import { connect } from "react-redux";

class FaProManageTemp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.props.onLoadFaculties();
    this.props.onLoadPrograms();
    this.props.onLoadMajors();
    this.props.onLoadLevels();
  };

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <Col lg="8" md="8" sm="8">
            <PageTitle
              sm="12"
              title="KHOA HỆ"
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
            <FaProManageCom
              faculties={this.props.faculties}
              programs={this.props.programs}
              majors={this.props.majors}
              levels={this.props.levels}
              onAddFaculty={this.props.onAddFaculty}
              onDeleteFaculty={this.props.onDeleteFaculty}
              onAddProgram={this.props.onAddProgram}
              onDeleteProgram={this.props.onDeleteProgram}
              onAddMajor={this.props.onAddMajor}
              onDeleteMajor={this.props.onDeleteMajor}
              onAddLevel={this.props.onAddLevel}
              onDeleteLevel={this.props.onDeleteLevel}
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
  levels: state.levels,
  majors: state.majors
});

export default connect(mapStateToProps, {
  onLoadFaculties: facultiesAction.onLoadFaculties,
  onAddFaculty: facultiesAction.onAddFaculty,
  onDeleteFaculty: facultiesAction.onDeleteFaculty,
  onLoadPrograms: programsAction.onLoadPrograms,
  onAddProgram: programsAction.onAddProgram,
  onDeleteProgram: programsAction.onDeleteProgram,
  onLoadMajors: majorsAction.onLoadMajors,
  onAddMajor: majorsAction.onAddMajor,
  onDeleteMajor: majorsAction.onDeleteMajor,
  onLoadLevels: levelsAction.onLoadLevels,
  onAddLevel: levelsAction.onAddLevel,
  onDeleteLevel: levelsAction.onDeleteLevel
})(FaProManageTemp);
