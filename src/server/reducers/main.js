import { combineReducers } from "redux";
import { questionEditor, selectedQuestion } from "./questions";
import { server } from "./server";
import { registeredAnswers } from "./answers";
import { connection } from "../../shared/reducers/connection";

export default combineReducers({
  registeredAnswers,
  connection,
  server,
  questionEditor,
  selectedQuestion
});
