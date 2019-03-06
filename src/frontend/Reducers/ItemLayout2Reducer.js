import {ADD_DATA_LAYOUT_2, SAVE_DATA_LAYOUT_2} from '../Constant/ActionType';

const itemLayout2InitialState = {
    previewInfo: 'Môn học này nhằm cung cấp cho sinh viên một cái nhìn tổng quát về lĩnh vực Công nghệ phần mềm, các kiến thức nền tảng liên quan đến các thành phần chính yếu trong lĩnh vực công nghệ phần mềm (khái niệm về phần mềm, các tiến trình, các phương pháp, kỹ thuật phát triển phần mềm, các phương pháp tổ chức quản lý, công cụ và môi trường phát triển và triển khai phần mềm...). Môn học cũng giúp xây dựng kiến thức nền tảng cho chuyên ngành Kỹ thuật phần mềm nhằm tạo sự sẵn sàng cho các môn học chuyên sâu hơn ở các năm sau. Môn học cũng giúp sinh viên có những trải nghiệm thực tế về quá trình xây dựng một phần mềm ở mức độ đơn giản một cách có hệ thống và có phương pháp.'
}
const ItemLayout2Reducer = (state = itemLayout2InitialState, action) => {
    switch (action.type) {
        case ADD_DATA_LAYOUT_2:
            return {
                ...state,
                previewInfo: action.description
            }
        case SAVE_DATA_LAYOUT_2:
            return {
                ...state, 
                previewInfo: action.data[0].description
            }
        default:
            return state
    }
}
export default ItemLayout2Reducer;