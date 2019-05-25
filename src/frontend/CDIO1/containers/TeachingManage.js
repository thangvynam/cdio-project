import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";

import "bootstrap/dist/css/bootstrap.min.css";

import TeachingManageCom from "../components/teachingManage/TeachingManageCom";
import AlertCom from "../components/AlertCom";
import PageTitle from "../components/PageTitle";

import * as eduProgramsAction from "../actions/eduProgramsAction";
import * as subjectsAction from "../actions/subjectsAction";

import { connect } from "react-redux";

class TeachingManageTemp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.props.onLoadSubjects();
    this.props.onLoadEduPrograms();
  };

  render() {
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
              subjects={this.props.subjects}
              eduPrograms={this.props.eduPrograms}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  message: state.message,
  subjects: state.subjects,
  eduPrograms: state.eduPrograms
});

export default connect(mapStateToProps, {
  onLoadEduPrograms: eduProgramsAction.onLoadEduPrograms,
  onLoadSubjects: subjectsAction.onLoadSubjects
})(TeachingManageTemp);
