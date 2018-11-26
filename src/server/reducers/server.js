import { ADD_CONNECTION, SET_SERVER_ID } from "../actions/server";

export const server = (
  state = {
    connections: [],
    ownServerId: ""
  },
  action
) => {
  switch (action.type) {
    case ADD_CONNECTION:
      return {
        ...state,
        connections: [...state.connections, action.payload.connection]
      };

    case SET_SERVER_ID:
      return { ...state, ownServerId: action.payload.newId };

    default:
      return state;
  }
};

export default server;