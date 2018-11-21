// Question Actions
export const SELECT_QUESTION = "SELECT_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION";
export const EDIT_QUESTION_TEXT = "EDIT_QUESTION_TEXT";
export const DELETE_QUESTION = "DELETE_ANSWER";

// Answer Actions
export const ADD_ANSWER = "ADD_ANSWER";
export const EDIT_ANSWER_TEXT = "EDIT_ANSWER_TEXT";
export const DELETE_ANSWER = "DELETE_ANSWER";
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
  return {
    type: ADD_QUESTION
  };
}

export function editQuestionText(questionText, questionIdx) {
  return {
    type: EDIT_QUESTION_TEXT,
    payload: {
      questionIdx,
      questionText
    }
  };
}

export function deleteQuestion(questionIdx) {
  return {
    type: DELETE_ANSWER,
    payload: {
      questionIdx
    }
  };
}

export function addAnswer() {
  return {
    type: ADD_ANSWER
  };
}

export function editAnswerText(answerText, questionIdx, answerIdx) {
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
    type: DELETE_ANSWER,
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
