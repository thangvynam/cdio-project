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
            <div>
                <Link className="col-right-title" to={`/`}><span style={{ textAlign: "center", fontSize: "10pt", paddingTop: "30px" }}>Trang chủ</span></Link>
                <div style={{float: "right", paddingTop: "5px"}}><UserAction/></div>
            </div>
        );
    }
}

export default NavBar;