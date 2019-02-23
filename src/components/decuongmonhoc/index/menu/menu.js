import React, { Component } from 'react';
import { Menu, Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
import {MENUITEM} from './../../../../config/chuan-dau-ra';
import "./menu_css.css"
const SubMenu = Menu.SubMenu;


class MenuLeft extends Component {
    render() {
        return (
            <Menu
                // defaultSelectedKeys={['1']}
                mode="inline"
                theme= "dark"
                inlineCollapsed={this.props.collapse}
                className='menu-style'
            >
                <Menu.Item key="1">
                    <Link to={MENUITEM.THONG_TIN_CHUNG}>
                        <Icon type="dashboard" />
                        <span>Thông Tin Chung</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to={"/"} >
                        <Icon type="pay-circle" />
                        <span>Mô Tả Môn Học</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to={"/"}>
                        <Icon type="inbox" />
                        <span>Mục Tiêu Môn Học</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to={MENUITEM.CHUAN_DAU_RA} >
                        <Icon type="table" />
                        <span>Chuẩn Đầu Ra</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="5">
                    <Link to={"/"}>
                        <Icon type="read" />
                        <span>Kế Hoạch Giảng Dạy Lý Thuyết</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="6">
                    <Link to={"/"}>
                        <Icon type="sync" />
                        <span>Kế Hoạch Giảng Dạy Thực Hành</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="7">
                    <Link to={"/"}>
                        <Icon type="file-text" />   
                        <span>Đánh Giá</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="8">
                    <Link to={MENUITEM.TAI_NGUYEN_MON_HOC}>
                        <Icon type="database" />
                        <span>Tài Nguyên Môn Học </span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="9">
                    <Link to={"/"}>
                    <Icon type="reconciliation" />
                        <span>Các Quy Định Chung</span>
                    </Link>
                </Menu.Item>
            </Menu>
        );
    }
}
export default MenuLeft;