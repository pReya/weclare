// Server Actions
export const REGISTER_ANSWER = "REGISTER_ANSWER";
export const INIT_ANSWERS = "INIT_ANSWERS";

export function registerAnswer(questionIdx, answerIdx, userId) {
  return {
    type: REGISTER_ANSWER,
    payload: {
      questionIdx,
      answerIdx,
      userId
    }
  };
}

export function initAnswersState(array) {
  return {
    type: INIT_ANSWERS,
    payload: {
      array
    }
  };
}

export function initAnswers() {
  return (dispatch, getState) => {
    const { questionEditor } = getState();
    const emptyAnswerArray = questionEditor.map(question =>
      question.answers.map(() => [])
    );
    console.log("Answer array: ", emptyAnswerArray);
    dispatch(initAnswersState(emptyAnswerArray));
  };
}
