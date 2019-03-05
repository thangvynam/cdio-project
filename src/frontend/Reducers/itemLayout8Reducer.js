import { ADD_TNDATA, CHANGE_TNDATA } from '../Constant/ActionType';

const addTNDataState = {
    previewInfo: [{
        key: '1',
        stt: '1',
        loai: 'BOOK',
        mota: 'mota',
        link: 'link'
    }, {
        key: '2',
        stt: '2',
        loai: 'ARTICLE',
        mota: 'mota',
        link: 'link'
    }]
};


export function itemLayout8Reducer(state = addTNDataState, action) {

    switch (action.type) {
        case ADD_TNDATA:
            return action.data;
        default:
            return state;
    }
}

const changeTNDataState = {
    key: '',
    stt: '',
    loai: '',
    mota: '',
    link: ''
};

export function changeTNDataReducer(state = changeTNDataState, action) {

    switch (action.type) {
        case CHANGE_TNDATA:
            return action.data;
        default:
            return state;
    }
}