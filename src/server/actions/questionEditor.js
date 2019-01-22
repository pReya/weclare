// Question Editor Actions
export const SELECT_QUESTION = "SELECT_QUESTION";
export const ADD_QUESTION = "ADD_QUESTION";
export const EDIT_QUESTION_TEXT = "EDIT_QUESTION_TEXT";
export const EDIT_QUESTION_MODE = "EDIT_QUESTION_MODE";
export const EDIT_QUESTION_TYPE = "EDIT_QUESTION_TYPE";
export const DELETE_QUESTION = "DELETE_QUESTION";
export const LOAD_QUESTIONS = "LOAD_QUESTIONS";
export const SORT_QUESTION = "SORT_QUESTION";

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
    const { questionEditor } = getState();
    dispatch(selectQuestion(questionEditor.length - 1));
  };
}

export function editQuestionText(questionIdx, text) {
  return {
    type: EDIT_QUESTION_TEXT,
    payload: {
      questionIdx,
      text
    }
  };
}

export function editQuestionMode(questionIdx, newMode, oldMode) {
  return {
    type: EDIT_QUESTION_MODE,
    payload: {
      questionIdx,
      newMode,
      oldMode
    }
  };
}

export function editQuestionType(questionIdx, newType, oldType) {
  return {
    type: EDIT_QUESTION_TYPE,
    payload: {
      questionIdx,
      newType,
      oldType
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

    const { selectedQuestion } = getState();
    if (selectedQuestion <= 0) {
      dispatch(selectQuestion(0));
    } else {
      dispatch(selectQuestion(selectedQuestion - 1));
    }
  };
}

export function loadQuestions(newQuestions) {
  return {
    type: LOAD_QUESTIONS,
    payload: {
      newQuestions
    }
  };
}

export function sortQuestion(oldQuestionIdx, newQuestionIdx) {
  return (dispatch, getState) => {
    dispatch({
      type: SORT_QUESTION,
      payload: {
        oldQuestionIdx,
        newQuestionIdx
      }
    });
    const { selectedQuestion } = getState();
    if (selectedQuestion === oldQuestionIdx) {
      dispatch(selectQuestion(newQuestionIdx));
    }
  };
}

// Answer Actions
export const SET_CORRECT_SINGLE_ANSWER = "SET_CORRECT_SINGLE_ANSWER";
export const SET_CORRECT_MULTI_ANSWER = "SET_CORRECT_MULTI_ANSWER";
export const ADD_ANSWER = "ADD_ANSWER";
export const EDIT_ANSWER_TEXT = "EDIT_ANSWER_TEXT";
export const DELETE_ANSWER = "DELETE_ANSWER";
export const SORT_ANSWER = "SORT_ANSWER";

export function setCorrectSingleAnswer(questionIdx, answerIdx) {
  return {
    type: SET_CORRECT_SINGLE_ANSWER,
    payload: {
      questionIdx,
      answerIdx
    }
  };
}

export function setCorrectMultiAnswer(questionIdx, answerIdx) {
  return {
    type: SET_CORRECT_MULTI_ANSWER,
    payload: {
      questionIdx,
      answerIdx
    }
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

export function editAnswerText(questionIdx, text, answerIdx) {
  return {
    type: EDIT_ANSWER_TEXT,
    payload: {
      questionIdx,
      text,
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

export function sortAnswer(questionIdx, oldAnswerIdx, newAnswerIdx) {
  return {
    type: SORT_ANSWER,
    payload: {
      questionIdx,
      oldAnswerIdx,
      newAnswerIdx
    }
  };
}
