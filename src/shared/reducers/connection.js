import {
  SET_CONNECTION_STATUS,
  SET_PEER,
  SET_CONNECTION_ERROR,
  TOGGLE_CONNECTION_BUSY,
  CLEAR_CONNECTION_ERROR
} from "../actions/connection";

export const connection = (
  state = {
    peer: null,
    status: 0,
    errorMsg: null,
    busy: false
  },
  action
) => {
  switch (action.type) {
    case TOGGLE_CONNECTION_BUSY:
      return { ...state, busy: !state.busy };

    case SET_CONNECTION_ERROR:
      return { ...state, errorMsg: action.payload.newErrorMsg };

    case CLEAR_CONNECTION_ERROR:
      return { ...state, errorMsg: null };

    case SET_CONNECTION_STATUS:
      return { ...state, status: action.payload.newStatus };

    case SET_PEER:
      return { ...state, peer: action.payload.peer };

    default:
      return state;
  }
};

export default connection;
