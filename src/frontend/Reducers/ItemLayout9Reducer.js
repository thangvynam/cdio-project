import {
  ADD_ITEM_RULE,
  DELETE_ITEM_RULE,
  UPDATE_RULES,
  CHANGE_TEMP_RULES,
  CHANGE_ISLOADED_RULES
} from "../Constant/ActionType";
import axios from "axios";

const initialState = {
  previewInfo: [
    {
      content:
        "Sinh viên cần tuân thủ nghiêm túc các nội quy và quy định của Khoa và Trường."
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

    default:
      return state;
  }
};
export default itemLayout9Reducer;
