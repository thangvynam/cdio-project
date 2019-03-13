import { ADD_ITEM_KHGDTH, UPDATE_KHGDTH, CHANGE_TEMP_KHGDTH } from '../Constant/ActionType';

const initialState = {
    previewInfo: [
        {
            key: 1,
            titleName : "Giới thiệu môn học và môi trường làm việc",
            teachingActs : ["Thuyết giảng", "Demo"],
            standardOutput : ["G1.2","G2.2"],
            evalActs : ["BTCN"],
        },
        {
            key: 2,
            titleName : "Quy trình phần mềm",
            teachingActs : ["Thảo luận và trả lời thắc mắc trên diễn đàn môn học"],
            standardOutput : ["G1.2","G2.2"],
            evalActs : ["BTCN"],
        },
        {
            key: 3,
            titleName : "Yêu cầu phần mềm",
            teachingActs : ["Thảo luận và trả lời thắc mắc trên diễn đàn môn học"],
            standardOutput : ["G1.3","G2.1"],
            evalActs : ["BTCN"],
        }
    ],
    tempInfo :{
        titleName : '',
        teachingActs : [],
        standardOutput : [],
        evalActs : [],
    }
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
        default:
            return state
    }
}
export default itemLayout6Reducer;