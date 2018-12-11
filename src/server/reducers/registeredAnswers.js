import { REGISTER_ANSWER, INIT_ANSWERS } from "../actions/answers";

import { changeInArray } from "../../shared/util/Helpers";

// Reducers

export const registeredAnswers = (state = [], action) => {
  switch (action.type) {
    case INIT_ANSWERS:
      return action.payload.array;
    case REGISTER_ANSWER: {
      console.log("Reducer", action.payload);
      return changeInArray(state, action.payload.questionIdx, q =>
        changeInArray(q, action.payload.answerIdx, a => {
          a.push(action.payload.userId);
          return a;
        })
      );
    }

    default:
      return state;
  }
};

export default registeredAnswers;
