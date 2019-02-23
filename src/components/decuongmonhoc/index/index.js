import React, { Component } from 'react';
import { Row, Col, Button, Icon, Switch, Menu, Avatar } from 'antd';
import './index.css';
import Content from './content/content';
import MenuLeft from './menu/menu';
import NavBar from './navbar/navbar';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseHover: false,
            collapse: false,
            theme: 'dark',
            isShow: false,
            colorTheme: false
        }
    }

    getTitlePage = () => {
        console.log(this.props.match.params.type)
        switch (this.props.match.params.type) {
            case 'thong-tin-chung':
                return "Thông Tin Chung";
            case 'mo-ta-mon-hoc':
                return "Mô Tả Môn Học";
            case 'chuan-dau-ra':
                return "Chuẩn Đầu Ra";
            case 'danh-gia':
                return "Đánh Giá";
            case 'giang-day-ly-thuyet':
                return "Giảng Dạy Lý Thuyết";
            case 'giang-day-thuc-hanh':
                return "Giảng Dạy Thực Hành";
            case 'muc-tieu-mon-hoc':
                return "Mục Tiêu Môn Học";
            case 'quy-dinh-chung':
                return "Quy Định Chung";
            case 'tai-nguyen-mon-hoc':
                return "Tài Nguyên Môn Học";
            default:
                return "";
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

    isCollapseMenu = () => {
        this.setState({
            collapse: !this.state.collapse
        })
    }

    Test = () => {
        this.setState({
            collapse: false,
            collapseHover: true
        })
    }

    Test2 = () => {
        if (this.state.collapseHover === true) {
            this.setState({
                collapse: true,
                collapseHover: false
            })
        }
    }

    handleHoverMenu = () => {
        if (this.state.collapseHover) {
            return (
                <React.Fragment>
                    <Col span={2}>
                        <Row className="navbar-logo">
                            <Col className="navbar-left-icon" span={2}>
                                <a onClick={this.isCollapseMenu}>
                                    <span>
                                        <Icon className="icon-style" style={{ fontSize: '1.5rem', color: '#fff' }} type="align-left" />
                                    </span>
                                </a>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="navbar-left-style" span={22}>
                        <NavBar
                            updateCollapse={this.updateCollapse}
                            isCollapse={this.state.collapse}
                        />
                    </Col>
                </React.Fragment>
            );
        }
        return (
            <React.Fragment>
                <Col span={5}>
                    <Row className="navbar-logo">
                        <Col span={3}>
                            <h3><span><a>SYLLABUS</a></span></h3>
                        </Col>
                        <Col span={2}>
                            <a onClick={this.isCollapseMenu}>
                                <span>
                                    <Icon className="icon-style" style={{ fontSize: '1.5rem', color: '#fff' }} type="align-right" />
                                </span>
                            </a>
                        </Col>
                    </Row>
                </Col>
                <Col className="navbar-left-style" span={19}>
                    <NavBar
                        updateCollapse={this.updateCollapse}
                        isCollapse={this.state.collapse}
                    />
                </Col>
            </React.Fragment>
        );
    }

    render() {
        let GirdLayout;
      
        if (this.state.collapse) {
            GirdLayout = (
                <React.Fragment>
                    <Row className="navbar-style">
                        <Col span={2}>
                            <Row className="navbar-logo">
                                <Col className="navbar-left-icon" span={2}>
                                    <a onClick={this.isCollapseMenu}>
                                        <span>
                                            <Icon className="icon-style" style={{ fontSize: '1.5rem', color: '#fff' }} type="align-left" />
                                        </span>
                                    </a>
                                </Col>
                            </Row>
                        </Col>
                        <Col className="navbar-left-style" span={22}>
                            <NavBar
                                updateCollapse={this.updateCollapse}
                                isCollapse={this.state.collapse}
                            />
                        </Col>
                    </Row>
                    <Row className="section-content">
                        <Col span={2} className="col-left col-left-inline"
                            onMouseMove={this.Test}
                            onMouseLeave={this.Test2}
                        >
                            <MenuLeft className="menu_left"
                                collapse={this.state.collapse}
                                theme={this.state.theme}
                            />
                        </Col>
                        <Col span={22} className="col-right">
                            <Row className="col-right-title">
                                <div>
                                    <h3 >Syllabus</h3>
                                    <ul >
                                        <li className="first"><Icon type="home" /></li>
                                        <li>-</li>
                                        <li>Page</li>
                                        <li>-</li>
                                        <li>{this.getTitlePage()}</li>
                                    </ul>
                                </div>
                            </Row>
                            <Row className="content-style">
                                <Content content_type={this.props.match.params.type} />
                            </Row>
                        </Col>
                    </Row>
                </React.Fragment>);
        }
        else {
            GirdLayout = (
                <React.Fragment>
                    <Row className="navbar-style">
                        {this.handleHoverMenu()}
                    </Row>
                    <Row className="section-content">
                        <Col span={5} className="col-left"
                            onMouseLeave={this.Test2}
                        >
                            <MenuLeft
                                className="menu_left"
                                collapse={this.state.collapse}
                            />
                        </Col>
                        <Col span={19} className="col-right">
                            <Row className="col-right-title">
                                <div>
                                    <h3 >Syllabus</h3>
                                    <ul >
                                        <li className="first"><Icon type="home" /></li>
                                        <li>-</li>
                                        <li>Page</li>
                                        <li>-</li>
                                        <li>{this.getTitlePage()}</li>
                                    </ul>
                                </div>
                            </Row>
                            <Row className="content-style">
                                <Content content_type={this.props.match.params.type} />
                            </Row>
                        </Col>
                    </Row>
                </React.Fragment>);
        }

        return (
            <React.Fragment className="Main">
                {GirdLayout}
            </React.Fragment>
        )
    }
}

export default Dashboard;