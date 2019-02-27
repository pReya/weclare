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

export function sendAnswers(answerIdxArray) {
  return (dispatch, getState) => {
    const {
      client: { connection = null, currentQuestion = null }
    } = getState();

    if (
      connection &&
      currentQuestion &&
      typeof answerIdxArray !== "undefined"
    ) {
      const msg = {
        type: "answer",
        payload: {
          questionIdx: currentQuestion.questionIdx,
          answerIdxArray,
          userId: connection.provider.id
        }
      };
      connection.send(msg);
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
      const dataObj = JSON.parse(data);
      const { type, payload } = dataObj;
      Logger.info("Received Data: ", dataObj);
      switch (type) {
        case "question":
          dispatch(setCurrentQuestion(payload));
          break;

        default:
          Logger.error("ERROR: Client Data Handler Default Case");
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
    });

    peer.on("error", err => {
      Logger.error("ERROR: ", err);
      dispatch(setConnectionStatus(3));
    });
  };
}
