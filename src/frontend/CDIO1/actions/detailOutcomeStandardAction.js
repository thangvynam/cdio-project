import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as message from "./message";
import * as logic from "../business";

export const saveDetailOutcomeStandardSuccess = (nodes, successMessage) => ({
  type: cst.SAVE_DETAIL_OUTCOMESTANDARD_SUCCESS,
  detailOutcomeStandard: nodes,
  successMessage
});

export const saveDetailOutcomeStandardError = (nodes, errorMessage) => ({
  type: cst.SAVE_DETAIL_OUTCOMESTANDARD_ERROR,
  detailOutcomeStandard: nodes,
  errorMessage
});

export const onSaveDetailOutcomeStandard = (data, nodes, id) => {
  return (dispatch, getState) => {
    if (id < 1) {
      let chirp = {
        message: `Lưu cây CĐR thất bại`,
        isRight: 0
      };
      dispatch(message.message(chirp));
      dispatch(
        saveDetailOutcomeStandardError(nodes,
          "Chưa có thông tin chuẩn đầu ra")
      );
    } else {
      let link = `${links.ADD_DETAIL_OUTCOMESTANDARD}?idoutcome=${id}`;
      axios
        .post(`${links.DELETE_DETAIL_OUTCOMESTANDARD}?idoutcome=${id}`)
        .then(res => {
          if (res.data.code === 1) {
            let params = {};
            params.data = JSON.stringify(data);
            return axios.post(link, params, {
              headers: {
                "Content-Type": "application/json"
              }
            });
          } else {
            let chirp = {
              message: `Lưu cây CĐR thất bại`,
              isRight: 0
            };
            dispatch(message.message(chirp));
            dispatch(saveDetailOutcomeStandardError(nodes, res));
          }
        })
        .then(res => {
          if (res.data.code === 1) {
            let chirp = {
              message: `Lưu cây CĐR thành công`,
              isRight: 1
            };
            dispatch(message.message(chirp));
            dispatch(saveDetailOutcomeStandardSuccess(nodes, res));
          } else {
            let chirp = {
              message: `Lưu cây CĐR thất bại`,
              isRight: 0
            };
            dispatch(message.message(chirp));
            dispatch(saveDetailOutcomeStandardError(nodes, res));
          }
        })
        .catch(err => {
          let chirp = {
            message: `Lưu cây CĐR thất bại`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(saveDetailOutcomeStandardError(nodes, err));
        });
    }
  };
};

export const loadDetailOutcomeStandardSuccess = detailOutcomeStandard => ({
  type: cst.LOAD_DETAIL_OUTCOMESTANDARD_SUCCESS,
  detailOutcomeStandard: detailOutcomeStandard
});

export const loadDetailOutcomeStandardError = errorMessage => ({
  type: cst.LOAD_DETAIL_OUTCOMESTANDARD_ERROR,
  errorMessage
});

export const onLoadDetailOutcomeStandard = id => {
  return (dispatch, getState) => {
    if (id < 1) {
      let chirp = {
        message: `Tải cây CĐR thất bại`,
        isRight: 0
      };
      dispatch(message.message(chirp));
      dispatch(loadDetailOutcomeStandardError("Chưa đủ dữ liệu"));
    } else {
      let req = `${links.LOAD_DETAIL_OUTCOMESTANDARD}?idoutcome=${id}`;
      axios
        .get(req)
        .then(res => {
          const data = res.data;
          if (data === undefined || data === null) {
            let chirp = {
              message: `Chưa có dữ liệu`,
              isRight: 0
            };
            dispatch(message.message(chirp));
            dispatch(loadDetailOutcomeStandardError(res));
          } else {
            let detailOutcomeStandard = logic.convertDBToTreeNode(data);
            dispatch(loadDetailOutcomeStandardSuccess(
              detailOutcomeStandard));
          }
        })
        .catch(err => {
          let chirp = {
            message: `Tải cây CĐR thất bại`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(loadDetailOutcomeStandardError(err));
        });
    }
  };
};
