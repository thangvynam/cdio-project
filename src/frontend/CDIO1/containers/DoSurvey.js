import React, { Component } from "react";
import {
  Container,
  Row,
  Col
} from "shards-react";

import "bootstrap/dist/css/bootstrap.min.css";

import UserInfoCom from "../components/UserInfoCom";
import AlertCom from "../components/AlertCom";
import PageTitle from "../components/PageTitle";

import * as usersAction from "../actions/usersAction";

import { connect } from "react-redux";

class UserInfoTemp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {
    // const id = localStorage.getItem("user")
    //   ? JSON.parse(localStorage.getItem("user")).data.Id
    //   : 0;
    // this.props.onGetInfo(id);
  };

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <Col lg="8" md="8" sm="8">
            <PageTitle
              sm="12"
              title="TÀI KHOẢN"
              subtitle="thông tin"
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
            <UserInfoCom onChangePass={this.props.onChangePass} />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  message: state.message,
  user: state.user
});

export default connect(mapStateToProps, {
  onGetInfo: usersAction.onGetInfo,
  onChangePass: usersAction.onChangePass
})(UserInfoTemp);
