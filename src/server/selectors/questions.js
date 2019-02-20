export const getCurrentQuestion = state => {
  const {
    questionEditor: questions,
    server: { currentQuestionIdx }
  } = state;
  return questions[currentQuestionIdx];
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
