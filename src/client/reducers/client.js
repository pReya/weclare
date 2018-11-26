import { ADD_CONNECTION, SET_REMOTE_SERVER_ID } from "../actions/client";

export const client = (
  state = {
    connections: [],
    remoteServerId: ""
  },
  action
) => {
  switch (action.type) {
    case ADD_CONNECTION:
      return {
        ...state,
        connections: [...state.connections, action.payload.connection]
      };

    case SET_REMOTE_SERVER_ID:
      return { ...state, remoteServerId: action.payload.newId };

    default:
      return state;
  }
};

export default client;
