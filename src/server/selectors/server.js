export const isConnected = state => {
  const {
    server: { connections }
  } = state;
  return connections.length > 0;
};

export const hasNextQuestion = state => {
  const {
    questionEditor: questions = [],
    server: { currentQuestionIdx = 0 }
  } = state;
  return currentQuestionIdx + 1 < questions.length;
};

export const hasPreviousQuestion = state => {
  const {
    server: { currentQuestionIdx = 0 }
  } = state;
  return !(currentQuestionIdx - 1 < 0);
};
