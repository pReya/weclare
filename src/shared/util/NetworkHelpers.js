import Peer from "peerjs";

const createPeer = ownId => {
  const {
    REACT_APP_PEERJS_SERVER: server,
    REACT_APP_PEERJS_SECURE: secure,
    REACT_APP_PEERJS_DEBUG: debug
  } = process.env;

  return new Peer(ownId, {
    host: server,
    secure: secure === "true",
    debug: parseInt(debug, 10)
  });
};

export default createPeer;
