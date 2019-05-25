import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";

import "bootstrap/dist/css/bootstrap.min.css";

import LoginCom from "../components/LoginCom";
import AlertCom from "../components/AlertCom";

import * as usersAction from "../actions/usersAction";

import { connect } from "react-redux";

class LoginTemp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <Col lg="8" md="8" sm="8" />
          <Col lg="4" md="4" sm="4">
            <AlertCom message={this.props.message} />
          </Col>
        </Row>
        <Row>
          <Col lg="12" md="12">
            <LoginCom onLogIn={this.props.onLogIn} />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  message: state.message,
})

export default connect(mapStateToProps, {
  onLogIn: usersAction.onLogIn
})(LoginTemp);
