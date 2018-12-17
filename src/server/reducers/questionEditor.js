import nanoid from "nanoid";
import {
  ADD_QUESTION,
  EDIT_QUESTION_TEXT,
  DELETE_QUESTION,
  ADD_ANSWER,
  EDIT_ANSWER_TEXT,
  SET_CORRECT_ANSWER,
  DELETE_ANSWER,
  SELECT_QUESTION,
  LOAD_QUESTIONS,
  SORT_QUESTION
} from "../actions/questionEditor";
import {
  changeInArray,
  deleteInArray,
  reorderArray
} from "../../shared/util/Helpers";

const newQuestion = () => ({
  id: nanoid(6),
  questionType: "singleChoice",
  questionText: "<p>New question</p>",
  correctAnswers: null,
  answers: [
    {
      answerText: "Answer A"
    },
    {
      answerText: "Answer B"
    }
  ]
});

const newAnswer = {
  answerText: "New answer"
};

// Reducers

export const selectedQuestion = (state = null, action) => {
  switch (action.type) {
    case SELECT_QUESTION:
      return action.payload.questionIdx;

    default:
      return state;
  }
};

export const questionEditor = (state = [], action) => {
  switch (action.type) {
    case ADD_QUESTION: {
      const deepClonedState = JSON.parse(JSON.stringify(state));
      deepClonedState.push(newQuestion());
      return deepClonedState;
    }

    case EDIT_QUESTION_TEXT: {
      const { questionIdx, questionText } = action.payload;

      const deepClonedState = JSON.parse(JSON.stringify(state));
      deepClonedState[questionIdx] = {
        ...deepClonedState[questionIdx],
        questionText
      };

      return deepClonedState;
    }
    case DELETE_QUESTION: {
      const deepClonedState = JSON.parse(JSON.stringify(state));
      const updatedQuestions = [
        ...deepClonedState.slice(0, action.payload.questionIdx),
        ...deepClonedState.slice(action.payload.questionIdx + 1)
      ];

      return updatedQuestions;
    }

    case DELETE_ANSWER: {
      const { questionIdx, answerIdx } = action.payload;
      const deepClonedState = JSON.parse(JSON.stringify(state));
      return changeInArray(deepClonedState, questionIdx, q => ({
        ...q,
        answers: deleteInArray(q.answers, answerIdx)
      }));
    }

    case ADD_ANSWER: {
      const { questionIdx } = action.payload;
      const deepClonedState = JSON.parse(JSON.stringify(state));
      deepClonedState[questionIdx] = {
        ...state[questionIdx],
        answers: [...state[questionIdx].answers, newAnswer]
      };
      return deepClonedState;
    }

    case EDIT_ANSWER_TEXT: {
      const { questionIdx, answerText, answerIdx } = action.payload;
      const deepClonedState = JSON.parse(JSON.stringify(state));

      return changeInArray(deepClonedState, questionIdx, q => ({
        ...q,
        answers: changeInArray(q.answers, answerIdx, a => ({
          ...a,
          answerText
        }))
      }));
    }

    case SET_CORRECT_ANSWER: {
      const { questionIdx, answerIdx } = action.payload;
      const deepClonedState = JSON.parse(JSON.stringify(state));
      return changeInArray(deepClonedState, questionIdx, q => ({
        ...q,
        correctAnswers: answerIdx
      }));
    }

    case LOAD_QUESTIONS: {
      const { newQuestions } = action.payload;
      return newQuestions;
    }

    case SORT_QUESTION: {
      const { newQuestionIdx, oldQuestionIdx } = action.payload;
      const deepClonedState = JSON.parse(JSON.stringify(state));

      reorderArray(deepClonedState, oldQuestionIdx, newQuestionIdx);

      return deepClonedState;
    }

    default: {
      return state;
    }
  }
};
