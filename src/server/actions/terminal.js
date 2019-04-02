// Server Terminal Actions
export const ADD_LINE = "ADD_LINE";
export function addLine(line, addNewLine = true) {
  return {
    type: ADD_LINE,
    payload: {
      line,
      addNewLine
    }
  };
}

export const RESET_TERMINAL = "RESET_TERMINAL";
export function resetTerminal() {
  return {
    type: RESET_TERMINAL
  };
}
