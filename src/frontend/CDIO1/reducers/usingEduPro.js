import * as types from "../constants";

export const usingEduPro = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_USING_EDUPRO_SUCCESS:
      return [...action.usingEduPro];
    case types.LOAD_USING_EDUPRO_ERROR:
      return [];
    default:
      return state;
  }
};
