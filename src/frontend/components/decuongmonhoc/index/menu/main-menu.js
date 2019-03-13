import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import { MENUITEM } from "./../../../../Constant/ActionType";
import "./menu_css.css";

class MenuLeft extends Component {
    render() {
        return (
            <Menu
                mode="inline"
                theme={this.props.theme}
                inlineCollapsed={this.props.collapse}
                className="menu-style"
            >
                <Menu.Item key="1">
                    <Link to={"de-cuong-mon-hoc"}>
                        <Icon type="dashboard" />
                        <span>Đề Cương Môn Học</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="2">
                    <Link to={"tab-2"}>
                        <Icon type="dashboard" />
                        <span>Tab2</span>
                    </Link>
                </Menu.Item>

            </Menu>
        );
    }
}
export default MenuLeft;
