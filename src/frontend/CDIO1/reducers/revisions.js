import * as types from "../constants";

export const revisions = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_REVISIONS_SUCCESS:
      return [...action.revisions];
    case types.LOAD_REVISIONS_ERROR:
      return [];
    default:
      return state;
  }
};
