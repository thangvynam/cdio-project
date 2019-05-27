import React, { Component } from 'react';
import { Row, Col, Icon, Button } from 'antd';
import './../decuongmonhoc/index/index.css';
import { Link, Redirect } from "react-router-dom";
import MenuLeft from './../decuongmonhoc/index/menu/main-menu';
import NavBar from './../decuongmonhoc/index/navbar/navbar';
import Content from './content';
import { connect } from'react-redux';
import { bindActionCreators } from 'redux';
import Page404 from '../../NotFound/Page404';
import axios from 'axios';
import { subjectList, subjectId, subjectMaso, isLoadEditMatrix, editMatrix, cdrmdhd, cdrmdhddb, cdrCdio } from '../../Constant/ActionType';
import * as eduProgramsAction from "../../CDIO1/actions/eduProgramsAction";
import $ from "./../../helpers/services";
 

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
            theme: 'dark',
            isShow: false,
            colorTheme: false,
            cdr_cdio: [],
            isLoadSubjectList: "false"
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
            if(subjectlist[i].Id.toString() === monhoc.toString()) {
                return true;
            }
        }
        return false;
    }

    checkTypeExist = (menuItem, type) => {
        for(let i = 0;i < Object.keys(menuItem).length;i++) {
            if(Object.keys(menuItem)[i] === type) {
                return true;
            }
        }
        return false;
    }
    
    checkParentExist = (parent, item) => {
        for(let i = 0;i < parent.length;i++) {
            if(parent[i].id === item) {
                return true;
            }
        }
        return false;
    }

    checkParentExist = (parent, id) => {
        for(let i = 0;i < parent.length;i++) {
            if(parent[i].id === id) {
                return true;
            }
        }
        return false;
    }

    checkCtdtExist = (Ctdt, ctdt) => {
        for(let i = 0;i < Ctdt.length;i++) {
            if(Ctdt[i].Id === +ctdt) {
                return true;
            }
        }
        return false;
    }

    checkKhoiExist = (ktt, khoi) => {
        for(let i = 0;i < ktt.length;i++) {
            if(ktt[i].id === khoi) {
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
            if(subjectList[i].Id.toString() === id) {
                return subjectList[i].SubjectName;
            }
        }
        return "";
      }


    componentWillReceiveProps(nextProps) {
        // if(this.props.isLoadEditMatrix === "false" &&  nextProps.subjectList.length > 0) {
        //     this.props.updateIsLoadEditMatrix("true");
        //     axios.get('/get-reality-matrix');
        //     axios.get("/get-standard-matrix").then((res) => {
        //         let data = [];
        //         for(let i = 0;i < res.data.length;i++) {
        //             let index = this.checkIdExist(data, res.data[i].thong_tin_chung_id);
        //             if(index !== -1) {
        //                 let cdr_cdio = this.getCdrCdio(this.state.cdr_cdio, res.data[i].chuan_dau_ra_cdio_id);
        //                 if(cdr_cdio !== "") {
        //                     data[index][cdr_cdio] = res.data[i].muc_do;
        //                 }
        //             }
        //             else {  
        //                 let subjectName = this.getSubjectName( nextProps.subjectList, res.data[i].thong_tin_chung_id);
        //                 let cdr_cdio = this.getCdrCdio(this.state.cdr_cdio, res.data[i].chuan_dau_ra_cdio_id);
        //                 if(subjectName !== "" && cdr_cdio !== "") {
        //                     data.push({
        //                         key: res.data[i].thong_tin_chung_id,
        //                         hocky: 1,
        //                         hocphan: subjectName,
        //                         gvtruongnhom: 'NULL'
        //                     })

        //                     data[data.length - 1][cdr_cdio] = res.data[i].muc_do;
        //                 }
                        
        //             }
        //         }
        //         this.props.updateEditMatrix(data);
        //       })
              
        // }
      }

      checkLevel_1_Exist = (level_1, cdrmdhd) => {
        for(let i = 0;i < cdrmdhd.length;i++) {
            if(cdrmdhd[i].value === level_1) {
                return i;
            }
        }
        return -1;
      }

      checkLevel_2_Exist = (level_2, level_1_children) => {
        for(let i = 0;i < level_1_children.length;i++) {
            if(level_1_children[i].value === level_2) {
                return i;
            }
        }
        return -1;
      }
    componentDidMount() {
        this.props.onLoadEduPrograms();
        var self = this;
        let monhoc = self.props.match.params.monhoc;
        //axios.get('http://172.29.64.132:3001/collect-subjectlist')
        //axios.get('/collect-subjectlist')
         $.collectSubjectList()
     .then( (response) => {
       self.props.updateSubjectList(response.data);
       this.setState({isLoadSubjectList: "true"});
     })
    .catch(function (error) {
       console.log(error);
    });     

    $.collectCdrmdhd4()

    .then(function (response) {
        let cdrmdhd = self.props.cdrmdhd;
        for(let i = 0;i < response.data.length;i++) {
            let index_1 = self.checkLevel_1_Exist(response.data[i].muc_do_1, cdrmdhd);
            if(index_1 != -1) {
                let index_2 = self.checkLevel_2_Exist(response.data[i].muc_do_2, cdrmdhd[index_1].children);
                if(index_2 != -1) {
                    cdrmdhd[index_1].children[index_2].children.push({
                        value: response.data[i].muc_do_3,
                        label: response.data[i].muc_do_3
                      })
                }
                else {
                    cdrmdhd[index_1].children.push({
                        value: response.data[i].muc_do_2,
                        label: response.data[i].muc_do_2,
                        children: [{
                            value: response.data[i].muc_do_3,
                            label: response.data[i].muc_do_3
                        }]
                      })
                }
            }
            else {
                cdrmdhd.push({
                    value: response.data[i].muc_do_1,
                    label: response.data[i].muc_do_1,
                    children: [{
                        value: response.data[i].muc_do_2,
                        label: response.data[i].muc_do_2,
                        children: [{
                            value: response.data[i].muc_do_3,
                            label: response.data[i].muc_do_3
                        }]
                    }]
                  })
            }
        }
        self.props.updateCdrmdhdDB(response.data);
        self.props.updateCdrmdhd(cdrmdhd);
        
    })
    .catch(function (error) {
      console.log(error);
    });

    if((this.props.subjectId === "" || this.props.subjectId === undefined || this.props.subjectMaso === "" || 
    this.props.subjectMaso === undefined) && monhoc !== "" && monhoc !== undefined) {
        self.props.updateSubjectId(monhoc) 
    }

    $.getCDR_CDIO().then((res) => {

        self.props.updateCdrCdio(res.data)
      })
}
componentDidUpdate(){

    window.onpopstate  = (e) => {
        if(this.props.subjectId !== "") {
            
            this.props.updateSubjectId("");
        }
   }
  
      }
    render() {
        if(this.state.isLoadSubjectList === "true") {
            let type = this.props.match.params.type;
            let ctdt = this.props.match.params.ctdt;
            let khoi = this.props.match.params.khoi;
            let parent = this.props.match.params.parent;
            let tab = this.props.match.params.tab;
        
            if(parent !== "" && parent !== undefined && parent !== null) {
                if(!this.checkParentExist(this.props.parentitem, parent)) {
                    return <Page404/>;
                }
                else {
                    if(ctdt !== "" && ctdt !== undefined && ctdt !== null) {
                        if(!this.checkCtdtExist(this.props.ctdt, ctdt) && ctdt !== "edit") {
                          console.log(this.props.ctdt)
                            //return <Page404/>;
                        }
                        else {
                            if(type !== "" && type !== undefined && type !== null) {
                                if(!this.checkTypeExist(this.props.menuItem, type) || ctdt === "edit") {

                                    return <Page404/>;
                                }
                                else {
                                    if(type !== "de-cuong-mon-hoc" && type !== 'itusurvey') {
                                        if(khoi !== "" && khoi !== undefined && khoi !== null) {
                                            return <Page404/>;
                                        }
                                    }
                                    else {
                                        if(khoi !== "" && khoi !== undefined && khoi !== null) {
                                            if(khoi === "view") {
                                                if(type !== "itusurvey") {
                                                    if(!this.checkKhoiExist(this.props.ktt.children, khoi)) {
                                                        console.log(4)
                                                        return <Page404/>;
                                                    }  
                                                }
                                                else {
                                                    if(tab != "itusurvey") {
                                                        return <Page404/>;
                                                    }
                                                }
                                            }
                                            else {
                                                if(!this.checkKhoiExist(this.props.ktt.children, khoi)) {
                                                    console.log(4)
                                                    return <Page404/>;
                                                }  
                                            }
                                              
                                        }
                                        
                                        if(this.props.match.params.monhoc !== "" && this.props.match.params.monhoc !== undefined && this.props.match.params.monhoc !== null) {
                                            if(!this.checkSubjectExist(this.props.subjectList, this.props.match.params.monhoc)) {
                                                console.log(5)
                                                return <Page404/>;
                                            }    
                                        }
                                    }
                                } 
                            }
                        } 
                    }
                    else {
                        if(khoi !== "" && khoi !== undefined && khoi !== null) {
                            if(khoi === "view") {
                                if(type !== "itusurvey") {
                                    if(!this.checkKhoiExist(this.props.ktt.children, khoi)) {
                                        console.log(4)
                                        return <Page404/>;
                                    } 
                                } 
                            } else {
                                if(!this.checkKhoiExist(this.props.ktt.children, khoi)) {
                                    console.log(4)
                                    return <Page404/>;
                                } 
                            }
                        }
                           
            
                        if(this.props.match.params.monhoc !== "" && this.props.match.params.monhoc !== undefined && this.props.match.params.monhoc !== null) {
                            if(!this.checkSubjectExist(this.props.subjectList, this.props.match.params.monhoc)) {
                                console.log(5)
                                return <Page404/>;
                            }    
                        }
                    }
                } 
            }

            

            

            
            let subjectName = this.getSubjectName(this.props.subjectList, this.props.match.params.monhoc);
            let GirdLayout;
            if (this.state.collapse) {
                GirdLayout = (<Row>
                    <Col span={2} className="col-left col-left-inline">
                        <MenuLeft 
                            collapse={this.state.collapse}
                            theme={this.state.theme}
                            defaultSelectedKeys={[this.props.match.params.parent]}
                            content_type={this.props.match.params.type}
                            content_monhoc={this.props.match.params.monhoc}
                            content_tab={this.props.match.params.tab}
                            content_khoi={this.props.match.params.khoi}
                            content_ctdt={this.props.match.params.ctdt}
                            content_parent={this.props.match.params.parent}
                        />
                    </Col>
                    <Col span={22} className="col-right">
                        <Row>
                            <NavBar
                                updateCollapse={this.updateCollapse}
                                isCollapse={this.state.collapse}
                                theme={this.state.theme}
                                themeCollaps={this.themeCollaps}
                                subjectName={subjectName}
                                content_khoi={this.props.match.params.khoi}
                                content_ctdt={this.props.match.params.ctdt}
                                content_parent={this.props.match.params.parent}
                                content_type={this.props.match.params.type}
                            />
                        </Row>
                        <Row >
                        <Content content_type={this.props.match.params.type}
                                content_monhoc={this.props.match.params.monhoc}
                                content_tab={this.props.match.params.tab}
                                content_khoi={this.props.match.params.khoi}
                                content_ctdt={this.props.match.params.ctdt}
                                content_parent={this.props.match.params.parent}
                                subjectName={subjectName}/>
                        </Row>
                    </Col>
                </Row>);
            }
            else {
                GirdLayout = (<Row>
                    <Col span={5} className="col-left">
                        <MenuLeft
                            
                            collapse={this.state.collapse}
                            theme={this.state.theme}
                            defaultSelectedKeys={[this.props.match.params.parent]}
                            content_type={this.props.match.params.type}
                            content_monhoc={this.props.match.params.monhoc}
                            content_tab={this.props.match.params.tab}
                            content_khoi={this.props.match.params.khoi}
                            content_ctdt={this.props.match.params.ctdt}
                            content_parent={this.props.match.params.parent}
                        />
                    </Col>
                    <Col span={19} className="col-right">
                        <Row>
                            <NavBar
                                updateCollapse={this.updateCollapse}
                                isCollapse={this.state.collapse}
                                theme={this.state.theme}
                                themeCollaps={this.themeCollaps}
                                subjectName={subjectName}
                                content_khoi={this.props.match.params.khoi}
                                content_ctdt={this.props.match.params.ctdt}
                                content_parent={this.props.match.params.parent}
                                content_type={this.props.match.params.type}
                            />
                        </Row>
                        <Row>
                        <Content content_type = {this.props.match.params.type}
                                content_tab={this.props.match.params.tab}
                                content_monhoc={this.props.match.params.monhoc}
                                content_khoi={this.props.match.params.khoi}
                                content_ctdt={this.props.match.params.ctdt}
                                content_parent={this.props.match.params.parent}
                                subjectName={subjectName}/>
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
    else {
        return <div>Loading...</div>
    }
    }
}

const mapStateToProps = (state) => {
    return {
        subjectList: state.subjectlist,
        subjectId: state.subjectid,
        menuItem: state.menuitem,
        parentitem: state.parentitem,
        ctdt: state.eduPrograms,
        ktt: state.ktt,
        editMatrix: state.editmatrix,
        isLoadEditMatrix: state.isloadeditmatrix,
        cdrmdhd: state.cdrmdhd,
        cdrmdhddb: state.cdrmdhddb,
        cdrCdio: state.cdrcdio
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
      updateSubjectList: subjectList,
      updateSubjectId: subjectId,
      updateEditMatrix: editMatrix,
      updateIsLoadEditMatrix: isLoadEditMatrix,
      updateCdrmdhd: cdrmdhd,
      updateCdrmdhdDB: cdrmdhddb,
      updateCdrCdio: cdrCdio,
      onLoadEduPrograms: eduProgramsAction.onLoadEduPrograms,
    }, dispatch);
  }
export default connect(mapStateToProps, mapDispatchToProps)(Home);