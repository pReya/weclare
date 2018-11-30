import { combineReducers } from "redux";
import { questionEditor, selectedQuestion } from "./questionEditor";
import { server } from "./server";
import { connection } from "../../shared/reducers/connection";

export default combineReducers({
  connection,
  server,
  questionEditor,
  selectedQuestion
});
