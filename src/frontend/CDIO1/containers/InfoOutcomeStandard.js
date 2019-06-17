import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import { Empty } from "antd";

import AlertCom from "../components/AlertCom";
import PageTitle from "../components/PageTitle";

import * as outcomeStandardsAction from "../actions/outcomeStandardsAction";
import * as eduProgramsAction from "../actions/eduProgramsAction";
import * as detailEduProgramAction from "../actions/detailEduProgramAction";

import { connect } from "react-redux";

class InfoOutcomeStandard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    const idEdu = this.props.ctdt;
    this.props.onLoadEduProgram(+idEdu);
    this.props.onLoadDetailEduProgram(+idEdu);
    let id = +this.props.detailEduProgram.IdOutcome;
    this.props.onLoadOutcomeStandard(id);
  };

  render() {
    const infoOutcomeStandard = Array.isArray(this.props.infoOutcomeStandard)
      ? this.props.infoOutcomeStandard[0]
      : null;

    const title = infoOutcomeStandard
      ? `${infoOutcomeStandard.NameOutcomeStandard}`
      : `Chưa tải được`;

    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get("id")
      ? urlParams.get("id")
      : +this.props.detailEduProgram.IdOutcome;
    id = id ? id : 0;

    return id && infoOutcomeStandard ? (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <Col lg="8" md="8" sm="8">
            <PageTitle
              sm="12"
              title={title}
              subtitle="Thông tin CĐR"
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
            <h4>
            {`Chuẩn đầu ra ${infoOutcomeStandard &&
              infoOutcomeStandard.NameOutcomeStandard} đang được sử dụng ở Chương trình đào tạo ${
              this.props.infoEduProgram[0].EduName
            } ở mục ${
              this.props.detailEduProgram.OSUsedNode
            }, thuộc khoa ${infoOutcomeStandard &&
              infoOutcomeStandard.NameFaculty}, hệ ${infoOutcomeStandard &&
              infoOutcomeStandard.NameProgram}, năm học ${infoOutcomeStandard &&
              infoOutcomeStandard.SchoolYear}`}
            </h4>
          </Col>
        </Row>
      </Container>
    ) : (
    <div>
      <Empty />
      <h3 align="center">Quay lại tab <Link to={`/ctdt/${this.props.ctdt}/edit-ctdt`}>THÔNG TIN</Link> để tải dữ liệu</h3>
    </div>
    );
  }
}

const mapStateToProps = state => ({
  message: state.message,
  infoOutcomeStandard: state.infoOutcomeStandard,
  detailEduProgram: state.detailEduProgram,
  infoEduProgram: state.infoEduProgram
});

export default connect(mapStateToProps, {
  onLoadOutcomeStandard: outcomeStandardsAction.onLoadOutcomeStandard,
  onLoadEduProgram: eduProgramsAction.onLoadEduProgram,
  onLoadDetailEduProgram: detailEduProgramAction.onLoadDetailEduProgram
})(InfoOutcomeStandard);
