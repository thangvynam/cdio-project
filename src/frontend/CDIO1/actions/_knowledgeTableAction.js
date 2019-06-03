import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as message from "./message";

export const loadKnowledgeTableSuccess = knowledgeTables => ({
  type: cst.LOAD_TABLES_SUCCESS,
  knowledgeTables
});

export const loadKnowledgeTableError = errorMessage => ({
  type: cst.LOAD_TABLES_ERROR,
  errorMessage
});

export const onLoadKnowledgeTable = idDetail => {
  return (dispatch, getState) => {
    let req = `${links.LOAD_TABLES}?id=${idDetail}`;
    axios
      .get(req)
      .then(res => {
        const knowledgeTables = res.data.data;
        if (knowledgeTables) {
          dispatch(loadKnowledgeTableSuccess(knowledgeTables));
        } else {
          let chirp = {
            message: `Chưa có dữ liệu`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(loadKnowledgeTableError(res));
        }
      })
      .catch(err => {
        dispatch(loadKnowledgeTableError(err));
      });
  };
};
