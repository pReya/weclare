export const getAnswerCountForCurrentQuestion = state => {
  const {
    server: { currentQuestionIdx },
    registeredAnswers
  } = state;
  if (
    registeredAnswers.length > 0 &&
    typeof currentQuestionIdx !== "undefined"
  ) {
    return registeredAnswers[currentQuestionIdx].map(answer => answer.length);
  }
  return [];
};

export const getReceivedAnswersCounter = state => {
  const {
    server: { connections = [] },
    registeredAnswers
  } = state;
  const flatRegisteredAnswers = registeredAnswers.flat(2);
  const distinctUsers = [...new Set(flatRegisteredAnswers)].length;

  const connectionCount = connections.length;
  if (connectionCount === 0) return null;
  const percentageValue = Math.trunc((distinctUsers / connectionCount) * 100);
  const percentageString = Number.isNaN(percentageValue)
    ? ""
    : `(${percentageValue}%)`;

  return `${distinctUsers}/${connectionCount} ${percentageString}`;
};
