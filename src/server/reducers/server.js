import {
  ADD_CONNECTION,
  SET_SERVER_ID,
  SET_CURRENT_QUESTION_IDX,
  TOGGLE_ACCEPTING_ANSWERS,
  TOGGLE_ACCEPTING_CONNECTIONS
} from "../actions/server";

export const server = (
  state = {
    connections: [],
    ownServerId: "",
    currentQuestionIdx: 0,
    acceptingAnswers: false,
    acceptingConnections: true
  },
  action
) => {
  switch (action.type) {
    case SET_CURRENT_QUESTION_IDX: {
      return {
        ...state,
        currentQuestionIdx:
          action.payload.questionIdx < 0 ? 0 : action.payload.questionIdx
      };
    }

    case ADD_CONNECTION:
      return {
        ...state,
        connections: [...state.connections, action.payload.connection]
      };

    case SET_SERVER_ID:
      return { ...state, ownServerId: action.payload.newId };

    case TOGGLE_ACCEPTING_ANSWERS:
      return { ...state, acceptingAnswers: !state.acceptingAnswers };

    case TOGGLE_ACCEPTING_CONNECTIONS:
      return { ...state, acceptingConnections: !state.acceptingConnections };

    default:
      return state;
  }
};

export default server;
