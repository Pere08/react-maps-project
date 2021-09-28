import { combineReducers } from 'redux';
import mapDataReducer from './mapDataReducer';

export default combineReducers({
  mapData: mapDataReducer,
});
