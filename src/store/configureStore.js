import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import campgroundsReducer from '../reducers/campgroundsReducer';
import userReducer from '../reducers/userReducer';
import filterReducer from '../reducers/filterReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      campgrounds: campgroundsReducer,
      user: userReducer,
      filter: filterReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
