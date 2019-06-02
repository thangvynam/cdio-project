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

// export const addTeacherSuccess = successMessage => ({
//   type: cst.ADD_TEACHER_SUCCESS,
//   successMessage
// });

// export const addTeacherError = errorMessage => ({
//   type: cst.ADD_TEACHER_ERROR,
//   errorMessage
// });

// export const onAddTeacher = data => {
//   return (dispatch, getState) => {
//     let link = `${links.ADD_TEACHER}?iduser=${data.iduser}&idsubject=${
//       data.idsubject
//     }&idsubjectblock=${data.idsubjectblock}`;
//     axios
//       .post(link, {
//         headers: {
//           "Content-Type": "application/json"
//         }
//       })
//       .then(res => {
//         if (res.data.code === 1) {
//           let chirp = {
//             message: `Phân công giáo viên thành công`,
//             isRight: 1
//           };
//           dispatch(message.message(chirp));
//           dispatch(addTeacherSuccess(res));
//         } else {
//           let chirp = {
//             message: `Phân công giáo viên thất bại`,
//             isRight: 0
//           };
//           dispatch(message.message(chirp));
//           dispatch(addTeacherError(res));
//         }
//         dispatch(onLoadBlocks(data.iddetail));
//       })
//       .catch(err => {
//         let chirp = {
//           message: `Phân công giáo viên thất bại`,
//           isRight: 0
//         };
//         dispatch(message.message(chirp));
//         dispatch(addTeacherError(err));
//         dispatch(onLoadBlocks(data.iddetail));
//       });
//   };
// };
