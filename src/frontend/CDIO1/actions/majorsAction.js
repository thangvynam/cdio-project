import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as message from "./message";

export const loadMajorsSuccess = majors => ({
  type: cst.LOAD_MAJORS_SUCCESS,
  majors: majors
});

export const loadMajorsError = errorMessage => ({
  type: cst.LOAD_MAJORS_ERROR,
  errorMessage
});

export const onLoadMajors = () => {
  return (dispatch, getState) => {
    let req = links.LOAD_MAJORS;
    axios
      .get(req)
      .then(res => {
        const majors = res.data.data;
        if (majors === undefined || majors === null) {
          let chirp = {
            message: `Chưa có dữ liệu`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(loadMajorsError(res));
        } else {
          dispatch(loadMajorsSuccess(majors));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Tải các ngành thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(loadMajorsError(err));
      });
  };
};

export const addMajorSuccess = successMessage => ({
  type: cst.ADD_MAJOR_SUCCESS,
  successMessage
});

export const addMajorError = errorMessage => ({
  type: cst.ADD_MAJOR_ERROR,
  errorMessage
});

export const onAddMajor = data => {
  return (dispatch, getState) => {
    let link = links.ADD_MAJOR;
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
          dispatch(onLoadMajors());
          let chirp = {
            message: `Thêm ngành thành công`,
            isRight: 1
          };
          dispatch(message.message(chirp));
          dispatch(addMajorSuccess(res));
        } else {
          let chirp = {
            message: `Thêm ngành thất bại`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(addMajorError(res));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Thêm ngành thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(addMajorError(err));
      });
  };
};

export const deleteMajorSuccess = successMessage => ({
  type: cst.DELETE_MAJOR_SUCCESS,
  successMessage
});

export const deleteMajorError = errorMessage => ({
  type: cst.DELETE_MAJOR_ERROR,
  errorMessage
});

export const onDeleteMajor = id => {
  return (dispatch, getState) => {
    let req = `${links.DELETE_MAJOR}?idmajor=${id}`;
    axios
      .post(req)
      .then(res => {
        if (res.data.code === 1) {
          let chirp = {
            message: `Xóa ngành thành công`,
            isRight: 1
          };
          dispatch(onLoadMajors());
          dispatch(message.message(chirp));
          dispatch(deleteMajorSuccess(res));
        } else {
          let chirp = {
            message: `Xóa ngành thất bại`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(deleteMajorError(res));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Xóa ngành thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(deleteMajorError(err));
      });
  };
};
