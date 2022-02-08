import { combineReducers } from 'redux';
import articlesReducer from './articles.reducer';
const rootReducer = combineReducers({
  // child reducer
  articles: articlesReducer
});

export default rootReducer;
