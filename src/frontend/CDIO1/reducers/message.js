import * as types from "../constants";

export const message = (state = {}, action) => {
  switch (action.type) {
    case types.MESSAGE:
      return action.message;
    default:
      return state;
  }
};
