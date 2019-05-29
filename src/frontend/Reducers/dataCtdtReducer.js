import { DATA_CTDT, ISLOADED_DATA_CTDT } from '../Constant/ActionType';


const initialState = {
    data: [],
    isLoaded: false
}


export function dataCtdtReducer(state = initialState, action) {

    switch(action.type) {
        case DATA_CTDT:
            return {...state,
                data: action.data 
            };
        case ISLOADED_DATA_CTDT:
            return {...state,
                isLoaded: action.data 
            };
        default: 
        return state;
    }
}