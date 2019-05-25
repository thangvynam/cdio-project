import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as message from "./message";

import * as commonLogic from "../business/commonEducation";
import * as logic from "../business/";

export const loadTargetProgramSuccess = targetNodes => ({
  type: cst.LOAD_TARGET_EDUPROGRAM_SUCCESS,
  targetNodes
});

export const loadTargetProgramError = errorMessage => ({
  type: cst.LOAD_TARGET_EDUPROGRAM_ERROR,
  errorMessage
});

export const onLoadTargetProgram = idDetail => {
  return (dispatch, getState) => {
    let req = `${links.LOAD_TARGET_EDUPROGRAM}?iddetaileduprogram=${idDetail}`;
    axios
      .get(req)
      .then(res => {
        const targetNodes = res.data.data;
        if (targetNodes) {
          dispatch(loadTargetProgramSuccess(targetNodes));
        } else {
          let chirp = {
            message: `Chưa có dữ liệu`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(loadTargetProgramError(res));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Tải mục tiêu đào tạo thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(loadTargetProgramError(err));
      });
  };
};

export const saveTargetProgramSuccess = successMessage => ({
  type: cst.SAVE_TARGET_EDUPROGRAM_SUCCESS,
  successMessage
});

export const saveTargetProgramError = (targetNodes, errorMessage) => ({
  type: cst.SAVE_TARGET_EDUPROGRAM_ERROR,
  targetNodes,
  errorMessage
});

export const onSaveTargetProgram = targetProgram => {
  return (dispatch, getState) => {
    let req = `${links.SAVE_TARGET_EDUPROGRAM}?iddetail=${
      targetProgram.iddetail
    }`;
    let params = {};
    const outdata = [];
    const level = logic.getMaxLevel(targetProgram.targetNodes);
    commonLogic.createSaveDataForTarget(targetProgram.targetNodes, outdata, level);

    console.error(outdata)


    params.data = JSON.stringify(outdata);
    axios
      .post(req, params, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        if (res.data.code === 1) {
          let chirp = {
            message: `Lưu mục tiêu đào tạo thành công`,
            isRight: 1
          };
          dispatch(message.message(chirp));
          dispatch(saveTargetProgramSuccess(res));
        } else {
          let chirp = {
            message: `Lưu mục tiêu đào tạo thất bại`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(saveTargetProgramError(targetProgram.targetNodes, res));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Lưu mục tiêu đào tạo thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(saveTargetProgramError(targetProgram.targetNodes, err));
      });
  };
};
