// Server Actions
export const ADD_CONNECTION = "ADD_CONNCECTION";
export const SET_SERVER_ID = "SET_SERVER_ID";

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
