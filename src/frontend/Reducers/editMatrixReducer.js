import { EDIT_MATRIX, EDIT_MATRIX_EDIT_STATE } from '../Constant/ActionType';
const initialData = [
    // {
    //     key: 1,
    //     hocky: 1,
    //     hocphan: 'OOP',
    //     gvtruongnhom: 'Le Dinh Phu',
    //     '1.1.1': "U I",
    //     '1.1.2': "U",
    //     '1.1.3': "T",
    //     '1.2.1': "U I T",
    //     '1.2.2': "U T",
    //     '1.2.3': "I T",
    //     '1.3.1': "T",
    //     '1.3.2': "U T",
    //     '1.3.3': "I",
    //     '2.1.1': "U I",
    //     '2.1.2': "U",
    //     '2.1.3': "T U",
    //     '2.2.1': "U I T",
    //     '2.2.2': "U T",
    //     '2.2.3': "I",
    //     '2.3.1': "T",
    //     '2.3.2': "U T",
    //     '2.3.3': "I U T",
    // },
    // {
    //     key: 2,
    //     hocky: 2,
    //     hocphan: 'Design Pattern',
    //     gvtruongnhom: 'Le Dinh Phu 2',
    //     '1.1.1': "U I",
    //     '1.1.2': "U",
    //     '1.1.3': "T",
    //     '1.2.1': "U I T",
    //     '1.2.2': "U T",
    //     '1.2.3': "I T",
    //     '1.3.1': "T",
    //     '1.3.2': "U T",
    //     '1.3.3': "I",
    //     '2.1.1': "U I",
    //     '2.1.2': "U",
    //     '2.1.3': "T U",
    //     '2.2.1': "U I T",
    //     '2.2.2': "U T",
    //     '2.2.3': "I",
    //     '2.3.1': "T",
    //     '2.3.2': "U T",
    //     '2.3.3': "I U T",
    // }
];

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