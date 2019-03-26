import {ADD_DATA_LAYOUT_2, SAVE_DATA_LAYOUT_2, SAVE_TEMP_DATA_LAYOUT_2, SAVE_ALL_DATA_LAYOUT_2, IS_LOADED_2, SAVE_LOG} from '../Constant/ActionType';
import axios from 'axios';

const itemLayout2InitialState = {
    previewInfo: '',
    tempInfo: '',
    isLoaded: false,
    logData: [],
}
const ItemLayout2Reducer = (state = itemLayout2InitialState, action) => {
    switch (action.type) {
        case IS_LOADED_2: {
            return {
                ...state,
                isLoaded: action.idLoaded
            }
        }
        case ADD_DATA_LAYOUT_2: {
            return {
                ...state,
                previewInfo: action.description
            }
        }  
        case SAVE_DATA_LAYOUT_2: {
            return {
                ...state, 
                previewInfo: action.data[0].description               
            }
        }         
        case SAVE_TEMP_DATA_LAYOUT_2:
            return {
                ...state, tempInfo: action.description
            }
        case SAVE_ALL_DATA_LAYOUT_2:        
            axios.post('/save-data-2', { data: state.previewInfo, id: action.id })
            axios.post('/save-log', { data: state.logData })
            return {
                ...state
            }

        case SAVE_LOG: {
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
        }
        default:
            return state
    }
}
export default ItemLayout2Reducer;