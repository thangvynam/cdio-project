import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as message from "./message";

export const loadContentListSuccess = contentList => ({
  type: cst.LOAD_CONTENT_LIST_SUCCESS,
  contentList
});

export const loadContentListError = errorMessage => ({
  type: cst.LOAD_CONTENT_LIST_ERROR,
  errorMessage
});

export const onLoadContentList = id => {
  return (dispatch, getState) => {
    console.log(id)
    let req = `${links.LOAD_CONTENT_LIST}?id=${id}`;
    axios
      .get(req)
      .then(res => {
        const contentList = res.data.data;
        if (contentList) {
          dispatch(loadContentListSuccess(contentList));
        } else {
          let chirp = {
            message: `Chưa có dữ liệu`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(loadContentListError(res));
        }
      })
      .catch(err => {
        dispatch(loadContentListError(err));
      });
  };
};
