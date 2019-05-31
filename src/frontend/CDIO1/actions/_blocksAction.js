import axios from "axios";
import * as cst from "../constants";
import * as links from "../constants/links";
import * as message from "./message";

export const loadBlocksSuccess = blocks => ({
  type: cst.LOAD_BLOCKS_SUCCESS,
  blocks
});

export const loadBlocksError = errorMessage => ({
  type: cst.LOAD_BLOCKS_ERROR,
  errorMessage
});

export const onLoadBlocks = idDetail => {
  return (dispatch, getState) => {
    let req = `${links.LOAD_BLOCKS}?id=${idDetail}`;
    axios
      .get(req)
      .then(res => {
        const blocks = res.data.data;
        if (blocks) {
          dispatch(loadBlocksSuccess(blocks));
        } else {
          let chirp = {
            message: `Chưa có dữ liệu`,
            isRight: 0
          };
          dispatch(message.message(chirp));
          dispatch(loadBlocksError(res));
        }
      })
      .catch(err => {
        let chirp = {
          message: `Tải danh sách khối kiến thức thất bại`,
          isRight: 0
        };
        dispatch(message.message(chirp));
        dispatch(loadBlocksError(err));
      });
  };
};
