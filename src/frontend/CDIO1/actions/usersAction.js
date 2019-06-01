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

export const logOutSuccess = () => ({
  type: cst.LOG_OUT
});

export const onLogOut = () => {
  return (dispatch, getState) => {
    dispatch(logOutSuccess());
  };
};

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
            localStorage.setItem("user", JSON.stringify(res.data))
          ).then(() => {
            let chirp = {
              message: `Đăng nhập thành công`,
              isRight: 1
            };
            dispatch(message.message(chirp));
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
      .get(req, {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("user")
            ? "JWT " + JSON.parse(localStorage.getItem("user")).token
            : ""
        }
      })
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
          message: `Tải danh sách người dùng thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(loadUsersError(err));
      });
  };
};

export const registerUserSuccess = successMessage => ({
  type: cst.REGISTER_USER_SUCCESS,
  successMessage
});

export const registerUserError = errorMessage => ({
  type: cst.REGISTER_USER_ERROR,
  errorMessage
});

export const onRegisterUser = user => {
  return (dispatch, getState) => {
    let req = links.REGISTER_USER;
    let params = {};
    params.data = JSON.stringify(user);
    console.log(params.data);
    axios
      .post(req, params, {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("user")
            ? "JWT " + JSON.parse(localStorage.getItem("user")).token
            : ""
        }
      })
      .then(res => {
        if (res.data.code === -1) {
          dispatch(registerUserError(res));
          let chirp = {
            message: `Đăng kí thất bại`,
            isRight: 0
          };
          dispatch(message.message(chirp));
        } else if (res.data.code === -3) {
          dispatch(registerUserError(res));
          let chirp = {
            message: `Tên tài khoản đã tồn tại`,
            isRight: 0
          };
          dispatch(message.message(chirp));
        } else {
          dispatch(registerUserSuccess(res));
          let chirp = {
            message: `Đăng kí thành công`,
            isRight: 1
          };
          dispatch(message.message(chirp));
        }
        dispatch(onLoadUsers());
      })
      .catch(err => {
        dispatch(onLoadUsers());
        dispatch(registerUserError(err));
        let chirp = {
          message: `Đăng kí thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
      });
  };
};

export const changePassSuccess = successMessage => ({
  type: cst.CHANGE_PASS_SUCCESS,
  successMessage
});

export const changePassError = errorMessage => ({
  type: cst.CHANGE_PASS_ERROR,
  errorMessage
});

export const onChangePass = user => {
  return (dispatch, getState) => {
    let req = links.CHANGE_PASS;
    let params = {};
    params.data = JSON.stringify(user);
    axios
      .post(req, params, {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("user")
            ? "JWT " + JSON.parse(localStorage.getItem("user")).token
            : ""
        }
      })
      .then(res => {
        console.log(res);
        if (res.data.code === 1) {
          dispatch(changePassSuccess(res));
          let chirp = {
            message: `Thay đổi mật khẩu thành công`,
            isRight: 1
          };
          dispatch(message.message(chirp));
        } else {
          dispatch(changePassError(res));
          let chirp = {
            message: `Thay đổi mật khẩu thất bại`,
            isRight: 0
          };
          dispatch(message.message(chirp));
        }
      })
      .catch(err => {
        dispatch(changePassError(err));
        let chirp = {
          message: `Thay đổi mật khẩu thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
      });
  };
};

export const getInfoSuccess = (user, successMessage) => ({
  type: cst.GET_INFO_SUCCESS,
  successMessage,
  user
});

export const getInfoError = errorMessage => ({
  type: cst.GET_INFO_ERROR,
  errorMessage
});

export const onGetInfo = iduser => {
  return (dispatch, getState) => {
    let req = `${links.GET_INFO}?iduser=${iduser}`;
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
        const user = res.data.data;
        if (user) {
          dispatch(getInfoSuccess(user, res));
        } else {
          let chirp = {
            message: `Chưa có dữ liệu`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(getInfoError(res));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Tải người dùng thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(getInfoError(err));
      });
  };
};

export const deleteUserSuccess = successMessage => ({
  type: cst.DELETE_USER_SUCCESS,
  successMessage
});

export const deleteUserError = errorMessage => ({
  type: cst.DELETE_USER_ERROR,
  errorMessage
});

export const onDeleteUser = username => {
  return (dispatch, getState) => {
    let req = links.DELETE_USER;
    let params = {};
    params.data = JSON.stringify(username);
    axios
      .post(req, params, {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("user")
            ? "JWT " + JSON.parse(localStorage.getItem("user")).token
            : ""
        }
      })
      .then(res => {
        console.log(res)
        if (res.data.code === 1) {
          dispatch(deleteUserSuccess(res));
          let chirp = {
            message: `Xóa tài khoản thành công`,
            isRight: 1
          };
          dispatch(message.message(chirp));
        } else {
          dispatch(deleteUserError(res));
          let chirp = {
            message: `Xóa tài khoản thất bại`,
            isRight: 0
          };
          dispatch(message.message(chirp));
        }
        dispatch(onLoadUsers());
      })
      .catch(err => {
        dispatch(onLoadUsers());
        dispatch(deleteUserError(err));
        let chirp = {
          message: `Xóa tài khoản thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
      });
  };
};
