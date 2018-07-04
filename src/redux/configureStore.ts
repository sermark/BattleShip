import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { IStoreState } from '../types/index';
import rootReducer from './reducers';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const createStoreWithMiddleware = composeEnhancers(applyMiddleware(thunk))(createStore);

export default function configureStore(initialState?: IStoreState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);
  return store;
}
