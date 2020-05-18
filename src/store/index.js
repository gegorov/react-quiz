import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';


import rootReducer from './reducers/rootReducer';

const middleware = [thunk];
const composeEnhancers = composeWithDevTools({ trace: true, traceLimit: 10 });

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(...middleware),
  // other store enhancers if any
));

export default store;
