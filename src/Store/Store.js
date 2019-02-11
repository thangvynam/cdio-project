import treeMenuReducer from '../Reducers/TreeMenuReducer'
import rightLayoutReducer from '../Reducers/RightLayoutReducer'
import itemMenuReducer from '../Reducers/ItemMenuReducer'
import addCDRDataReducer from '../Reducers/addCDRDataReducer';
import changeCDRDataReducer from '../Reducers/changeCDRDataReducer';
var redux = require("redux");

const allReducers = redux.combineReducers({
    treeMenuReducer: treeMenuReducer,
    rightLayoutReducer: rightLayoutReducer,
    itemMenuReducer: itemMenuReducer,
    cdrtable: addCDRDataReducer,
    cdrdata: changeCDRDataReducer,

})
var store1 = redux.createStore(allReducers);
export default store1;