import React from "react";

import { Row, Col, Button } from "shards-react";
import { Panel } from "primereact/panel";
import { Password } from "primereact/password";

export default class UserInfoCom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      confirmpassword: ""
    };
  }

  onChangePass = () => {
    if(this.state.password===this.state.confirmpassword&&this.state.password>5){
      const username=localStorage.getItem("user").data.Username;
      const password=this.state.password;
      const user={username,password};
      this.props.onChangePass(user);
    }
  }

  render() {
    const info = JSON.parse(localStorage.getItem("user"));
    return (
      <div>
        <Row>
          <Col lg="12" md="12" sm="12">
            <Panel header="Tài khoản">
              <Row>
                <Col lg="6" md="6" sm="6">
                  Họ và tên: {info.data.Name}
                </Col>
                <Col lg="6" md="6" sm="6">
                  Tên tài khoản: {info.data.Username}
                </Col>
              </Row>
              <br />
              <Row>
                <Col lg="6" md="6" sm="6">
                  Email: {info.data.Email}
                </Col>
                <Col lg="6" md="6" sm="6">
                  Quyền:{" "}
                  {info.data.Role.map(role => (
                    <span style={{ color: "#007BFF" }}>{role} . </span>
                  ))}
                </Col>
              </Row>
            </Panel>
            <hr />
            <Panel header="Thay đổi mật khẩu">
              <Row>
                <Col lg="2" md="2" sm="2">
                  Mật khẩu mới:
                </Col>
                <Col lg="3" md="3" sm="3">
                  <Password
                    value={this.state.password}
                    onChange={e =>
                      this.setState({ password: e.target.value })
                    }
                  />
                </Col>
                <Col lg="2" md="2" sm="2">
                  Xác nhận mật khẩu:
                </Col>
                <Col lg="3" md="3" sm="3">
                  <Password
                    value={this.state.confirmpassword}
                    onChange={e =>
                      this.setState({ confirmpassword: e.target.value })
                    }
                  />
                </Col>
                <Col lg="2" md="2" sm="2">
                  <Button
                    theme="success"
                    onChange={this.onChangePass}
                    style={{ marginRight: ".3em", padding: "8px" }}
                  >
                    <i className="material-icons">save</i>
                    Lưu mật khẩu
                  </Button>
                </Col>
              </Row>
            </Panel>
          </Col>
        </Row>
      </div>
    );
  }
}
