import React, { Component } from 'react';
import { Divider } from 'antd';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Direction extends Component {

    getParentName = (parent, id) => {
        for (let i = 0; i < parent.length; i++) {
            if (parent[i].id === id) {
                return parent[i].name;
            }
        }
        return "";
    }

    getCtdtName = (ctdt, id) => {

        if (ctdt !== undefined && ctdt !== null) {
            for (let i = 0; i < ctdt.length; i++) {
                if (ctdt[i].Id === +id) {
                    return ctdt[i].EduName;
                }

            }
        }

        return "";
    }

    getTypeName = (menuitem, id) => {
        for (let i = 0; i < Object.keys(menuitem).length; i++) {
            if (Object.keys(menuitem)[i] === id) {
                return menuitem[Object.keys(menuitem)[i]].name;
            }
        }
        return "";
    }

    getActionName = (menuitem, id) => {
        for (let i = 0; i < menuitem["de-cuong-mon-hoc"].children.length; i++) {
            if (menuitem["de-cuong-mon-hoc"].children[i].id === id) {
                return menuitem["de-cuong-mon-hoc"].children[i].name;
            }
        }
        return "";
    }

    getKhoiName = (dataCtdt, id) => {
        if (dataCtdt !== undefined && dataCtdt !== null) {
            for (let i = 0; i < dataCtdt.length; i++) {
                if (dataCtdt[i].Id === +id) {
                    return dataCtdt[i].NameBlock;
                }
            }
        }

        return "";
    }

    render() {
        let parent = this.props.content_parent;
        let ctdt = this.props.content_ctdt;
        let type = this.props.content_type;
        let action = this.props.content_action;
        let khoi = this.props.content_khoi;
        return (
            <div className="direction-css">
                <Divider type="vertical" />
                {parent !== "" && parent !== undefined ?
                    <Link to={`/${parent}`}><span style={{ textAlign: "center", fontSize: "10pt", paddingTop: "5px" }}>{this.getParentName(this.props.parentitem, parent)}</span></Link>
                    : null}
                <Divider type="vertical" />
                {ctdt !== "" && ctdt !== undefined ?
                    <Link to={`/${parent}/${ctdt}`}><span style={{ textAlign: "center", fontSize: "10pt", paddingTop: "5px" }}>{ctdt === "edit" ? "Edit" : this.getCtdtName(this.props.ctdt, ctdt)}</span></Link>
                    : null}
                <Divider type="vertical" />
                {type !== "" && type !== undefined ?
                    <Link to={`/${parent}/${ctdt}/${type}`}><span style={{ textAlign: "center", fontSize: "10pt", paddingTop: "5px" }}>{this.getTypeName(this.props.menuItem, type)}</span></Link>
                    : null}
                <Divider type="vertical" />
                {action !== "" && action !== undefined ?
                    <Link to={`/${parent}/${ctdt}/${type}/${action}`}><span style={{ textAlign: "center", fontSize: "10pt", paddingTop: "5px" }}>{this.getActionName(this.props.menuItem, action)}</span></Link>
                    : null}
                <Divider type="vertical" />
                {khoi !== "" && khoi !== undefined && khoi !== "view" ?
                    <Link to={`/${parent}/${ctdt}/${type}/${action}/${khoi}`}><span style={{ textAlign: "center", fontSize: "10pt", paddingTop: "5px" }}>{this.getKhoiName(this.props.dataCtdt, khoi)}</span></Link>
                    : null}
                <Divider type="vertical" />
                <span style={{ textAlign: "center", fontSize: "10pt", paddingTop: "5px" }}>{this.props.subjectName}</span>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        menuItem: state.menuitem,
        parentitem: state.parentitem,
        ctdt: state.eduPrograms,

        dataCtdt: state.datactdt.data

    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Direction);