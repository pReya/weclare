export const SET_PEER = "SET_PEER";
export const SET_SERVER_STATUS = "SET_SERVER_STATUS";

export function setServerStatus(newStatus) {
  return {
    type: SET_SERVER_STATUS,
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
