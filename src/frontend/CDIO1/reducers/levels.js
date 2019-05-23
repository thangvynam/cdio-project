import * as types from "../constants";

export const levels = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_LEVELS_SUCCESS:
      return [...action.levels];
    case types.LOAD_LEVELS_ERROR:
      return [];
    default:
      return state;
  }
};
