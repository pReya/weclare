import { combineReducers } from "redux";

import {
  ADD_QUESTION,
  EDIT_QUESTION_TEXT,
  DELETE_QUESTION,
  ADD_ANSWER,
  EDIT_ANSWER_TEXT,
  SET_CORRECT_ANSWER,
  DELETE_ANSWER,
  SELECT_QUESTION,
  LOAD_QUESTIONS
} from "../actions/actions";

const newQuestion = {
  questionType: "singleChoice",
  questionText: "New question",
  correctAnswers: null,
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
  answerText: "New answer"
};

const changeInArray = (array, index, changer) =>
  array.map((item, i) => (index === i ? changer(item) : item));

const deleteInArray = (array, index) => array.filter((item, i) => index !== i);

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

    case DELETE_ANSWER: {
      const { questionIdx, answerIdx } = action.payload;
      return changeInArray(state, questionIdx, q => ({
        ...q,
        answers: deleteInArray(q.answers, answerIdx)
      }));
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

    case EDIT_ANSWER_TEXT: {
      const { questionIdx, answerText, answerIdx } = action.payload;

      // const clonedQuestions = state.slice();
      // const clonedQuestion = Object.assign({}, clonedQuestions[questionIdx]);
      // const clonedAnswers = clonedQuestion.answers.slice();
      // const clonedAnswer = Object.assign({}, clonedAnswers[answerIdx]);
      // clonedAnswer.answerText = answerText;
      // clonedAnswers[answerIdx] = clonedAnswer;
      // clonedQuestion.answers = clonedAnswers;
      // clonedQuestions[questionIdx] = clonedQuestion;

      // return clonedQuestions;

      return changeInArray(state, questionIdx, q => ({
        ...q,
        answers: changeInArray(q.answers, answerIdx, a => ({
          ...a,
          answerText
        }))
      }));
    }

    case SET_CORRECT_ANSWER: {
      const { questionIdx, answerIdx } = action.payload;
      return changeInArray(state, questionIdx, q => ({
        ...q,
        correctAnswers: answerIdx
      }));
    }

    case LOAD_QUESTIONS: {
      const { newQuestions } = action.payload;
      return newQuestions;
    }

    default: {
      return state;
    }
  }
}

export default combineReducers({
  questions,
  selectedQuestion
});
