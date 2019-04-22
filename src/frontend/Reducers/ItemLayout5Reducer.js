import axios from 'axios';

import {ADD_DATA, DELETE_DATA_LAYOUT_5, CHANGE_EDITSTATE_5,
        SAVE_DATA_LAYOUT_5, CHANGE_DATA, ADD_DATA_LAYOUT_5,
        COLLECT_DATA_REQUEST_5, COLLECT_DATA_HDD, COLLECT_DATA_DG,
        REFRESH_DATA, COLLECT_DATA_CDR} from '../Constant/ActionType';

const itemMenuInitialState = {
    previewInfo: [
        // {
        //     key: 1,
        //     titleName : "Giới thiệu & tổng quan kỹ nghệ phần mềm xem video #1,#2",
        //     teachingActs : ["Thuyết giảng", "Phân nhóm & chơi trò chơi"],
        //     standardOutput : ["G1.2","G2.1","G3.1","G3.2","G3.3","G3.4","G5.4"],
        //     evalActs : ["BTCN"],
        // },
        // {
        //     key: 2,
        //     titleName : "Quy trình phần mềm xem video #1,#2",
        //     teachingActs : ["Thuyết giảng","Thảo luận nhóm"],
        //     standardOutput : ["G2.1","G2.2","G4.1","G5.1"],
        //     evalActs : ["BTVN"],
        // },
    ],
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
            if (state.previewInfo.length === 1) {
                state.previewInfo = []
            } else {              
                state.previewInfo= state.previewInfo.filter(item => item.key !== action.key)
            }

            return {
                ...state,
                previewInfo: state.previewInfo
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

        case COLLECT_DATA_REQUEST_5 : {
            // let newArr = [];
            // axios.get('/collect-data-5')
            // .then(function (response) {
            //     //for(let i = 0; i <response.data.length;i++){
            //         let data = {
            //             // key : response.data[i].id,
            //             // titleName : response.data[i].ten_chu_de,
            //             //key : response.data[i].hoat_dong,
            //             key: 1,
            //             titleName : "Quy trình phần mềm xem video #1,#2",
            //             teachingActs : ["Thuyết giảng","Thảo luận nhóm"],
            //             standardOutput : ["G2.1","G2.2","G4.1","G5.1"],
            //             evalActs : ["BTVN"]
            //         }
            //         newArr.push(data); 
            //         console.log(newArr)
            //         return{
            //             ...state,
            //             previewInfo: newArr
            //         }
            //     //}  
            // })
            // .catch(function (error) {
            //     console.log(error);
            // })
            // .finally(function(){
            //     console.log(state.previewInfo)
            // })
        }
        default:
            return state
    
    }
}
export default itemLayout5Reducer;