import React, { Component } from 'react';
import { Menu, Icon, Switch } from 'antd';
import "./navbar_css.css"

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
                </Menu.Item>
                <Menu.Item key="3" >
                    <span style={{ textAlign: "center", fontSize: "16pt" }}>{this.props.subjectName}</span>
                </Menu.Item>
            </Menu>
        );
    }
}
export default NavBar;