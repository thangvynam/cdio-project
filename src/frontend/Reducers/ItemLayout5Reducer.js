import axios from 'axios';

import {ADD_DATA,DELETE_DATA_LAYOUT_5,CHANGE_EDITSTATE_5,
        SAVE_DATA_LAYOUT_5,CHANGE_DATA,ADD_DATA_LAYOUT_5} from '../Constant/ActionType';

const itemMenuInitialState = {
    previewInfo: [
        {
            key: 1,
            titleName : "Giới thiệu & tổng quan kỹ nghệ phần mềm xem video #1,#2",
            teachingActs : ["Thuyết giảng", "Phân nhóm & chơi trò chơi"],
            standardOutput : ["G1.2","G2.1","G3.1","G3.2","G3.3","G3.4","G5.4"],
            evalActs : ["BTCN"],
        },
        {
            key: 2,
            titleName : "Quy trình phần mềm xem video #1,#2",
            teachingActs : ["Thuyết giảng","Thảo luận nhóm"],
            standardOutput : ["G2.1","G2.2","G4.1","G5.1"],
            evalActs : ["BTVN"],
        },
    ],
    changeEditStateState:'',
    titleName : '',
    teachingActs :[],
    standardOutput:[],
    evalActs:[],
    result:-1

}

const itemLayout5Reducer = (state = itemMenuInitialState, action) => {
    switch (action.type) {
        case ADD_DATA:
            return {
                ...state,
                previewInfo: [...state.previewInfo, JSON.parse(action.item)]
            }
        case DELETE_DATA_LAYOUT_5:
            if(state.previewInfo.length === 1){
                state.previewInfo = []
            } else {              
                state.previewInfo= state.previewInfo.filter(item => item.key !== action.key)
            }
            return {
                ...state,
                previewInfo: state.previewInfo
            }
        case CHANGE_EDITSTATE_5:
            return {...state,changeEditStateState:action.key}
        case SAVE_DATA_LAYOUT_5:
            return {
                ...state, 
                previewInfo: action.data,changeEditStateState:action.key
            }
        case CHANGE_DATA :
            return {
                ...state,
                titleName:action.titleName,
                teachingActs:action.teachingActs,
                standardOutput:action.standardOutput,
                evalActs:action.evalActs
            }
        case ADD_DATA_LAYOUT_5:{
            axios.post('/add-data-5', { data: state.previewInfo }).then(res => {
                console.log(res.data);
                return{
                    ...state,
                    result:1
                }
            })
            
        }
            
        default:
            return state
    }
}
export default itemLayout5Reducer;