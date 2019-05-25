import * as types from "../constants";

export const programs = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_PROGRAMS_SUCCESS:
      return [...action.programs];
    case types.LOAD_PROGRAMS_ERROR:
      return [];
    default:
      return state;
  }
};
