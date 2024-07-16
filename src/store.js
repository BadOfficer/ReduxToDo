import { combineReducers, createStore } from 'redux';
import reducer from './features/list/listSlice';

const rootReducer = combineReducers({
	list: reducer,
});

const store = createStore(rootReducer);

export default store;
