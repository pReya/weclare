import Logger from "../../shared/util/Logger";
import {
  setPeer,
  setConnectionStatus,
  setConnectionError,
  toggleConnectionBusy
} from "../../shared/actions/connection";
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

export const SET_ASK_SCREEN_STATE = "SET_ASK_SCREEN_STATE";
export function setAskScreenState(newState) {
  return {
    type: SET_ASK_SCREEN_STATE,
    payload: {
      newState
    }
  };
}

export function resetAskScreenState() {
  return (dispatch, getState) => {
    const {
      server: { connections }
    } = getState();

    if (connections.length > 0) {
      dispatch({
        type: SET_ASK_SCREEN_STATE,
        payload: {
          newState: 1
        }
      });
    } else {
      dispatch({
        type: SET_ASK_SCREEN_STATE,
        payload: {
          newState: 0
        }
      });
    }
  };
}

export function incrementQuestionIdx() {
  return (dispatch, getState) => {
    const {
      server: { currentQuestionIdx = 0 }
    } = getState();
    dispatch(setCurrentQuestionIdx(currentQuestionIdx + 1));
    dispatch(resetAskScreenState());
  };
}

export function decrementQuestionIdx() {
  return (dispatch, getState) => {
    const {
      server: { currentQuestionIdx = 0 }
    } = getState();
    dispatch(setCurrentQuestionIdx(currentQuestionIdx - 1));
    dispatch(resetAskScreenState());
  };
}

export const TOGGLE_ACCEPTING_ANSWERS = "TOGGLE_ACCEPTING_ANSWERS";
export function toggleAcceptingAnswers() {
  return {
    type: TOGGLE_ACCEPTING_ANSWERS
  };
}

export const TOGGLE_BUSY = "TOGGLE_BUSY";
export function toggleBusy() {
  return {
    type: TOGGLE_BUSY
  };
}

export const TOGGLE_ACCEPTING_CONNECTIONS = "TOGGLE_ACCEPTING_CONNECTIONS";
export function stopAcceptingConnections() {
  return (dispatch, getState) => {
    const {
      connection: { peer = null },
      server: { acceptingConnections }
    } = getState();

    if (acceptingConnections) {
      dispatch({
        type: TOGGLE_ACCEPTING_CONNECTIONS
      });
      peer.disconnect();
    }
  };
}

export const NEXT_ASK_SCREEN_STATE = "NEXT_ASK_SCREEN_STATE";
export function nextAskScreenState() {
  return (dispatch, getState) => {
    const {
      server: { currentAskScreenState, connections }
    } = getState();

    const actions = {
      // Waiting for clients, button disabled
      0: () => {
        if (connections.length > 0) {
          dispatch({
            type: SET_ASK_SCREEN_STATE,
            payload: {
              newState: 1
            }
          });
        }
      },
      // Clients connected, ready to send first question and accept answers
      1: () => {
        dispatch(stopAcceptingConnections());
        dispatch(toggleAcceptingAnswers());
        dispatch(sendCurrentQuestionToClients());
        dispatch({
          type: NEXT_ASK_SCREEN_STATE
        });
      },
      // Stop accepting Answers
      2: () => {
        dispatch(toggleAcceptingAnswers());
        dispatch({
          type: NEXT_ASK_SCREEN_STATE
        });
      },
      // Next question
      3: () => {
        dispatch(incrementQuestionIdx());
      }
    };

    // Run transition actions
    actions[currentAskScreenState]();
  };
}

export function startServer() {
  return async (dispatch, getState) => {
    async function openAsync(peer) {
      return new Promise(resolve => {
        peer.on("open", id => {
          Logger.info(`Successfully created peer with ID "${id}"`);
          resolve(id);
        });
      });
    }

    const dataHandler = data => {
      const { type, payload } = data;
      Logger.info("Received data: ", data);
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
          Logger.error("dataHandler Switch case default reached");
      }
    };

    const {
      server: { ownServerId = null }
    } = getState();

    const peer = createPeer(ownServerId);
    peer.on("error", err => {
      Logger.error("ERROR: ", err);
      switch (err.type) {
        case "unavailable-id": {
          dispatch(setConnectionError("This ID is already taken."));
          dispatch(toggleConnectionBusy());
          break;
        }
        default:
      }
      dispatch(setConnectionStatus(3));
    });

    peer.on("connection", connection => {
      Logger.info("New client connected with id: ", connection.peer);
      connection.on("data", data => dataHandler(data));
      dispatch(setConnectionStatus(2));
      dispatch(addConnection(connection));
      dispatch({
        type: SET_ASK_SCREEN_STATE,
        payload: {
          newState: 1
        }
      });
    });

    dispatch(setPeer(peer));
    const id = await openAsync(peer);
    console.log("ID", id);
    if (typeof id === "string") {
      dispatch(setConnectionStatus(1));
      dispatch(setServerId(id));
    }
  };
}
