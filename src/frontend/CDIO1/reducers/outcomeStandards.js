import * as types from "../constants";

export const outcomeStandards = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_OUTCOMESTANDARDS_SUCCESS:
      return [...action.outcomeStandards];
    case types.LOAD_OUTCOMESTANDARDS_ERROR:
      return [];
    default:
      return state;
  }
};
