import {SAVE_SURVEY,CHANGE_VALUE_ITU_SURVEY} from '../Constant/ActionType';

const surveyInitialState = {
    survey: {},
    dataValueITU: new Map()
}
const SurveyReducer = (state = surveyInitialState, action) => {
    switch (action.type) {
        case SAVE_SURVEY: {
            console.log(action.survey)
            return {
                ...state,
                survey: action.survey
            }
        }

        case CHANGE_VALUE_ITU_SURVEY: {
            return {
                ...state,
                dataValueITU : action.data
            }
        }
        default:
            return state
    }
}
export default SurveyReducer;