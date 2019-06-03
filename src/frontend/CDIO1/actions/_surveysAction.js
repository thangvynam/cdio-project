import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as message from "./message";

export const loadSurveysSuccess = surveys => ({
  type: cst.LOAD_SURVEYS_SUCCESS,
  surveys
});

export const loadSurveysError = errorMessage => ({
  type: cst.LOAD_SURVEYS_ERROR,
  errorMessage
});

export const onLoadSurveys = idoutcome => {
  return (dispatch, getState) => {
    let req = `${links.LOAD_SURVEYS}?idoutcome=${idoutcome}`;
    axios
      .get(req)
      .then(res => {
        const surveys = res.data.data;
        if (surveys) {
          dispatch(loadSurveysSuccess(surveys));
        } else {
          let chirp = {
            message: `Chưa có dữ liệu`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(loadSurveysError(res));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Tải danh sách khảo sát thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(loadSurveysError(err));
      });
  };
};

export const onAddSurvey = data => {
  return (dispatch, getState) => {
    let link = `${links.ADD_SURVEY}?iduser=${data.iduser}&idoutcome=${data.idoutcome}`;
    let params = {};
    params.data = JSON.stringify(data);
    axios
      .post(link, params, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        if (res.data.code === 1) {
          dispatch(onLoadSurveys(data.idoutcome));
          let chirp = {
            message: `Thêm khảo sát thành công`,
            isRight: 1
          };
          dispatch(message.message(chirp));
        } else {
          let chirp = {
            message: `Thêm khảo sát thất bại`,
            isRight: 0
          };
          dispatch(message.message(chirp));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Thêm khảo sát thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
      });
  };
};
