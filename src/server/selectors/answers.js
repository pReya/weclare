const getAnswerCountForCurrentQuestion = state => {
  const {
    server: { currentQuestionIdx },
    registeredAnswers
  } = state;
  if (registeredAnswers.length > 0 && typeof currentQuestionIdx !== "undefined")
    return registeredAnswers[currentQuestionIdx].map(answer => answer.length);
};

export default getAnswerCountForCurrentQuestion;
