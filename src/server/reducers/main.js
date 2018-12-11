import { combineReducers } from "redux";
import { questionEditor, selectedQuestion } from "./questionEditor";
import { server } from "./server";
import { registeredAnswers } from "./registeredAnswers";
import { connection } from "../../shared/reducers/connection";

export default combineReducers({
  registeredAnswers,
  connection,
  server,
  questionEditor,
  selectedQuestion
});
