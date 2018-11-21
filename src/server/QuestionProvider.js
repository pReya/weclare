import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import questionReducer from "./reducers";
import QuestionEditor from "./QuestionEditor";

const store = createStore(questionReducer);

export default class QuestionProvider extends Component {
  render() {
    return (
      <Provider store={store}>
        <QuestionEditor />
      </Provider>
    );
  }
}
