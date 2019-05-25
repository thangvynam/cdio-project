import * as types from "../constants";

export const infoOutcomeStandard = (state = {}, action) => {
  switch (action.type) {
    case types.LOAD_OUTCOMESTANDARD_SUCCESS:
      return action.infoOutcomeStandard;
    case types.LOAD_OUTCOMESTANDARD_ERROR:
      return {};
    default:
      return state;
  }
};
