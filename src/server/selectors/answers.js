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
    server: { connections = [], currentQuestionIdx },
    registeredAnswers = []
  } = state;

  const connectionCount = connections.length;
  if (connectionCount === 0 || !registeredAnswers[currentQuestionIdx])
    return null;

  const flatRegisteredAnswers = registeredAnswers[currentQuestionIdx].flat(2);
  const distinctUsers = [...new Set(flatRegisteredAnswers)].length;

  const percentageValue = Math.trunc((distinctUsers / connectionCount) * 100);
  const percentageString = Number.isNaN(percentageValue)
    ? ""
    : `(${percentageValue}%)`;

  return `${distinctUsers}/${connectionCount} ${percentageString}`;
};
