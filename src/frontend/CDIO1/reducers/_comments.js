import * as types from "../constants";

export const comments = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_COMMENT_SUCCESS:
      return action.comments;
    case types.LOAD_COMMENT_ERROR:
      return [];
    default:
      return state;
  }
};
