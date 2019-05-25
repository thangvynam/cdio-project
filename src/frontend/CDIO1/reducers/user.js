import * as types from "../constants";

export const user = (state = {}, action) => {
  switch (action.type) {
    case types.LOG_IN_SUCCESS:
      return action.user;
    case types.LOG_IN_ERROR:
      return {};
    default:
      return state;
  }
};
