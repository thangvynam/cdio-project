import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import {MENUITEM} from './../../../../Constant/ActionType';
import "./menu_css.css"

class MenuLeft extends Component {
    render() {
        return (
            <Menu
                defaultSelectedKeys={['1']}
                mode="inline"
                theme= {this.props.theme}
                inlineCollapsed={this.props.collapse}
                className='menu-style'
            >
                <Menu.Item key="1">
                    <Link to={MENUITEM.THONG_TIN_CHUNG}>
                        <Icon type="dashboard" />
                        <span>THÔNG TIN CHUNG</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to={"/"} >
                        <Icon type="pay-circle" />
                        <span>MÔ TẢ MÔN HỌC</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to={"/"}>
                        <Icon type="inbox" />
                        <span>MỤC TIÊU MÔN HỌC</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to={MENUITEM.CHUAN_DAU_RA} >
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
                    <Link to={"/"}>
                        <Icon type="sync" />
                        <span>KẾ HOẠCH GIẢNG DẠY THỰC HÀNH</span>
                    </Link>
                </Menu.Item>
                <Menu.Item key="7">
                    <Link to={"/"}>
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
                    <Link to={"/"}>
                    <Icon type="reconciliation" />
                        <span>CÁC QUY ĐỊNH CHUNG</span>
                    </Link>
                </Menu.Item>
            </Menu>
        );
    }
}
export default MenuLeft;