// Server Actions
export const ADD_CONNECTION = "ADD_CONNCECTION";
export const SET_SERVER_ID = "SET_SERVER_ID";
export const SET_CURRENT_QUESTION = "SET_CURRENT_QUESTION";

export function addConnection(connection) {
  return {
    type: ADD_CONNECTION,
    payload: {
      connection
    }
  };
}

export function setServerId(newId) {
  return {
    type: SET_SERVER_ID,
    payload: {
      newId
    }
  };
}

export function setCurrentQuestion(questionIdx) {
  return {
    type: SET_CURRENT_QUESTION,
    payload: {
      questionIdx
    }
  };
}
