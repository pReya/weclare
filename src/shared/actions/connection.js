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

// export function sendNextQuestionToClients() {
//   return (dispatch, getState) => {
//     const {
//       server: { connections = [], currentQuestionIdx },
//       questionEditor: questions
//     } = getState();
//     // use getFormattedQuestion here – how?
//     if (connections.length > 0 && formattedQuestion) {
//       connections.forEach(connection =>
//         connection.send(JSON.stringify(formattedQuestion))
//       );
//     } else {
//       console.error("Can't send question to clients");
//     }
//   };
// }
