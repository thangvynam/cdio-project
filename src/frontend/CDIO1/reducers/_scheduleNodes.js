import * as types from "../constants";

export const scheduleNodes = (state = [], action) => {
  switch (action.type) {
    case types.LOAD_SCHEDULE_EDUPROGRAM_SUCCESS:
      return action.scheduleNodes;
    case types.LOAD_SCHEDULE_EDUPROGRAM_ERROR:
      return [];
    case types.SAVE_SCHEDULE_EDUPROGRAM_ERROR:
      return action.scheduleNodes;
    default:
      return state;
  }
};
