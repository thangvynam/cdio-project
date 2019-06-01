import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as message from "./message";

export const loadContentProgramSuccess = contentNodes => ({
  type: cst.LOAD_CONTENT_EDUPROGRAM_SUCCESS,
  contentNodes
});

export const loadContentProgramError = errorMessage => ({
  type: cst.LOAD_CONTENT_EDUPROGRAM_ERROR,
  errorMessage
});

export const onLoadContentProgram = idDetail => {
  return (dispatch, getState) => {
    let req = `${links.LOAD_CONTENT_EDUPROGRAM}?id=${idDetail}`;
    axios
      .get(req)
      .then(res => {
        const contentNodes = res.data.data;
        // const { eduContents, subjectBlocks, detailBlocks } = contentNodes;
        if (contentNodes) {
          dispatch(loadContentProgramSuccess(contentNodes));
        } else {
          let chirp = {
            message: `Chưa có dữ liệu`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(loadContentProgramError(res));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Tải nội dung chương trình thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(loadContentProgramError(err));
      });
  };
};

export const saveContentProgramSuccess = (contentNodes, successMessage) => ({
  type: cst.SAVE_CONTENT_EDUPROGRAM_SUCCESS,
  successMessage,
  contentNodes
});

export const saveContentProgramError = (contentNodes, errorMessage) => ({
  type: cst.SAVE_CONTENT_EDUPROGRAM_ERROR,
  errorMessage,
  contentNodes
});

export const onSaveContentProgram = contentProgram => {
  return (dispatch, getState) => {
    let req = `${links.SAVE_CONTENT_EDUPROGRAM}?ideduprog=${contentProgram.iddetail}`;
    let params = {};
    params.data = JSON.stringify(contentProgram.contentNodes);
    axios
      .post(req, params, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        if (res.data.code === "OK") {
          dispatch(onLoadContentProgram(contentProgram.iddetail));
          let chirp = {
            message: `Lưu nội dung chương trình thành công`,
            isRight: 1
          };
          dispatch(message.message(chirp));
        } else {
          let chirp = {
            message: `Lưu nội dung chương trình thất bại`,
            isRight: 0
          };
          dispatch(message.message(chirp));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Lưu nội dung chương trình thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
      });
  };
};
