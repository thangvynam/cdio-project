import * as types from "../constants";

export const subjects = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_SUBJECTS_SUCCESS:
      return [...action.subjects];
    case types.LOAD_SUBJECTS_ERROR:
      return [];
    default:
      return state;
  }
};
