import { combineReducers } from "redux";
import { questions, selectedQuestion } from "./questions";

export default combineReducers({
  questions,
  selectedQuestion
});
