import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './../decuongmonhoc/index/index.css';
import { Redirect } from "react-router-dom";
import MenuLeft from './../decuongmonhoc/index/menu/main-menu';
import NavBar from './../decuongmonhoc/index/navbar/navbar';
import $ from "./../../helpers/services";
import _ from 'lodash';

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


    componentWillMount(){
        if (!_.isNull(localStorage.getItem("user")) ){
          let user = JSON.parse(localStorage.getItem("user"));
          $.authenMe({ "access": user.token }).then(res => {
            if (res.data.status === 200) {
              localStorage.clear();
              $.setStorage(res.data)
            }
            else{
                  localStorage.clear();
                  this.props.history.push('/')
            }
          })
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
        if (!localStorage.getItem("user")) return <Redirect to="/" />;
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
                        history = {this.props.history}
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