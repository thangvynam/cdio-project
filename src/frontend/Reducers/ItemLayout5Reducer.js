import axios from 'axios';

import {ADD_DATA, DELETE_DATA_LAYOUT_5, CHANGE_EDITSTATE_5,
        SAVE_DATA_LAYOUT_5, CHANGE_DATA, ADD_DATA_LAYOUT_5,
        COLLECT_DATA_REQUEST_5, COLLECT_DATA_HDD, COLLECT_DATA_DG,
        REFRESH_DATA, COLLECT_DATA_CDR} from '../Constant/ActionType';

const itemMenuInitialState = {
    previewInfo: [],
    changeEditStateState:'',
    titleName : '',
    teachingActs :[],
    standardOutput:[],
    evalActs:[],
    result:-1,
    teachingActsData : [],
    evalActsData : [],
    standardOutputData:[]
}

const itemLayout5Reducer = (state = itemMenuInitialState, action) => {
    switch (action.type) {
        case ADD_DATA : {
            if (state.previewInfo.length !== 0) {
                
                return {
                    ...state,
                    previewInfo: state.previewInfo.concat(action.data)
                }
            }
            
            return {
                ...state,
                previewInfo: action.data
            }
        }
            
        case REFRESH_DATA : {
            state.previewInfo = []
            
            return {
                ...state,
                previewInfo: state.previewInfo
            }
        }    

        case DELETE_DATA_LAYOUT_5 : {
            // if (state.previewInfo.length === 1) {
            //     state.previewInfo = []
            // } else {              
            //     state.previewInfo= state.previewInfo.filter(item => item.key !== action.key)
            // }

            // return {
            //     ...state,
            //     previewInfo: state.previewInfo
            // }

            let arrTemp = state.previewInfo;
            
            for (let index = 0; index < arrTemp.length; index++) {
                const element = arrTemp[index];
                
                if (element.key === action.key) {
                    element.del_flag = 1;
                }
            }
            
            return {
                ...state,
                previewInfo: arrTemp
            }
        }
            
        case CHANGE_EDITSTATE_5 :{
            return {...state,changeEditStateState:action.key}
        }
            
        case SAVE_DATA_LAYOUT_5:{
            return {
                ...state, 
                previewInfo: action.data,changeEditStateState:action.key
            }
        }
            
        case CHANGE_DATA : {
            return {
                ...state,
                titleName:action.titleName,
                teachingActs:action.teachingActs,
                standardOutput:action.standardOutput,
                evalActs:action.evalActs
            }
        }
            
        case ADD_DATA_LAYOUT_5 : {
            let temp = "";
            
            axios.post('/add-data-5', { data: state.previewInfo })
                .then(res => {
                    temp =res.data;
                })
                .then(()=>{
                    return{
                        ...state,
                        result:temp
                    }
            });

            return {...state};
        }

        case COLLECT_DATA_HDD : { 
            let arr = [];
            
            for (const obj of action.data) {
                arr.push(obj[0])
            }

            return {
                ...state,
                teachingActsData :arr
            }
        }

        case COLLECT_DATA_DG : {
            let arr = [];
            
            for (const obj of action.data) {
                arr.push(obj[1])
            }

            return {
                ...state,
                evalActsData :arr
            }
        }

        case COLLECT_DATA_CDR : {
            return {
                ...state,
                standardOutputData : action.data
            }
        }

        default:
            return state
    
    }
}
export default itemLayout5Reducer;