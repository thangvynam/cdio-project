import { SAVE_LOG,ADD_TNDATA, CHANGE_TNDATA,SAVE_LOAI_TAI_NGUYEN,SAVE_TEMP_DATA_LAYOUT_8, IS_LOADED_8, UPDATE_TNDATA } from '../Constant/ActionType';

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
    loaitainguyen : [],
    logData: [],

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
                loaitainguyen: action.data
            }
        }
        case SAVE_TEMP_DATA_LAYOUT_8:{
            return {
                ...state,
                tempInfo : action.data
            }
        }
        
        case IS_LOADED_8: {
            return{
                ...state,
                isLoaded : action.data
            }
        }
        case SAVE_LOG: {
            if(action.muc_de_cuong === 'tai-nguyen-mon-hoc'){
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
            else return {...state}
            
        }
        
        default:
            return state;
    }
}

export default itemLayout8Reducer;