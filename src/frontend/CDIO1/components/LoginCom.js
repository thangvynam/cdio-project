import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import sha256 from "crypto-js/sha256";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardGroup,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  FormInput
} from "shards-react";
import $ from './../../helpers/services';
import _ from 'lodash';
import './login.css'

export default class LoginCom extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
  }

  componentWillMount() {
    if (!_.isNull(localStorage.getItem("user"))) {
      let user = JSON.parse(localStorage.getItem("user"));
      $.authenMe({ "access": user.token }).then(res => {
        if (res.data.status === 200) {
          localStorage.clear();
          $.setStorage(res.data)
        }
        else
          localStorage.clear();
      })
    }
  }




  handleUsernameChange = event => {
    if (event.target.value.length > 30)
      this.setState({ username: event.target.value.substr(0, 30) });
    else this.setState({ username: event.target.value });
  };

  handlePasswordChange = event => {
    if (event.target.value.length > 30)
      this.setState({ password: event.target.value.substr(0, 30) });
    else this.setState({ password: event.target.value });
  };

  onLogIn = () => {
    const user = {
      username: this.state.username,
      password: sha256(this.state.password).toString()
    };
    this.props.onLogIn(user);
  };

  render() {
    if (localStorage.getItem("user")) return <Redirect to="/home" />;
    return (
      <Container className="login-wrapper">
        <Row className="justify-content-center vertical-align-middle">
          <Col md="8">
            <CardGroup>

              <div style={{ backgroundColor: "#1a1a1a" }}>
                <img style={{ padding: "10px", overflow: "hidden" }} src={require("./logo.png")} height="100" width="120"></img>
              </div>
              <Card className="p-4">
                <img style={{ marginTop: "0px" }} src={require("./cdio.jpg")} height="120" width="80%"></img>

                <div>
                  <center><h3>Hệ thống quản lý </h3></center>
                  <center><h3>chương trình đào tạo theo CDIO</h3></center>
                </div>
                <CardBody>
                  <Form
                    onKeyPress={event => {
                      if (event.key === "Enter") {
                        this.onLogIn();
                      }
                    }}>
                    {/* <h3>HỆ THỐNG QUẢN LÝ CHƯƠNG TRÌNH ĐÀO TẠO CDIO</h3> */}
                    <InputGroup className="mb-3">
                      <FormInput
                        type="text"
                        placeholder="Tên hoặc Mail"
                        autoComplete="username"
                        value={this.state.username}
                        onChange={this.handleUsernameChange}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <FormInput
                        type="password"
                        placeholder="Mật khẩu"
                        autoComplete="current-password"
                        value={this.state.password}
                        onChange={this.handlePasswordChange}
                      />
                    </InputGroup>
                    <Row>
                      <Col xs="12">
                        <Button
                          tag={Link}
                          to="#"
                          color="primary"
                          className="button-login px-4"
                          onClick={this.onLogIn}
                          type="submit"
                        >
                          Đăng nhập
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}
