import {
  ADD_ITEM_RULE,
  DELETE_ITEM_RULE,
  UPDATE_RULES,
  CHANGE_TEMP_RULES,
  CHANGE_ISLOADED_RULES,
  RESET_TAB,
  SAVE_LOG
} from "../Constant/ActionType";

const initialState = {
  previewInfo: [
    {
      id: "",
      content:"",
      del_flag:0,
    },
  ],
  tempInfo:{
    content:'',
  },
  isLoaded:false,
  logData: [],

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
        case SAVE_LOG: {
          
          if(action.muc_de_cuong === 'quy-dinh-chung'){
              let obj = {
                  ten: action.ten,
                  timestamp: action.timestamp,
                  noi_dung: action.noi_dung,
                  muc_de_cuong: action.muc_de_cuong,
                  thong_tin_chung_id: action.thong_tin_chung_id
              }
              return {
                  ...state,
                  logData: [...state.logData, obj]
              }
          }else{
              return {...state,}
          }
      }

    default:
      return state;
  }
};
export default itemLayout9Reducer;
