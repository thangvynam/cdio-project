import { ADD_TNDATA } from '../Constant/ActionType';

const initialState = [{
    key: '1',
    stt:'1',
    loai: 'BOOK',
    mota: 'mota',
    link: 'link'
},{
    key: '2',
    stt:'2',
    loai: 'ARTICLE',
    mota: 'mota',
    link: 'link'
}];


export default function addTNDataReducer(state = initialState, action) {

    switch(action.type) {
        case ADD_TNDATA:
        return action.data;
        default: 
        return state;
    }
}