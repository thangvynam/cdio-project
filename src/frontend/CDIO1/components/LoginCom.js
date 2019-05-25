import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
// import sha256 from "crypto-js/sha256";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  FormInput
} from "shards-react";

export default class LoginCom extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: ""
    };
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
      password: this.state.password
      // password: sha256(this.state.password).toString()
    };
    this.props.onLogIn(user);
  };

  render() {
    if (localStorage.getItem("user")) return <Redirect to="/" />;

    return (
      <Container>
        <Row className="justify-content-center vertical-align-middle">
          <Col md="8">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Form>
                    <h3>Đăng nhập</h3>
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
                      <Col xs="6">
                        <Button
                          tag={Link}
                          to="/"
                          color="primary"
                          className="px-4"
                          onClick={this.onLogIn}
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
