import {
  ADD_CONNECTION,
  SET_SERVER_ID,
  SET_CURRENT_QUESTION_IDX
} from "../actions/server";

export const server = (
  state = {
    connections: [],
    ownServerId: "",
    currentQuestion: 0
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

    case SET_CURRENT_QUESTION_IDX: {
      console.log("Arrived in reducer");
      return { ...state, currentQuestion: action.payload.questionIdx };
    }

    default:
      return state;
  }
};

export default server;
