import * as types from "../constants";

export const contentList = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_CONTENT_LIST_SUCCESS:
      return action.contentList;
    case types.LOAD_CONTENT_LIST_ERROR:
      return [];
    default:
      return state;
  }
};
