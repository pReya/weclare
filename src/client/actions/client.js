// Server Actions
export const ADD_CONNECTION = "ADD_CONNCECTION";
export const SET_REMOTE_SERVER_ID = "SET_REMOTE_SERVER_ID";

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
