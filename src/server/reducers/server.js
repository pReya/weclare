import {
  SET_SERVER_STATUS,
  ADD_CONNECTION,
  SET_SERVER_ID,
  SET_PEER
} from "../actions/server";

import { changeInArray, deleteInArray } from "./helpers";

export const server = (
  state = {
    peer: null,
    status: 0,
    connections: [],
    ownServerId: ""
  },
  action
) => {
  switch (action.type) {
    case SET_SERVER_STATUS:
      return { ...state, status: action.payload.newStatus };
    case ADD_CONNECTION:
      return state;
    case SET_SERVER_ID:
      return { ...state, ownServerId: action.payload.newId };
    case SET_PEER:
      return state;

    default:
      return state;
  }
};

export default server;
