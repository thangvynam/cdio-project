import {SAVE_SURVEY} from '../Constant/ActionType';
import axios from 'axios';

const surveyInitialState = {
    survey: {}
}
const SurveyReducer = (state = surveyInitialState, action) => {
    switch (action.type) {
        case SAVE_SURVEY: {
            axios.post('/save-survey-qa', { data: action.survey })
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