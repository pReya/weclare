import { combineReducers } from "redux";

import {
  ADD_QUESTION,
  EDIT_QUESTION_TEXT,
  DELETE_QUESTION,
  ADD_ANSWER,
  EDIT_ANSWER_TEXT,
  DELETE_ANSWER,
  SET_CORRECT_ANSWER,
  SELECT_QUESTION
} from "./actions";

const newQuestion = {
  questionType: "singleChoice",
  questionText: "New question",
  answers: [
    {
      answerText: "Answer A"
    },
    {
      answerText: "Answer B"
    }
  ]
};

const newAnswer = {
  answerText: "Answer A"
};

function selectedQuestion(state = null, action) {
  switch (action.type) {
    case SELECT_QUESTION:
      return action.payload.questionIdx;

    default:
      return state;
  }
}

function questions(state = [], action) {
  switch (action.type) {
    case ADD_QUESTION:
      return [...state, newQuestion];

    case EDIT_QUESTION_TEXT: {
      // const changeInArray = (array, index, changer) =>
      //   array.map((item, i) => index === i ? changer(item) : item)

      // return changeInArray(
      //   state.questions,
      //   state.selectedQuestion,
      //   q => ({
      //     ...q,
      //     questionText: action.payload.questionText
      //   })
      // );

      const { questionIdx, questionText } = action.payload;

      const clonedQuestions = state.slice();
      clonedQuestions[questionIdx] = {
        ...clonedQuestions[questionIdx],
        questionText
      };

      return clonedQuestions;
    }
    case DELETE_QUESTION: {
      const clonedQuestions = [
        ...state.slice(0, action.payload.questionIdx),
        ...state.slice(action.payload.questionIdx + 1)
      ];

      return clonedQuestions;
    }
    case ADD_ANSWER: {
      const { questionIdx } = action.payload;

      const clonedQuestions = state.slice();
      clonedQuestions[questionIdx] = {
        ...state[questionIdx],
        answers: [...state[questionIdx].answers, newAnswer]
      };
      return clonedQuestions;
    }

    case EDIT_ANSWER_TEXT:
    case DELETE_ANSWER:
    case SET_CORRECT_ANSWER:
    default:
      return state;
  }
}

export default combineReducers({
  questions,
  selectedQuestion
});
