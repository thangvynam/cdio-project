import {SAVE_SURVEY} from '../Constant/ActionType';

const surveyInitialState = {
    survey: {}
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
        default:
            return state
    }
}
export default SurveyReducer;