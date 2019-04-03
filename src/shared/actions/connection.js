export const SET_PEER = "SET_PEER";
export const SET_CONNECTION_STATUS = "SET_CONNECTION_STATUS";
export const SET_CONNECTION_ERROR = "SET_CONNECTION_ERROR";
export const CLEAR_CONNECTION_ERROR = "CLEAR_CONNECTION_ERROR";
export const TOGGLE_CONNECTION_BUSY = "TOGGLE_CONNECTION_BUSY";

export function toggleConnectionBusy() {
  return {
    type: TOGGLE_CONNECTION_BUSY
  };
}

export function setConnectionError(newErrorMsg) {
  return {
    type: SET_CONNECTION_ERROR,
    payload: {
      newErrorMsg
    }
  };
}

export function clearConnectionError() {
  return {
    type: CLEAR_CONNECTION_ERROR
  };
}

export function setConnectionStatus(newStatus) {
  return {
    type: SET_CONNECTION_STATUS,
    payload: {
      newStatus
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
