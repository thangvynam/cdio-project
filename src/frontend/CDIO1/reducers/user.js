import * as types from "../constants";

export const user = (state = {}, action) => {
  switch (action.type) {
    case types.GET_INFO_SUCCESS:
      return action.user;
    case types.GET_INFO_ERROR:
      return {};
    case types.LOG_OUT:
      return {};
    default:
      return state;
  }
};
