import actionTypes from '../actions/actionTypes';

export default function mapData(data = {}, action) {
  let newData = data;
  if (action.type === actionTypes.SEND_DATA) {
    newData = action.data;
  }
  return newData;
}
