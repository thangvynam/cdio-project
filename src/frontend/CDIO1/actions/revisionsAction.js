import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as message from "./message";

export const loadRevisionsSuccess = revisions => ({
  type: cst.LOAD_REVISIONS_SUCCESS,
  revisions: revisions
});

export const loadRevisionsError = errorMessage => ({
  type: cst.LOAD_REVISIONS_ERROR,
  errorMessage
});

export const onLoadRevisions = idOutcomeStandard => {
  return (dispatch, getState) => {
    let req = `${links.LOAD_REVISIONS}?idoutcome=${idOutcomeStandard}`;
    axios
      .get(req)
      .then(res => {
        const revisions = res.data.data;
        if (revisions === undefined || revisions === null) {
          let chirp = {
            message: `Chưa có dữ liệu`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(loadRevisionsError(res));
        } else {
          dispatch(loadRevisionsSuccess(revisions));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Tải các phiên bản thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(loadRevisionsError(err));
      });
  };
};

export const deleteRevisionSuccess = (successMessage, nodes) => ({
  type: cst.DELETE_REVISION_SUCCESS,
  detailOutcomeStandard: nodes,
  successMessage
});

export const deleteRevisionError = errorMessage => ({
  type: cst.DELETE_REVISION_ERROR,
  errorMessage
});

export const onDeleteRevision = (idRevision, idOutcome, nodes) => {
  return (dispatch, getState) => {
    if (idOutcome < 1) {
      let chirp = {
        message: `Xóa phiên bản thất bại`,
        isRight: 0
      };
      dispatch(message.message(chirp));
      dispatch(deleteRevisionError("Chưa đủ dữ liệu"));
    } else {
      let req = `${links.DELETE_REVISION}?idrevision=${idRevision}`;
      axios
        .post(req)
        .then(res => {
          if (res.data.code === 1) {
            let chirp = {
              message: `Xóa phiên bản thành công`,
              isRight: 1
            };
            dispatch(onLoadRevisions(idOutcome));
            dispatch(message.message(chirp));
            dispatch(deleteRevisionSuccess(res, nodes));
          } else {
            let chirp = {
              message: `Xóa phiên bản thất bại`,
              isRight: 0
            };
            dispatch(message.message(chirp));
            dispatch(deleteRevisionError(res));
          }
        })
        .catch(err => {
          let chirp = {
            message: `Xóa phiên bản thất bại`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(deleteRevisionError(err));
        });
    }
  };
};
