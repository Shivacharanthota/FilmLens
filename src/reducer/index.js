// reducers/index.js
import { combineReducers } from 'redux';
import movieidnum from './movieReducer';

const rootReducer = combineReducers({
  movieidnum,
});

export default rootReducer;
