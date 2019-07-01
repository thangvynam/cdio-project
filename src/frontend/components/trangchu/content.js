import React, { Component } from "react";
import {
    MENUITEM,
    subjectList,
    subjectId,
    isLoad,
    isLoadEditMatrix,
    resetTab,
    resetTab2,
    resetTab3,
    changeCDRData,
    selectedVerb,
    updateIdSurvey,
    isLoaded7,
    isLoaded8,
    isLoaded5
} from "../../Constant/ActionType";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
    List,
    Avatar,
    Row,
    Col,
} from "antd";
import { Link } from "react-router-dom";
import Page404 from "../../NotFound/Page404";
import "./content.css";
import ThongTinChung from "../../Layout1/thong-tin-chung";
import Layout2 from "../../Layout2/Layout2";
import Layout3 from "../../Layout3/Layout3";
import Layout4 from "../../Layout4/Layout4";
import Layout5 from "../../Layout5/Layout5";
import Layout6 from "../../Layout6/Layout6";
import Layout9 from "../../Layout9/Layout9";
import Layout7 from "../../Layout7/Layout7";
import Layout8 from "../../Layout8/Layout8";
import Danhmuc from "../../Danhmuc/Danhmuc";
import ExportFile from "../../ExportFIle/ExportFile";
import Matrix from "../matrix/matrix";
import EditMatrix from "../matrix/editmatrix";
import BenchMark from "../matrix/benchmark-matrix";
import SurveyMatrix from "../matrix/survey-matrix";
import Survey from "../../Survey/Survey";
import ViewSurvey from "../../Survey/ViewSurvey";
import PhanCong from "./phancong";
import ReviewSyllabus from "./reviewsyllabus";
//CDIO1
import OutcomeStandard from "../../CDIO1/containers/OutcomeStandard";
import EducationProgram from "../../CDIO1/containers/EducationProgram";
import InfoOutcomeStandard from "../../CDIO1/containers/InfoOutcomeStandard";
import SubjectManage from "../../CDIO1/containers/SubjectManage";
import FaProManage from "../../CDIO1/containers/FaProManage";
import UserManage from "../../CDIO1/containers/UserManage";
import TeachingManage from "../../CDIO1/containers/TeachingManage";
import EditOutcomeStandard from "../../CDIO1/containers/EditOutcomeStandard";
import EditEducationProgram from "../../CDIO1/containers/EditEducationProgram";
import UserInfo from "../../CDIO1/containers/UserInfo";
import OSSurvey from "../../CDIO1/containers/Survey";
import * as eduProgramsAction from "../../CDIO1/actions/eduProgramsAction";
import * as facultiesAction from "../../CDIO1/actions/facultiesAction";
import * as programsAction from "../../CDIO1/actions/programsAction";
import * as levelsAction from "../../CDIO1/actions/levelsAction";
import * as majorsAction from "../../CDIO1/actions/majorsAction";
//END CDIO1

import Direction from "./direction";
import ListSurvey from "./listSurvey";

class Content extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scrolling: false
        };
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    componentDidMount = () => {
        window.addEventListener("scroll", this.handleScroll);
        this.props.onLoadEduPrograms();
    };

    handleScroll = event => {
        if (window.scrollY < 70 && this.state.scrolling === true) {
            this.setState({ scrolling: false });
        } else if (window.scrollY >= 70 && this.state.scrolling !== true) {
            this.setState({ scrolling: true });
        }
    };

    onClick = id => {
        this.props.isLoaded5(false);
        this.props.updateIsLoad("false");   //4
        this.props.isLoaded(false); //7
        this.props.isLoaded8(false);    //8
        this.props.updateSubjectId(id);
        this.props.resetTab();
        this.props.resetTab2();
        this.props.resetTab3();
        this.props.onChangeCDRData({
            cdr: "",
            level_verb: [],
            description: "",
            levels: []
        });
        this.props.onUpdateVerb({ level: "", childLevel: "", verb: "" });
    };

    checkInTeacherSubject = (teacherSubject, idSubject) => {
        for (let i = 0; i < teacherSubject.length; i++) {
            if (teacherSubject[i].IdSubject === idSubject) {
                return true;
            }
        }
        return false;
    };

    checkInTeacherReviewSubject = (teacherReviewSubject, idSubject) => {
        for (let i = 0; i < teacherReviewSubject.length; i++) {
            if (teacherReviewSubject[i].idTTC === idSubject) {
                return true;
            }
        }
        return false;
    };

    checkAdmin = role => {
        if (role.indexOf("ADMIN") > -1) {
            return true;
        }
        return false;
    };

    checkChuNhiem = role => {
        if (role.indexOf("CHUNHIEM") > -1) {
            return true;
        }
        return false;
    };

    checkBienSoan = role => {
        if (role.indexOf("BIEN_SOAN") > -1) {
            return true;
        }
        return false;
    };

    checkTeacher = role => {
        if (role.indexOf("TEACHER") > -1) {
            return true;
        }
        return false;
    };

    getSubjectName = (subjectList, id) => {
        for (let i = 0; i < subjectList.length; i++) {
            if (subjectList[i].Id.toString() === id) {
                return subjectList[i].SubjectName;
            }
        }
        return "";
    };

    render() {
        var subjectList = [];
        let type = this.props.content_type;
        let ctdt = this.props.content_ctdt;
        let khoi = this.props.content_khoi;
        let monhoc = this.props.content_monhoc;
        let parent = this.props.content_parent;
        let action = this.props.content_action;
        let subjectName = this.getSubjectName(this.props.subjectList, monhoc);

        switch (type) {
            case "de-cuong-mon-hoc":
                    switch (action) {
                        case "phancong":
                                if (khoi !== "" && khoi !== undefined && khoi !== null) {
                                    subjectList = this.props.subjectList.filter(
                                        item => item.IdSubjectBlock === +khoi && item.del_flat !== 1);
                                } else {
                                    subjectList = this.props.subjectList.filter(
                                        item => item.del_flat !== 1
                                    );
                                }
                            break;

                        case "biensoan":
                                if (khoi !== "" && khoi !== undefined && khoi !== null) {
                                    subjectList = this.props.subjectList.filter(
                                        item =>
                                            item.IdSubjectBlock === +khoi &&
                                            item.del_flat !== 1 &&
                                            this.checkInTeacherSubject(
                                                this.props.teacherSubject,
                                                item.IdSubject
                                            )
                                    );
                                } else {
                                    subjectList = this.props.subjectList.filter(
                                        item =>
                                            item.del_flat !== 1 &&
                                            this.checkInTeacherSubject(
                                                this.props.teacherSubject,
                                                item.IdSubject
                                            )
                                    );
                                }
                            break;

                        case "review-subject":
                                if (khoi !== "" && khoi !== undefined && khoi !== null) {
                                    subjectList = this.props.subjectList.filter(
                                        item =>
                                            item.IdSubjectBlock === +khoi &&
                                            item.del_flat !== 1 &&
                                            this.checkInTeacherReviewSubject(
                                                this.props.teacherReviewSubject,
                                                item.IdSubject
                                            )
                                    );
                                } else {
                                    subjectList = this.props.subjectList.filter(
                                        item =>
                                            item.del_flat !== 1 &&
                                            this.checkInTeacherReviewSubject(
                                                this.props.teacherReviewSubject,
                                                item.IdSubject
                                            )
                                    );
                                }
                            break;

                        default: {
                            subjectList = [];
                        }
                    }
                
                break;
            case "itusurvey":
                
                    subjectList = this.props.subjectList.filter(
                        item =>
                            item.del_flat !== 1 &&
                            this.checkInTeacherSubject(
                                this.props.teacherSubject,
                                item.IdSubject
                            )
                    );
                
                break;

            default: {
                subjectList = [];
            }
        }

        let content_layout;
        switch (this.props.content_tab) {
            case MENUITEM.THONG_TIN_CHUNG: {
                content_layout = (
                    <React.Fragment>
                        <Row className="col-right-title header-fixed">
                            <div className="header-child">
                                <span>Thông Tin Chung</span>
                                <Direction
                                    subjectName={subjectName}
                                    content_khoi={khoi}
                                    content_ctdt={ctdt}
                                    content_parent={parent}
                                    content_type={type}
                                    content_action={action}
                                />
                            </div>
                        </Row>
                        <div className="wrapper-custom-layout">
                            <ThongTinChung idMH={this.props.content_monhoc} />
                        </div>
                    </React.Fragment>
                );
                break;
            }
            case MENUITEM.MO_TA_MON_HOC: {
                content_layout = (
                    <React.Fragment>
                        <Row
                            className={`col-right-title header-fixed ${
                                this.state.scrolling ? "fixedCss" : ""
                                }`}
                        >
                            <div className="header-child">
                                <span>Mô Tả Môn Học</span>
                                <Direction
                                    subjectName={subjectName}
                                    content_khoi={khoi}
                                    content_ctdt={ctdt}
                                    content_parent={parent}
                                    content_type={type}
                                    content_action={action}
                                />
                            </div>
                        </Row>
                        <div className="wrapper-custom-layout">
                            <Layout2 monhoc={monhoc} />
                        </div>
                    </React.Fragment>
                );
                break;
            }
            case MENUITEM.MUC_TIEU_MON_HOC: {
                content_layout = (
                    <React.Fragment>
                        <Row
                            className={`col-right-title header-fixed ${
                                this.state.scrolling ? "fixedCss" : ""
                                }`}
                        >
                            <div className="header-child">
                                <span>Mục Tiêu Môn Học</span>
                                <Direction
                                    subjectName={subjectName}
                                    content_khoi={khoi}
                                    content_ctdt={ctdt}
                                    content_parent={parent}
                                    content_type={type}
                                    content_action={action}
                                />
                            </div>
                        </Row>
                        <div className="wrapper-custom-layout">
                            <Layout3 monhoc={monhoc} id_ctdt={ctdt} />
                        </div>
                    </React.Fragment>
                );
                break;
            }
            case MENUITEM.CHUAN_DAU_RA: {
                content_layout = (
                    <React.Fragment>
                        <Row
                            className={`col-right-title header-fixed ${
                                this.state.scrolling ? "fixedCss" : ""
                                }`}
                        >
                            <div className="header-child">
                                <span>Chuẩn Đẩu Ra</span>
                                <Direction
                                    subjectName={subjectName}
                                    content_khoi={khoi}
                                    content_ctdt={ctdt}
                                    content_parent={parent}
                                    content_type={type}
                                    content_action={action}
                                />
                            </div>
                        </Row>
                        <div className="wrapper-custom-layout">
                            <Layout4 monhoc={monhoc} ctdt={ctdt}/>
                        </div>
                    </React.Fragment>
                );
                break;
            }
            case MENUITEM.GIANG_DAY_LY_THUYET: {
                content_layout = (
                    <React.Fragment>
                        <Row
                            className={`col-right-title header-fixed ${
                                this.state.scrolling ? "fixedCss" : ""
                                }`}
                        >
                            <div className="header-child">
                                <span>Kế Hoạch Giảng Dạy Lý Thuyết</span>
                                <Direction
                                    subjectName={subjectName}
                                    content_khoi={khoi}
                                    content_ctdt={ctdt}
                                    content_parent={parent}
                                    content_type={type}
                                    content_action={action}
                                />
                            </div>
                        </Row>
                        <div className="wrapper-custom-layout">
                            <Layout5 monhoc={monhoc} ctdt={ctdt}/>
                        </div>
                    </React.Fragment>
                );
                break;
            }
            case MENUITEM.GIANG_DAY_THUC_HANH: {
                content_layout = (
                    <React.Fragment>
                        <Row
                            className={`col-right-title header-fixed ${
                                this.state.scrolling ? "fixedCss" : ""
                                }`}
                        >
                            <div className="header-child">
                                <span>Kế Hoạch Giảng Dạy Thực Hành</span>
                                <Direction
                                    subjectName={subjectName}
                                    content_khoi={khoi}
                                    content_ctdt={ctdt}
                                    content_parent={parent}
                                    content_type={type}
                                    content_action={action}
                                />
                            </div>
                        </Row>
                        <div className="wrapper-custom-layout">
                            <Layout6 monhoc={monhoc} ctdt={ctdt}/>
                        </div>
                    </React.Fragment>
                );
                break;
            }
            case MENUITEM.DANH_GIA: {
                content_layout = (
                    <React.Fragment>
                        <Row
                            className={`col-right-title header-fixed ${
                                this.state.scrolling ? "fixedCss" : ""
                                }`}
                        >
                            <div className="header-child">
                                <span>Đánh Giá</span>
                                <Direction
                                    subjectName={subjectName}
                                    content_khoi={khoi}
                                    content_ctdt={ctdt}
                                    content_parent={parent}
                                    content_type={type}
                                    content_action={action}
                                />
                            </div>
                        </Row>
                        <div className="wrapper-custom-layout">
                            <Layout7 monhoc={monhoc} ctdt={ctdt} />
                        </div>
                    </React.Fragment>
                );
                break;
            }
            case MENUITEM.TAI_NGUYEN_MON_HOC: {
                content_layout = (
                    <React.Fragment>
                        <Row
                            className={`col-right-title header-fixed ${
                                this.state.scrolling ? "fixedCss" : ""
                                }`}
                        >
                            <div className="header-child">
                                <span>Tài Nguyên Môn Học</span>
                                <Direction
                                    subjectName={subjectName}
                                    content_khoi={khoi}
                                    content_ctdt={ctdt}
                                    content_parent={parent}
                                    content_type={type}
                                    content_action={action}
                                />
                            </div>
                        </Row>
                        <div className="wrapper-custom-layout">
                            <Layout8 monhoc={monhoc} />
                        </div>
                    </React.Fragment>
                );
                break;
            }
            case MENUITEM.QUY_DINH_CHUNG: {
                content_layout = (
                    <React.Fragment>
                        <Row
                            className={`col-right-title header-fixed ${
                                this.state.scrolling ? "fixedCss" : ""
                                }`}
                        >
                            <div className="header-child">
                                <span>Quy Định Chung</span>
                                <Direction
                                    subjectName={subjectName}
                                    content_khoi={khoi}
                                    content_ctdt={ctdt}
                                    content_parent={parent}
                                    content_type={type}
                                    content_action={action}
                                />
                            </div>
                        </Row>
                        <div className="wrapper-custom-layout">
                            <Layout9 monhoc={monhoc} />
                        </div>
                    </React.Fragment>
                );
                break;
            }

            case MENUITEM.XUAT_FILE_PDF: {
                content_layout = (
                    <React.Fragment>
                        <Row
                            className={`col-right-title header-fixed ${
                                this.state.scrolling ? "fixedCss" : ""
                                }`}
                        >
                            <div className="header-child">
                                <span>Xuất File PDF</span>
                                <Direction
                                    subjectName={subjectName}
                                    content_khoi={khoi}
                                    content_ctdt={ctdt}
                                    content_parent={parent}
                                    content_type={type}
                                    content_action={action}
                                />
                            </div>
                        </Row>
                        <div className="wrapper-custom-layout">
                            <ExportFile 
                                monhoc={monhoc} 
                                tenmonhoc = {subjectName}
                                id_ctdt={ctdt}
                            />
                        </div>
                    </React.Fragment>
                );
                break;
            }

            case "": {
                content_layout = (
                    <React.Fragment>
                        <Row
                            className={`col-right-title header-fixed ${
                                this.state.scrolling ? "fixedCss" : ""
                                }`}
                        >
                            <div className="header-child">
                                <span>Thông Tin Chung</span>
                                <Direction
                                    subjectName={subjectName}
                                    content_khoi={khoi}
                                    content_ctdt={ctdt}
                                    content_parent={parent}
                                    content_type={type}
                                    content_action={action}
                                />
                            </div>
                        </Row>
                        <ThongTinChung idMH={this.props.content_monhoc} />
                    </React.Fragment>
                );
                break;
            }

            case MENUITEM.ITU_SURVEY: {
                content_layout = (
                    <React.Fragment>
                        <Row
                            className={`col-right-title header-fixed ${
                                this.state.scrolling ? "fixedCss" : ""
                                }`}
                        >
                            <div className="header-child">
                                <span>ITU_SURVEY</span>
                                <Direction
                                    subjectName={subjectName}
                                    content_khoi={khoi}
                                    content_ctdt={ctdt}
                                    content_parent={parent}
                                    content_type={type}
                                    content_action={action}
                                />
                            </div>
                        </Row>
                        <Survey
                            subjectName={this.props.subjectName}
                            monhoc={monhoc}
                            ctdt={ctdt}
                            idSurvey={this.props.idSurveyReducer.idSurvey}
                        />
                    </React.Fragment>
                );
                break;
            }

            case MENUITEM.PHAN_CONG: {
                content_layout = (
                    <React.Fragment>
                        <Row
                            className={`col-right-title header-fixed ${
                                this.state.scrolling ? "fixedCss" : ""
                                }`}
                        >
                            <div className="header-child">
                                <span>Phân Công</span>
                                <Direction
                                    subjectName={subjectName}
                                    content_khoi={khoi}
                                    content_ctdt={ctdt}
                                    content_parent={parent}
                                    content_type={type}
                                    content_action={action}
                                />
                            </div>
                        </Row>
                        <div className="wrapper-custom-layout">
                            <PhanCong monhoc={this.props.content_monhoc} />
                        </div>
                    </React.Fragment>
                );
                break;
            }

            case MENUITEM.REVIEW: {
                content_layout = (
                    <React.Fragment>
                        <Row
                            className={`col-right-title header-fixed ${
                                this.state.scrolling ? "fixedCss" : ""
                                }`}
                        >
                            <div className="header-child">
                                <span>Review</span>
                                <Direction
                                    subjectName={subjectName}
                                    content_khoi={khoi}
                                    content_ctdt={ctdt}
                                    content_parent={parent}
                                    content_type={type}
                                    content_action={action}
                                />
                            </div>
                        </Row>
                        <div className="wrapper-custom-layout">
                            <ReviewSyllabus idMH={this.props.content_monhoc} ctdt={ctdt}/>
                        </div>
                    </React.Fragment>
                );
                break;
            }

            case undefined: {
                {
                    content_layout =
                        type === "de-cuong-mon-hoc" ? (
                            <React.Fragment>
                                <Col span={24} className="col-right">
                                    <Row
                                        className={`col-right-title header-fixed ${
                                            this.state.scrolling ? "fixedCss" : ""
                                            }`}
                                    >
                                        <div className="header-child">
                                            <span>SYLLABUS</span>
                                            <Direction
                                                subjectName={subjectName}
                                                content_khoi={khoi}
                                                content_ctdt={ctdt}
                                                content_parent={parent}
                                                content_type={type}
                                                content_action={action}
                                            />
                                        </div>
                                    </Row>
                                </Col>
                                <div className="wrapper-custom">
                                    {action !== "" && action !== undefined && action !== null ?
                                        <List
                                            itemLayout="horizontal"
                                            dataSource={subjectList}
                                            pagination={{
                                                onChange: page => { },
                                                pageSize: 10
                                            }}
                                            renderItem={(item, id) => (
                                                <Row>
                                                    <div style={{ height: "10px" }} />
                                                    <Col span={1} className="col-left" />
                                                    <Col span={22} className="col-left">
                                                        <div
                                                            className="list-border"
                                                            className="wrapper-subject"
                                                        >
                                                            <List.Item>
                                                                <List.Item.Meta
                                                                    avatar={
                                                                        <Avatar src="https://cdn2.vectorstock.com/i/1000x1000/99/96/book-icon-isolated-on-white-background-vector-19349996.jpg" />
                                                                    }
                                                                    title={
                                                                        action === "phancong" ? (
                                                                            <Link
                                                                                to={`/${parent}/${ctdt}/${type}/${action}/${
                                                                                    item.IdSubjectBlock
                                                                                    }/${item.Id}/phan-cong`}
                                                                            >
                                                                                <span
                                                                                    className="list-item subject-name"
                                                                                    onClick={() => this.onClick(item.Id)}
                                                                                >{`${item.SubjectCode} - ${
                                                                                    item.SubjectName
                                                                                    }`}</span>
                                                                            </Link>
                                                                        ) : action === "biensoan" ? (
                                                                            <Link
                                                                                to={`/${parent}/${ctdt}/${type}/${action}/${
                                                                                    item.IdSubjectBlock
                                                                                    }/${item.Id}/thong-tin-chung`}
                                                                            >
                                                                                <span
                                                                                    className="list-item subject-name"
                                                                                    onClick={() => this.onClick(item.Id)}
                                                                                >{`${item.SubjectCode} - ${
                                                                                    item.SubjectName
                                                                                    }`}</span>
                                                                            </Link>
                                                                        ) : (
                                                                                    <Link
                                                                                        to={`/${parent}/${ctdt}/${type}/${action}/${
                                                                                            item.IdSubjectBlock
                                                                                            }/${item.Id}/review`}
                                                                                    >
                                                                                        <span

                                                                                            className="list-item subject-name"
                                                                                            onClick={() => this.onClick(item.Id)}
                                                                                        >{`${item.SubjectCode} - ${
                                                                                            item.SubjectName
                                                                                            } - Review`}</span>
                                                                                    </Link>
                                                                                )
                                                                    }
                                                                />
                                                            </List.Item>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            )}
                                        /> : <h1 align="center">Chọn menu trái cho chức năng mong muốn</h1>}
                                </div>
                            </React.Fragment>
                        ) : type === "matrix" ? (
                            <React.Fragment>
                                {/* <Row
                                    className={`col-right-title header-fixed ${
                                        this.state.scrolling ? "fixedCss" : ""
                                        }`}
                                > */}
                                    <div className="header-child">
                                        <span>Matrix</span>
                                        <Direction
                                            subjectName={subjectName}
                                            content_khoi={khoi}
                                            content_ctdt={ctdt}
                                            content_parent={parent}
                                            content_type={type}
                                            content_action={action}
                                        />
                                    </div>
                                {/* </Row> */}
                                <Matrix khoi={khoi} ctdt={ctdt} />
                            </React.Fragment>
                        ) : type === "edit-matrix" ? (
                            <div className="header-child">
                                <span>Edit Matrix</span>
                                <Direction
                                    subjectName={subjectName}
                                    content_khoi={khoi}
                                    content_ctdt={ctdt}
                                    content_parent={parent}
                                    content_type={type}
                                    content_action={action}
                                />
                                <EditMatrix ctdt={ctdt} />
                            </div>
                        ) : // : type === "survey-matrix" ? <SurveyMatrix />
                                    type === "benchmark-matrix" ? (
                                        <div className="header-child">
                                            <span>Benchmark Matrix</span>
                                            <Direction
                                                subjectName={subjectName}
                                                content_khoi={khoi}
                                                content_ctdt={ctdt}
                                                content_parent={parent}
                                                content_type={type}
                                                content_action={action}
                                            />
                                            <BenchMark ctdt={ctdt} />
                                        </div>
                                    ) : type === "itusurvey" ? (
                                        <React.Fragment>
                                            <Row
                                                className={`col-right-title header-fixed ${
                                                    this.state.scrolling ? "fixedCss" : ""
                                                    }`}
                                            >
                                                <div className="header-child">
                                                    <span>ITU Survey</span>
                                                    <Direction
                                                        subjectName={subjectName}
                                                        content_khoi={khoi}
                                                        content_ctdt={ctdt}
                                                        content_parent={parent}
                                                        content_type={type}
                                                        content_action={action}
                                                    />
                                                </div>
                                            </Row>
                                            <div className="wrapper-custom-layout">
                                                <ListSurvey
                                                    khoi={khoi}
                                                    ctdt={ctdt}
                                                    parent={parent}
                                                    type={type}
                                                    action={action}
                                                    subjectList={subjectList}
                                                    onClick={this.onClick}
                                                />
                                            </div>
                                        </React.Fragment>
                                    ) : action === "chinhsua-cdr" ? (
                                        <EditOutcomeStandard ctdt={ctdt} />
                                    ) : action === "danhgia-cdr" ? (
                                        <div>
                                            <Direction
                                                subjectName={subjectName}
                                                content_khoi={khoi}
                                                content_ctdt={ctdt}
                                                content_parent={parent}
                                                content_type={type}
                                                content_action={action}
                                            />
                                            <EditOutcomeStandard ctdt={ctdt} />
                                        </div>
                                    ) : action === "khaosat-cdr" ? (
                                        <div>Khảo sát cdr</div>
                                    ) : type === "chuan-dau-ra" ? (
                                        <div>
                                            <Direction
                                                subjectName={subjectName}
                                                content_khoi={khoi}
                                                content_ctdt={ctdt}
                                                content_parent={parent}
                                                content_type={type}
                                                content_action={action}
                                            />
                                            <InfoOutcomeStandard ctdt={ctdt} />
                                        </div>
                                    ) : type === "phan-cong-giang-day" ? (
                                        <div>
                                            <Direction
                                                subjectName={subjectName}
                                                content_khoi={khoi}
                                                content_ctdt={ctdt}
                                                content_parent={parent}
                                                content_type={type}
                                                content_action={action}
                                            />
                                            <TeachingManage ctdt={ctdt} />
                                        </div>
                                    ) : type === "khao-sat-chuan-dau-ra" ? (
                                        <OSSurvey />
                                    ) : type === "edit-ctdt" ? (
                                        <div>
                                            <Direction
                                                subjectName={subjectName}
                                                content_khoi={khoi}
                                                content_ctdt={ctdt}
                                                content_parent={parent}
                                                content_type={type}
                                                content_action={action}
                                            />
                                            <EditEducationProgram ctdt={ctdt} />
                                        </div>
                                    ) : ctdt !== "" && ctdt !== undefined && ctdt !== "edit" ? (
                                        ctdt === "survey-matrix" ? (
                                            <SurveyMatrix />
                                        ) : <div>Trang chủ chương trình đào tạo</div>
                                    ) : parent === "ctdt" ? (
                                        <EducationProgram />
                                    ) : parent === "danh-muc" ? (
                                        <Danhmuc />
                                    ) : parent === "cdr" ? (
                                        <OutcomeStandard />
                                    ) : parent === "qlhp" ? (
                                        <SubjectManage />
                                    ) : parent === "qlkh" ? (
                                        <FaProManage />
                                    ) : parent === "qlnd" ? (
                                        <UserManage />
                                    ) : parent === "view-survey" ? (
                                        <React.Fragment>
                                            {/* <Row className="col\-right\-title aa"> */}
                                            <Row
                                                className={`col-right-title header-fixed ${
                                                    this.state.scrolling ? "fixedCss" : ""
                                                    }`}
                                            >
                                                <div className="header-child">
                                                    <span>Xem Khảo Sát</span>
                                                    <Direction
                                                        subjectName={subjectName}
                                                        content_khoi={khoi}
                                                        content_ctdt={ctdt}
                                                        content_parent={parent}
                                                        content_type={type}
                                                        content_action={action}
                                                    />
                                                </div>
                                            </Row>
                                            <div className="wrapper-custom-layout">
                                                <ViewSurvey />
                                            </div>
                                        </React.Fragment>
                                    ) : parent === "info" ? (
                                        <React.Fragment>
                                            <UserInfo />
                                        </React.Fragment>
                                    ) : null;
                }
                break;
            }
            default: {
                content_layout = (
                    <React.Fragment>
                        <Page404 />
                    </React.Fragment>
                );
            }
        }
        return <React.Fragment>{content_layout}</React.Fragment>;
    }
}

//Id
//EduName

const mapStateToProps = state => {
    return {
        subjectList: state.subjectlist,
        subjectId: state.subjectid,
        menuItem: state.menuitem,
        message: state.message,
        ctdt: state.eduPrograms,
        eduPrograms: state.eduPrograms,
        faculties: state.faculties,
        programs: state.programs,
        levels: state.levels,
        majors: state.majors,
        teacherSubject: state.datactdt.teacherSubject,
        teacherReviewSubject: state.datactdt.teacherReviewSubject,
        idSurveyReducer: state.idSurveyReducer
    };
};
const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            updateSubjectList: subjectList,
            updateSubjectId: subjectId,
            updateIsLoad: isLoad,
            isLoaded: isLoaded7,
            isLoaded5:isLoaded5,
            isLoaded8: isLoaded8,
            resetTab: resetTab,
            resetTab2: resetTab2,
            resetTab3: resetTab3,
            updateIsLoadEditMatrix: isLoadEditMatrix,
            onChangeCDRData: changeCDRData,
            onUpdateVerb: selectedVerb,
            onLoadEduPrograms: eduProgramsAction.onLoadEduPrograms,
            onAddEduProgram: eduProgramsAction.onAddEduProgram,
            onLoadFaculties: facultiesAction.onLoadFaculties,
            onLoadPrograms: programsAction.onLoadPrograms,
            onLoadLevels: levelsAction.onLoadLevels,
            onLoadMajors: majorsAction.onLoadMajors,
            onUpdateIdSurvey: updateIdSurvey
        },
        dispatch
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(Content);
