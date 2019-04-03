import { getNumberOfUsersAnswered } from "../selectors/answers";
import { NEXT_ASK_SCREEN_STATE } from "./server";
// Server Answer Actions
export const REGISTER_ANSWERS = "REGISTER_ANSWERS";
export function registerAnswers(questionIdx, answerIdxArray, userId) {
  return (dispatch, getState) => {
    const { server } = getState();
    if (server.acceptingAnswers) {
      dispatch({
        type: REGISTER_ANSWERS,
        payload: {
          questionIdx,
          answerIdxArray,
          userId
        }
      });
      // Get state again after new answer has been registered
      const newState = getState();
      const receivedAnswers = getNumberOfUsersAnswered(newState);

      // End question when all users have sent answers
      if (receivedAnswers >= server.connections.length) {
        dispatch({
          type: NEXT_ASK_SCREEN_STATE
        });
      }
    }
  };
}

export const INIT_ANSWERS = "INIT_ANSWERS";
export function initAnswers() {
  return (dispatch, getState) => {
    const { questionEditor } = getState();
    const emptyAnswerArray = questionEditor.map(question =>
      question.answers.map(() => [])
    );
    dispatch({
      type: INIT_ANSWERS,
      payload: {
        array: emptyAnswerArray
      }
    });
  };
}
