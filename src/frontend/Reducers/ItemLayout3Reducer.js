import {ADD_DATA_LAYOUT_3, DELETE_DATA_LAYOUT_3, 
    SAVE_DATA_LAYOUT_3, SAVE_TEMP_DATA_LAYOUT_3, 
    SAVE_ALL_DATA_LAYOUT_3,
    IS_LOADED_3,
    ADD_ARRAY_LAYOUT_3,
    SAVE_LOG,
    SET_CDR} from '../Constant/ActionType';
import axios from 'axios';

const itemLayout3InitialState = {
    previewInfo: [
        // {objectName: "G1",
        //  description: "Làm việc ở mức độ cá nhân và cộng tác nhóm để trình bày một số báo cáo kỹ thuật theo mẫu cho trước trong lĩnh vực kỹ thuật phần mềm",
        //  standActs: ["2.2", "2.3.1"]
        // },
        // {objectName: "G2",
        //  description: "Giải thích được các thuật ngữ tiếng Anh thuộc chuyên ngành Kỹ thuật phần mềm",
        //  standActs: ["2.4.3", "2.4.5"]
        // },
        // {objectName: "G3",
        //  description: "Giải thích được các khái niệm cơ bản, thuật ngữ, trách nhiệm, công việc và nguyên tắc đạo đức cơ bản thuộc lĩnh vực Kỹ nghệ phần mềm",
        //  standActs: ["1.5", "3.3"]
        // },
        // {objectName: "G4",
        //  description: "Phân loại và so sánh được các loại tiến trình phát triển phần mềm khác nhau",
        //  standActs: ["1.3.6", "1.5"]
        // },
    ],
    tempInfo: {
        objectName: "",
        description: "",
        standActs: [],
    },
    isLoaded: false,
    logData: [],
    standActs: []
}
const ItemLayout3Reducer = (state = itemLayout3InitialState, action) => {
    switch (action.type) {
        case IS_LOADED_3: {
            return {
                ...state,
                isLoaded: action.idLoaded
            }
        }
        case ADD_DATA_LAYOUT_3: {
            return {
                ...state,
                previewInfo: [...state.previewInfo, JSON.parse(action.item)]
            }
        } 
        case ADD_ARRAY_LAYOUT_3: {
            return {
                ...state,
                previewInfo: action.item
            }
        }           
        case DELETE_DATA_LAYOUT_3: {
            state.previewInfo= state.previewInfo.filter((_, item) => item !== action.key)
            return {
                ...state,
                previewInfo: state.previewInfo
            }
        }             
        case SAVE_DATA_LAYOUT_3: {
            return {
                ...state, 
                previewInfo: action.data
            }
        }
            
        case SAVE_TEMP_DATA_LAYOUT_3:
            return {
                ...state,
                tempInfo: action.tempInfo
            }
        case SAVE_ALL_DATA_LAYOUT_3:
            axios.post('/save-data-3', { data: state.previewInfo, id: action.id })
            axios.post('/save-log', { data: state.logData })
            return {
                ...state
            }
        
            case SAVE_LOG: {
                if(action.muc_de_cuong === 'muc-tieu-mon-hoc'){
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
        case SET_CDR: {
            let arr = action.data;
            arr.forEach(element => {
                element.KeyRow = element.KeyRow.slice(0, element.KeyRow.length -1)
                element.KeyRow = element.KeyRow.replace(/-/g, ".")
            });
            return {
                ...state,
                standActs: arr
            }
        }
        default:
            return state
    }
}
export default ItemLayout3Reducer;