// Server Actions
export const ADD_CONNECTION = "ADD_CONNECTION";
export const SET_REMOTE_SERVER_ID = "SET_REMOTE_SERVER_ID";
export const SET_CURRENT_QUESTION = "SET_CURRENT_QUESTION";

export function addConnection(connection) {
  return {
    type: ADD_CONNECTION,
    payload: {
      connection
    }
  };
}

export function setRemoteServerId(newId) {
  return {
    type: SET_REMOTE_SERVER_ID,
    payload: {
      newId
    }
  };
}

export function setCurrentQuestion(newQuestion) {
  return {
    type: SET_CURRENT_QUESTION,
    payload: {
      newQuestion
    }
  };
}