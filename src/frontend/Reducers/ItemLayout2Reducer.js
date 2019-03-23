import {ADD_DATA_LAYOUT_2, SAVE_DATA_LAYOUT_2, SAVE_TEMP_DATA_LAYOUT_2, SAVE_ALL_DATA_LAYOUT_2, IS_LOADED_2} from '../Constant/ActionType';
import axios from 'axios';

const itemLayout2InitialState = {
    previewInfo: '',
    tempInfo: '',
    isLoaded: false
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
            // axios.post('/add-data-2', { data: action.description })
            return {
                ...state,
                previewInfo: action.description
            }
        }  
        case SAVE_DATA_LAYOUT_2: {
            // axios.post('/save-data-2', { data: action.data[0].description })
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
            return {
                ...state
            }
        default:
            return state
    }
}
export default ItemLayout2Reducer;