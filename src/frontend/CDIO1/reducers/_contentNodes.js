import * as types from "../constants";

export const contentNodes = (state = {}, action) => {
  switch (action.type) {
    case types.LOAD_CONTENT_EDUPROGRAM_SUCCESS:
      return action.contentNodes;
    case types.LOAD_CONTENT_EDUPROGRAM_ERROR:
      return {};
    default:
      return state;
  }
};
