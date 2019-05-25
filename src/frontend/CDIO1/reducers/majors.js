import * as types from "../constants";

export const majors = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_MAJORS_SUCCESS:
      return [...action.majors];
    case types.LOAD_MAJORS_ERROR:
      return [];
    default:
      return state;
  }
};
