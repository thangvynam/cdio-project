import React, { Component } from 'react';
import { Menu, Icon, Switch } from 'antd';
import { Link } from "react-router-dom";
import "./navbar_css.css"
import { subjectId } from '../../../../Constant/ActionType';
import { connect } from'react-redux';
import { bindActionCreators } from 'redux';

class NavBar extends Component {
    state = {
        current: 'mail',
    }

    handleClick = (e) => {

    }

    getParentName = (parent, id) => {
        for(let i = 0;i < parent.length;i++) {
            if(parent[i].id === id) {
                return parent[i].name;
            }
        }
        return "";
    }

    getCtdtName = (ctdt, id) => {
        for(let i = 0;i < ctdt.length;i++) {
            if(ctdt[i].Id === +id) {
                return ctdt[i].EduName;
            }
        }
        return "";
    }

    getTypeName = (menuitem, id) => {
        for(let i = 0;i < Object.keys(menuitem).length;i++) {
            if(Object.keys(menuitem)[i] === id) {
                return menuitem[Object.keys(menuitem)[i]].name;
            }
        }
        return "";
    }

    getKhoiName = (ktt, id) => {
        for(let i = 0;i < ktt.length;i++) {
            if(ktt[i].id === id) {
                return  ktt[i].name;  
            } 
        }
        return "";
    }

    onClick = () => {
        this.props.updateSubjectId("");
    }
    render() {
        let parent = this.props.content_parent;
        let ctdt = this.props.content_ctdt;
        let type = this.props.content_type;
        let khoi = this.props.content_khoi;
        return (
            <Menu
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
                className="navbar-ul-css"
            >
                {/* <Menu.Item key="1">
                    <a href="#a" onClick={this.props.updateCollapse} >
                        <span>
                            <Icon type={this.props.isCollapse ? 'menu-unfold' : 'menu-fold'} />
                        </span>
                    </a>
                </Menu.Item>
                <Menu.Item key="2" >
                    <Switch
                        className="item-setting"
                        checked={this.props.theme === 'dark'}
                        onChange={this.props.themeCollaps}
                        checkedChildren="Dark"
                        unCheckedChildren="Light"
                    />
                </Menu.Item> */}
                {parent !== "" && parent !== undefined ? <Menu.Item key={parent} >
                    <Link onClick={this.onClick} to={`/${parent}`}><span style={{ textAlign: "center", fontSize: "10pt" }}>{this.getParentName(this.props.parentitem, parent)}</span><Icon type="right" /></Link>
                </Menu.Item> : null}
                {ctdt !== "" && ctdt !== undefined ? <Menu.Item key={ctdt} >
                    <Link onClick={this.onClick} to={`/${parent}/${ctdt}`}><span style={{ textAlign: "center", fontSize: "10pt" }}>{this.getCtdtName(this.props.ctdt, ctdt)}</span><Icon type="right" /></Link>
                </Menu.Item> : null}
                {type !== "" && type !== undefined ? <Menu.Item key={type} >
                    <Link onClick={this.onClick} to={`/${parent}/${ctdt}/${type}`}><span style={{ textAlign: "center", fontSize: "10pt" }}>{this.getTypeName(this.props.menuItem, type)}</span><Icon type="right" /></Link>
                </Menu.Item> : null}
                {khoi !== "" && khoi !== undefined && khoi !== "view" ? <Menu.Item key={khoi} >
                    <Link onClick={this.onClick} to={`/${parent}/${ctdt}/${type}/${khoi}`}><span style={{ textAlign: "center", fontSize: "10pt" }}>{this.getKhoiName(this.props.ktt.children, khoi)}</span><Icon type="right" /></Link>
                </Menu.Item> : null}
               <Menu.Item key={this.props.subjectName} >
                    <span style={{ textAlign: "center", fontSize: "10pt" }}>{this.props.subjectName}</span>
                </Menu.Item>
            </Menu>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        menuItem: state.menuitem,
        parentitem: state.parentitem,
        ctdt: state.eduPrograms,
        ktt: state.ktt
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      updateSubjectId: subjectId,
    }, dispatch);
  }
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);