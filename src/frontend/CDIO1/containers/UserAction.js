import React, { Component } from "react";
import { Container } from "shards-react";
import "bootstrap/dist/css/bootstrap.min.css";
import UserActionCom from "../components/UserActionCom";
import * as usersAction from "../actions/usersAction";
import { connect } from "react-redux";

class UserActionTemp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <UserActionCom  user={this.props.user} onLogOut={this.props.onLogOut} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, {
  onLogOut: usersAction.onLogOut
})(UserActionTemp);
