const LINK = window.env.REACT_APP_API_PREFIX;

// user
export const LOGIN = `${LINK}/user/login/`;
export const LOAD_USERS = `${LINK}/user/getlist/`;
export const REGISTER_USER = `${LINK}/user/register/`;
export const CHANGE_PASS = `${LINK}/user/changepass/`;
export const GET_INFO = `${LINK}/user/getinfo/`;
export const DELETE_USER = `${LINK}/user/delete/`;
export const REGISTER_BLOCK_USER = `${LINK}/user/registerlist/`;

// survey links
export const LOAD_SURVEYS = `${LINK}/outcome/getsurveylist/`;
export const ADD_SURVEY = `${LINK}/outcome/add/`;

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
export const EXPORT_EDUPROGRAM = `${LINK}/download/getedu/`;
export const EXPORT_EDUPROGRAM_SUBJECTS = `${LINK}/download/getcourse/`;

export const LOAD_EDUPROGRAMS = `${LINK}/eduprogram/getlist/`;
export const ADD_EDUPROGRAM = `${LINK}/eduprogram/add/`;
export const LOAD_EDUPROGRAM = `${LINK}/eduprogram/getbyid/`;
export const SAVE_EDUPROGRAM = `${LINK}/eduprogram/update/`;

// detail eduProgram links
export const LOAD_DETAIL_EDUPROGRAM = `${LINK}/detaileduprogram/get/`;
export const SAVE_DETAIL_EDUPROGRAM = `${LINK}/detaileduprogram/update/`;
export const ADD_DETAIL_EDUPROGRAM = `${LINK}/detaileduprogram/add/`;

export const LOAD_CONTENT_EDUPROGRAM = `${LINK}/eduprogcontent/get/`;
export const SAVE_CONTENT_EDUPROGRAM = `${LINK}/eduprogcontent/add/`;

export const LOAD_SCHEDULE_EDUPROGRAM = `${LINK}/teachplanblock/getdetail/`;
export const SAVE_SCHEDULE_EDUPROGRAM = `${LINK}/teachplanblock/update/`;

export const LOAD_TARGET_EDUPROGRAM = `${LINK}/edupurpose/get/`;
export const ADD_TARGET_EDUPROGRAM = `${LINK}/edupurpose/add/`;
export const SAVE_TARGET_EDUPROGRAM = `${LINK}/edupurpose/update/`;

export const LOAD_BLOCKS = `${LINK}/eduprogcontent/getBlockSubjects/`;

export const LOAD_TABLES = `${LINK}/eduprogcontent/getKnowledgeTable/`;

// export const ADD_TEACHER = `${LINK}/detailblock/addteacher/`;
export const ADD_TEACHER = `${LINK}/detailblock/addlistteacher/`;

export const LOAD_CONTENT_LIST = `${LINK}/eduprogram/getlistofcontent/`;

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

export const LOAD_COMMENT = `${LINK}/comment/get/`;
export const ADD_COMMENT = `${LINK}/comment/add/`;
export const DONE_COMMENT = `${LINK}/comment/done/`;

// revisions links
export const LOAD_REVISIONS = `${LINK}/revision/get/`;
export const ADD_REVISION = `${LINK}/revision/add/`;
export const DELETE_REVISION = `${LINK}/revision/delete/`;

// detailOutcomeStandard links
export const LOAD_DETAIL_REVISION = `${LINK}/detailrevision/get/`;
export const ADD_DETAIL_REVISION = `${LINK}/detailrevision/add/`;
