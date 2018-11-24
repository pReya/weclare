// Server Actions
export const SET_SERVER_STATUS = "SET_SERVER_STATUS";
export const ADD_CONNECTION = "ADD_CONNCECTION";
export const SET_SERVER_ID = "SET_SERVER_ID";
export const SET_PEER = "SET_PEER";

export function setServerStatus(newStatus) {
  return {
    type: SET_SERVER_STATUS,
    payload: {
      newStatus
    }
  };
}

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

export function setPeer(peer) {
  return {
    type: SET_PEER,
    payload: {
      peer
    }
  };
}
