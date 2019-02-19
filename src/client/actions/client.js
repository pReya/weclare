import Logger from "../../shared/util/Logger";
import { setPeer, setConnectionStatus } from "../../shared/actions/connection";
import createPeer from "../../shared/util/NetworkHelpers";

// Client Actions
export const ADD_CONNECTION = "ADD_CONNECTION";
export const SET_REMOTE_SERVER_ID = "SET_REMOTE_SERVER_ID";
export const SET_CURRENT_QUESTION = "SET_CURRENT_QUESTION";

// TODO: This is probably unnecessary b/c PeerJS keeps its own connection object
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

export function connectToServer() {
  return (dispatch, getState) => {
    const {
      client: { remoteServerId = null }
    } = getState();

    const peer = createPeer();

    const dataHandler = data => {
      const { type, payload } = data;
      Logger.info("Received Data: ", data);
      switch (type) {
        default:
          console.log("Default");
      }
    };

    dispatch(setPeer(peer));

    const connection = peer.connect(
      remoteServerId,
      { reliable: false }
    );
    dispatch(addConnection(connection));
    dispatch(setConnectionStatus(1));

    connection.on("open", () => {
      Logger.info(`Successfully connected to server ${connection.peer}`);
      dispatch(setConnectionStatus(2));
      connection.on("data", data => dataHandler(data));
      // connection.on("data", data => {
      //   const msg = JSON.parse(data);
      //   console.log("Received data: ", msg);
      //   dispatch(setCurrentQuestion(msg));
      // });
    });

    peer.on("error", err => {
      Logger.error("ERROR: ", err);
      dispatch(setConnectionStatus(3));
    });
  };
}
