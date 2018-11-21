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

const initialState = {
  selectedQuestion: null,
  questions: []
};

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

const updateInArray = (arr, ind, updater) =>
  arr.map((item, index) => (ind === index ? updater(item) : item));

function questionReducer(state = initialState, action) {
  switch (action.type) {
    case SELECT_QUESTION:
      return Object.assign(state, {
        selectedQuestion: action.payload.questionIdx
      });
    case ADD_QUESTION:
      return {
        selectedQuestion: state.questions.length,
        questions: [...state.questions, newQuestion]
      };
    case EDIT_QUESTION_TEXT: {
      const clonedQuestions = state.questions.slice();
      clonedQuestions[state.selectedQuestion] = {
        questionText: action.payload.questionText,
        answers: { ...state.questions[state.selectedQuestion].answers }
      };
      return Object.assign(state, { questions: clonedQuestions });
    }
    case DELETE_QUESTION: {
      const clonedQuestions = [
        ...state.questions.slice(0, state.payload.questionIdx),
        ...state.questions.slice(state.payload.questionIdx + 1)
      ];

      return Object.assign(state, { questions: clonedQuestions });
    }
    case ADD_ANSWER: {
      const clonedQuestions = state.questions.slice();
      clonedQuestions[state.selectedQuestion] = {
        questionText: state.questions[state.selectedQuestion].questionText,
        answers: [...state.questions[state.selectedQuestion].answers, newAnswer]
      };
      return Object.assign(state, { questions: clonedQuestions });
    }

    case EDIT_ANSWER_TEXT:
    case DELETE_ANSWER:
    case SET_CORRECT_ANSWER:
    default:
      return state;
  }
}

export default questionReducer;
