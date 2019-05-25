import * as types from "../constants";

export const targetEduProgram = (state = {}, action) => {
  switch (action.type) {
    case types.LOAD_TARGET_EDUPROGRAM_SUCCESS:
      return action.targetEduProgram;
    case types.LOAD_TARGET_EDUPROGRAM_ERROR:
      return [];
    default:
      return state;
  }
};
