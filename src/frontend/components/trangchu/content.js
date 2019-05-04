import React, { Component } from 'react'
import { MENUITEM, subjectList, subjectId, isLoad, isLoadEditMatrix, resetTab, changeCDRData, selectedVerb } from '../../Constant/ActionType';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Icon, Modal, message, List, Avatar, Row, Col, Popconfirm, Input, Form, notification } from 'antd';
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
import { nextTick } from 'q';
import Survey from '../../Survey/Survey';
import ViewSurvey from '../../Survey/ViewSurvey';
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
                    axios.get('/collect-subjectlist')
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

    render() {
        var subjectList = [];
        let type = this.props.content_type;
        let ctdt = this.props.content_ctdt;
        let khoi = this.props.content_khoi;
        let parent = this.props.content_parent;
        switch (type) {
            case 'itusurvey':
            case "de-cuong-mon-hoc": {
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
                        <ThongTinChung idMH={this.props.content_monhoc} />
                    </React.Fragment>
                ); break;
            }
            case MENUITEM.MO_TA_MON_HOC: {
                content_layout = (
                    <React.Fragment>
                        <Layout2 />
                    </React.Fragment>
                ); break;
            }
            case MENUITEM.MUC_TIEU_MON_HOC: {
                content_layout = (
                    <React.Fragment>
                        <Layout3 />
                    </React.Fragment>
                ); break;
            }
            case MENUITEM.CHUAN_DAU_RA: {
                content_layout = (
                    <React.Fragment>
                        <Layout4 />
                    </React.Fragment>
                ); break;
            }
            case MENUITEM.GIANG_DAY_LY_THUYET: {
                content_layout = (
                    <React.Fragment>
                        <Layout5 />
                    </React.Fragment>
                ); break;
            }
            case MENUITEM.GIANG_DAY_THUC_HANH: {
                content_layout = (
                    <React.Fragment>
                        <Layout6 />
                    </React.Fragment>
                ); break;
            }
            case MENUITEM.DANH_GIA: {
                content_layout = (
                    <React.Fragment>
                        <Layout7 />
                    </React.Fragment>
                ); break;
            }
            case MENUITEM.TAI_NGUYEN_MON_HOC: {
                content_layout = (
                    <React.Fragment>
                        <Layout8 />
                    </React.Fragment>
                ); break;
            }
            case MENUITEM.QUY_DINH_CHUNG: {
                content_layout = (
                    <React.Fragment>
                        <Layout9 />
                    </React.Fragment>
                ); break;
            }

            case MENUITEM.XUAT_FILE_PDF: {
                content_layout = (
                    <React.Fragment>
                        <ExportFile />
                    </React.Fragment>
                ); break;
            }

            case "": {
                content_layout = (
                    <React.Fragment>
                        <ThongTinChung />
                    </React.Fragment>
                ); break
            }

            case MENUITEM.ITU_SURVEY: {
                content_layout = (
                    <React.Fragment>
                        <Survey subjectName={this.props.subjectName}/>
                    </React.Fragment>
                )
                break;
            }

            case undefined: {
                {
                    content_layout = type === "de-cuong-mon-hoc"  ? (
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
                                                            khoi !== "" && khoi !== undefined ? <div className="list-item"><span onClick={() => this.onClick(item.Id)}>{`${item.SubjectCode} - ${item.SubjectName}`}</span></div>
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
                                : type === "benchmark-matrix" ? <BenchMark />
                                    : type === "danhmuc" ? <Danhmuc />
                                        : type === "itusurvey" ? 
                                        content_layout = type === "itusurvey" && ctdt !== "" && ctdt !== undefined &&
                                        khoi !== "" && khoi !== undefined ? (
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
                                        ) : null
                                    : type === "view-survey" ? <ViewSurvey />
                                    : content_layout = ctdt !== "" && ctdt !== undefined ? (
                                        <div>component nhóm 1</div>
                                    )
                                    : content_layout = parent === "ctdt"  ? (
                                        <React.Fragment>
                                            <div>
                                                <List
                                                    itemLayout="horizontal"
                                                    dataSource={this.props.ctdt}
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
                                                                                <Link to={`/${parent}/${item.id}`}><div className="list-item">{`${item.id} - ${item.name}`}</div></Link> 
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
                                    ) : null;
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
const mapStateToProps = (state) => {
    return {
        subjectList: state.subjectlist,
        subjectId: state.subjectid,
        menuItem: state.menuitem,
        ctdt: state.ctdt
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
    }, dispatch);

}
export default connect(mapStateToProps, mapDispatchToProps)(Content);
