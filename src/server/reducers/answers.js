import { REGISTER_ANSWERS, INIT_ANSWERS } from "../actions/answers";

import { changeInArray } from "../../shared/util/QuestionHelpers";

// Reducers

export const registeredAnswers = (state = [], action) => {
  switch (action.type) {
    case INIT_ANSWERS: {
      return action.payload.array;
    }
    case REGISTER_ANSWERS: {
      const { answerIdxArray, questionIdx, userId } = action.payload;

      const registeredAnswers = changeInArray(state, questionIdx, question =>
        question.map((answer, i) => {
          if (answerIdxArray.includes(i)) {
            return [...answer, userId];
          }
          return answer;
        })
      );

      return registeredAnswers;
    }

    default:
      return state;
  }
};

export default registeredAnswers;
