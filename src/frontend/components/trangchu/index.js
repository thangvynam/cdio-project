import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './../decuongmonhoc/index/index.css';
import { Link } from "react-router-dom";
import MenuLeft from './../decuongmonhoc/index/menu/main-menu';
import NavBar from './../decuongmonhoc/index/navbar/navbar';

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
                        <Link to={"de-cuong-mon-hoc/222/thong-tin-chung"}>
                            <span>OOP</span>
                        </Link>
                        <hr />
                        <Link to={"de-cuong-mon-hoc/333/thong-tin-chung"}>
                            <span>Design Pattern</span>
                        </Link>
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
                        <Link to={"de-cuong-mon-hoc/222/thong-tin-chung"}>
                            <span>OOP</span>
                        </Link>
                        <hr />
                        <Link to={"de-cuong-mon-hoc/333/thong-tin-chung"}>
                            <span>Design Pattern</span>
                        </Link>
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