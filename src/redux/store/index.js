import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import authReducer from '../reducer/authReducer'
import carritoReducer from '../reducer/carritoReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  carrito: carritoReducer
  //SEAGREGAN LOS REDUCERS
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
