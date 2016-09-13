import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import dashboardReducer from './dashboardReducer';
import pageReducer from './pageReducer';
import queryReducer from './queryReducer';

const rootReducer = combineReducers({
  dashboard: dashboardReducer,
  page: pageReducer,
  form: formReducer,
  query: queryReducer
});

export default rootReducer;
