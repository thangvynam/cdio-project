import * as Types from '../Constant/matrix/matrixActionType';

const initialState = {
    previewInfo: [],
    listNameGV : [],
};

export default function surveyMatrix(state = initialState, action) {
    switch (action.type) {
        case Types.GET_SURVEY_MATRIX:
            return { 
                ...state,
                previewInfo: action.newData 
            };
        case Types.GET_NAME_GV : 
            return {
                ...state,
                listNameGV : action.newData
            }
        default:
            return state;
    }
}