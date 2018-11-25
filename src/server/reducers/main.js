import { combineReducers } from "redux";
import { questions, selectedQuestion } from "./questions";
import { server } from "./server";

export default combineReducers({
  server,
  questions,
  selectedQuestion
});
