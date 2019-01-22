import treeMenuReducer from '../Reducers/TreeMenuReducer'
var redux = require("redux");

const allReducers = redux.combineReducers({
    treeMenuReducer:treeMenuReducer
})
var store1 = redux.createStore(allReducers);
export default store1;