import * as logic from "./";
import * as commonLogic from "./commonEducation";
import * as logicEduContent from "./logicEducationProgram";

export const receiveProps = nextProps => {
  const MajorId = nextProps.infoEduProgram
    ? nextProps.infoEduProgram.IdMajor
    : 0;
  const MajorCode = nextProps.infoEduProgram
    ? nextProps.infoEduProgram.MajorCode
    : "";
  const MajorName = nextProps.infoEduProgram
    ? nextProps.infoEduProgram.MajorName
    : "";
  const major = { MajorId, MajorName, MajorCode };
  const LevelId = nextProps.infoEduProgram
    ? nextProps.infoEduProgram.IdLevel
    : 0;
  const LevelName = nextProps.infoEduProgram
    ? nextProps.infoEduProgram.LevelName
    : "";
  const level = { LevelId, LevelName };
  const ProgramId = nextProps.infoEduProgram
    ? nextProps.infoEduProgram.IdProgram
    : 0;
  const ProgramName = nextProps.infoEduProgram
    ? nextProps.infoEduProgram.NameProgram
    : "";
  const program = { ProgramId, ProgramName };

  const nameEduProgram = nextProps.infoEduProgram
    ? nextProps.infoEduProgram.EduName
    : "";
  const schoolYear = nextProps.infoEduProgram
    ? nextProps.infoEduProgram.SchoolYear
    : "";
  const EnrollmentTarget = nextProps.detailEduProgram.EnrollmentTarget
    ? nextProps.detailEduProgram.EnrollmentTarget
    : "";
  const EduProcess = nextProps.detailEduProgram.EduProcess
    ? nextProps.detailEduProgram.EduProcess
    : "";
  const GraduatedCon = nextProps.detailEduProgram.GraduatedCon
    ? nextProps.detailEduProgram.GraduatedCon
    : "";
  const IdOutcome = nextProps.detailEduProgram.IdOutcome
    ? nextProps.detailEduProgram.IdOutcome
    : 0;
  const OSUsedNode = nextProps.detailEduProgram.OSUsedNode
    ? nextProps.detailEduProgram.OSUsedNode
    : "";

  const data = {
    major,
    level,
    program,
    nameEduProgram,
    schoolYear,
    EnrollmentTarget,
    EduProcess,
    GraduatedCon,
    IdOutcome,
    OSUsedNode
  };
  return data;
};

export const onSaveInfo = (prop, state) => {
  const infoEduProgram = {
    ideduprog: prop.infoEduProgram ? prop.infoEduProgram.Id : 0,
    eduname: state.nameEduProgram,
    eduengname: "",
    idlevel: state.level.LevelId,
    idmajor: state.major.MajorId,
    idprogram: state.program.ProgramId,
    schoolyear: state.schoolYear,
    dateedited: new Date().toISOString()
  };
  return infoEduProgram;
};

export const onSaveDetail = (prop, state) => {
  const detailEduProgram = {
    enrollmenttarget: state.EnrollmentTarget ? state.EnrollmentTarget : "",
    eduprocess: state.EduProcess ? state.EduProcess : "",
    graduatedcon: state.GraduatedCon ? state.GraduatedCon : "",
    ideduprogram: prop.infoEduProgram ? prop.infoEduProgram.Id : 0,
    dateedited: new Date().toISOString(),
    datecreated: new Date().toISOString(),
    idoutcome: state.IdOutcome
  };
  return detailEduProgram;
};

export const onSaveTarget = (prop, targetNodes) => {
  const data = [];
  const level = logic.getMaxLevel(targetNodes);
  commonLogic.createSaveDataForTarget(targetNodes, data, level);
  const targetEduProgram = {
    datecreated: new Date().toISOString(),
    iddetail: prop.detailEduProgram.Id,
    data,
    targetNodes
  };
  return targetEduProgram;
};

export const onSaveContent = (prop, contentNodes) => {
  const data = [];
  const level = logic.getMaxLevel(contentNodes);
  commonLogic.createSaveDataForContent(contentNodes, data, level);
  const contentProgram = {
    datecreated: new Date().toISOString(),
    iddetail: prop.detailEduProgram.Id,
    data,
    contentNodes
  };
  return contentProgram;
};

export const parseDataForSaveEduProgram = (
  iddetail,
  infoEduProgram,
  detailEduProgram,
  contentNodes,
  scheduleNodes,
  targetNodes
) => {
  const datecreated = new Date().toISOString();
  const contentProgram = {
    nodes: contentNodes,
    contentNodes: logicEduContent.convertTreenodeToArr(contentNodes),
    iddetail,
    datecreated
  };
  const scheduleProgram = {
    scheduleNodes: [...scheduleNodes],
    iddetail,
    datecreated
  };
  const targetProgram = {
    targetNodes: [...targetNodes],
    iddetail,
    datecreated
  };

  const data = {
    infoEduProgram,
    detailEduProgram,
    contentProgram,
    scheduleProgram,
    targetProgram
  };
  return data;
};
