export const getProgress = state => {
  const {
    questionEditor: questions,
    server: { currentQuestionIdx }
  } = state;

  if (questions.length > 0 && typeof currentQuestionIdx === "number") {
    return `${currentQuestionIdx + 1}/${questions.length}`;
  }
  return "0/0";
};

export const getCurrentQuestion = state => {
  const {
    questionEditor: questions,
    server: { currentQuestionIdx }
  } = state;
  const progress = getProgress(state);

  if (questions.length > 0 && typeof currentQuestionIdx === "number") {
    return { ...questions[currentQuestionIdx], progress };
  }

  return undefined;
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
