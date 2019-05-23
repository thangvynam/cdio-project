export const LINK = "http://localhost:3001";

// user
export const LOGIN = `${LINK}/user/login/`;
export const LOAD_USERS = `${LINK}/user/getlist/`;

// levels links
export const LOAD_LEVELS = `${LINK}/level/getlist/`;
export const ADD_LEVEL = `${LINK}/level/add/`;
export const DELETE_LEVEL = `${LINK}/level/delete/`;

// majors links
export const LOAD_MAJORS = `${LINK}/major/getlist/`;
export const ADD_MAJOR = `${LINK}/major/add/`;
export const DELETE_MAJOR = `${LINK}/major/delete/`;

// faculties links
export const LOAD_FACULTIES = `${LINK}/faculty/getlist/`;
export const ADD_FACULTY = `${LINK}/faculty/add/`;
export const DELETE_FACULTY = `${LINK}/faculty/delete/`;

// programs links
export const LOAD_PROGRAMS = `${LINK}/program/get/`;
export const ADD_PROGRAM = `${LINK}/program/add/`;
export const DELETE_PROGRAM = `${LINK}/program/delete/`;

// eduPrograms links
export const LOAD_EDUPROGRAMS = `${LINK}/eduprogram/getlist/`;
export const ADD_EDUPROGRAM = `${LINK}/eduprogram/add/`;
export const LOAD_EDUPROGRAM = `${LINK}/eduprogram/getbyid/`;
export const SAVE_EDUPROGRAM = `${LINK}/eduprogram/update/`;

// detail eduProgram links
export const LOAD_DETAIL_EDUPROGRAM = `${LINK}/detaileduprogram/get/`;
export const SAVE_DETAIL_EDUPROGRAM = `${LINK}/detaileduprogram/update/`;

export const LOAD_CONTENT_EDUPROGRAM = `${LINK}/eduprogcontent/get/`;
export const SAVE_CONTENT_EDUPROGRAM = `${LINK}/eduprogcontent/add/`;

export const LOAD_SCHEDULE_EDUPROGRAM = `${LINK}/teachplanblock/getdetail/`;
export const SAVE_SCHEDULE_EDUPROGRAM = `${LINK}/teachplanblock/update/`;

export const LOAD_TARGET_EDUPROGRAM = `${LINK}/edupurpose/get/`;
export const ADD_TARGET_EDUPROGRAM = `${LINK}/edupurpose/add/`;
export const SAVE_TARGET_EDUPROGRAM = `${LINK}/edupurpose/update/`;

// subjects links
export const LOAD_SUBJECTS = `${LINK}/subject/getlist/`;
export const ADD_SUBJECT = `${LINK}/subject/add/`;
export const ADD_SUBJECT_BULK = `${LINK}/subject/addlist/`;
export const DELETE_SUBJECT = `${LINK}/subject/delete/`;
export const LOAD_USING_EDUPRO = `${LINK}/subjecteduprog/geteduprog/`;

// outcomeStandards links
export const LOAD_OUTCOMESTANDARDS = `${LINK}/outcomestandard/getlist/`;
export const LOAD_OUTCOMESTANDARD = `${LINK}/outcomestandard/getinfo/`;
export const ADD_OUTCOMESTANDARD = `${LINK}/outcomestandard/add/`;
export const DELETE_OUTCOMESTANDARD = `${LINK}/outcomestandard/delete/`;

// detailOutcomeStandard links
export const LOAD_DETAIL_OUTCOMESTANDARD = `${LINK}/detailoutcomestandard/get/`;
export const DELETE_DETAIL_OUTCOMESTANDARD = `${LINK}/detailoutcomestandard/delete/`;
export const ADD_DETAIL_OUTCOMESTANDARD = `${LINK}/detailoutcomestandard/add/`;

// revisions links
export const LOAD_REVISIONS = `${LINK}/revision/get/`;
export const ADD_REVISION = `${LINK}/revision/add/`;
export const DELETE_REVISION = `${LINK}/revision/delete/`;

// detailOutcomeStandard links
export const LOAD_DETAIL_REVISION = `${LINK}/detailrevision/get/`;
export const ADD_DETAIL_REVISION = `${LINK}/detailrevision/add/`;
