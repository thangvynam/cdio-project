import React, { Component } from "react";
import {
  Container,
  Row,
  Col
} from "shards-react";

import "bootstrap/dist/css/bootstrap.min.css";

import AlertCom from "../components/AlertCom";
import PageTitle from "../components/PageTitle";

import { connect } from "react-redux";

class EditSurveyTemp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    // const urlParams = new URLSearchParams(window.location.search);
    // const id = urlParams.get("id");
  };

  render() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <Col lg="8" md="8" sm="8">
            <PageTitle
              sm="12"
              title="CÂU HỎI"
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
            <div>{id}</div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  message: state.message,
});

export default connect(mapStateToProps, {
})(EditSurveyTemp);
