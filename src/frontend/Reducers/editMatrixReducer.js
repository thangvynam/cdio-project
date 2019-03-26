import { EDIT_MATRIX, EDIT_MATRIX_EDIT_STATE, ISLOAD_EDIT_MATRIX } from '../Constant/ActionType';
const initialData = [];

export function editMatrixReducer(state = initialData, action) {

    switch(action.type) {
        case EDIT_MATRIX:
        return action.editmatrix;
        default: 
        return state;
    }
}

const initialEditState = "";

export function editMatrixEditStateReducer(state = initialEditState, action) {

    switch(action.type) {
        case EDIT_MATRIX_EDIT_STATE:
        return action.editmatrixeditstate;
        default: 
        return state;
    }
}

const isLoadEditMatrixState = "false";

export function isLoadEditMatrixReducer(state = isLoadEditMatrixState, action) {

    switch(action.type) {
        case ISLOAD_EDIT_MATRIX:
        return action.isloadeditmatrix;
        default: 
        return state;
    }
}