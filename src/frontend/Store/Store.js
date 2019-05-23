import itemLayout5Reducer from "../Reducers/ItemLayout5Reducer";
import itemLayout2Reducer from "../Reducers/ItemLayout2Reducer";
import itemLayout3Reducer from "../Reducers/ItemLayout3Reducer";
import itemLayout1Reducer from "../Reducers/itemLayout1Reducer";
import {
  itemLayout4Reducer,
  changeCDRDataReducer,
  selecteCDRItemReducer,
  changeEditStateReducer,
  selectedVerbReducer,
  cdrmdhdReducer,
  mtmhReducer,
  isLoadReducer,
  logLayout4Reducer,
  cdrmdhdDBReducer
} from "../Reducers/ItemLayout4Reducer";
import {
  itemLayout7Reducer,
  changeDGDataReducer
} from "../Reducers/itemLayout7Reducer";
import itemLayout8Reducer from "../Reducers/itemLayout8Reducer";
import itemLayout6Reducer from "../Reducers/ItemLayout6Reducer";
import itemLayout9Reducer from "../Reducers/ItemLayout9Reducer";
import matrixReducer from "../Reducers/matrixReducer";
import benchmarkReducer from "../Reducers/benchmarkMatrixReducer";
import surveyMatrixReducer from "../Reducers/surveyMatrixReducer";
import authenticationReducer from "../Reducers/authentcationReducer";
import {
  menuItemReducer,
  subjectIdReducer,
  subjectListReducer,
  subjectMasoReducer,
  cdrCdioReducer,
  ctdtReducer,
  parentItemReducer
} from "../Reducers/homePageReducer";
import logReducer from "../Reducers/logReducer";

import { createStore, applyMiddleware } from "redux";
// import logger from 'redux-logger';
import thunk from "redux-thunk";
import {
  editMatrixReducer,
  editMatrixEditStateReducer,
  isLoadEditMatrixReducer
} from "../Reducers/editMatrixReducer";
import surveyReducer from "../Reducers/surveyReducer";
import teacherReducer from "../Reducers/teacherReducer";

// start CDIO1 reducers
import { message } from "../CDIO1/reducers/message";
import { users } from "../CDIO1/reducers/users";
import { faculties } from "../CDIO1/reducers/faculties";
import { programs } from "../CDIO1/reducers/programs";
import { subjects } from "../CDIO1/reducers/subjects";
import { usingEduPro } from "../CDIO1/reducers/usingEduPro";
import { outcomeStandards } from "../CDIO1/reducers/outcomeStandards";
import { infoOutcomeStandard } from "../CDIO1/reducers/infoOutcomeStandard";
import { detailOutcomeStandard } from "../CDIO1/reducers/detailOutcomeStandard";
import { revisions } from "../CDIO1/reducers/revisions";
import { levels } from "../CDIO1/reducers/levels";
import { majors } from "../CDIO1/reducers/majors";
import { eduPrograms } from "../CDIO1/reducers/eduPrograms";
import { infoEduProgram } from "../CDIO1/reducers/infoEduProgram";
import { detailEduProgram } from "../CDIO1/reducers/detailEduProgram";
import { contentNodes } from "../CDIO1/reducers/_contentNodes";
import { scheduleNodes } from "../CDIO1/reducers/_scheduleNodes";
import { targetNodes } from "../CDIO1/reducers/_targetNodes";
// end CDIO1 reducers

//const middleware = [ thunk, logger ];
const middleware = [thunk];

var redux = require("redux");

const allReducers = redux.combineReducers({
  logLayout4Reducer: logLayout4Reducer,
  itemLayout1Reducer: itemLayout1Reducer,
  itemLayout5Reducer: itemLayout5Reducer,
  itemLayout2Reducer: itemLayout2Reducer,
  itemLayout3Reducer: itemLayout3Reducer,
  itemLayout4Reducer: itemLayout4Reducer,
  cdrdata: changeCDRDataReducer,
  cdrselecteditem: selecteCDRItemReducer,
  cdreditstate: changeEditStateReducer,
  cdrverb: selectedVerbReducer,
  cdrmdhddb: cdrmdhdDBReducer,
  cdrmdhd: cdrmdhdReducer,
  isloadtab4: isLoadReducer,
  mtmh: mtmhReducer,
  itemLayout6Reducer: itemLayout6Reducer,
  itemLayout9Reducer: itemLayout9Reducer,
  itemLayout7Reducer: itemLayout7Reducer,
  dgdata: changeDGDataReducer,
  itemLayout8Reducer: itemLayout8Reducer,
  // tndata: changeTNDataReducer,
  // loaitainguyenReducer: loaiTaiNguyenReducer,
  menuitem: menuItemReducer,
  parentitem: parentItemReducer,
  ctdt: ctdtReducer,
  subjectid: subjectIdReducer,
  subjectmaso: subjectMasoReducer,
  subjectlist: subjectListReducer,
  cdrcdio: cdrCdioReducer,
  editmatrix: editMatrixReducer,
  editmatrixeditstate: editMatrixEditStateReducer,
  isloadeditmatrix: isLoadEditMatrixReducer,
  matrix: matrixReducer,
  surveyMatrix: surveyMatrixReducer,
  benchmarkMatrix: benchmarkReducer,
  logReducer: logReducer,
  surveyReducer: surveyReducer,
  authentication: authenticationReducer,
  teacherlist: teacherReducer,

  faculties,
  programs,
  subjects,
  usingEduPro,
  outcomeStandards,
  infoOutcomeStandard,
  detailOutcomeStandard,
  revisions,
  levels,
  majors,
  eduPrograms,
  message,

  infoEduProgram,
  detailEduProgram,
  contentNodes,
  scheduleNodes,
  targetNodes,

  users
});
const store1 = createStore(allReducers, applyMiddleware(...middleware));
export default store1;
