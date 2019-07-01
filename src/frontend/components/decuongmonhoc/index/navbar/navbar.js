import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "./navbar_css.css"
import UserAction from '../../../../CDIO1/containers/UserAction';

class NavBar extends Component {

    render() {
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