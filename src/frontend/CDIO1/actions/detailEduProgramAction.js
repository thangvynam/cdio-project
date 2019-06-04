import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as message from "./message";
import * as contentAction from "./_detailContentAction";
import * as scheduleAction from "./_detailScheduleAction";
import * as targetAction from "./_detailTargetAction";
import * as contentListAction from "./_contentListAction";

export const loadDetailEduProgramSuccess = detailEduProgram => ({
  type: cst.LOAD_DETAIL_EDUPROGRAM_SUCCESS,
  detailEduProgram
});

export const loadDetailEduProgramError = errorMessage => ({
  type: cst.LOAD_DETAIL_EDUPROGRAM_ERROR,
  errorMessage
});

export const onLoadDetailEduProgram = id => {
  return (dispatch, getState) => {
    let req = `${links.LOAD_DETAIL_EDUPROGRAM}?ideduprog=${id}`;
    axios
      .get(req, {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("user")
            ? "JWT " + JSON.parse(localStorage.getItem("user")).token
            : ""
        }
      })
      .then(res => {
        const detailEduProgram = res.data.data;
        if (detailEduProgram) {
          dispatch(loadDetailEduProgramSuccess(detailEduProgram));
          // where to put actions LOL
          dispatch(contentAction.onLoadContentProgram(detailEduProgram.Id));
          dispatch(scheduleAction.onloadScheduleProgram(detailEduProgram.Id));
          dispatch(targetAction.onLoadTargetProgram(detailEduProgram.Id));
          dispatch(contentListAction.onLoadContentList(id));
        } else {
          let chirp = {
            message: `Chưa có dữ liệu`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(loadDetailEduProgramError(res));
          // where to put actions LOL
          dispatch(contentAction.loadContentProgramError(res));
          dispatch(scheduleAction.loadScheduleProgramError(res));
          dispatch(targetAction.loadTargetProgramError(res));
          dispatch(contentListAction.loadContentListError(res));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Tải chi tiết CTĐT thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(loadDetailEduProgramError(err));
        // where to put actions LOL
        dispatch(contentAction.loadContentProgramError(err));
        dispatch(scheduleAction.loadScheduleProgramError(err));
        dispatch(targetAction.loadTargetProgramError(err));
        dispatch(contentListAction.loadContentListError(err));
      });
  };
};

export const saveDetailEduProgramSuccess = successMessage => ({
  type: cst.SAVE_DETAIL_EDUPROGRAM_SUCCESS,
  successMessage
});

export const saveDetailEduProgramError = errorMessage => ({
  type: cst.SAVE_DETAIL_EDUPROGRAM_ERROR,
  errorMessage
});

export const afterSaveDetailEduProgramE3 = id => {
  return (dispatch, getState) => {
    let req = `${links.LOAD_DETAIL_EDUPROGRAM}?ideduprog=${id}`;
    axios.get(req).then(res => {
      const detailEduProgram = res.data.data;
      if (detailEduProgram) {
        dispatch(loadDetailEduProgramSuccess(detailEduProgram));
      }
    });
  };
};

// infoEduProgram,
// detailEduProgram,
// contentProgram,
// scheduleProgram,
// targetProgram

export const onSaveDetailEduProgram = data => {
  return (dispatch, getState) => {
    let req =
      data.detailEduProgram.iddetail > 0
        ? `${links.SAVE_DETAIL_EDUPROGRAM}?ideduprogram=${
            data.detailEduProgram.ideduprogram
          }`
        : `${links.ADD_DETAIL_EDUPROGRAM}?ideduprogram=${
            data.detailEduProgram.ideduprogram
          }`;
    let params = {};
    params.data = JSON.stringify(data.detailEduProgram);
    axios
      .post(req, params, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        if (res.data.code === 1) {
          dispatch(saveDetailEduProgramSuccess(res));
          let chirp = {
            message: `Lưu thông tin CTĐT thành công`,
            isRight: 1
          };
          dispatch(message.message(chirp));
          if (res.data.iddetail && !data.detailEduProgram.iddetail) {
            data.contentProgram.iddetail = res.data.iddetail;
            data.scheduleProgram.iddetail = res.data.iddetail;
            data.targetProgram.iddetail = res.data.iddetail;
          }
          dispatch(
            afterSaveDetailEduProgramE3(data.detailEduProgram.ideduprogram)
          );
          // where to put actions LOL
          dispatch(contentAction.onSaveContentProgram(data.contentProgram));
          dispatch(scheduleAction.onSaveScheduleProgram(data.scheduleProgram));
          dispatch(targetAction.onSaveTargetProgram(data.targetProgram));
        } else {
          dispatch(saveDetailEduProgramError(res));
          let chirp = {
            message: `Lưu thông tin CTĐT thất bại`,
            isRight: 0
          };
          dispatch(message.message(chirp));
        }
      })
      .catch(err => {
        dispatch(saveDetailEduProgramError(err));
        let chirp = {
          message: `Lưu thông tin CTĐT thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
      });
  };
};
