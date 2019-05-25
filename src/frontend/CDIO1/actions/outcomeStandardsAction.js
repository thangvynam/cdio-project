import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as message from "./message";

export const loadOutcomeStandardsSuccess = outcomeStandards => ({
  type: cst.LOAD_OUTCOMESTANDARDS_SUCCESS,
  outcomeStandards: outcomeStandards
});

export const loadOutcomeStandardsError = errorMessage => ({
  type: cst.LOAD_OUTCOMESTANDARDS_ERROR,
  errorMessage
});

export const onLoadOutcomeStandards = () => {
  return (dispatch, getState) => {
    let req = links.LOAD_OUTCOMESTANDARDS;
    axios
      .get(req)
      .then(res => {
        const outcomeStandards = res.data.data;
        if (outcomeStandards === undefined || outcomeStandards === null) {
          let chirp = {
            message: `Chưa có dữ liệu`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(loadOutcomeStandardsError(res));
        } else {
          dispatch(loadOutcomeStandardsSuccess(outcomeStandards));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Tải các CĐR thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(loadOutcomeStandardsError(err));
      });
  };
};

export const addOutcomeStandardSuccess = successMessage => ({
  type: cst.ADD_OUTCOMESTANDARD_SUCCESS,
  successMessage
});

export const addOutcomeStandardError = errorMessage => ({
  type: cst.ADD_OUTCOMESTANDARD_ERROR,
  errorMessage
});

export const onAddOutcomeStandard = data => {
  return (dispatch, getState) => {
    let link = `${links.ADD_OUTCOMESTANDARD}?DateCreated=${
      data.DateCreated
    }&DateEdited=${data.DateEdited}
    &IdFaculty=${data.IdFaculty}&IdProgram=${data.IdProgram}&IdUser=${
      data.IdUser
    }
    &NameOutcomeStandard=${data.NameOutcomeStandard}&SchoolYear=${
      data.SchoolYear
    }`;
    axios
      .post(link)
      .then(res => {
        if (res.data.code === 1) {
          dispatch(onLoadOutcomeStandards());
          let chirp = {
            message: `Tạo CĐR thành công`,
            isRight: 1
          };
          dispatch(message.message(chirp));
          dispatch(addOutcomeStandardSuccess(res));
        } else {
          let chirp = {
            message: `Tạo CĐR thất bại`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(addOutcomeStandardError(res));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Tạo CĐR thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(addOutcomeStandardError(err));
      });
  };
};

export const loadOutcomeStandardSuccess = infoOutcomeStandard => ({
  type: cst.LOAD_OUTCOMESTANDARD_SUCCESS,
  infoOutcomeStandard: infoOutcomeStandard
});

export const loadOutcomeStandardError = errorMessage => ({
  type: cst.LOAD_OUTCOMESTANDARD_ERROR,
  errorMessage
});

export const onLoadOutcomeStandard = id => {
  return (dispatch, getState) => {
    let req = `${links.LOAD_OUTCOMESTANDARD}?idoutcome=${id}`;
    axios
      .get(req)
      .then(res => {
        const infoOutcomeStandard = res.data.data;
        if (infoOutcomeStandard === undefined || infoOutcomeStandard ===
          null) {
          let chirp = {
            message: `Chưa có dữ liệu`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(loadOutcomeStandardError(res));
        } else {
          dispatch(loadOutcomeStandardSuccess(infoOutcomeStandard));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Tải thông tin CĐR thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(loadOutcomeStandardError(err));
      });
  };
};

export const deleteOutcomeStandardSuccess = successMessage => ({
  type: cst.DELETE_OUTCOMESTANDARD_SUCCESS,
  successMessage
});

export const deleteOutcomeStandardError = errorMessage => ({
  type: cst.DELETE_OUTCOMESTANDARD_ERROR,
  errorMessage
});

export const onDeleteOutcomeStandard = id => {
  return (dispatch, getState) => {
    let req = `${links.DELETE_OUTCOMESTANDARD}?idoutcome=${id}`;
    axios
      .post(req)
      .then(res => {
        if (res.data.code === 1) {
          let chirp = {
            message: `Xóa CĐR thành công`,
            isRight: 1
          };
          dispatch(onLoadOutcomeStandards());
          dispatch(message.message(chirp));
          dispatch(deleteOutcomeStandardSuccess(res));
        } else {
          let chirp = {
            message: `Xóa CĐR thất bại`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(deleteOutcomeStandardError(res));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Xóa CĐR thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(deleteOutcomeStandardError(err));
      });
  };
};
