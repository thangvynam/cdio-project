import * as types from "../constants";

export const infoEduProgram = (state = {}, action) => {
  switch (action.type) {
    case types.LOAD_EDUPROGRAM_SUCCESS:
      return action.infoEduProgram;
    case types.LOAD_EDUPROGRAM_ERROR:
      return {};
    default:
      return state;
  }
};
