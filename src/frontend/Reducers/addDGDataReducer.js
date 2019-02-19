import { ADD_DGDATA } from '../Constant/ActionType';

const initialState = [{
    key: 'BTTL',
    standardOutput: [],
    mathanhphan:'BTTL',
    tenthanhphan:'Bài tập tại lớp',
    mota:'',
    tile: '',
},{
    key: 'BTTL#1',
    standardOutput: ['G1.3','G5.4','G6.1'],
    mathanhphan:'\xa0\xa0\xa0BTTL#1',
    tenthanhphan:'Mô hình hóa phần mềm',
    mota:'Mô hình hóa dựa trên yêu cầu đặt tả đã có sẵn',
    tile: '2.5%',
},{
    key: 'BTTL#2',
    standardOutput: ['G5.4','G6.1'],
    mathanhphan:'\xa0\xa0\xa0BTTL#2',
    tenthanhphan:'Thiết kế giao diện',
    mota:'Thiết kế 1 màn hình tìm sản phẩm',
    tile: '2.5%',
}];


export default function addDGDataReducer(state = initialState, action) {

    switch(action.type) {
        case ADD_DGDATA:
        return action.data;
        default: 
        return state;
    }
}