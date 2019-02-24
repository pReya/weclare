import { REGISTER_ANSWERS, INIT_ANSWERS } from "../actions/answers";

import { changeInArray } from "../../shared/util/QuestionHelpers";

// Reducers

export const registeredAnswers = (state = [], action) => {
  switch (action.type) {
    case INIT_ANSWERS: {
      return action.payload.array;
    }
    case REGISTER_ANSWERS: {
      console.log("Register Answers Reducer", action.payload);
      const { answerIdxArray, questionIdx, userId } = action.payload;

      const registeredAnswers = changeInArray(state, questionIdx, question => {
        console.log(question);
        return question.map((answer, i) => {
          console.log(answer);
          if (answerIdxArray.includes(i)) {
            return [...answer, userId];
          }
          return answer;
        });
        // changeInArray(question, answerIdxArray, answer => {
        //   answer.push(userId);
        //   return answer;
        // });
      });
      console.log(registeredAnswers);
      return registeredAnswers;
    }

    default:
      return state;
  }
};

export default registeredAnswers;
