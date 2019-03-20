import tv4 from "tv4";
import Logger from "../../shared/util/Logger";
import QuestionSchema from "../../shared/util/QuestionsSchema";
import { saveToStorage } from "../../shared/util/FileHelpers";

// Question Editor Actions
export const SELECT_QUESTION = "SELECT_QUESTION";
export function selectQuestion(questionIdx) {
  return {
    type: SELECT_QUESTION,
    payload: {
      questionIdx
    }
  };
}

export const ADD_QUESTION = "ADD_QUESTION";
export function addQuestion() {
  return (dispatch, getState) => {
    dispatch({ type: ADD_QUESTION });
    const { questionEditor } = getState();
    dispatch(selectQuestion(questionEditor.length - 1));
  };
}

export const EDIT_QUESTION_TEXT = "EDIT_QUESTION_TEXT";
export function editCurrentQuestionText(text) {
  return (dispatch, getState) => {
    const { selectedQuestion } = getState();
    dispatch({
      type: EDIT_QUESTION_TEXT,
      payload: {
        questionIdx: selectedQuestion,
        text
      }
    });
  };
}

export const EDIT_QUESTION_CODE = "EDIT_QUESTION_CODE";
export function editCurrentQuestionCode(code) {
  return (dispatch, getState) => {
    const { selectedQuestion } = getState();
    dispatch({
      type: EDIT_QUESTION_CODE,
      payload: {
        questionIdx: selectedQuestion,
        code
      }
    });
  };
}

export const EDIT_QUESTION_MODE = "EDIT_QUESTION_MODE";
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

export const EDIT_QUESTION_TYPE = "EDIT_QUESTION_TYPE";
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

export const DELETE_QUESTION = "DELETE_QUESTION";
export function deleteQuestion(questionIdx) {
  return (dispatch, getState) => {
    dispatch({
      type: DELETE_QUESTION,
      payload: {
        questionIdx
      }
    });

    const { questionEditor: questions } = getState();
    // Delete first element
    if (questionIdx === 0) {
      // It is not the last element
      if (questions.length > 0) {
        dispatch(selectQuestion(0));
        // It is the last element
      } else {
        dispatch(selectQuestion(null));
      }
    } else {
      dispatch(selectQuestion(questionIdx - 1));
    }
  };
}

export const LOAD_QUESTIONS = "LOAD_QUESTIONS";
export function loadQuestions(newQuestions) {
  return {
    type: LOAD_QUESTIONS,
    payload: {
      newQuestions
    }
  };
}

export const loadQuestionsFromStorage = () => dispatch => {
  const newQuestions = localStorage.getItem("weclare");
  if (newQuestions) {
    dispatch(loadQuestions(JSON.parse(newQuestions)));
  }
};

export const validateAndSaveToStorage = data => dispatch => {
  const valid = tv4.validate(JSON.parse(data), QuestionSchema);
  if (valid) {
    Logger.info("Questionset was successfully validated");
    saveToStorage(data);
    dispatch(loadQuestionsFromStorage());
  } else {
    Logger.error("Imported file was invalid", tv4.error);
  }
};

export const saveFileToStorage = file => dispatch => {
  const reader = new FileReader();
  reader.onload = () => {
    dispatch(validateAndSaveToStorage(reader.result));
  };
  reader.readAsText(file);
};

export const SORT_QUESTION = "SORT_QUESTION";
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

// Question Editor Answer Actions
export const SET_CORRECT_SINGLE_ANSWER = "SET_CORRECT_SINGLE_ANSWER";
export function setCorrectSingleAnswer(questionIdx, answerIdx) {
  return {
    type: SET_CORRECT_SINGLE_ANSWER,
    payload: {
      questionIdx,
      answerIdx
    }
  };
}

export const SET_CORRECT_MULTI_ANSWER = "SET_CORRECT_MULTI_ANSWER";
export function setCorrectMultiAnswer(questionIdx, answerIdx) {
  return {
    type: SET_CORRECT_MULTI_ANSWER,
    payload: {
      questionIdx,
      answerIdx
    }
  };
}

export const ADD_ANSWER = "ADD_ANSWER";
export function addAnswer(questionIdx) {
  return {
    type: ADD_ANSWER,
    payload: {
      questionIdx
    }
  };
}

export const EDIT_ANSWER_TEXT = "EDIT_ANSWER_TEXT";
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

export const DELETE_ANSWER = "DELETE_ANSWER";
export function deleteAnswer(questionIdx, answerIdx) {
  return {
    type: DELETE_ANSWER,
    payload: {
      questionIdx,
      answerIdx
    }
  };
}

export const SORT_ANSWER = "SORT_ANSWER";
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
