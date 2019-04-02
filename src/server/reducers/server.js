import {
  ADD_CONNECTION,
  SET_SERVER_ID,
  SET_CURRENT_QUESTION_IDX,
  TOGGLE_ACCEPTING_ANSWERS,
  TOGGLE_ACCEPTING_CONNECTIONS,
  NEXT_ASK_SCREEN_STATE,
  SET_ASK_SCREEN_STATE,
  TOGGLE_BUSY
} from "../actions/server";

export const server = (
  state = {
    connections: [],
    ownServerId: "",
    currentQuestionIdx: 0,
    currentAskScreenState: 0,
    acceptingAnswers: false,
    acceptingConnections: true,
    isBusy: false
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

    case TOGGLE_BUSY:
      return { ...state, isBusy: !state.isBusy };

    case NEXT_ASK_SCREEN_STATE:
      return {
        ...state,
        currentAskScreenState: (state.currentAskScreenState + 1) % 4
      };

    case SET_ASK_SCREEN_STATE:
      return {
        ...state,
        currentAskScreenState: action.payload.newState
      };

    default:
      return state;
  }
};

export default server;
