import * as types from "../constants";

export const knowledgeTables = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_TABLES_SUCCESS:
      return action.knowledgeTables;
    case types.LOAD_TABLES_ERROR:
      return [];
    default:
      return state;
  }
};
