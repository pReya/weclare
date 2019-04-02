import { ADD_LINE, RESET_TERMINAL } from "../actions/terminal";

// Reducers

export const terminal = (state = [], action) => {
  switch (action.type) {
    case ADD_LINE: {
      return action.payload.addNewLine
        ? [...state, action.payload.line + "\n"]
        : [...state, action.payload.line];
    }

    case RESET_TERMINAL: {
      return [];
    }

    default:
      return state;
  }
};

export default terminal;
