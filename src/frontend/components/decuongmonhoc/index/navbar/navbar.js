import React, { Component } from 'react';
import { Menu, Icon, Switch } from 'antd';
import { Link, Redirect } from "react-router-dom";
import "./navbar_css.css"
import UserAction from '../../../../CDIO1/containers/UserAction';

class NavBar extends Component {

    render() {
        let parent = this.props.content_parent;
        let ctdt = this.props.content_ctdt;
        let type = this.props.content_type;
        let khoi = this.props.content_khoi;
        return (
            <div className="navbar-ul-css">
                <div className="navbar-left-css">
                    <div className="navbar-left-child">
                        <Link className="col-right-title" to={`/`}>
                            Trang chủ
                        </Link>
                    </div>
                </div>
                <div className="navbar-right-css">
                        <div className="user-action"><UserAction /></div>
                </div>
            </div>
        );
    }
}

export default NavBar;