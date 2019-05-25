import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";

import "bootstrap/dist/css/bootstrap.min.css";

import UserManageCom from "../components/userManage/UserManageCom";
import AlertCom from "../components/AlertCom";
import PageTitle from "../components/PageTitle";

import * as usersAction from "../actions/usersAction";

import { connect } from "react-redux";

class UserManageTemp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    this.props.onLoadUsers();
  };

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <Col lg="8" md="8" sm="8">
            <PageTitle
              sm="12"
              title="NGƯỜI DÙNG"
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
            <UserManageCom users={this.props.users} />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  message: state.message,
  users: state.users
});

export default connect(mapStateToProps, {
  onLoadUsers: usersAction.onLoadUsers
})(UserManageTemp);
