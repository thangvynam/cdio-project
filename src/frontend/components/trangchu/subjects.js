import React, { Component } from 'react';
import { Row, Col, Icon, Button } from 'antd';
import './../decuongmonhoc/index/index.css';
import { Link, Redirect } from "react-router-dom";
import MenuLeft from './../decuongmonhoc/index/menu/main-menu';
import NavBar from './../decuongmonhoc/index/navbar/navbar';
import Content from './content';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Page404 from '../../NotFound/Page404';
import { MENUITEM, subjectList, subjectId, subjectMaso, isLoadEditMatrix, editMatrix, cdrmdhd, cdrmdhddb, cdrCdio, dataCtdt, isLoadedDataCtdt, teacherSubject, teacherReviewSubject } from '../../Constant/ActionType';
import * as eduProgramsAction from "../../CDIO1/actions/eduProgramsAction";
import $ from "./../../helpers/services";
import NewNav from '../decuongmonhoc/index/navbar/newnav';
import Direction from './direction';
import queryString from 'query-string';
import _ from 'lodash';
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

    // componentWillMount(){
    //     console.log("sadsad");
    //     if (!_.isNull(localStorage.getItem("user")) ){
    //       let user = JSON.parse(localStorage.getItem("user"));
    //       $.authenMe({ "access": user.token }).then(res => {
    //         if (res.data.status === 200) {
    //           localStorage.clear();
    //           $.setStorage(res.data)
    //         }
    //         else{
    //               localStorage.clear();
    //               this.props.history.push('/')
    //         }
    //       })
    //     }
    //     else this.props.history.push('/');
    //   }




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
        for (let i = 0; i < subjectlist.length; i++) {
            if (subjectlist[i].Id === +monhoc && subjectlist[i].IdSubjectBlock === +khoi) {
                return true;
            }
        }
        return false;
    }

    checkSubjectExist2 = (subjectlist, monhoc) => {
        for (let i = 0; i < subjectlist.length; i++) {
            if (subjectlist[i].Id === +monhoc) {
                return true;
            }
        }
        return false;
    }

    checkTypeExist = (menuItem, type) => {
        for (let i = 0; i < Object.keys(menuItem).length; i++) {
            if (Object.keys(menuItem)[i] === type) {
                return true;
            }
        }
        return false;
    }

    checkParentExist = (parent, item) => {
        for (let i = 0; i < parent.length; i++) {
            if (parent[i].id === item) {
                return true;
            }
        }
        return false;
    }


    checkCtdtExist = (Ctdt, ctdt) => {
        for (let i = 0; i < Ctdt.length; i++) {
            if (Ctdt[i].Id === +ctdt) {
                return true;
            }
        }
        return false;
    }

    checkKhoiExist = (dataCtdt, khoi) => {
        for (let i = 0; i < dataCtdt.length; i++) {
            if (dataCtdt[i].Id === +khoi) {
                return true;
            }
        }
        return false;
    }

    checkIdExist = (matrix, id) => {
        for (let i = 0; i < matrix.length; i++) {
            if (matrix[i].key === id) {
                return i;
            }
        }
        return -1;
    }

    checkActionExist = (menuitem, action) => {
        for (let i in menuitem["de-cuong-mon-hoc"].children) {
            if (menuitem["de-cuong-mon-hoc"].children[i].id === action)
                return true;
        }
        return false;
    }

    checkTabExist = (MENUITEM, tab) => {
        for (let i = 0; i < Object.keys(MENUITEM).length; i++) {
            if (MENUITEM[Object.keys(MENUITEM)[i]] === tab) {
                return true;
            }
        }
        return false;
    }

    getCdrCdio = (cdr_cdio, id) => {
        for (let i = 0; i < cdr_cdio.length; i++) {
            if (cdr_cdio[i].id === id) {
                return cdr_cdio[i].cdr;
            }
        }
        return "";
    }

    getSubjectName = (subjectList, id) => {
        for (let i = 0; i < subjectList.length; i++) {
            if (subjectList[i].Id.toString() === id) {
                return subjectList[i].SubjectName;
            }
        }
        return "";
    }



    checkLevel_1_Exist = (level_1, cdrmdhd) => {
        for (let i = 0; i < cdrmdhd.length; i++) {
            if (cdrmdhd[i].value === level_1) {
                return i;
            }
        }
        return -1;
    }

    checkLevel_2_Exist = (level_2, level_1_children) => {
        for (let i = 0; i < level_1_children.length; i++) {
            if (level_1_children[i].value === level_2) {
                return i;
            }
        }
        return -1;
    }
    checkInTeacherSubject = (teacherSubject, idSubject) => {
        for (let i = 0; i < teacherSubject.length; i++) {
            if (teacherSubject[i].IdSubject === idSubject) {
                return true;
            }
        }
        return false;
    }

    checkInTeacherReviewSubject = (teacherReviewSubject, idSubject) => {
        for (let i = 0; i < teacherReviewSubject.length; i++) {
            if (teacherReviewSubject[i].idTTC === idSubject) {
                return true;
            }
        }
        return false;
    }

    componentDidMount() {

        if (!_.isNull(localStorage.getItem("user"))) {
            let user = JSON.parse(localStorage.getItem("user"));
            $.authenMe({ "access": user.token }).then(res => {
                if (res.data.status === 200) {
                    localStorage.clear();
                    $.setStorage(res.data)

                    this.props.onLoadEduPrograms();
                    var self = this;
                    let monhoc = self.props.match.params.monhoc;
                    let ctdt = self.props.match.params.ctdt;
                    if (ctdt !== "survey-matrix" && ctdt !== "" && ctdt !== undefined && ctdt !== null && this.props.isLoadedDataCtdt === false) {
                        $.getBlockSubject(ctdt).then(res => {
                            console.log(res.data.data)
                            let resData = res.data.data;
                            let dataSubject = [];
                            let dataCtdt = [];
                            if (resData !== undefined && resData !== null) {
                                for (let i = 0; i < resData.length; i++) {
                                    dataCtdt = dataCtdt.concat(resData[i].block);
                                    for (let j = 0; j < resData[i].block.length; j++) {
                                        dataSubject = dataSubject.concat(resData[i].block[j].subjects);
                                    }
                                }
                                dataSubject.sort((a, b) => a.IdSubject - b.IdSubject);

                                $.getTeacherSubject({ idUser: JSON.parse(localStorage.getItem('user')).data.Id })
                                    .then(res => {
                                        if (res.data !== undefined && res.data !== null) {
                                            this.props.updateTeacherSubject(res.data);
                                        }
                                        $.getTeacherReviewSubject({ idUser: JSON.parse(localStorage.getItem('user')).data.Id })
                                            .then(res => {
                                                if (res.data !== undefined && res.data !== null) {
                                                    this.props.updateTeacherReviewSubject(res.data);
                                                }
                                                if (this.checkChuNhiem(JSON.parse(localStorage.getItem('user')).data.Role)) {
                                                    dataSubject = dataSubject.filter(item =>
                                                        item.del_flat != 1
                                                    );
                                                    this.props.updateSubjectList(dataSubject);
                                                }
                                                else {
                                                    dataSubject = dataSubject.filter(item =>
                                                        item.del_flat != 1
                                                        && (this.checkInTeacherReviewSubject(this.props.teacherReviewSubject, item.IdSubject)
                                                            || this.checkInTeacherSubject(this.props.teacherSubject, item.IdSubject))
                                                    );
                                                    this.props.updateSubjectList(dataSubject);
                                                }
                                            });
                                    });

                                this.props.updateDataCtdt(dataCtdt);
                                this.props.updateIsLoadedDataCtdt(true);

                            }
                        })
                    }



                    $.collectCdrmdhd4()
                        .then(function (response) {
                            let cdrmdhd = self.props.cdrmdhd;
                            for (let i = 0; i < response.data.length; i++) {
                                let index_1 = self.checkLevel_1_Exist(response.data[i].muc_do_1, cdrmdhd);
                                if (index_1 != -1) {
                                    let index_2 = self.checkLevel_2_Exist(response.data[i].muc_do_2, cdrmdhd[index_1].children);
                                    if (index_2 != -1) {
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

                    if ((this.props.subjectId === "" || this.props.subjectId === undefined || this.props.subjectMaso === "" ||
                        this.props.subjectMaso === undefined) && monhoc !== "" && monhoc !== undefined) {
                        self.props.updateSubjectId(monhoc)
                    }

                    if(ctdt !== "" && ctdt !== undefined && ctdt !== null && ctdt !== "survey-matrix") {
                        $.getCDR_CDIO(ctdt)
                    .then(res => this.props.updateCdrCdio(res.data));
                    }
                    
                    ///
                }
                else {
                    localStorage.clear();
                    this.props.history.push('/')
                }
            })
        }
        else this.props.history.push('/');

    }

    checkAdmin = (role) => {
        if (role.indexOf("ADMIN") > -1) {
            return true;
        }
        return false;
    }
    checkChuNhiem = (role) => {
        if (role.indexOf("CHUNHIEM") > -1) {
            return true;
        }
        return false;
    }

    checkBienSoan = (role) => {
        if (role.indexOf("BIEN_SOAN") > -1) {
            return true;
        }
        return false;
    }

    checkTeacher = (role) => {
        if (role.indexOf("TEACHER") > -1) {
            return true;
        }
        return false;
    }

    checkTeachBlock = (block) => {
        for (let i = 0; i < block.subjects.length; i++) {
            if (this.checkInTeacherSubject(this.props.teacherSubject, block.subjects[i].IdSubject)) {
                return true;
            }
        }
        return false;
    }

    checkReviewBlock = (block) => {
        for (let i = 0; i < block.subjects.length; i++) {
            if (this.checkInTeacherReviewSubject(this.props.teacherReviewSubject, block.subjects[i].IdSubject)) {
                return true;
            }
        }
        return false;
    }

    checkRoleExist = (userRole, menuRole) => {
        for (let role in userRole) {
            if (menuRole.includes(userRole[role])) return true;
        }
        return false;
    }

    checkExist = (item) => {
        return item !== "" && item !== undefined && item !== null;
    }

    componentDidUpdate() {

        window.onpopstate = (e) => {
            if (this.props.subjectId !== "") {
                this.props.updateSubjectId("");
            }
        }

    }

    render() {
        if (!localStorage.getItem("user")) return <Redirect to="/" />;

        let parent = this.props.match.params.parent;    //param 1
        let ctdt = this.props.match.params.ctdt;    //param 2
        let type = this.props.match.params.type;    //param 3
        let action = this.props.match.params.action;    //param 4
        let khoi = this.props.match.params.khoi;    //param 5
        let monhoc = this.props.match.params.monhoc;    //param 6
        let tab = this.props.match.params.tab;  //param 7
        let parenItem = this.props.parentitem;
        let ctdtList = this.props.ctdt;
        let menuItem = this.props.menuItem;
        let dataCtdt = this.props.dataCtdt;
        let subjectList = this.props.subjectList;
        let teacherSubject = this.props.teacherSubject;
        let userRole = JSON.parse(localStorage.getItem('user')).data.Role;

        //check 404----------------------------------------------
        if (this.checkExist(parent)) {  //param 1 exists
            if (!this.checkParentExist(parenItem, parent)) {    //param 1 invalid
                console.log("wrong param 1");
                return <Page404 />;
            }
            else {
                if (!this.checkRoleExist(userRole, parenItem.find(item => item.id === parent).role)) {  //check role param 1
                    console.log("wrong role");
                    return <Page404 />;
                }
                switch (parent) {
                    case "qlhp":
                    case "qlkh":
                    case "qlnd":
                    case "info":
                        if (this.checkExist(ctdt)) {    //param 2 exists
                            console.log("param 2 must be null");
                            return <Page404 />;
                        } break;
                    case "cdr":
                        if (this.checkExist(ctdt)) {    //param 2 exists
                            
                            console.log("wrong param 2");
                            return <Page404 />;
                            
                        } break;
                    case "danh-muc":
                        if (!this.checkAdmin(userRole)) {   //user is not admin
                            console.log("danhmuc admin only");
                            return <Page404 />;
                        }
                        if (this.checkExist(ctdt)) {    //param 2 exists
                            console.log("param 2 must be null");
                            return <Page404 />;
                        } break;
                    // case "ctdt":
                    //     if (this.checkAdmin(userRole)) {
                    //         this.errorCase("ctdt not for admin");
                    //     }break;
                    case "view-survey":
                        if (!this.checkChuNhiem(userRole)) {    //user is not chunhiem
                            console.log("survey chunhiem only");
                            return <Page404 />;
                        }

                        if (this.checkExist(ctdt)) {
                            if (ctdt !== "survey-matrix") {
                                console.log("wrong param 2");
                                return <Page404 />;
                            }
                        }
                        break;

                    // if (this.checkExist(ctdt)) {    //param 2 exists
                    //     console.log("param 2 must be null");
                    //     return <Page404 />;
                    // } break;
                    default: { //ctdt,
                        if (this.checkExist(ctdt)) {    //param 2 exists
                            if (!this.checkCtdtExist(ctdtList, ctdt)) { //param 2 invalid
                                console.log("wrong param 2");
                                return <Page404 />;
                            }
                            else {
                                if (this.checkExist(type)) {    //param 3 exists
                                    if (!this.checkTypeExist(menuItem, type)) { //param 3 invalid
                                        console.log("wrong param 3");
                                        return <Page404 />;
                                    }
                                    else {
                                        if (!this.checkRoleExist(userRole, menuItem[type].role)) { //check role param 3
                                            console.log("wrong role");
                                            return <Page404 />;
                                        }
                                        switch (type) {
                                            case "de-cuong-mon-hoc":
                                                if (this.checkExist(action)) {  //param 4 exists
                                                    if (!this.checkActionExist(menuItem, action)) { //param 4 invalid
                                                        console.log("wrong param 4");
                                                        return <Page404 />;
                                                    }
                                                    else {
                                                        if (!this.checkRoleExist(userRole, menuItem[type].children.find(item => item.id === action).role)) {    //checkrole param 4
                                                            console.log("wrong role");
                                                            return <Page404 />;
                                                        }
                                                        else {
                                                            if (this.checkExist(khoi)) {    //param 5 exists
                                                                if (!this.checkKhoiExist(dataCtdt, khoi)) { //param 5 not found
                                                                    console.log("wrong param 5");
                                                                    return <Page404 />;
                                                                }
                                                                else {
                                                                    switch (action) {   //param 4
                                                                        case "biensoan":
                                                                            if (!this.checkTeachBlock(dataCtdt.find(i => i.Id === +khoi))) {    //param 5 not follow param 4
                                                                                console.log("wrong param 5");
                                                                                return <Page404 />;
                                                                            } break;
                                                                        case "review-subject":
                                                                            if (!this.checkReviewBlock(dataCtdt.find(i => i.Id === +khoi))) {   //param 5 not follow param 4
                                                                                console.log("wrong param 5");
                                                                                return <Page404 />;
                                                                            } break;
                                                                        default:    //phancong,
                                                                    }
                                                                    if (this.checkExist(monhoc)) {  //param 6 exists
                                                                        if (!this.checkSubjectExist(subjectList, monhoc, khoi)) {   //param 6 not follow param 5
                                                                            console.log("wrong param 6");
                                                                            return <Page404 />;
                                                                        }
                                                                        else {
                                                                            if (!this.checkTabExist(MENUITEM, tab)) {   //param 7 not found
                                                                                console.log("wrong param 7");
                                                                                return <Page404 />;
                                                                            }
                                                                            else {
                                                                                switch (tab) {  //param 7
                                                                                    case "itusurvey":
                                                                                        console.log("wrong param 7");
                                                                                        return <Page404 />;
                                                                                        break;
                                                                                    case "phan-cong":
                                                                                        if (!this.checkChuNhiem(userRole)) {    //user is not chunhiem
                                                                                            console.log("wrong param 7");
                                                                                            return <Page404 />;
                                                                                        } break;
                                                                                    case "review":
                                                                                        if (!this.checkTeacher(userRole)) {     //user is not teacher
                                                                                            console.log("wrong param 7");
                                                                                            return <Page404 />;
                                                                                        } break;
                                                                                    default:    //9 tabs syllabus
                                                                                        if (!this.checkBienSoan(userRole)) {     //user is not biensoan
                                                                                            console.log("wrong param 7");
                                                                                            return <Page404 />;
                                                                                        }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                } break;
                                            case "itusurvey":
                                                if (this.checkExist(action)) {  //param 4 exists
                                                    if (action !== "dosurvey") {
                                                        console.log("wrong param 4");
                                                        return <Page404 />;
                                                    }
                                                    else {
                                                        if (this.checkExist(khoi)) {    //param 5 exists
                                                            if (khoi !== "view") {
                                                                console.log("wrong param 5");
                                                                return <Page404 />;
                                                            }
                                                            else {
                                                                if (this.checkExist(monhoc)) {  //param 6 exists
                                                                    if(!this.checkChuNhiem) {
                                                                        if (!this.checkInTeacherSubject(teacherSubject, +monhoc)) { //param 6 not found
                                                                            console.log("wrong param 6");
                                                                            return <Page404 />;
                                                                        }
                                                                    }
                                                                    else {
                                                                        if (!this.checkSubjectExist2(subjectList, +monhoc)) { //param 6 not found
                                                                            console.log("wrong param 6");
                                                                            return <Page404 />;
                                                                        }
                                                                        else {
                                                                            if (!this.checkTabExist(MENUITEM, tab)) {   //param 7 not found
                                                                                console.log("wrong param 7");
                                                                                return <Page404 />;
                                                                            }
                                                                            else {
                                                                                if (tab !== "itusurvey") {  //param 7 invalid
                                                                                    console.log("wrong param 7");
                                                                                    return <Page404 />;
                                                                                }
                                                                            }
                                                                        }
                                                                    }

                                                                
                                                                    
                                                                }
                                                                else {  //param 6 must be exist
                                                                    console.log("param 6 cannot be null");
                                                                    return <Page404 />;
                                                                }
                                                            }
                                                        }
                                                        else {
                                                            console.log("param 5 cannot be null");
                                                            return <Page404 />;
                                                        }
                                                    }
                                                } break;
                                            case "chuan-dau-ra":
                                                break;
                                            case "phan-cong-giang-day":
                                                break;
                                            case "survey-matrix":
                                                console.log("wrong param 3");
                                                return <Page404 />;
                                                break;
                                            default:
                                                if (this.checkExist(khoi)) {    //param 5 exists
                                                    console.log("param 5 must be null");
                                                    return <Page404 />;
                                                }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

        }
        //end check 404-----------------------------------------

        let subjectName = this.getSubjectName(subjectList, monhoc);
        let GirdLayout;
        if (this.state.collapse) {
            GirdLayout = (<Row>
                <Col span={2} className="col-left col-left-inline">
                    <MenuLeft
                        collapse={this.state.collapse}
                        theme={this.state.theme}
                        defaultSelectedKeys={[parent]}
                        content_type={this.props.match.params.type}
                        content_monhoc={this.props.match.params.monhoc}
                        content_tab={this.props.match.params.tab}
                        content_khoi={this.props.match.params.khoi}
                        content_ctdt={this.props.match.params.ctdt}
                        content_parent={this.props.match.params.parent}
                        content_action={this.props.match.params.action}
                    />
                </Col>
                <Col span={22} className="col-right">
                    <Row>
                        <NavBar />
                    </Row>
                    <Row >
                        <Content content_type={this.props.match.params.type}
                            content_monhoc={this.props.match.params.monhoc}
                            content_tab={this.props.match.params.tab}
                            content_khoi={this.props.match.params.khoi}
                            content_ctdt={this.props.match.params.ctdt}
                            content_parent={this.props.match.params.parent}
                            content_action={this.props.match.params.action}
                            subjectName={subjectName} />
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
                        content_action={this.props.match.params.action}
                    />
                </Col>
                <Col span={19} className="col-right">
                    <Row>
                        <NavBar />
                    </Row>
                    <Row>
                        <Content content_type={this.props.match.params.type}
                            content_tab={this.props.match.params.tab}
                            content_monhoc={this.props.match.params.monhoc}
                            content_khoi={this.props.match.params.khoi}
                            content_ctdt={this.props.match.params.ctdt}
                            content_parent={this.props.match.params.parent}
                            content_action={this.props.match.params.action}
                            subjectName={subjectName} />
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
        teacherSubject: state.datactdt.teacherSubject,
        teacherReviewSubject: state.datactdt.teacherReviewSubject,
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
        updateIsLoadedDataCtdt: isLoadedDataCtdt,
        updateTeacherSubject: teacherSubject,
        updateTeacherReviewSubject: teacherReviewSubject
    }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);