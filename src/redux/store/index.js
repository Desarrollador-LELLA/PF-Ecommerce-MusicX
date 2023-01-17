import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import authReducer from '../reducer/authReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  //SEAGREGAN LOS REDUCERS
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;