import React, { Component } from 'react';
import { Row, Col, Icon, Button } from 'antd';
import './../decuongmonhoc/index/index.css';
import { Link } from "react-router-dom";
import MenuLeft from './../decuongmonhoc/index/menu/main-menu';
import NavBar from './../decuongmonhoc/index/navbar/navbar';
import Content from './content';
import { connect } from'react-redux';
import { bindActionCreators } from 'redux';
import Page404 from '../../NotFound/Page404';
import axios from 'axios';
import { subjectList, subjectId, subjectMaso } from '../../Constant/ActionType';

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

    checkSubjectExist = (subjectlist, monhoc) => {
        for(let i = 0;i < subjectlist.length;i++) {
            if(subjectlist[i].id === monhoc) {
                return true;
            }
        }
        return false;
    }
    

    componentDidMount() {
        var self = this;
        let monhoc = self.props.match.params.monhoc;
        axios.get('/collect-subjectlist')
     .then(function (response) {
       self.props.updateSubjectList(response.data)
     })
    .catch(function (error) {
       console.log(error);
    });     

    if((this.props.subjectId === "" || this.props.subjectId === undefined || this.props.subjectMaso === "" || 
    this.props.subjectMaso === undefined) && monhoc !== "" && monhoc !== undefined) {
        self.props.updateSubjectId(monhoc) 
    }
}
    render() {
        let type = this.props.match.params.type;
        let isExist = 0;
        for(let i = 0;i < Object.keys(this.props.menuItem).length;i++) {
            if(type === Object.keys(this.props.menuItem)[i]) {
                isExist = 1;
                break;
            }
        }

        if(isExist === 0 || (type !== "de-cuong-mon-hoc" && this.props.match.params.monhoc !== "" &&
        this.props.match.params.monhoc !== undefined)) {
            return <Page404/>;
        }
       
        if(!this.checkSubjectExist(this.props.match.params.type, this.props.match.params.monhoc) && this.props.match.params.monhoc !== "" &&
        this.props.match.params.monhoc !== undefined) {
            // return <Page404/>;
        }
        let GirdLayout;
        if (this.state.collapse) {
            GirdLayout = (<Row>
                <Col span={2} className="col-left col-left-inline">
                    <MenuLeft className="menu_left"
                        collapse={this.state.collapse}
                        theme={this.state.theme}
                        defaultSelectedKeys={[this.props.match.params.type]}
                        content_type={this.props.match.params.type}
                        content_monhoc={this.props.match.params.monhoc}
                        content_tab={this.props.match.params.tab}
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
                    <Content content_type={this.props.match.params.type}
                            content_monhoc={this.props.match.params.monhoc}
                            content_tab={this.props.match.params.tab}/>
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
                        defaultSelectedKeys={[this.props.match.params.type]}
                        content_type={this.props.match.params.type}
                        content_monhoc={this.props.match.params.monhoc}
                        content_tab={this.props.match.params.tab}
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
                    <Content content_type = {this.props.match.params.type}
                            content_tab={this.props.match.params.tab}
                            content_monhoc={this.props.match.params.monhoc}/>
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

const mapStateToProps = (state) => {
    return {
        subjectList: state.subjectlist,
        subjectId: state.subjectid,
        menuItem: state.menuitem
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      updateSubjectList: subjectList,
      updateSubjectId: subjectId,
    }, dispatch);
  }
export default connect(mapStateToProps, mapDispatchToProps)(Home);