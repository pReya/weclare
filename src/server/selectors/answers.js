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

export const getNumberOfUsersAnswered = state => {
  const {
    server: { connections = [], currentQuestionIdx },
    registeredAnswers = []
  } = state;

  const connectionCount = connections.length;
  if (connectionCount === 0 || !registeredAnswers[currentQuestionIdx])
    return null;

  const flatRegisteredAnswers = registeredAnswers[currentQuestionIdx].flat(2);
  const distinctUsers = [...new Set(flatRegisteredAnswers)].length;

  return distinctUsers;
};

export const getNumberOfUsersAnsweredString = state => {
  const {
    server: { connections = [] }
  } = state;

  const connectionCount = connections.length;
  const distinctUsers = getNumberOfUsersAnswered(state) || "0";

  const percentageValue = Math.trunc((distinctUsers / connectionCount) * 100);
  const percentageString = Number.isNaN(percentageValue)
    ? ""
    : `(${percentageValue}%)`;

  return `${distinctUsers}/${connectionCount} ${percentageString}`;
};
