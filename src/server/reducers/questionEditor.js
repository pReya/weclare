import nanoid from "nanoid";
import {
  // Question
  ADD_QUESTION,
  SORT_QUESTION,
  DELETE_QUESTION,
  EDIT_QUESTION_MODE,
  EDIT_QUESTION_TYPE,
  EDIT_QUESTION_TEXT,
  // Answers
  ADD_ANSWER,
  SORT_ANSWER,
  DELETE_ANSWER,
  EDIT_ANSWER_TEXT,
  SET_CORRECT_SINGLE_ANSWER,
  SET_CORRECT_MULTI_ANSWER,
  // Current Question
  SELECT_QUESTION,
  LOAD_QUESTIONS
} from "../actions/questionEditor";
import {
  changeInArray,
  deleteInArray,
  reorderArray
} from "../../shared/util/Helpers";

const newQuestion = () => ({
  id: nanoid(6),
  type: "question",
  mode: "single",
  text: "<p>New question</p>",
  answers: [
    {
      id: nanoid(6),
      text: "Answer A",
      isCorrect: true
    },
    {
      id: nanoid(6),
      text: "Answer B",
      isCorrect: false
    }
  ]
});

const newAnswer = () => ({
  id: nanoid(6),
  text: "New answer",
  isCorrect: false
});

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
      const { questionIdx, text } = action.payload;

      const deepClonedState = JSON.parse(JSON.stringify(state));
      deepClonedState[questionIdx] = {
        ...deepClonedState[questionIdx],
        text
      };

      return deepClonedState;
    }
    case EDIT_QUESTION_MODE: {
      console.log("Mode reducer: ", action.payload);
      const { questionIdx, newMode, oldMode } = action.payload;
      const deepClonedState = JSON.parse(JSON.stringify(state));
      let firstAnswerFound = false;

      deepClonedState[questionIdx] = {
        ...deepClonedState[questionIdx],
        answers: state[questionIdx].answers.map(answer => {
          if (answer.isCorrect && !firstAnswerFound) {
            firstAnswerFound = true;
            return { ...answer, isCorrect: true };
          }

          return { ...answer, isCorrect: false };
        }),
        mode: newMode
      };

      return deepClonedState;
    }
    case EDIT_QUESTION_TYPE: {
      console.log("Type reducer: ", action.payload);
      const { questionIdx, newType } = action.payload;
      const deepClonedState = JSON.parse(JSON.stringify(state));

      deepClonedState[questionIdx] = {
        ...deepClonedState[questionIdx],
        answers: state[questionIdx].answers.map(answer => ({
          ...answer,
          isCorrect: false
        })),
        type: newType
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
        answers: [...state[questionIdx].answers, newAnswer()]
      };
      return deepClonedState;
    }

    case EDIT_ANSWER_TEXT: {
      const { questionIdx, text, answerIdx } = action.payload;
      const deepClonedState = JSON.parse(JSON.stringify(state));

      return changeInArray(deepClonedState, questionIdx, q => ({
        ...q,
        answers: changeInArray(q.answers, answerIdx, a => ({
          ...a,
          text
        }))
      }));
    }

    case SET_CORRECT_SINGLE_ANSWER: {
      const { questionIdx, answerIdx } = action.payload;
      const deepClonedState = JSON.parse(JSON.stringify(state));

      const modAnswers = deepClonedState[questionIdx].answers.map(
        (answer, i) =>
          i === answerIdx
            ? {
                ...answer,
                isCorrect: true
              }
            : {
                ...answer,
                isCorrect: false
              }
      );

      deepClonedState[questionIdx].answers = modAnswers;
      return deepClonedState;
    }

    case SET_CORRECT_MULTI_ANSWER: {
      const { questionIdx, answerIdx } = action.payload;
      const deepClonedState = JSON.parse(JSON.stringify(state));

      const modAnswers = deepClonedState[questionIdx].answers.map(
        (answer, i) =>
          i === answerIdx
            ? {
                ...answer,
                isCorrect: !answer.isCorrect
              }
            : answer
      );

      deepClonedState[questionIdx].answers = modAnswers;
      return deepClonedState;
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

    case SORT_ANSWER: {
      const { questionIdx, newAnswerIdx, oldAnswerIdx } = action.payload;
      const deepClonedState = JSON.parse(JSON.stringify(state));

      reorderArray(
        deepClonedState[questionIdx].answers,
        oldAnswerIdx,
        newAnswerIdx
      );

      return deepClonedState;
    }

    default: {
      return state;
    }
  }
};
