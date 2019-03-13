import React, { Component } from 'react';
import { Row, Col, Icon, Button } from 'antd';
import './../decuongmonhoc/index/index.css';
import { Link } from "react-router-dom";
import MenuLeft from './../decuongmonhoc/index/menu/main-menu';
import NavBar from './../decuongmonhoc/index/navbar/navbar';
import Content from '../decuongmonhoc/index/content/content'
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            theme: 'dark',
            isShow: false,
            colorTheme: false
        }
    }

    updateCollapse = () => {
        this.setState({
            collapse: !this.state.collapse
        })
    }

    themeCollaps = (value) => {
        this.setState({
            theme: value ? 'dark' : 'light',
        });
    }

    setA = () => {
        this.setState({
            isShow: !this.state.isShow
        })
    }

    render() {
        let GirdLayout;
        if (this.state.collapse) {
            GirdLayout = (<Row>
                <Col span={2} className="col-left col-left-inline">
                    <MenuLeft className="menu_left"
                        collapse={this.state.collapse}
                        theme={this.state.theme}
                        defaultSelectedKeys={this.props.match.params.type === 'de-cuong-mon-hoc' ? 
                    ['1'] : this.props.match.params.type === 'tab-2' ? ['2'] : []}
                    />
                </Col>
                <Col span={22} className="col-right">
                    <Row>
                        <NavBar
                            updateCollapse={this.updateCollapse}
                            isCollapse={this.state.collapse}
                            theme={this.state.theme}
                            themeCollaps={this.themeCollaps}
                        />
                    </Row>
                    <Row >
                    <Content content_type = {this.props.match.params.type}/>
                    </Row>
                </Col>
            </Row>);
        }
        else {
            GirdLayout = (<Row>
                <Col span={5} className="col-left">
                    <MenuLeft
                        className="menu_left"
                        collapse={this.state.collapse}
                        theme={this.state.theme}
                        defaultSelectedKeys={this.props.match.params.type === 'de-cuong-mon-hoc' ? 
                    ['1'] : this.props.match.params.type === 'tab-2' ? ['2'] : []}
                    />
                </Col>
                <Col span={19} className="col-right">
                    <Row>
                        <NavBar
                            updateCollapse={this.updateCollapse}
                            isCollapse={this.state.collapse}
                            theme={this.state.theme}
                            themeCollaps={this.themeCollaps}
                        />
                    </Row>
                    <Row>
                    <Content content_type = {this.props.match.params.type}/>
                    </Row>
                </Col>
            </Row>);
        }

        return (
            <React.Fragment>
                {GirdLayout}
            </React.Fragment>
        )
    }
}

export default Home;