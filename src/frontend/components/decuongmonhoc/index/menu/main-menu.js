import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import { MENUITEM, subjectId } from "./../../../../Constant/ActionType";
import { connect } from'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from "react-router-dom";
import "./menu_css.css";

const SubMenu = Menu.SubMenu;
class MenuLeft extends Component {

    state = {
        rdrCount: 0,
    }
    onClick = (key) => {
        this.props.updateSubjectId("");
    }

    checkSubjectExist = (type, monhoc) => {
        for(let i = 0;i < this.props.subjectList[type][type].length;i++) {
            if(this.props.subjectList[type][type][i].id === monhoc) {
                return true;
            }
        }
        return false;
    }

    redirect = () => {
        if(this.props.subjectId !== "" && this.props.subjectId !== undefined && (this.props.content_monhoc === "" ||
        this.props.content_monhoc === undefined)) {
            return <Redirect to={`/${this.props.content_type}/${this.props.subjectId}/thong-tin-chung`}/>
        }
        else if(this.props.content_monhoc !== "" && this.props.content_monhoc !== undefined && (this.props.content_tab === ""
    || this.props.content_tab === undefined) && this.checkSubjectExist(this.props.content_type, this.props.content_monhoc) === true) {
        return <Redirect to={`/${this.props.content_type}/${this.props.content_monhoc}/thong-tin-chung`}/>
    }
    }

    render() {
        const menuItemsCollapse = [];
        Object.keys(this.props.subjectList).map((key, id) => {
            if(this.props.content_monhoc !== "" && this.props.content_monhoc !== undefined && key === this.props.content_type) {
                menuItemsCollapse.push(<Menu.Item key={key} onClick={() => this.onClick(key)}>
                <Link to={`/${key}`} >
                    <Icon type="dashboard" />
                    <span>{this.props.subjectList[key].name}</span>
                </Link>
            </Menu.Item>)
        menuItemsCollapse.push(<Menu.Item key={MENUITEM.THONG_TIN_CHUNG}>
            <Link style={{paddingLeft: "20px"}} to={MENUITEM.THONG_TIN_CHUNG}>
                <Icon type="dashboard" />
                <span>Thông tin chung</span>
            </Link>
        </Menu.Item>)
        menuItemsCollapse.push(<Menu.Item key={MENUITEM.MO_TA_MON_HOC}>
        <Link style={{paddingLeft: "20px"}} to={MENUITEM.MO_TA_MON_HOC}>
            <Icon type="pay-circle" />
            <span>Mô tả môn học</span>
          </Link>
        </Menu.Item>)
        menuItemsCollapse.push(<Menu.Item key={MENUITEM.MUC_TIEU_MON_HOC}>
        <Link style={{paddingLeft: "20px"}} to={MENUITEM.MUC_TIEU_MON_HOC}>
            <Icon type="inbox" />
            <span>Mục tiêu môn học</span>
          </Link>
        </Menu.Item>)
        menuItemsCollapse.push(<Menu.Item key={MENUITEM.CHUAN_DAU_RA}>
        <Link style={{paddingLeft: "20px"}} to={MENUITEM.CHUAN_DAU_RA}>
            <Icon type="table" />
            <span>Chuẩn đầu ra môn học</span>
          </Link>
        </Menu.Item>)
        menuItemsCollapse.push(<Menu.Item key={MENUITEM.GIANG_DAY_LY_THUYET}>
        <Link style={{paddingLeft: "20px"}} to={MENUITEM.GIANG_DAY_LY_THUYET}>
            <Icon type="read" />
            <span>Kế hoạch giảng dạy lý thuyết</span>
          </Link>
        </Menu.Item>)
        menuItemsCollapse.push(<Menu.Item key={MENUITEM.GIANG_DAY_THUC_HANH}>
        <Link style={{paddingLeft: "20px"}} to={MENUITEM.GIANG_DAY_THUC_HANH}>
            <Icon type="sync" />
            <span>Kế hoạch giảng dạy thực hành</span>
          </Link>
        </Menu.Item>)
        menuItemsCollapse.push(<Menu.Item key={MENUITEM.DANH_GIA}>
        <Link style={{paddingLeft: "20px"}} to={MENUITEM.DANH_GIA}>
            <Icon type="file-text" />
            <span>Đánh giá</span>
          </Link>
        </Menu.Item>)
        menuItemsCollapse.push(<Menu.Item key={MENUITEM.TAI_NGUYEN_MON_HOC}>
        <Link style={{paddingLeft: "20px"}} to={MENUITEM.TAI_NGUYEN_MON_HOC}>
            <Icon type="database" />
            <span>Tài nguyên môn học</span>
          </Link>
        </Menu.Item>)
        menuItemsCollapse.push(<Menu.Item key={MENUITEM.QUY_DINH_CHUNG}>
        <Link style={{paddingLeft: "20px"}} to={MENUITEM.QUY_DINH_CHUNG}>
            <Icon type="reconciliation" />
            <span>Các quy định chung</span>
          </Link>
        </Menu.Item>)
        menuItemsCollapse.push(<Menu.Item key={MENUITEM.XUAT_FILE_PDF}>
        <Link style={{paddingLeft: "20px"}} to={MENUITEM.XUAT_FILE_PDF}>
            <Icon type="file-pdf" />
            <span>Xuất file PDF</span>
          </Link>
        </Menu.Item>)
            }
            else {
                menuItemsCollapse.push(<Menu.Item key={key} onClick={() => this.onClick(key)}>
        <Link to={`/${key}`} >
            <Icon type="dashboard" />
            <span>{this.props.subjectList[key].name}</span>
          </Link>
        </Menu.Item>)
            }
        })

      
        return (
            <div>
            {this.redirect()}
        <Menu
                mode="inline"
                theme={this.props.theme}
                inlineCollapsed={this.props.collapse}
                className="menu-style"
                defaultSelectedKeys={this.props.defaultSelectedKeys}
                selectedKeys={this.props.content_tab !== "" && this.props.content_tab !== undefined ? [this.props.content_tab] : this.props.defaultSelectedKeys}
                children={menuItemsCollapse}
            >
            </Menu>
        </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        subjectList: state.subjectlist,
        subjectId: state.subjectid
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      updateSubjectId: subjectId
    }, dispatch);
  }
export default connect(mapStateToProps, mapDispatchToProps)(MenuLeft);
