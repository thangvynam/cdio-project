import * as types from "../constants";

export const faculties = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_FACULTIES_SUCCESS:
      return [...action.faculties];
    case types.LOAD_FACULTIES_ERROR:
      return [];
    default:
      return state;
  }
};
