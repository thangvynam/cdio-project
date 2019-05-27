import React, { Component } from 'react'
import { MENUITEM, subjectList, subjectId, isLoad, isLoadEditMatrix, resetTab, changeCDRData, selectedVerb } from '../../Constant/ActionType';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Icon, Modal, message, List, Avatar, Row, Col, Popconfirm, Input, Form, notification, Divider } from 'antd';
import { Link } from "react-router-dom";
import Page404 from '../../NotFound/Page404';
import { subjectListReducer } from '../../Reducers/homePageReducer';
import './content.css';
import { Redirect } from "react-router-dom";
import ThongTinChung from '../../Layout1/thong-tin-chung';
import Layout2 from '../../Layout2/Layout2';
import Layout3 from '../../Layout3/Layout3';
import Layout4 from '../../Layout4/Layout4';
import Layout5 from '../../Layout5/Layout5';
import Layout6 from '../../Layout6/Layout6';
import Layout9 from '../../Layout9/Layout9';
import Layout7 from '../../Layout7/Layout7';
import Layout8 from '../../Layout8/Layout8';
import Danhmuc from '../../Danhmuc/Danhmuc';
import ExportFile from '../../ExportFIle/ExportFile';
import axios from 'axios';
import Matrix from '../matrix/matrix';
import EditMatrix from '../matrix/editmatrix';
import BenchMark from '../matrix/benchmark-matrix';
import SurveyMatrix from '../matrix/survey-matrix';
import { nextTick } from 'q';
import Survey from '../../Survey/Survey';
import ViewSurvey from '../../Survey/ViewSurvey';
import PhanCong from './phancong';
import ReviewSyllabus from './reviewsyllabus';
//CDIO1
import OutcomeStandard from "../../CDIO1/containers/OutcomeStandard";
import EducationProgram from "../../CDIO1/containers/EducationProgram";
import SubjectManage from "../../CDIO1/containers/SubjectManage";
import FaProManage from "../../CDIO1/containers/FaProManage";
import EditOutcomeStandard from "../../CDIO1/containers/EditOutcomeStandard";
import EditEducationProgram from "../../CDIO1/containers/EditEducationProgram";
import * as eduProgramsAction from "../../CDIO1/actions/eduProgramsAction";
import * as facultiesAction from "../../CDIO1/actions/facultiesAction";
import * as programsAction from "../../CDIO1/actions/programsAction";
import * as levelsAction from "../../CDIO1/actions/levelsAction";
import * as majorsAction from "../../CDIO1/actions/majorsAction";
//END CDIO1

import $ from './../../helpers/services';

const EditableContext = React.createContext();

const openNotificationWithIcon = (type) => {
    notification[type]({
        message: 'Thông báo',
        description: 'Thêm thành công',
    });
};

class Content extends Component {

    state = { visible: false, isEditting: "" }
    addSubject = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        let id = document.getElementById("subject-id").value;
        let name = document.getElementById("subject-name").value;
        if (id === "" || id === undefined) {
            message.warning("Chưa nhập mã môn học!")
        }
        else {
            if (name === "" || name === undefined) {
                message.warning("Chưa nhập tên môn học!")
            }
            else {
                axios.post('/add-subject', { data: { SubjectCode: id, SubjectName: name } }).then((res) => {
                    var self = this;
                    $.collectSubjectList()
                        .then(function (response) {
                            self.props.updateSubjectList(response.data);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                });

                this.props.updateIsLoadEditMatrix("false");
                this.setState({
                    visible: false,
                });
                openNotificationWithIcon('success');
            }
        }


    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    handleDelete = (id) => {
        let type = this.props.content_type;

        if (id !== -1) {
            const data = this.props.subjectList;
            axios.post('/delete-subject', { data: { Id: data[id].Id } });
            data.splice(id, 1);
            this.props.updateSubjectList(data);
            this.props.updateIsLoadEditMatrix("false");
            this.setState({
                visible: false,
            });
        }
    }

    edit = (id) => {
        this.setState({
            isEditting: id,
        });
    }

    save = (index) => {
        let id = document.getElementById("subject-id-edit").value;
        let name = document.getElementById("subject-name-edit").value;
        let type = this.props.content_type;
        const data = this.props.subjectList;
        axios.post('/edit-subject', { data: { Id: data[index].Id, SubjectCode_editted: id, SubjectName: name } });
        data[index].SubjectCode = id;
        data[index].SubjectName = name;

        this.props.updateSubjectList(data);
        this.props.updateIsLoadEditMatrix("false");
        this.setState({
            isEditting: "",
        });
    }

    cancel = () => {
        this.setState({
            isEditting: "",
        });
    }

    onClick = (id) => {
        this.props.updateIsLoad("false");
        this.props.updateSubjectId(id);
        this.props.resetTab();
        this.props.onChangeCDRData({
            cdr: "",
            level_verb: [],
            description: "",
            levels: []
        });
        this.props.onUpdateVerb({ level: "", childLevel: "", verb: "" });
    }

    checkSubjectExist = (subjectlist, monhoc) => {
        for (let i = 0; i < subjectlist.length; i++) {
            if (subjectlist[i].Id.toString() === monhoc.toString()) {
                return true;
            }
        }
        return false;
    }

    componentDidMount = () => {
        this.props.onLoadEduPrograms();
    };

    render() {
        var subjectList = [];
        let type = this.props.content_type;
        let ctdt = this.props.content_ctdt;
        let khoi = this.props.content_khoi;
        let parent = this.props.content_parent;
        switch (type) {
            case "de-cuong-mon-hoc": {
                subjectList = this.props.subjectList;
            } break;
            case 'itusurvey': {
                subjectList = this.props.subjectList;

            } break;

            default: {
                subjectList = [];
            }
        }

        let content_layout;
        switch (this.props.content_tab) {
            case MENUITEM.THONG_TIN_CHUNG: {
                content_layout = (
                    <React.Fragment>
                        <Row className="col-right-title">
                            <div>
                                <span>Thông Tin Chung</span>
                                <Divider type="vertical" />
                                <a href="#">Link</a>
                                <Divider type="vertical" />
                                <a href="#">Link</a>
                            </div>,
                                </Row>
                        <div className="wrapper-custom-layout">
                            <ThongTinChung idMH={this.props.content_monhoc} />
                        </div>
                    </React.Fragment>
                ); break;
            }
            case MENUITEM.MO_TA_MON_HOC: {
                content_layout = (
                    <React.Fragment>
                        <Row className="col-right-title">
                            <div>
                                <span>Mô Tả Môn Học</span>
                                <Divider type="vertical" />
                                <a href="#">Link</a>
                                <Divider type="vertical" />
                                <a href="#">Link</a>
                            </div>,
                                </Row>
                        <div className="wrapper-custom-layout">
                            <Layout2 />
                        </div>
                    </React.Fragment>
                ); break;
            }
            case MENUITEM.MUC_TIEU_MON_HOC: {
                content_layout = (
                    <React.Fragment>
                        <Row className="col-right-title">
                            <div>
                                <span>Mục Tiêu Môn Học</span>
                                <Divider type="vertical" />
                                <a href="#">Link</a>
                                <Divider type="vertical" />
                                <a href="#">Link</a>
                            </div>,
                                </Row>
                        <div className="wrapper-custom-layout">
                            <Layout3 />
                        </div>
                    </React.Fragment >
                ); break;
            }
            case MENUITEM.CHUAN_DAU_RA: {
                content_layout = (
                    <React.Fragment>
                        <Row className="col-right-title">
                            <div>
                                <span>Chuẩn Đẩu Ra</span>
                                <Divider type="vertical" />
                                <a href="#">Link</a>
                                <Divider type="vertical" />
                                <a href="#">Link</a>
                            </div>,
                                </Row>
                        <div className="wrapper-custom-layout">
                            <Layout4 />
                        </div>
                    </React.Fragment>
                ); break;
            }
            case MENUITEM.GIANG_DAY_LY_THUYET: {
                content_layout = (
                    <React.Fragment>
                        <Row className="col-right-title">
                            <div>
                                <span>Kế Hoạch Giảng Dạy Lý Thuyết</span>
                                <Divider type="vertical" />
                                <a href="#">Link</a>
                                <Divider type="vertical" />
                                <a href="#">Link</a>
                            </div>,
                                </Row>
                        <div className="wrapper-custom-layout">
                            <Layout5 />
                        </div>
                    </React.Fragment>
                ); break;
            }
            case MENUITEM.GIANG_DAY_THUC_HANH: {
                content_layout = (
                    <React.Fragment>
                        <Row className="col-right-title">
                            <div>
                                <span>Kế Hoạch Giảng Dạy Thực Hành</span>
                                <Divider type="vertical" />
                                <a href="#">Link</a>
                                <Divider type="vertical" />
                                <a href="#">Link</a>
                            </div>,
                                </Row>
                        <div className="wrapper-custom-layout">
                            <Layout6 />
                        </div>
                    </React.Fragment>
                ); break;
            }
            case MENUITEM.DANH_GIA: {
                content_layout = (
                    <React.Fragment>
                        <Row className="col-right-title">
                            <div>
                                <span>Đánh Giá</span>
                                <Divider type="vertical" />
                                <a href="#">Link</a>
                                <Divider type="vertical" />
                                <a href="#">Link</a>
                            </div>,
                                </Row>
                        <div className="wrapper-custom-layout">
                            <Layout7 />
                        </div>
                    </React.Fragment>
                ); break;
            }
            case MENUITEM.TAI_NGUYEN_MON_HOC: {
                content_layout = (
                    <React.Fragment>
                        <Row className="col-right-title">
                            <div>
                                <span>Tài Nguyên Môn Học</span>
                                <Divider type="vertical" />
                                <a href="#">Link</a>
                                <Divider type="vertical" />
                                <a href="#">Link</a>
                            </div>,
                                </Row>
                        <div className="wrapper-custom-layout">
                            <Layout8 />
                        </div>
                    </React.Fragment>
                ); break;
            }
            case MENUITEM.QUY_DINH_CHUNG: {
                content_layout = (
                    <React.Fragment>
                        <Row className="col-right-title">
                            <div>
                                <span>Quy Định Chung</span>
                                <Divider type="vertical" />
                                <a href="#">Link</a>
                                <Divider type="vertical" />
                                <a href="#">Link</a>
                            </div>,
                                </Row>
                        <div className="wrapper-custom-layout">
                            <Layout9 />
                        </div>
                    </React.Fragment>
                ); break;
            }

            case MENUITEM.XUAT_FILE_PDF: {
                content_layout = (
                    <React.Fragment>
                        <Row className="col-right-title">
                            <div>
                                <span>Xuất File PDF</span>
                                <Divider type="vertical" />
                                <a href="#">Link</a>
                                <Divider type="vertical" />
                                <a href="#">Link</a>
                            </div>,
                                </Row>
                        <div className="wrapper-custom-layout">
                            <ExportFile />
                        </div>
                    </React.Fragment>
                ); break;
            }

            case "": {
                content_layout = (
                    <React.Fragment>
                        <Row className="col-right-title">
                            <div>
                                <span>Thông Tin Chung</span>
                                <Divider type="vertical" />
                                <a href="#">Link</a>
                                <Divider type="vertical" />
                                <a href="#">Link</a>
                            </div>,
                                </Row>
                        <ThongTinChung />
                    </React.Fragment>
                ); break
            }

            case MENUITEM.ITU_SURVEY: {
                content_layout = (
                    <React.Fragment>
                        <Row className="col-right-title">
                            <div>
                                <span>ITU_SURVEY</span>
                                <Divider type="vertical" />
                                <a href="#">Link</a>
                                <Divider type="vertical" />
                                <a href="#">Link</a>
                            </div>,
                                </Row>
                        <Survey subjectName={this.props.subjectName} />
                    </React.Fragment>
                )
                break;
            }

            case MENUITEM.PHAN_CONG: {
                content_layout = (
                    <React.Fragment>
                        <Row className="col-right-title">
                            <div>
                                <span>Phân Công</span>
                                <Divider type="vertical" />
                                <a href="#">Link</a>
                                <Divider type="vertical" />
                                <a href="#">Link</a>
                            </div>,
                                </Row>
                        <div className="wrapper-custom-layout">
                            <PhanCong content_monhoc={this.props.content_monhoc} />
                        </div>
                    </React.Fragment>
                )
                break;
            }

            case MENUITEM.REVIEW: {
                content_layout = (
                    <React.Fragment>
                        <Row className="col-right-title">
                            <div>
                                <span>Review</span>
                                <Divider type="vertical" />
                                <a href="#">Link</a>
                                <Divider type="vertical" />
                                <a href="#">Link</a>
                            </div>,
                                </Row>
                        <div className="wrapper-custom-layout">
                            <ReviewSyllabus idMH={this.props.content_monhoc} />
                        </div>
                    </React.Fragment>
                )
                break;
            }

            case undefined: {
                {
                    content_layout = type === "de-cuong-mon-hoc" ? (
                        <React.Fragment>
                            <Col span={22} className="col-right">
                                <Row className="col-right-title">
                                    <div>
                                        <span>SYLLABUS</span>
                                        <Divider type="vertical" />
                                        <a href="#">Link</a>
                                        <Divider type="vertical" />
                                        <a href="#">Link</a>
                                    </div>,
                                </Row>
                            </Col>
                            <div className="wrapper-custom">
                                <List
                                    itemLayout="horizontal"
                                    dataSource={subjectList}
                                    renderItem={(item, id) => (
                                        <Row>
                                            <div style={{ height: "10px" }}></div>
                                            <Col span={1} className="col-left">
                                            </Col>
                                            <Col span={22} className="col-left">

                                                <div className="list-border" className="wrapper-subject">

                                                    <List.Item>
                                                        <List.Item.Meta
                                                            avatar={<Avatar src="https://cdn2.vectorstock.com/i/1000x1000/99/96/book-icon-isolated-on-white-background-vector-19349996.jpg" />}
                                                            title={

                                                            khoi !== "" && khoi !== undefined ? 
                                                            item.Id === 1 ? <Link to={`/${parent}/${ctdt}/${type}/${khoi}/${item.Id}/review`}><span style={{color: "yellow"}} className="list-item" onClick={() => this.onClick(item.Id)}>{`${item.SubjectCode} - ${item.SubjectName}`}</span></Link>
                                                            : <Link to={`/${parent}/${ctdt}/${type}/${khoi}/${item.Id}/thong-tin-chung`}><span className="list-item" onClick={() => this.onClick(item.Id)}>{`${item.SubjectCode} - ${item.SubjectName}`}</span></Link>
                                                            : <Link to={`/${parent}/${ctdt}/${type}/ktt-1/${item.Id}`}><span className="list-item" onClick={() => this.onClick(item.Id)}>{`${item.SubjectCode} - ${item.SubjectName}`}</span></Link> 
                                                        }

                                                        />
                                                    </List.Item>

                                                </div>

                                            </Col>
                                        </Row>
                                    )}
                                />
                            </div>
                        </React.Fragment>
                    ) : type === "matrix" ? <Matrix />
                            : type === "edit-matrix" ? <EditMatrix />
                                : type === "survey-matrix" ? <SurveyMatrix />
                                    : type === "benchmark-matrix" ? <BenchMark />
                                        : type === "danhmuc" ? <Danhmuc />
                                            : type === "itusurvey" ?
                                                <React.Fragment>
                                                    <div>
                                                        <List
                                                            itemLayout="horizontal"
                                                            dataSource={subjectList}
                                                            renderItem={(item, id) => (
                                                                <Row>
                                                                    <div style={{ height: "10px" }}></div>
                                                                    <Col span={1} className="col-left">
                                                                    </Col>
                                                                    <Col span={22} className="col-left">

                                                                        <div className="list-border" style={{ borderRadius: "12px" }}>

                                                                            <List.Item>
                                                                                <List.Item.Meta
                                                                                    avatar={<Avatar src="https://cdn2.vectorstock.com/i/1000x1000/99/96/book-icon-isolated-on-white-background-vector-19349996.jpg" />}
                                                                                    title={
                                                                                        <div className="list-item"><span onClick={() => this.onClick(item.Id)}>{`${item.SubjectCode} - ${item.SubjectName}`}</span></div>
                                                                                    }
                                                                                />
                                                                            </List.Item>
                                                                        </div>

                                                                    </Col>
                                                                </Row>
                                                            )}
                                                        />
                                                    </div>
                                                </React.Fragment>

                                                : type === "view-survey" ? (
                                                    <React.Fragment>
                                                        <Row className="col-right-title">
                                                            <div>
                                                                <span>Xem Khảo Sát</span>
                                                                <Divider type="vertical" />
                                                                <a href="#">Link</a>
                                                                <Divider type="vertical" />
                                                                <a href="#">Link</a>
                                                            </div>,
                                                            </Row>
                                                        <div className="wrapper-custom-layout">
                                                            <ViewSurvey />
                                                        </div>
                                                    </React.Fragment>
                                                ) : content_layout = ctdt !== "" && ctdt !== undefined && ctdt !== "edit" ? (
                                                    <EditEducationProgram ctdt={ctdt} />
                                                )
                                                    : content_layout = parent === "ctdt" ? (
                                                        <EducationProgram />
                                                    )
                                                        : content_layout = parent === "cdr" ? ctdt == "edit" ? (
                                                            <React.Fragment><EditOutcomeStandard /></React.Fragment>
                                                        )
                                                            : <React.Fragment><OutcomeStandard /></React.Fragment>
                                                            : content_layout = parent === "qlhp" ? <React.Fragment><SubjectManage /></React.Fragment>
                                                                : content_layout = parent === "qlkh" ? <React.Fragment><FaProManage /></React.Fragment>
                                                                    : null;
                }; break;
            }
            default: {
                content_layout = (
                    <React.Fragment>
                        <Page404 />
                    </React.Fragment>
                );
            }
        }
        return (
            <React.Fragment>

                {content_layout}
            </React.Fragment>
        )
    }
}

//Id
//EduName

const mapStateToProps = (state) => {
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
        majors: state.majors
    }
}
const mapDispatchToProps = (dispatch) => {

    return bindActionCreators({
        updateSubjectList: subjectList,
        updateSubjectId: subjectId,
        updateIsLoad: isLoad,
        resetTab: resetTab,
        updateIsLoadEditMatrix: isLoadEditMatrix,
        onChangeCDRData: changeCDRData,
        onUpdateVerb: selectedVerb,
        onLoadEduPrograms: eduProgramsAction.onLoadEduPrograms,
        onAddEduProgram: eduProgramsAction.onAddEduProgram,
        onLoadFaculties: facultiesAction.onLoadFaculties,
        onLoadPrograms: programsAction.onLoadPrograms,
        onLoadLevels: levelsAction.onLoadLevels,
        onLoadMajors: majorsAction.onLoadMajors
    }, dispatch);

}
export default connect(mapStateToProps, mapDispatchToProps)(Content);
