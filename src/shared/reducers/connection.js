import { SET_SERVER_STATUS, SET_PEER } from "../actions/connection";

export const connection = (
  state = {
    peer: null,
    status: 0
  },
  action
) => {
  switch (action.type) {
    case SET_SERVER_STATUS:
      return { ...state, status: action.payload.newStatus };

    case SET_PEER:
      return { ...state, peer: action.payload.peer };

    default:
      return state;
  }
};

export default connection;
