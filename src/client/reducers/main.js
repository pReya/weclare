import { combineReducers } from "redux";
import { client } from "./client";
import { connection } from "../../shared/reducers/connection";

export default combineReducers({
  connection,
  client
});
