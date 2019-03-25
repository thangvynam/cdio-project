import * as Types from '../Constant/matrix/matrixActionType';

const initialState = {
    previewInfo: [],
};

export default function matrix(state = initialState, action) {
    switch (action.type) {
        case Types.GET_MATRIX:
            return { 
                ...state,
                previewInfo: action.newData 
            };
        default:
            return state;
    }
}