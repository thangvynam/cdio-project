import * as types from "../constants";

export const blocks = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_BLOCKS_SUCCESS:
      return action.blocks;
    case types.LOAD_BLOCKS_ERROR:
      return [];
    default:
      return state;
  }
};
