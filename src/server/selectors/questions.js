const getCurrentQuestion = state => {
  const {
    questionEditor: questions,
    server: { currentQuestionIdx }
  } = state;
  return questions[currentQuestionIdx];
};

export default getCurrentQuestion;
