import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as message from "./message";
import * as detailEduProgramAction from "./detailEduProgramAction";

export const loadEduProgramsSuccess = eduPrograms => ({
  type: cst.LOAD_EDUPROGRAMS_SUCCESS,
  eduPrograms: eduPrograms
});

export const loadEduProgramsError = errorMessage => ({
  type: cst.LOAD_EDUPROGRAMS_ERROR,
  errorMessage
});

export const onLoadEduPrograms = () => {
  return (dispatch, getState) => {
    let req = links.LOAD_EDUPROGRAMS;
    axios
      .get(req)
      .then(res => {
        const eduPrograms = res.data.data;
        if (eduPrograms === undefined || eduPrograms === null) {
          let chirp = {
            message: `Chưa có dữ liệu`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(loadEduProgramsError(res));
        } else {
          dispatch(loadEduProgramsSuccess(eduPrograms));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Tải các CTĐT thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(loadEduProgramsError(err));
      });
  };
};

export const addEduProgramSuccess = successMessage => ({
  type: cst.ADD_EDUPROGRAM_SUCCESS,
  successMessage
});

export const addEduProgramError = errorMessage => ({
  type: cst.ADD_EDUPROGRAM_ERROR,
  errorMessage
});

export const onAddEduProgram = data => {
  return (dispatch, getState) => {
    let link = `${links.ADD_EDUPROGRAM}`;
    let params = {};
    params.data = JSON.stringify(data);
    axios
      .post(link, params, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        if (res.data.code === 1) {
          dispatch(onLoadEduPrograms());
          let chirp = {
            message: `Tạo CTĐT thành công`,
            isRight: 1
          };
          dispatch(message.message(chirp));
          dispatch(addEduProgramSuccess(res));
        } else {
          let chirp = {
            message: `Tạo CTĐT thất bại`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(addEduProgramError(res));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Tạo CTĐT thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(addEduProgramError(err));
      });
  };
};

export const loadEduProgramSuccess = infoEduProgram => ({
  type: cst.LOAD_EDUPROGRAM_SUCCESS,
  infoEduProgram: infoEduProgram
});

export const loadEduProgramError = errorMessage => ({
  type: cst.LOAD_EDUPROGRAM_ERROR,
  errorMessage
});

export const onLoadEduProgram = id => {
  return (dispatch, getState) => {
    let req = `${links.LOAD_EDUPROGRAM}?ideduprog=${id}`;
    axios
      .get(req)
      .then(res => {
        const infoEduProgram = res.data.data;
        if (infoEduProgram === undefined || infoEduProgram === null) {
          let chirp = {
            message: `Chưa có dữ liệu`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(loadEduProgramError(res));
        } else {
          dispatch(loadEduProgramSuccess(infoEduProgram));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Tải thông tin CTĐT thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(loadEduProgramError(err));
      });
  };
};

export const saveEduProgramSuccess = successMessage => ({
  type: cst.SAVE_EDUPROGRAM_SUCCESS,
  successMessage
});

export const saveEduProgramError = errorMessage => ({
  type: cst.SAVE_EDUPROGRAM_ERROR,
  errorMessage
});

export const onSaveEduProgram = data => {
  return (dispatch, getState) => {
    let params = {};
    params.data = JSON.stringify(data.infoEduProgram);
    axios
      .post(
        `${links.SAVE_EDUPROGRAM}?ideduprog=${data.infoEduProgram.ideduprog}`,
        params,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => {
        if (res.data.code === 1) {
          dispatch(saveEduProgramSuccess(res));
          dispatch(detailEduProgramAction.onSaveDetailEduProgram(data));
        } else {
          dispatch(saveEduProgramError(res));
          let chirp = {
          message: `Lưu CTĐT thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        }
      })
      .catch(err => {
        dispatch(saveEduProgramError(err));
        let chirp = {
          message: `Lưu CTĐT thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
      });
  };
};
