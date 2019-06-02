import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as message from "./message";

export const loadCommentSuccess = comments => ({
  type: cst.LOAD_COMMENT_SUCCESS,
  comments
});

export const loadCommentError = errorMessage => ({
  type: cst.LOAD_COMMENT_ERROR,
  errorMessage
});

export const onLoadComments = idoutcome => {
  return (dispatch, getState) => {
    let req = `${links.LOAD_COMMENT}?idoutcome=${idoutcome}`;
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
        const comments = res.data.data;
        if (comments) {
          dispatch(loadCommentSuccess(comments));
        } else {
          let chirp = {
            message: `Chưa có dữ liệu`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(loadCommentError(res));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Tải các bình luận thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(loadCommentError(err));
      });
  };
};

export const addCommentSuccess = successMessage => ({
  type: cst.ADD_COMMENT_SUCCESS,
  successMessage
});

export const addCommentError = errorMessage => ({
  type: cst.ADD_COMMENT_ERROR,
  errorMessage
});

export const onAddComment = data => {
  return (dispatch, getState) => {
    let link = links.ADD_COMMENT;
    // data.IdOutcome = Number(data.idoutcome);
    // data.KeyRow = body.keyrow;
    // data.IdUser = Number(body.iduser);
    // data.Content = body.content;
    // data.CommentDate = body.date;
    let params = {};
    params.data = JSON.stringify(data);
    axios
      .post(link, params, {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("user")
            ? "JWT " + JSON.parse(localStorage.getItem("user")).token
            : ""
        }
      })
      .then(res => {
        if (res.data.code === 1) {
          let chirp = {
            message: `Thêm bình luận thành công`,
            isRight: 1
          };
          dispatch(message.message(chirp));
          dispatch(addCommentSuccess(res));
        } else {
          let chirp = {
            message: `Thêm bình luận thất bại`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(addCommentError(res));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Thêm bình luận thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(addCommentError(err));
      });
  };
};

export const doneCommentSuccess = successMessage => ({
  type: cst.DONE_COMMENT_SUCCESS,
  successMessage
});

export const doneCommentError = errorMessage => ({
  type: cst.DONE_COMMENT_ERROR,
  errorMessage
});

export const onDoneComment = data => {
  return (dispatch, getState) => {
    let link = links.DONE_COMMENT;
    let params = {};
    params.data = JSON.stringify(data);
    axios
      .post(link, params, {
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("user")
            ? "JWT " + JSON.parse(localStorage.getItem("user")).token
            : ""
        }
      })
      .then(res => {
        if (res.data.code === 1) {
          dispatch(doneCommentSuccess(res));
        } else {
          dispatch(doneCommentError(res));
        }
      })
      .catch(err => {
        dispatch(doneCommentError(err));
      });
  };
};
