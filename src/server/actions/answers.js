// Server Answer Actions
export const REGISTER_ANSWER = "REGISTER_ANSWER";
export function registerAnswer(questionIdx, answerIdx, userId) {
  return (dispatch, getState) => {
    const { server } = getState();
    if (server.acceptingAnswers) {
      dispatch({
        type: REGISTER_ANSWER,
        payload: {
          questionIdx,
          answerIdx,
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
