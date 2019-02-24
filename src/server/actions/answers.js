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
