import * as types from "../constants";

export const targetNodes = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_TARGET_EDUPROGRAM_SUCCESS:
      return action.targetNodes;
    case types.LOAD_TARGET_EDUPROGRAM_ERROR:
      return [];
    case types.SAVE_TARGET_EDUPROGRAM_ERROR:
      return action.targetNodes;
    default:
      return state;
  }
};
