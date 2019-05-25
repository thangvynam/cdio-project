import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as message from "./message";
import {
  onLoadRevisions
} from "./revisionsAction";
import * as logic from "../business";

export const addDetailRevisionSuccess = (nodes, successMessage) => ({
  type: cst.ADD_DETAIL_REVISION_SUCCESS,
  detailOutcomeStandard: nodes,
  successMessage
});

export const addDetailRevisionError = (nodes, errorMessage) => ({
  type: cst.ADD_DETAIL_REVISION_ERROR,
  detailOutcomeStandard: nodes,
  errorMessage
});

export const onAddDetailRevision = (data, nodes, info) => {
  return (dispatch, getState) => {
    let link1 = `${links.ADD_REVISION}?idoutcome=${info.idoutcome}
    &iduser=${info.iduser}&name=${info.name}&dateupdated=${info.dateupdated}`;
    axios
      .post(link1)
      .then(res => {
        if (res.data.code === 1) {
          let params = {};
          params.data = JSON.stringify(data);
          let link2 = `${links.ADD_DETAIL_REVISION}?idrevision=${
            res.data.data.Id
          }`;
          return axios.post(link2, params, {
            headers: {
              "Content-Type": "application/json"
            }
          });
        } else {
          let chirp = {
            message: `Thêm phiên bản của cây CĐR thất bại`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(addDetailRevisionError(nodes, res));
        }
      })
      .then(res => {
        if (res.data.code === 1) {
          let chirp = {
            message: `Thêm phiên bản của cây CĐR thành công`,
            isRight: 1
          };
          dispatch(message.message(chirp));
          dispatch(onLoadRevisions(info.idoutcome));
          dispatch(addDetailRevisionSuccess(nodes, res));
        } else {
          let chirp = {
            message: `Thêm phiên bản của cây CĐR thất bại`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(addDetailRevisionError(nodes, res));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Thêm phiên bản của cây CĐR thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(addDetailRevisionError(nodes, err));
      });
  };
};

export const loadDetailRevisionSuccess = detailRevision => ({
  type: cst.LOAD_DETAIL_REVISION_SUCCESS,
  detailOutcomeStandard: detailRevision
});

export const loadDetailRevisionError = errorMessage => ({
  type: cst.LOAD_DETAIL_REVISION_ERROR,
  errorMessage
});

export const onLoadDetailRevision = id => {
  return (dispatch, getState) => {
    let req = `${links.LOAD_DETAIL_REVISION}?idrevision=${id}`;
    axios
      .get(req)
      .then(res => {
        const data = res.data.data;
        if (data === undefined || data === null) {
          let chirp = {
            message: `Chưa có dữ liệu`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(loadDetailRevisionError(res));
        } else {
          let detailRevision = logic.convertDBToTreeNode(data);
          dispatch(loadDetailRevisionSuccess(detailRevision));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Tải phiên bản của cây CĐR thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(loadDetailRevisionError(err));
      });
  };
};
