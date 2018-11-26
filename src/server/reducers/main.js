import { combineReducers } from "redux";
import { questions, selectedQuestion } from "./questions";
import { server } from "./server";
import { connection } from "../../shared/reducers/connection";

export default combineReducers({
  connection,
  server,
  questions,
  selectedQuestion
});
