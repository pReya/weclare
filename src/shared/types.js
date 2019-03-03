import PropTypes from "prop-types";

export const TSpinnerCard = {
  title: PropTypes.string
};

export const DSpinnerCard = {
  title: "Waiting"
};

export const TQuestion = PropTypes.shape({
  question: PropTypes.shape({
    questionIdx: PropTypes.number,
    text: PropTypes.string,
    type: PropTypes.string,
    answers: PropTypes.arrayOf(PropTypes.object)
  })
});

export const DQuestion = {
  progress: "0/0",
  questionIdx: 0,
  text: "Mock question: How is the development going?",
  type: "single",
  mode: "question",
  answers: [
    { id: "6FedDc", text: "Good", isCorrect: true },
    { id: "9FbdDa", text: "Not Good", isCorrect: false }
  ]
};
