// Question Actions
export const SELECT_QUESTION = "SELECT_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION";
export const EDIT_QUESTION_TEXT = "EDIT_QUESTION_TEXT";
export const DELETE_QUESTION = "DELETE_ANSWER";

// Answer Actions
export const ADD_ANSWER = "ADD_ANSWER";
export const EDIT_ANSWER_TEXT = "EDIT_ANSWER_TEXT";
export const ANSWER_DELETE = "ANSWER_DELETE";
export const SET_CORRECT_ANSWER = "SET_CORRECT_ANSWER";

// Action Creators

export function selectQuestion(questionIdx) {
  return {
    type: SELECT_QUESTION,
    payload: {
      questionIdx
    }
  };
}

export function addQuestion() {
  return (dispatch, getState) => {
    // 1: add question to `questions` state
    dispatch({ type: ADD_QUESTION });

    // 2: select newest question as `selectedQuestion`
    const { questions } = getState();
    dispatch(selectQuestion(questions.length - 1));
  };
}

export function editQuestionText(questionIdx, questionText) {
  return {
    type: EDIT_QUESTION_TEXT,
    payload: {
      questionIdx,
      questionText
    }
  };
}

export function deleteQuestion(questionIdx) {
  return (dispatch, getState) => {
    dispatch({
      type: DELETE_QUESTION,
      payload: {
        questionIdx
      }
    });

    // 2: select newest question as `selectedQuestion`
    const { selectedQuestion } = getState();
    dispatch(selectQuestion(selectedQuestion - 1));
  };
}

export function addAnswer(questionIdx) {
  return {
    type: ADD_ANSWER,
    payload: {
      questionIdx
    }
  };
}

export function editAnswerText(questionIdx, answerText, answerIdx) {
  return {
    type: EDIT_ANSWER_TEXT,
    payload: {
      questionIdx,
      answerText,
      answerIdx
    }
  };
}

export function deleteAnswer(questionIdx, answerIdx) {
  return {
    type: ANSWER_DELETE,
    payload: {
      questionIdx,
      answerIdx
    }
  };
}

export function setCorrectAnswer(questionIdx, answerIdx) {
  return {
    type: SET_CORRECT_ANSWER,
    payload: {
      questionIdx,
      answerIdx
    }
  };
}
