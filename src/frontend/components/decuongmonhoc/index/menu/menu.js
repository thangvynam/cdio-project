import React, { Component } from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import { MENUITEM } from "./../../../../Constant/ActionType";
import "./menu_css.css";

class MenuLeft extends Component {
  render() {
      console.log(this.props.path)
    return (
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        theme={this.props.theme}
        inlineCollapsed={this.props.collapse}
        className="menu-style"
      >
        <Menu.Item key="1">
          <Link to={MENUITEM.THONG_TIN_CHUNG}>
            <Icon type="dashboard" />
            <span>THÔNG TIN CHUNG</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to={MENUITEM.MO_TA_MON_HOC}>
            <Icon type="pay-circle" />
            <span>MÔ TẢ MÔN HỌC</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to={MENUITEM.MUC_TIEU_MON_HOC}>
            <Icon type="inbox" />
            <span>MỤC TIÊU MÔN HỌC</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to={MENUITEM.CHUAN_DAU_RA}>
            <Icon type="table" />
            <span>CHUẨN ĐẦU RA MÔN HỌC</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link to={MENUITEM.GIANG_DAY_LY_THUYET}>
            <Icon type="read" />
            <span>KẾ HOẠCH GIẢNG DẠY LÝ THUYẾT</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="6">
          <Link to={MENUITEM.GIANG_DAY_THUC_HANH}>
            <Icon type="sync" />
            <span>KẾ HOẠCH GIẢNG DẠY THỰC HÀNH</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="7">
          <Link to={MENUITEM.DANH_GIA}>
            <Icon type="file-text" />
            <span>ĐÁNH GIÁ</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="8">
          <Link to={MENUITEM.TAI_NGUYEN_MON_HOC}>
            <Icon type="database" />
            <span>TÀI NGUYÊN MÔN HỌC </span>
          </Link>
        </Menu.Item>
        <Menu.Item key="9">
          <Link to={MENUITEM.QUY_DINH_CHUNG}>
            <Icon type="reconciliation" />
            <span>CÁC QUY ĐỊNH CHUNG</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="10">
          <Link to={MENUITEM.XUAT_FILE_PDF}>
            <Icon type="file-pdf" />
            <span>XUẤT FILE PDF</span>
          </Link>
        </Menu.Item><Menu.Item key="11">
          <Link to={`/${this.props.path}`}>
          <Icon type="step-backward" />
            <span>QUAY LẠI</span>
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}
export default MenuLeft;