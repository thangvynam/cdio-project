import {REMOVE_ITEM} from '../Constant/ActionType';

const treeMenuInitialState = {
    tab: {
            'THÔNG TIN CHUNG': 'THÔNG TIN CHUNG',
            'MÔ TẢ MÔN HỌC': 'MÔ TẢ MÔN HỌC',
            'MỤC TIÊU MÔN HỌC': 'MỤC TIÊU MÔN HỌC',
            'CHUẨN ĐẦU RA MÔN HỌC': 'CHUẨN ĐẦU RA MÔN HỌC',
            'KẾ HOẠCH GIẢNG DẠY LÝ THUYẾT': 'KẾ HOẠCH GIẢNG DẠY LÝ THUYẾT',
            'KẾ HOẠCH GIẢNG DẠY THỰC HÀNH': 'KẾ HOẠCH GIẢNG DẠY THỰC HÀNH',
            'ĐÁNH GIÁ': 'ĐÁNH GIÁ',
            'TÀI NGUYÊN MÔN HỌC': 'TÀI NGUYÊN MÔN HỌC',
            'CÁC QUY ĐỊNH CHUNG': 'CÁC QUY ĐỊNH CHUNG',
        }
}
const treeMenuReducer = (state = treeMenuInitialState, action) => {
    switch (action.type) {
        case REMOVE_ITEM:{
            delete state.tab[action.name];
            console.log(state.tab);
            
            return {...state,tab:state.tab}
            
        }
            
        default:
            return state
    }
}
export default treeMenuReducer;