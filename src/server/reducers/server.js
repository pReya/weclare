import {
  ADD_CONNECTION,
  SET_SERVER_ID,
  SET_CURRENT_QUESTION
} from "../actions/server";

export const server = (
  state = {
    connections: [],
    ownServerId: "",
    currentQuestion: null
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

    case SET_CURRENT_QUESTION:
      return { ...state, currentQuestion: action.payload.questionIdx };

    default:
      return state;
  }
};

export default server;
