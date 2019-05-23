import { SAVE_LOG,ADD_ITEM_KHGDTH, UPDATE_KHGDTH, CHANGE_TEMP_KHGDTH, CHANGE_MAP_KHGDTH, CHANGE_ISLOADED_KHTH,RESET_TAB } from '../Constant/ActionType';

const initialState = {
    previewInfo: [
        // {
        //     key: 1,
        //     titleName : "Giới thiệu môn học và môi trường làm việc",
        //     teachingActs : ["Thuyết giảng", "Demo"],
        //     standardOutput : ["G1.2","G2.2"],
        //     evalActs : ["BTTL#1"],
        // },
        // {
        //     key: 2,
        //     titleName : "Quy trình phần mềm",
        //     teachingActs : ["Thảo luận và trả lời thắc mắc trên diễn đàn môn học"],
        //     standardOutput : ["G1.2","G2.2"],
        //     evalActs : ["BTVN#1"],
        // },
        // {
        //     key: 3,
        //     titleName : "Yêu cầu phần mềm",
        //     teachingActs : ["Thảo luận và trả lời thắc mắc trên diễn đàn môn học"],
        //     standardOutput : ["G1.3","G2.1"],
        //     evalActs : ["DAMH#1"],
        // }
    ],
    tempInfo :{
        titleName : '',
        teachingActs : [],
        standardOutput : [],
        evalActs : [],
    },
    mapIdForValue:{
        teachingActs: new Map(),
        standardOutput:new Map(),
        evalActs: new Map(),
    },
    isLoaded:false,
    logData: [],

}
const itemLayout6Reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM_KHGDTH:
            return {
                ...state,
                previewInfo: [...state.previewInfo, JSON.parse(action.data)]
            }
            case UPDATE_KHGDTH:
            return {
              ...state,
              previewInfo: action.data
            };
            case CHANGE_TEMP_KHGDTH:{
                return {
                    ...state,
                    tempInfo:action.data
                }
            }
            case CHANGE_MAP_KHGDTH:{
               return{
                   ...state,
                   mapIdForValue:action.data
               }
            }
            case CHANGE_ISLOADED_KHTH:{
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
                  mapIdForValue:initialState.mapIdForValue,
                }
                
              }
              case SAVE_LOG: {
                if(action.muc_de_cuong === 'giang-day-thuc-hanh'){
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
            return state
    }
}
export default itemLayout6Reducer;