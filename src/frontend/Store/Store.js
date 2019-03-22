import itemLayout5Reducer from '../Reducers/ItemLayout5Reducer'
import itemLayout2Reducer from '../Reducers/ItemLayout2Reducer'
import itemLayout3Reducer from '../Reducers/ItemLayout3Reducer'
import itemLayout1Reducer from '../Reducers/itemLayout1Reducer';
import { itemLayout4Reducer, changeCDRDataReducer, selecteCDRItemReducer, changeEditStateReducer, 
    selectedVerbReducer } from '../Reducers/ItemLayout4Reducer';
import {itemLayout7Reducer,changeDGDataReducer} from '../Reducers/itemLayout7Reducer';
import {itemLayout8Reducer,changeTNDataReducer} from '../Reducers/itemLayout8Reducer';
import itemLayout6Reducer from "../Reducers/ItemLayout6Reducer";
import itemLayout9Reducer from "../Reducers/ItemLayout9Reducer";
import { subjectListReducer, subjectIdReducer } from '../Reducers/subjectListReducer';

import { createStore, applyMiddleware} from 'redux';
// import logger from 'redux-logger';
import thunk from 'redux-thunk';
//const middleware = [ thunk, logger ];
const middleware = [ thunk];

var redux = require("redux");

const allReducers = redux.combineReducers({

    itemLayout1Reducer: itemLayout1Reducer,
    itemLayout5Reducer: itemLayout5Reducer,
    itemLayout2Reducer: itemLayout2Reducer,
    itemLayout3Reducer: itemLayout3Reducer,
    itemLayout4Reducer: itemLayout4Reducer,
    cdrdata: changeCDRDataReducer,
    cdrselecteditem: selecteCDRItemReducer,
    cdreditstate: changeEditStateReducer,
    cdrverb: selectedVerbReducer,
    itemLayout6Reducer: itemLayout6Reducer,
    itemLayout9Reducer: itemLayout9Reducer,
    itemLayout7Reducer : itemLayout7Reducer,
    dgdata: changeDGDataReducer,
    itemLayout8Reducer: itemLayout8Reducer,
    tndata: changeTNDataReducer,
    subjectlist: subjectListReducer,
    subjectid: subjectIdReducer
});
const store1 = createStore(allReducers, applyMiddleware(...middleware));
export default store1;
