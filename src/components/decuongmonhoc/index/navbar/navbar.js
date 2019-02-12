import React, { Component } from 'react';
import { Menu, Icon, Button, Switch } from 'antd';
import { Link } from 'react-router-dom';
import "./navbar_css.css"
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class NavBar extends Component {
    state = {
        current: 'mail',
    }

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }
    render() {
        return (
            <Menu
                theme= {this.props.theme}
                onClick={this.handleClick}
                selectedKeys={[this.state.current]}
                mode="horizontal"
            >
                <Menu.Item key="1">
                    <a onClick={this.props.updateCollapse} >
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
                </Menu.Item>
            </Menu>
        );
    }
}
export default NavBar;