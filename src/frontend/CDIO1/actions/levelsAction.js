import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as message from "./message";

export const loadLevelsSuccess = levels => ({
  type: cst.LOAD_LEVELS_SUCCESS,
  levels: levels
});

export const loadLevelsError = errorMessage => ({
  type: cst.LOAD_LEVELS_ERROR,
  errorMessage
});

export const onLoadLevels = () => {
  return (dispatch, getState) => {
    let req = links.LOAD_LEVELS;
    axios
      .get(req)
      .then(res => {
        const levels = res.data.data;
        if (levels === undefined || levels === null) {
          let chirp = {
            message: `Chưa có dữ liệu`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(loadLevelsError(res));
        } else {
          dispatch(loadLevelsSuccess(levels));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Tải các trình độ thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(loadLevelsError(err));
      });
  };
};

export const addLevelSuccess = successMessage => ({
  type: cst.ADD_LEVEL_SUCCESS,
  successMessage
});

export const addLevelError = errorMessage => ({
  type: cst.ADD_LEVEL_ERROR,
  errorMessage
});

export const onAddLevel = data => {
  return (dispatch, getState) => {
    let link = links.ADD_LEVEL;
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
          dispatch(onLoadLevels());
          let chirp = {
            message: `Thêm trình độ thành công`,
            isRight: 1
          };
          dispatch(message.message(chirp));
          dispatch(addLevelSuccess(res));
        } else {
          let chirp = {
            message: `Thêm trình độ thất bại`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(addLevelError(res));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Thêm trình độ thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(addLevelError(err));
      });
  };
};

export const deleteLevelSuccess = successMessage => ({
  type: cst.DELETE_LEVEL_SUCCESS,
  successMessage
});

export const deleteLevelError = errorMessage => ({
  type: cst.DELETE_LEVEL_ERROR,
  errorMessage
});

export const onDeleteLevel = id => {
  return (dispatch, getState) => {
    let req = `${links.DELETE_LEVEL}?idlevel=${id}`;
    axios
      .post(req)
      .then(res => {
        if (res.data.code === 1) {
          let chirp = {
            message: `Xóa trình độ thành công`,
            isRight: 1
          };
          dispatch(onLoadLevels());
          dispatch(message.message(chirp));
          dispatch(deleteLevelSuccess(res));
        } else {
          let chirp = {
            message: `Xóa trình độ thất bại`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(deleteLevelError(res));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Xóa trình độ thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(deleteLevelError(err));
      });
  };
};
