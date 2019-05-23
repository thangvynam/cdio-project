import * as types from "../constants";

export const eduPrograms = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_EDUPROGRAMS_SUCCESS:
      return [...action.eduPrograms];
    case types.LOAD_EDUPROGRAMS_ERROR:
      return [];
    default:
      return state;
  }
};
