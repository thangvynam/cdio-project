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
import { subjectList, subjectId, subjectMaso, isLoadEditMatrix, editMatrix, cdrmdhd, cdrmdhddb, cdrCdio, dataCtdt, isLoadedDataCtdt } from '../../Constant/ActionType';
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
            isLoad: false
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

    checkSubjectExist = (subjectlist, monhoc, khoi) => {
        for(let i = 0;i < subjectlist.length;i++) {
            if(subjectlist[i].Id === +monhoc && subjectlist[i].IdSubjectBlock === +khoi) {
                return true;
            }
        }
        return false;
    }

    checkSubjectExist2 = (subjectlist, monhoc) => {
        for(let i = 0;i < subjectlist.length;i++) {
            if(subjectlist[i].Id === +monhoc) {
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


    checkCtdtExist = (Ctdt, ctdt) => {
        for(let i = 0;i < Ctdt.length;i++) {
            if(Ctdt[i].Id === +ctdt) {
                return true;
            }
        }
        return false;
    }

    checkKhoiExist = (dataCtdt, khoi) => {
        for(let i = 0;i < dataCtdt.length;i++) {
            if(dataCtdt[i].Id === +khoi) {
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
    //      $.collectSubjectList()
    //  .then( (response) => {
    //    //self.props.updateSubjectList(response.data);
    //    this.setState({isLoadSubjectList: "true"});
    //  })
    // .catch(function (error) {
    //    console.log(error);
    // });     
    let ctdt = self.props.match.params.ctdt;
    if(ctdt !== "" && ctdt !== undefined && ctdt !== null && this.props.isLoadedDataCtdt === false) {
        $.getBlockSubject(ctdt)
        .then(res => {
        let resData = res.data.data;
        let dataSubject = [];
        let dataCtdt = [];
        if(resData !== undefined && resData !== null) {
            console.log(resData);
            for(let i = 0;i < resData.length;i++) {
            dataCtdt = dataCtdt.concat(resData[i].block);
            for(let j = 0;j < resData[i].block.length;j++) {
                dataSubject = dataSubject.concat(resData[i].block[j].subjects);
            }
            }
        }
        dataSubject.sort((a, b) => a.IdSubject - b.IdSubject);
        this.props.updateSubjectList(dataSubject);
        this.props.updateDataCtdt(dataCtdt);
        this.props.updateIsLoadedDataCtdt(true);
        })
    }
    
    

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
        if (!localStorage.getItem("user")) return <Redirect to="/" />;
        //if(this.state.isLoad=== true || this.props.match.params.ctdt === "" || this.props.match.params.ctdt === undefined) {
            let type = this.props.match.params.type;
            let ctdt = this.props.match.params.ctdt;
            let khoi = this.props.match.params.khoi;
            let monhoc = this.props.match.params.monhoc;
            let parent = this.props.match.params.parent;
            let tab = this.props.match.params.tab;
        

            if(parent !== "" && parent !== undefined && parent !== null) {
                if(!this.checkParentExist(this.props.parentitem, parent)) {
                    console.log("wrong param 1")
                    return <Page404/>;
                }
                else {
                    if(parent === "qlhp" || parent === "qlkh") {
                        //check param 2
                        if(ctdt !== "" && ctdt !== undefined && ctdt !== null) {
                            console.log("param 2 must null")
                                return <Page404/>;
                        }
                    }
                    else if(parent === "cdr"){
                        //check param 2
                        if(ctdt !== "" && ctdt !== undefined && ctdt !== null) {
                            if(ctdt === "edit") {
                                //check param 3
                                if(type !== "" && type !== undefined && type !== null) {
                                    console.log("param 3 must be null")
                                    return <Page404/>;
                                }
                            }
                            else {
                                console.log("wrong param 2")
                                return <Page404/>;
                            }
                        }
                    }
                    else {
                        //check param 2
                        if(ctdt !== "" && ctdt !== undefined && ctdt !== null) {
                            if(!this.checkCtdtExist(this.props.ctdt, ctdt)) {
                                console.log("wrong param 2")
                                return <Page404/>;
                            }
                            else {
                                //check param 3
                                if(type !== "" && type !== undefined && type !== null) {
                                    if(!this.checkTypeExist(this.props.menuItem, type)) {
                                        console.log("wrong param 3")
                                        return <Page404/>;
                                    }
                                    else {
                                        //check param 4
                                        if(type === "de-cuong-mon-hoc") {
                                            if(khoi !== "" && khoi !== undefined && khoi !== null) {
                                                if(!this.checkKhoiExist(this.props.dataCtdt, khoi)) {
                                                    console.log("wrong param 4")
                                                    return <Page404/>;
                                                }
                                                else {
                                                    //check param 5
                                                    if(monhoc !== "" && monhoc !== undefined && monhoc !== null) {
                                                        if(!this.checkSubjectExist(this.props.subjectList, monhoc, khoi)) {
                                                            console.log("wrong param 5")
                                                            return <Page404/>;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        else if(type === "itusurvey") {
                                            if(khoi !== "" && khoi !== undefined && khoi !== null) {
                                                if(khoi !== "view") {
                                                    console.log("wrong param 4")
                                                    return <Page404/>;
                                                }
                                                else {
                                                    //check param 5
                                                    if(monhoc !== "" && monhoc !== undefined && monhoc !==null) {
                                                        if(!this.checkSubjectExist2(this.props.subjectList, monhoc)) {
                                                            console.log("wrong param 5")
                                                            return <Page404/>;
                                                        }
                                                    }
                                                    else {
                                                        console.log("param 5 cannot be null")
                                                        return <Page404/>;
                                                    }
                                                }
                                            }
                                        }

                                        else {
                                            if(khoi !== "" && khoi !== undefined && khoi !== null) {
                                                console.log("param 4 must be null")

                                                return <Page404/>;
                                            }
                                        }
                                    }
                                }
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
    //}
    // else {
    //     return <div>Loading...</div>
    // }
    }
}

const mapStateToProps = (state) => {
    return {
        subjectList: state.subjectlist,
        subjectId: state.subjectid,
        menuItem: state.menuitem,
        parentitem: state.parentitem,
        ctdt: state.eduPrograms,
        editMatrix: state.editmatrix,
        isLoadEditMatrix: state.isloadeditmatrix,
        cdrmdhd: state.cdrmdhd,
        cdrmdhddb: state.cdrmdhddb,
        cdrCdio: state.cdrcdio,
        dataCtdt: state.datactdt.data,
        isLoadedDataCtdt: state.datactdt.isLoaded,
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
      updateDataCtdt: dataCtdt,
      updateIsLoadedDataCtdt: isLoadedDataCtdt
    }, dispatch);
  }
export default connect(mapStateToProps, mapDispatchToProps)(Home);