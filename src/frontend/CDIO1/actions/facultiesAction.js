import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as message from "./message";

export const loadFacultiesSuccess = faculties => ({
  type: cst.LOAD_FACULTIES_SUCCESS,
  faculties: faculties
});

export const loadFacultiesError = errorMessage => ({
  type: cst.LOAD_FACULTIES_ERROR,
  errorMessage
});

export const onLoadFaculties = () => {
  return (dispatch, getState) => {
    let req = links.LOAD_FACULTIES;
    axios
      .get(req)
      .then(res => {
        const faculties = res.data.data;
        if (faculties === undefined || faculties === null) {
          let chirp = {
            message: `Chưa có dữ liệu`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(loadFacultiesError(res));
        } else {
          dispatch(loadFacultiesSuccess(faculties));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Tải các khoa thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(loadFacultiesError(err));
      });
  };
};

export const addFacultySuccess = successMessage => ({
  type: cst.ADD_FACULTY_SUCCESS,
  successMessage
});

export const addFacultyError = errorMessage => ({
  type: cst.ADD_FACULTY_ERROR,
  errorMessage
});

export const onAddFaculty = data => {
  return (dispatch, getState) => {
    let link = links.ADD_FACULTY;
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
          dispatch(onLoadFaculties());
          let chirp = {
            message: `Thêm khoa thành công`,
            isRight: 1
          };
          dispatch(message.message(chirp));
          dispatch(addFacultySuccess(res));
        } else {
          let chirp = {
            message: `Thêm khoa thất bại`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(addFacultyError(res));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Thêm khoa thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(addFacultyError(err));
      });
  };
};

export const deleteFacultySuccess = successMessage => ({
  type: cst.DELETE_FACULTY_SUCCESS,
  successMessage
});

export const deleteFacultyError = errorMessage => ({
  type: cst.DELETE_FACULTY_ERROR,
  errorMessage
});

export const onDeleteFaculty = id => {
  return (dispatch, getState) => {
    let req = `${links.DELETE_FACULTY}?idfaculty=${id}`;
    axios
      .post(req)
      .then(res => {
        if (res.data.code === 1) {
          let chirp = {
            message: `Xóa khoa thành công`,
            isRight: 1
          };
          dispatch(onLoadFaculties());
          dispatch(message.message(chirp));
          dispatch(deleteFacultySuccess(res));
        } else {
          let chirp = {
            message: `Xóa khoa thất bại`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(deleteFacultyError(res));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Xóa khoa thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(deleteFacultyError(err));
      });
  };
};
