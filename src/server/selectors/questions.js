export const getProgress = state => {
  const {
    questionEditor: questions = [],
    server: { currentQuestionIdx = -1 }
  } = state;

  return `${currentQuestionIdx + 1}/${questions.length}`;
};

export const getCurrentQuestion = state => {
  const {
    questionEditor: questions,
    server: { currentQuestionIdx }
  } = state;
  const progress = getProgress(state);
  return { ...questions[currentQuestionIdx], progress };
};

export const getCurrentQuestionNoSolution = state => {
  const currentQuestion = getCurrentQuestion(state);

  return {
    ...currentQuestion,
    answers: currentQuestion.answers.map(answer => {
      const { isCorrect, ...answerNoSolution } = answer;
      return answerNoSolution;
    })
  };
};
