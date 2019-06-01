import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as message from "./message";

export const loadBlocksSuccess = blocks => ({
  type: cst.LOAD_BLOCKS_SUCCESS,
  blocks
});

export const loadBlocksError = errorMessage => ({
  type: cst.LOAD_BLOCKS_ERROR,
  errorMessage
});

export const onLoadBlocks = idDetail => {
  return (dispatch, getState) => {
    let req = `${links.LOAD_BLOCKS}?id=${idDetail}`;
    axios
      .get(req)
      .then(res => {
        const blocks = res.data.data;
        if (blocks) {
          dispatch(loadBlocksSuccess(blocks));
        } else {
          let chirp = {
            message: `Chưa có dữ liệu`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(loadBlocksError(res));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Tải danh sách khối kiến thức thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(loadBlocksError(err));
      });
  };
};

export const addTeacherSuccess = successMessage => ({
  type: cst.ADD_TEACHER_SUCCESS,
  successMessage
});

export const addTeacherError = errorMessage => ({
  type: cst.ADD_TEACHER_ERROR,
  errorMessage
});

export const onAddTeacher = data => {
  return (dispatch, getState) => {
    let link = `${links.ADD_TEACHER}?iduser=${data.iduser}&idsubject=${
      data.idsubject
    }&idsubjectblock=${data.idsubjectblock}`;
    axios
      .post(link, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        if (res.data.code === 1) {
          let chirp = {
            message: `Phân công giáo viên thành công`,
            isRight: 1
          };
          dispatch(message.message(chirp));
          dispatch(addTeacherSuccess(res));
        } else {
          let chirp = {
            message: `Phân công giáo viên thất bại`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(addTeacherError(res));
        }
        dispatch(onLoadBlocks(data.iddetail));
      })
      .catch(err => {
        let chirp = {
          message: `Phân công giáo viên thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(addTeacherError(err));
        dispatch(onLoadBlocks(data.iddetail));
      });
  };
};
