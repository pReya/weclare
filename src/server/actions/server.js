import Logger from "../../shared/util/Logger";
import { setPeer, setConnectionStatus } from "../../shared/actions/connection";
import { registerAnswers } from "./answers";
import { getCurrentQuestionNoSolution } from "../selectors/questions";
import createPeer from "../../shared/util/NetworkHelpers";

export const ADD_CONNECTION = "ADD_CONNECTION";
export function addConnection(connection) {
  return {
    type: ADD_CONNECTION,
    payload: {
      connection
    }
  };
}

export const SET_SERVER_ID = "SET_SERVER_ID";
export function setServerId(newId) {
  return {
    type: SET_SERVER_ID,
    payload: {
      newId
    }
  };
}

export const SET_CURRENT_QUESTION_IDX = "SET_CURRENT_QUESTION_IDX";
export function setCurrentQuestionIdx(questionIdx) {
  return {
    type: SET_CURRENT_QUESTION_IDX,
    payload: {
      questionIdx
    }
  };
}

export function incrementQuestionIdx() {
  return (dispatch, getState) => {
    const {
      server: { currentQuestionIdx = 0 }
    } = getState();
    dispatch(setCurrentQuestionIdx(currentQuestionIdx + 1));
  };
}

export function decrementQuestionIdx() {
  return (dispatch, getState) => {
    const {
      server: { currentQuestionIdx = 0 }
    } = getState();
    dispatch(setCurrentQuestionIdx(currentQuestionIdx - 1));
  };
}

export const TOGGLE_ACCEPTING_ANSWERS = "TOGGLE_ACCEPTING_ANSWERS";
export function toggleAcceptingAnswers() {
  return {
    type: TOGGLE_ACCEPTING_ANSWERS
  };
}

export const TOGGLE_ACCEPTING_CONNECTIONS = "TOGGLE_ACCEPTING_CONNECTIONS";
export function stopAcceptingConnections() {
  return (dispatch, getState) => {
    const {
      connection: { peer = null },
      server: { acceptingConnections }
    } = getState();

    console.log("Current Accept state: ", acceptingConnections);

    if (acceptingConnections) {
      dispatch({
        type: TOGGLE_ACCEPTING_CONNECTIONS
      });
      peer.disconnect();
    }
  };
}

export function startServer() {
  return (dispatch, getState) => {
    const {
      server: { ownServerId = null }
    } = getState();

    const peer = createPeer(ownServerId);

    const dataHandler = data => {
      const { type, payload } = data;
      Logger.info("Received Data: ", data);
      switch (type) {
        case "answer":
          dispatch(
            registerAnswers(
              payload.questionIdx,
              payload.answerIdxArray,
              payload.userId
            )
          );
          break;
        default:
          Logger.error("Switch case default reached");
      }
    };

    dispatch(setPeer(peer));

    peer.on("open", id => {
      Logger.info(`Successfully created peer with ID "${id}"`);
      dispatch(setConnectionStatus(1));
      // Set Server ID again, in case the input was empty and PeerJS used a random ID
      dispatch(setServerId(id));
    });

    peer.on("connection", connection => {
      Logger.info("New client connected with id: ", connection.peer);
      connection.on("data", data => dataHandler(data));
      dispatch(setConnectionStatus(2));
      dispatch(addConnection(connection));
    });

    peer.on("error", err => {
      Logger.error("ERROR: ", err);
      dispatch(setConnectionStatus(3));
    });
  };
}

export function sendCurrentQuestionToClients() {
  return (dispatch, getState) => {
    const {
      server: { connections }
    } = getState();

    const currentQuestionNoSolution = getCurrentQuestionNoSolution(getState());

    const msg = {
      type: "question",
      payload: currentQuestionNoSolution
    };

    if (connections.length > 0 && currentQuestionNoSolution) {
      Logger.info("Sending question to clients", currentQuestionNoSolution);
      connections.forEach(connection => connection.send(JSON.stringify(msg)));
    } else {
      Logger.error("Can't send question to clients");
    }
  };
}
