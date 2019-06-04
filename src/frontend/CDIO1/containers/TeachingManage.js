import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";

import "bootstrap/dist/css/bootstrap.min.css";

import TeachingManageCom from "../components/teachingManage/TeachingManageCom";
import AlertCom from "../components/AlertCom";
import PageTitle from "../components/PageTitle";

import * as blocksAction from "../actions/_blocksAction";
import * as detailEduProgramAction from "../actions/detailEduProgramAction";
import * as usersAction from "../actions/usersAction";

import * as commonLogic from "../business/commonEducation";

import { connect } from "react-redux";

class TeachingManageTemp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.props.onLoadUsers();
    this.props.onLoadBlocks(this.props.detailEduProgram.Id);
  };

  render() {
    const subjects = commonLogic.getSubjects(this.props.blocks);
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <Col lg="8" md="8" sm="8">
            <PageTitle
              sm="12"
              title="PHÂN CÔNG GIÁO VIÊN"
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
            <TeachingManageCom
              detailEduProgram={this.props.detailEduProgram}
              users={this.props.users}
              subjects={subjects}
              onAddTeacher={this.props.onAddTeacher}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  message: state.message,
  blocks: state.blocks,
  detailEduProgram: state.detailEduProgram,
  users: state.users
});

export default connect(mapStateToProps, {
  onLoadBlocks: blocksAction.onLoadBlocks,
  onAddTeacher: blocksAction.onAddTeacher,
  onLoadDetailEduProgram: detailEduProgramAction.onLoadDetailEduProgram,
  onLoadUsers: usersAction.onLoadUsers
})(TeachingManageTemp);
