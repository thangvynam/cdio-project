import React, { Component } from 'react'
import {MENUITEM, subjectList, subjectId, isLoad, isLoadEditMatrix,resetTab, changeCDRData, selectedVerb} from '../../Constant/ActionType';
import { connect } from'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Icon, Modal, message, List, Avatar, Row, Col, Popconfirm, Input, Form } from 'antd';
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
import ExportFile from '../../ExportFIle/ExportFile';
import axios from 'axios';
import Matrix from '../matrix/matrix';
import EditMatrix from '../matrix/editmatrix';
const EditableContext = React.createContext();

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
                axios.post('/add-subject', { data: { ma_so: id, ten_mon_hoc_tv: name } });
                var self = this;
                axios.get('/collect-subjectlist')
                .then(function (response) {
                self.props.updateSubjectList(response.data)
                })
                .catch(function (error) {
                console.log(error);
                });  
                this.props.updateIsLoadEditMatrix("false");
                this.setState({
                    visible: false,
                });
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
            console.log(data[id].id)
            axios.post('/delete-subject', { data: { id: data[id].id } });
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
        axios.post('/edit-subject', { data: { id: data[index].id, ma_so_editted: id, ten_mon_hoc_tv: name } });
        data[index].ma_so = id;
        data[index].ten_mon_hoc_tv = name;

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
        this.props.onUpdateVerb({level: "",childLevel: "", verb: ""});
      }

      checkSubjectExist = (monhoc) => {
        for(let i = 0;i < this.props.subjectList.length;i++) {
            if(this.props.subjectList[i].ma_so === monhoc) {
                return true;
            }
        }
        return false;
    }

    render() {
        var subjectList = [];
        let type = this.props.content_type;
        switch (type) {
            case "de-cuong-mon-hoc": {
                subjectList = this.props.subjectList;
            } break;

            default: {
                subjectList = [];
            }
        }
        let isExist = 0;
        for (let i = 0; i < Object.keys(this.props.menuItem).length; i++) {
            if (type === Object.keys(this.props.menuItem)[i]) {
                isExist = 1;
                break;
            }
        }
        if (isExist === 0) {
            return <Page404 />;
        }

        if(!this.checkSubjectExist(this.props.content_monhoc) && this.props.content_monhoc !== "" &&
        this.props.content_monhoc !== undefined) {
            // return <Page404/>;
        }
        let content_layout;
        switch (this.props.content_tab) {
            case MENUITEM.THONG_TIN_CHUNG: {
                content_layout = (
                    <React.Fragment>
                        <ThongTinChung />
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
                        <Layout4 tab={this.props.content_tab}/>
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

            case undefined: {
                {
                    content_layout = type === "de-cuong-mon-hoc" ? (
                        <React.Fragment>
                            <div>
                                <Modal
                                    title="Thêm môn học"
                                    visible={this.state.visible}
                                    onOk={this.handleOk}
                                    onCancel={this.handleCancel}
                                    okText="OK"
                                    cancelText="Cancel"
                                    centered
                                    destroyOnClose={true}
                                >
                                    <p>Mã môn học: </p>
                                    <Input style={{ width: "100%" }} id="subject-id" />
                                    <p>Tên môn học: </p>
                                    <Input style={{ width: "100%" }} id="subject-name" />
                                </Modal>
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

                                                    <List.Item actions={this.state.isEditting === "" || this.state.isEditting === undefined || this.state.isEditting !== item.ma_so ? [<a href="#a" onClick={() => this.edit(item.ma_so)} style={{ fontSize: "12pt" }}>Sửa</a>,
                                                    <Popconfirm title="Xác nhận xóa?" onConfirm={() => this.handleDelete(id)}>
                                                        <a href="#a">Xóa</a>
                                                    </Popconfirm>] : [
                                                            <EditableContext.Consumer>
                                                                {form => (
                                                                    <a
                                                                        href="#a"
                                                                        onClick={() => this.save(id)}
                                                                        style={{ marginRight: 8 }}
                                                                    >
                                                                        Save
                        </a>

                                                                )}
                                                            </EditableContext.Consumer>,
                                                            <Popconfirm
                                                                title="Hủy bỏ?"
                                                                onConfirm={() => this.cancel()}
                                                            >
                                                                <a href="#a">Cancel</a>
                                                            </Popconfirm>
                                                        ]}>
                                                        <List.Item.Meta
                                                            avatar={<Avatar src="https://cdn2.vectorstock.com/i/1000x1000/99/96/book-icon-isolated-on-white-background-vector-19349996.jpg" />}
                                                            title={this.state.isEditting !== item.ma_so ?
                                                                <div className="list-item"><span onClick={() => this.onClick(item.id)}>{`${item.ma_so} - ${item.ten_mon_hoc_tv}`}</span></div>
                                                                : (<Row>
                                                                    <Col span={6} className="col-left">
                                                                        <Input defaultValue={item.ma_so} id="subject-id-edit" />
                                                                    </Col>
                                                                    <Col span={1} className="col-left">
                                                                        <div className="div-center">-</div>
                                                                    </Col>
                                                                    <Col span={16} className="col-left">
                                                                        <Input defaultValue={item.ten_mon_hoc_tv} id="subject-name-edit" />
                                                                    </Col>
                                                                </Row>)
                                                            }
                                                        />
                                                    </List.Item>
                                                </div>

                                            </Col>
                                        </Row>
                                    )}
                                />
                                <Row>
                                    <div style={{ height: "10px" }}></div>
                                    <Col span={1} className="col-left">
                                    </Col>

                                    <Button onClick={this.addSubject} style={{ width: "30%", alignContent: "center" }}><Icon type="plus" />Thêm môn học</Button>
                                </Row>
                            </div>
                        </React.Fragment>
                    ) : type === "matrix" ? <Matrix/> : type === "edit-matrix" ? <EditMatrix/> : null;
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
        menuItem: state.menuitem
    }
}
const mapDispatchToProps = (dispatch) => {

  return bindActionCreators({
    updateSubjectList: subjectList,
    updateSubjectId: subjectId,
    updateIsLoad: isLoad,
    resetTab:resetTab,
    updateIsLoadEditMatrix: isLoadEditMatrix,
    onChangeCDRData: changeCDRData,
    onUpdateVerb: selectedVerb,
  }, dispatch);

}
export default connect(mapStateToProps, mapDispatchToProps)(Content);
