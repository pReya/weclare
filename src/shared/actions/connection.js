export const SET_PEER = "SET_PEER";
export const SET_CONNECTION_STATUS = "SET_CONNECTION_STATUS";

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
