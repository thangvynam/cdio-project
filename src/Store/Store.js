import treeMenuReducer from '../Reducers/TreeMenuReducer'
import rightLayoutReducer from '../Reducers/RightLayoutReducer'
import itemMenuReducer from '../Reducers/ItemMenuReducer'
import itemLayout3Reducer from '../Reducers/ItemLayout3Reducer'
import addCDRDataReducer from '../Reducers/addCDRDataReducer';
import changeCDRDataReducer from '../Reducers/changeCDRDataReducer';
var redux = require("redux");

const allReducers = redux.combineReducers({
    treeMenuReducer: treeMenuReducer,
    rightLayoutReducer: rightLayoutReducer,
    itemMenuReducer: itemMenuReducer,
    cdrtable: addCDRDataReducer,
    cdrdata: changeCDRDataReducer,
    itemLayout3Reducer: itemLayout3Reducer,
})
var store1 = redux.createStore(allReducers);
export default store1;