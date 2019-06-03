import * as types from "../constants";

export const surveys = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_SURVEYS_SUCCESS:
      return action.surveys;
    case types.LOAD_SURVEYS_ERROR:
      return [];
    default:
      return state;
  }
};
