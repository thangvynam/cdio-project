import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";
import { Prompt } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";

import DetailEducationProgramCom from "../components/detailEducationProgram/DetailEducationProgramCom";
import AlertCom from "../components/AlertCom";
import PageTitle from "../components/PageTitle";

import * as levelsAction from "../actions/levelsAction";
import * as majorsAction from "../actions/majorsAction";
import * as programsAction from "../actions/programsAction";
import * as subjectsAction from "../actions/subjectsAction";
import * as outcomeStandardsAction from "../actions/outcomeStandardsAction";
import * as detailOutcomeStandardAction from "../actions/detailOutcomeStandardAction";

import * as eduProgramsAction from "../actions/eduProgramsAction";
import * as detailEduProgramAction from "../actions/detailEduProgramAction";

import { connect } from "react-redux";

//CDIO-2 api
import $ from "../../helpers/services";
import {
  subjectList,
  dataCtdt,
  isLoadedDataCtdt,
  teacherSubject,
  teacherReviewSubject
} from "../../Constant/ActionType";
//END CDIO-2 api
class DetailEducationProgramTmp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoad: false
    };
  }

  checkAdmin = (role) => {
    if(role.indexOf("ADMIN") > -1) {
        return true;
    }
    return false;
}
checkChuNhiem = (role) => {
    if(role.indexOf("CHUNHIEM") > -1) {
        return true;
    }
    return false;
  }

  checkBienSoan = (role) => {
    if(role.indexOf("BIEN_SOAN") > -1) {
        return true;
    }
    return false;
  }

  checkTeacher = (role) => {
    if(role.indexOf("TEACHER") > -1) {
        return true;
    }
    return false;
  }

checkInTeacherSubject = (teacherSubject, idSubject) => {
  for(let i = 0;i < teacherSubject.length;i++) {
      if(teacherSubject[i].IdSubject === idSubject) {
          return true;
      }
  }
  return false;
}

checkInTeacherReviewSubject = (teacherReviewSubject, idSubject) => {
  for(let i = 0;i < teacherReviewSubject.length;i++) {
      if(teacherReviewSubject[i].idTTC === idSubject) {
          return true;
      }
  }
  return false;
}

  componentDidMount = () => {
    // const urlParams = new URLSearchParams(window.location.search);
    // const id = urlParams.get("id");
    debugger;
    
    const id = this.props.ctdt;
    this.props.onLoadEduProgram(id);
    this.props.onLoadDetailEduProgram(id);
    //if(this.props.isLoadedDataCtdt === false) {
      this.setState({isLoad: true});
    $.getBlockSubject(id).then(res => {
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
        
        $.getTeacherSubject({idUser: JSON.parse(localStorage.getItem('user')).data.Id})
        .then(res => { 
          if(res.data !== undefined && res.data !== null){
            this.props.updateTeacherSubject(res.data);
          }
          $.getTeacherReviewSubject({idUser: JSON.parse(localStorage.getItem('user')).data.Id})
          .then(res => {
            if(res.data !== undefined && res.data !== null){
              this.props.updateTeacherReviewSubject(res.data);
            }
            if(this.checkChuNhiem(JSON.parse(localStorage.getItem('user')).data.Role) || 
            this.checkBienSoan(JSON.parse(localStorage.getItem('user')).data.Role)) {
              dataSubject = dataSubject.filter(item => 
                  item.del_flat != 1
              );
              this.props.updateSubjectList(dataSubject);
              this.setState({isLoad: false});
            }
            else {
              dataSubject = dataSubject.filter(item => 
                    item.del_flat != 1
                    &&
                     (this.checkInTeacherReviewSubject(this.props.teacherReviewSubject, item.IdSubject)
                    ||this.checkInTeacherSubject(this.props.teacherSubject, item.IdSubject))
                );
                this.props.updateSubjectList(dataSubject);
                this.setState({isLoad: false});
            }
          });
        });
        
        this.props.updateDataCtdt(dataCtdt);
        this.props.updateIsLoadedDataCtdt(true);
        
      }})

    //}

    this.props.onLoadLevels();
    this.props.onLoadMajors();
    this.props.onLoadPrograms();
    this.props.onLoadSubjects();
    this.props.onLoadOutcomeStandards();
    window.addEventListener("beforeunload", this.onUnload);
  };

  onUnload = event => {
    event.returnValue = "Hello World!!";
  };

  componentWillUnmount = () => {
    window.removeEventListener("beforeunload", this.onUnload);
  };

  render() {
    const infoEduProgram = Array.isArray(this.props.infoEduProgram)
      ? this.props.infoEduProgram[0]
      : null;

    const title = infoEduProgram
      ? `${infoEduProgram.EduName}`
      : `Chưa tải được`;

    return (
      !this.state.isLoad && <Container fluid className="main-content-container px-4">
        <Prompt message="Dữ liệu chưa được lưu, bạn thực sự muốn thoát?" />
        <Row noGutters className="page-header py-4">
          <Col lg="8" md="8" sm="8">
            <PageTitle
              sm="12"
              title={title}
              subtitle="Chỉnh sửa CTĐT"
              className="text-sm-left"
            />
          </Col>{" "}
          <Col lg="4" md="4" sm="4">
            <AlertCom message={this.props.message} />{" "}
          </Col>{" "}
        </Row>
        <hr />
        <Row>
          <Col lg="12" md="12">
            <DetailEducationProgramCom
              levels={this.props.levels}
              majors={this.props.majors}
              programs={this.props.programs}
              subjects={this.props.subjects}
              infoEduProgram={infoEduProgram}
              detailEduProgram={this.props.detailEduProgram}
              outcomeStandards={this.props.outcomeStandards}
              detailOutcomeStandard={this.props.detailOutcomeStandard}
              onLoadDetailOutcomeStandard={
                this.props.onLoadDetailOutcomeStandard
              }
              onSaveEduProgram={this.props.onSaveEduProgram}
              contentNodes={this.props.contentNodes}
              scheduleNodes={this.props.scheduleNodes}
              targetNodes={this.props.targetNodes}
            />{" "}
          </Col>{" "}
        </Row>{" "}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  message: state.message,
  outcomeStandards: state.outcomeStandards,
  detailOutcomeStandard: state.detailOutcomeStandard,
  levels: state.levels,
  majors: state.majors,
  programs: state.programs,
  subjects: state.subjects,
  infoEduProgram: state.infoEduProgram,
  detailEduProgram: state.detailEduProgram,
  contentNodes: state.contentNodes,
  scheduleNodes: state.scheduleNodes,
  targetNodes: state.targetNodes,
  teacherSubject: state.datactdt.teacherSubject,
  teacherReviewSubject: state.datactdt.teacherReviewSubject,
});

export default connect(mapStateToProps, {
  onLoadLevels: levelsAction.onLoadLevels,
  onLoadMajors: majorsAction.onLoadMajors,
  onLoadPrograms: programsAction.onLoadPrograms,
  onLoadSubjects: subjectsAction.onLoadSubjects,
  onLoadOutcomeStandards: outcomeStandardsAction.onLoadOutcomeStandards,
  onLoadDetailOutcomeStandard:
    detailOutcomeStandardAction.onLoadDetailOutcomeStandard,
  onSaveEduProgram: eduProgramsAction.onSaveEduProgram,
  onLoadEduProgram: eduProgramsAction.onLoadEduProgram,
  onLoadDetailEduProgram: detailEduProgramAction.onLoadDetailEduProgram,
  //cdio-2
  updateSubjectList: subjectList,
  updateDataCtdt: dataCtdt,
  updateIsLoadedDataCtdt: isLoadedDataCtdt,
  updateTeacherSubject: teacherSubject,
  updateTeacherReviewSubject: teacherReviewSubject
})(DetailEducationProgramTmp);
