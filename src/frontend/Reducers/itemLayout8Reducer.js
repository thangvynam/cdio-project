import { ADD_TNDATA, CHANGE_TNDATA,SAVE_LOAI_TAI_NGUYEN,SAVE_TEMP_DATA_LAYOUT_8,SAVE_ALL_DATA_LAYOUT_8, IS_LOADED_8, CDR_DANHGIA, UPDATE_TNDATA } from '../Constant/ActionType';
import axios from 'axios';

const addTNDataState = {
    previewInfo: [],
    tempInfo: {
        loai : [],
        mota: "",
        link: "",
    },
    isLoaded: false,
    loaiTainguyen: [],
    changeTNDataState : {
        key: '',
        stt: '',
        loai: '',
        mota: '',
        link: ''
    },
    loaitainguyenState : [],
};


const itemLayout8Reducer = (state = addTNDataState, action) => {

    switch (action.type) {
        case ADD_TNDATA:{
            return{
                ...state,
                previewInfo: action.data,
            }
        }
        case UPDATE_TNDATA:{
            return{
                ...state,
                previewInfo : action.data,
            }
        }
        case CHANGE_TNDATA:{
            return{
                ...state,
                changeTNDataState: action.data,
            }
        }
        case SAVE_LOAI_TAI_NGUYEN:{
            return {
                ...state,
                loaitainguyenState: action.data
            }
        }
        case SAVE_TEMP_DATA_LAYOUT_8:{
            return {
                ...state,
                tempInfo : action.data
            }
        }
        case SAVE_ALL_DATA_LAYOUT_8 : {
           axios.post('/save-tainguyenmonhoc', { data: action.data })
            return {
                ...state,
            }
        }
        case IS_LOADED_8: {
            return{
                ...state,
                isLoaded : action.data
            }
        }
        
        default:
            return state;
    }
}

export default itemLayout8Reducer;