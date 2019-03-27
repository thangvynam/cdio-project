import {
  ADD_ITEM_RULE,
  DELETE_ITEM_RULE,
  UPDATE_RULES,
  CHANGE_TEMP_RULES,
  CHANGE_ISLOADED_RULES,
  RESET_TAB
} from "../Constant/ActionType";

const initialState = {
  previewInfo: [
    {
      content:""
    },
  ],
  tempInfo:{
    content:'',
  },
  isLoaded:false
};


const itemLayout9Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_RULE:
      return {
        ...state,
        previewInfo: [...state.previewInfo, JSON.parse(action.data)]
      };
    case DELETE_ITEM_RULE: {
      return {
        ...state,
        previewInfo: state.previewInfo.filter((_, index) => index !== action.data)
      };
    }
    case UPDATE_RULES:
      return {
        ...state,
        previewInfo: action.data
      };
      case CHANGE_TEMP_RULES:{
        return{
          ...state,
          tempInfo:action.data
        }
      }
      case CHANGE_ISLOADED_RULES:{
        return{
          ...state,
          isLoaded:action.data
        }
      }
        case RESET_TAB:{
          return{
            ...state,
            isLoaded:false,
            tempInfo:initialState.tempInfo,
          }
          
        }
      

    default:
      return state;
  }
};
export default itemLayout9Reducer;
