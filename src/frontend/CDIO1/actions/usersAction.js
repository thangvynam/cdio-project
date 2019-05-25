import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as message from "./message";

export const logInSuccess = (user, successMessage) => ({
  type: cst.LOG_IN_SUCCESS,
  successMessage,
  user
});

export const logInError = errorMessage => ({
  type: cst.LOG_IN_ERROR,
  errorMessage
});

export const onLogIn = user => {
  return (dispatch, getState) => {
    let link = `${links.LOGIN}`;
    let params = {};
    params.data = JSON.stringify(user);
    axios
      .post(link, params, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        if (res.data.code === -1) {
          Promise.resolve(localStorage.removeItem("user")).then(() => {
            let chirp = {
              message: `Sai mật khẩu`,
              isRight: 0
            };
            dispatch(message.message(chirp));
            dispatch(logInError(res));
          });
        } else if (res.data.code === -3) {
          Promise.resolve(localStorage.removeItem("user")).then(() => {
            let chirp = {
              message: `Tài khoản chưa tồn tại`,
              isRight: 0
            };
            dispatch(message.message(chirp));
            dispatch(logInError(res));
          });
        } else if (res.data.code === 1) {
          Promise.resolve(
            localStorage.setItem("user", JSON.stringify(res.data.token))
          ).then(() => {
            let chirp = {
              message: `Đăng nhập thành công`,
              isRight: 1
            };
            dispatch(message.message(chirp));
            dispatch(logInSuccess(res.data, res));
          });
        }
      })
      .catch(err => {
        let chirp = {
          message: `Đăng nhập thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(logInError(err));
      });
  };
};

export const loadUsersSuccess = users => ({
  type: cst.LOAD_USERS_SUCCESS,
  users
});

export const loadUsersError = errorMessage => ({
  type: cst.LOAD_USERS_ERROR,
  errorMessage
});

export const onLoadUsers = () => {
  return (dispatch, getState) => {
    let req = links.LOAD_USERS;
    axios
      .get(req)
      .then(res => {
        const users = res.data.data;
        if (users === undefined || users === null) {
          let chirp = {
            message: `Chưa có dữ liệu`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(loadUsersError(res));
        } else {
          dispatch(loadUsersSuccess(users));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Tải người dùng thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(loadUsersError(err));
      });
  };
};
