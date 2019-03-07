import {
  ADD_CONNECTION,
  SET_REMOTE_SERVER_ID,
  SET_CURRENT_QUESTION
} from "../actions/client";

export const client = (
  state = {
    connection: null,
    remoteServerId: "",
    currentQuestion: {}
  },
  action
) => {
  switch (action.type) {
    case ADD_CONNECTION:
      return {
        ...state,
        connection: action.payload.connection
      };

    case SET_REMOTE_SERVER_ID:
      return { ...state, remoteServerId: action.payload.newId };

    case SET_CURRENT_QUESTION:
      return { ...state, currentQuestion: action.payload.newQuestion };

    default:
      return state;
  }
};

export default client;
