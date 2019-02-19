import { ADD_ITEM_RULE } from '../Constant/ActionType';

const initialState = {
    rules: [{
        index: 1,
        content: 'Sinh viên cần tuân thủ nghiêm túc các nội quy và quy định của Khoa và Trường.',
    },
{
    index: 2,
    content: 'Đối với bất kỳ sự gian lận nào trong quá trình làm bài tập hay bài thi, sinh viên phải chịu mọi hình thức kỷ luật của Khoa/Trường và bị 0 điểm cho môn học này.',
}]
}
const itemRuleReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM_RULE:
            return {
                ...state,
                rules: [...state.rules, JSON.parse(action.data)]
            }
        default:
            return state
    }
}
export default itemRuleReducer;