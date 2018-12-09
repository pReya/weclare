import {
  ADD_CONNECTION,
  SET_SERVER_ID,
  SET_CURRENT_QUESTION_IDX
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
    case SET_CURRENT_QUESTION_IDX: {
      return { ...state, currentQuestion: action.payload.questionIdx };
    }

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
