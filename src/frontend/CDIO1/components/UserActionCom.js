import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";

export default class UserActionCom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          {/* <img
            className="user-avatar rounded-circle mr-2"
            src={"data:image/png;base64,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"}
            alt="UserAvatar"
          />{" "} */}
          <span className="d-none d-md-inline-block">Jack Sparrow</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={Link} to="user-profile">
            <i className="material-icons">&#xE7FD;</i> Trang cá nhân
          </DropdownItem>
          <DropdownItem tag={Link} to="edit-user-profile">
            <i className="material-icons">&#xE8B8;</i> Cập nhật
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem
            tag={Link}
            to="/"
            onClick={() => {
              localStorage.removeItem("user");
            }}
            className="text-danger"
          >
            <i className="material-icons text-danger">&#xE879;</i> Đăng xuất
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
