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
import { subjectList, subjectId, subjectMaso, isLoadEditMatrix, editMatrix } from '../../Constant/ActionType';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            theme: 'dark',
            isShow: false,
            colorTheme: false,
            subjectList: [],
            cdr_cdio: [],
            isLoadEditMatrix: "false"
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
    
    checkIdExist = (matrix, id) => {
        for(let i = 0;i < matrix.length;i++) {
            if(matrix[i].key === id) {
                return i;
            }
        }
        return -1;
    }

    getCdrCdio = (cdr_cdio, id) => {
      for(let i = 0;i < cdr_cdio.length;i++) {
          if(cdr_cdio[i].id === id)  {
              return cdr_cdio[i].cdr;
          }
      }
      return "";
    }

    getSubjectName = (subjectList, id) => {
        for(let i = 0;i < subjectList.length;i++) {
            if(subjectList[i].id === id) {
                return subjectList[i].ten_mon_hoc_tv;
            }
        }
        return "";
      }

    componentWillReceiveProps(nextProps) {
        console.log(this.state.subjectList.length);
        if(this.props.isLoadEditMatrix === "false" && this.state.subjectList.length > 0) {
            console.log("1")
            this.props.updateIsLoadEditMatrix("true");
            axios.get("/get-standard-matrix").then((res) => {
                let data = [];
                for(let i = 0;i < res.data.length;i++) {
                    let index = this.checkIdExist(data, res.data[i].thong_tin_chung_id);
                    if(index !== -1) {
                        let cdr_cdio = this.getCdrCdio(this.state.cdr_cdio, res.data[i].chuan_dau_ra_cdio_id);
                        if(cdr_cdio !== "") {
                            data[index][cdr_cdio] = res.data[i].muc_do;
                        }
                    }
                    else {  
                        let subjectName = this.getSubjectName(this.state.subjectList, res.data[i].thong_tin_chung_id);
                        let cdr_cdio = this.getCdrCdio(this.state.cdr_cdio, res.data[i].chuan_dau_ra_cdio_id);
                        if(subjectName !== "" && cdr_cdio !== "") {
                            data.push({
                                key: res.data[i].thong_tin_chung_id,
                                hocky: 1,
                                hocphan: subjectName,
                                gvtruongnhom: 'NULL'
                            })

                            data[data.length - 1][cdr_cdio] = res.data[i].muc_do;
                        }
                        
                    }
                }
                this.props.updateEditMatrix(data);
                console.log(data)
              })
              
        }
      }

    componentDidMount() {
        console.log("did sub");
        var self = this;
        let monhoc = self.props.match.params.monhoc;
        axios.get('/collect-subjectlist')
     .then( (response) => {
        console.log("up sub");
        self.setState({subjectList: response.data});
       self.props.updateSubjectList(response.data);
     })
    .catch(function (error) {
       console.log(error);
    });     

    if((this.props.subjectId === "" || this.props.subjectId === undefined || this.props.subjectMaso === "" || 
    this.props.subjectMaso === undefined) && monhoc !== "" && monhoc !== undefined) {
        self.props.updateSubjectId(monhoc) 
    }
    axios.get("/get-cdr-cdio").then((res) => {
        self.setState({cdr_cdio: res.data})
      })
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
        menuItem: state.menuitem,
        editMatrix: state.editmatrix,
        isLoadEditMatrix: state.isloadeditmatrix
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      updateSubjectList: subjectList,
      updateSubjectId: subjectId,
      updateEditMatrix: editMatrix,
      updateIsLoadEditMatrix: isLoadEditMatrix
    }, dispatch);
  }
export default connect(mapStateToProps, mapDispatchToProps)(Home);