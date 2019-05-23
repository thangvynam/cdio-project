import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as message from "./message";

export const loadProgramsSuccess = programs => ({
  type: cst.LOAD_PROGRAMS_SUCCESS,
  programs: programs
});

export const loadProgramsError = errorMessage => ({
  type: cst.LOAD_PROGRAMS_ERROR,
  errorMessage
});

export const onLoadPrograms = () => {
  return (dispatch, getState) => {
    let req = links.LOAD_PROGRAMS;
    axios
      .get(req)
      .then(res => {
        const programs = res.data.data;
        if (programs === undefined || programs === null) {
          let chirp = {
            message: `Chưa có dữ liệu`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(loadProgramsError(res));
        } else {
          dispatch(loadProgramsSuccess(programs));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Tải các chương trình thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(loadProgramsError(err));
      });
  };
};

export const addProgramSuccess = successMessage => ({
  type: cst.ADD_PROGRAM_SUCCESS,
  successMessage
});

export const addProgramError = errorMessage => ({
  type: cst.ADD_PROGRAM_ERROR,
  errorMessage
});

export const onAddProgram = data => {
  return (dispatch, getState) => {
    let link = links.ADD_PROGRAM;
    let body = {};
    body.data = JSON.stringify(data);
    axios
      .post(link, body, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        if (res.data.code === 1) {
          dispatch(onLoadPrograms());
          let chirp = {
            message: `Thêm chương trình thành công`,
            isRight: 1
          };
          dispatch(message.message(chirp));
          dispatch(addProgramSuccess(res));
        } else {
          let chirp = {
            message: `Thêm chương trình thất bại`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(addProgramError(res));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Thêm chương trình thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(addProgramError(err));
      });
  };
};

export const deleteProgramSuccess = successMessage => ({
  type: cst.DELETE_PROGRAM_SUCCESS,
  successMessage
});

export const deleteProgramError = errorMessage => ({
  type: cst.DELETE_PROGRAM_ERROR,
  errorMessage
});

export const onDeleteProgram = id => {
  return (dispatch, getState) => {
    let req = `${links.DELETE_PROGRAM}?idprogram=${id}`;
    axios
      .post(req)
      .then(res => {
        if (res.data.code === 1) {
          let chirp = {
            message: `Xóa chương trình thành công`,
            isRight: 1
          };
          dispatch(onLoadPrograms());
          dispatch(message.message(chirp));
          dispatch(deleteProgramSuccess(res));
        } else {
          let chirp = {
            message: `Xóa chương trình thất bại`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(deleteProgramError(res));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Xóa chương trình thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(deleteProgramError(err));
      });
  };
};
