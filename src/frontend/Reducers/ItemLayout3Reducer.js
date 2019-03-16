import {ADD_DATA_LAYOUT_3, DELETE_DATA_LAYOUT_3, SAVE_DATA_LAYOUT_3, SAVE_TEMP_DATA_LAYOUT_3} from '../Constant/ActionType';
import axios from 'axios';

const itemLayout3InitialState = {
    previewInfo: [
        {objectName: "G1",
         description: "Làm việc ở mức độ cá nhân và cộng tác nhóm để trình bày một số báo cáo kỹ thuật theo mẫu cho trước trong lĩnh vực kỹ thuật phần mềm",
         standActs: ["2.2", "2.3.1"]
        },
        {objectName: "G2",
         description: "Giải thích được các thuật ngữ tiếng Anh thuộc chuyên ngành Kỹ thuật phần mềm",
         standActs: ["2.4.3", "2.4.5"]
        },
        {objectName: "G3",
         description: "Giải thích được các khái niệm cơ bản, thuật ngữ, trách nhiệm, công việc và nguyên tắc đạo đức cơ bản thuộc lĩnh vực Kỹ nghệ phần mềm",
         standActs: ["1.5", "3.3"]
        },
        {objectName: "G4",
         description: "Phân loại và so sánh được các loại tiến trình phát triển phần mềm khác nhau",
         standActs: ["1.3.6", "1.5"]
        },
    ],
    tempInfo: {
        objectName: "",
        description: "",
        standActs: [],
    }
}
const ItemLayout3Reducer = (state = itemLayout3InitialState, action) => {
    switch (action.type) {
        case ADD_DATA_LAYOUT_3: {
            axios.post('/add-data-3', { data: action.item })
            return {
                ...state,
                previewInfo: [...state.previewInfo, JSON.parse(action.item)]
            }
        }           
        case DELETE_DATA_LAYOUT_3: {
            axios.post('/delete-data-3', { data: state.previewInfo[action.key] })
            state.previewInfo= state.previewInfo.filter((_, item) => item !== action.key)
            return {
                ...state,
                previewInfo: state.previewInfo
            }
        }             
        case SAVE_DATA_LAYOUT_3: {
            axios.post('/save-data-3', { data: action.data[action.key] })            
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
        default:
            return state
    }
}
export default ItemLayout3Reducer;