import * as types from "../constants";

export const users = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_USERS_SUCCESS:
      return [...action.users];
    case types.LOAD_USERS_ERROR:
      return [];
    default:
      return state;
  }
};
