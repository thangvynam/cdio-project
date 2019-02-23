import { CHANGE_LEVEL_DATA } from '../Constant/ActionType';

const initialState = [{
    value: 'skill',
    label: 'skill',
    children: [
      {
        value: 'Đạt được',
        label: 'Đạt được',
      },
      {
        value: '1.2',
        label: '1.2',
      }
    ],
  }, {
    value: 'attitude',
    label: 'attitude',
    children: [{
      value: 'nanjing',
      label: 'Nanjing',
    }],
  }];
 
export default function changeLevelDataReducer(state = initialState, action) {

    switch(action.type) {
        case CHANGE_LEVEL_DATA:
        return action.leveldata;
        default: 
        return state;
    }
}